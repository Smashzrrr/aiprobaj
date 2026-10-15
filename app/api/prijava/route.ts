import { NextResponse } from "next/server";
import { prijavaSchema } from "@/lib/validation";
import { supabaseAdmin } from "@/lib/supabase";
import { allowRequest } from "@/lib/rateLimit";
import { sendPrijavaNotifikacija, sendPrijavaPotvrda } from "@/lib/email";
import { WEBINAR } from "@/lib/webinar";
import { PRIVOLA_BEZ_VERZIJE } from "@/lib/privola";

export const runtime = "nodejs";

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "0.0.0.0";
}

export async function POST(req: Request) {
  const ip = clientIp(req);

  // 1. Rate limit (fail-open ako Upstash nije postavljen ili padne)
  if (!(await allowRequest(ip))) {
    return NextResponse.json(
      { error: "Previse pokusaja. Pokusaj ponovno za koju minutu." },
      { status: 429 },
    );
  }

  // 2. Parse
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Neispravan zahtjev." }, { status: 400 });
  }

  // 3. Honeypot: skriveno polje popunjeno -> glumi uspjeh, ne spremaj (bot)
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  // 4. Zod validacija (allowlist)
  const parsed = prijavaSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Provjeri polja.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const data = parsed.data;
  const consentTs = new Date().toISOString();
  const consentVersion = data.consentVersion ?? PRIVOLA_BEZ_VERZIJE;
  const izvor = data.webinar ?? (WEBINAR.waitlistMode ? "waitlist" : "landing");

  const baseRecord = {
    ime: data.ime,
    email: data.email,
    telefon: data.telefon ?? null,
    razina: data.razina ?? null,
    uloga: data.uloga ?? null,
    ciljevi: data.ciljevi ?? [],
    consent: true,
    consent_ts: consentTs,
    consent_ip: ip,
    izvor,
  };
  // GDPR stupci (migracija supabase/migrations/20261015120000_gdpr_odjava_privola.sql).
  const privolaPolja = {
    consent_version: consentVersion,
    marketing_opt_in: data.marketingOptIn,
    marketing_opt_in_ts: data.marketingOptIn ? consentTs : null,
  };
  const record = { ...baseRecord, ...privolaPolja };

  // Ponovna prijava postojeceg emaila: nova privola, a odjava se ponistava jer
  // se osoba sama ponovno prijavila. Marketinska privola se samo dodaje, nikad
  // ne skida (povlaci se odjavom). Povijest ostaje u privole_log.
  async function ponovnaPrijava(email: string, extra: { izvor?: string }) {
    const update = {
      ...extra,
      consent_ts: consentTs,
      consent_ip: ip,
      consent_version: consentVersion,
      odjava_ts: null,
      odjava_izvor: null,
      ...(data.marketingOptIn ? { marketing_opt_in: true, marketing_opt_in_ts: consentTs } : {}),
    };
    try {
      const supabase = supabaseAdmin();
      let { error } = await supabase.from("prijave").update(update).eq("email", email);
      if (error?.code === "PGRST204") {
        console.error("[prijava] GDPR stupci ne postoje, pokreni migraciju! Detalj:", error.message);
        ({ error } = extra.izvor
          ? await supabase.from("prijave").update(extra).eq("email", email)
          : { error: null });
      }
      if (error) console.error("[prijava] duplicate update error:", error);
    } catch (e) {
      console.error("[prijava] duplicate update threw:", e);
    }
  }

  // 5. Tier 1: Supabase insert
  let dbFailed = false;
  let dbError: string | null = null;
  let duplicate = false;
  try {
    const supabase = supabaseAdmin();
    let { error } = await supabase.from("prijave").insert(record);
    if (error?.code === "PGRST204") {
      // Migracija jos nije pokrenuta (nema stupca): spremi prijavu bez GDPR
      // polja da prijave ne padaju, ali glasno upozori.
      console.error("[prijava] GDPR stupci ne postoje, pokreni migraciju! Detalj:", error.message);
      ({ error } = await supabase.from("prijave").insert(baseRecord));
    }
    if (error) {
      if (error.code === "23505") {
        duplicate = true; // vec prijavljen email (unique violation)
      } else {
        dbFailed = true;
        dbError = error.message;
        console.error("[prijava] DB insert error:", error);
      }
    }
  } catch (e) {
    dbFailed = true;
    dbError = e instanceof Error ? e.message : String(e);
    console.error("[prijava] DB threw:", e);
  }

  // Duplikat s posebnog landinga (npr. stari prijavljeni s /ai-mozak): oznaci
  // postojecu prijavu za taj webinar i posalji potvrdu, inace se tiho izgubi.
  if (duplicate && data.webinar) {
    await ponovnaPrijava(data.email, { izvor: data.webinar });
    await zapisiPrivolu(data.email, consentVersion, data.marketingOptIn, data.webinar, ip);
    try {
      await sendPrijavaNotifikacija({ ...data, dbFailed: false, ponovna: true });
    } catch (e) {
      console.error("[prijava] notifikacija threw:", e);
    }
    await sendPrijavaPotvrda(data.ime, data.email, false, data.webinar);
    return NextResponse.json({ success: true, duplicate: true });
  }

  // Duplikat: vec prijavljen, idempotentno vrati uspjeh, bez novog maila.
  // Nova privola se ipak biljezi (verzija teksta, marketinska kvacica).
  if (duplicate) {
    await ponovnaPrijava(data.email, {});
    await zapisiPrivolu(data.email, consentVersion, data.marketingOptIn, izvor, ip);
    return NextResponse.json({ success: true, duplicate: true });
  }

  if (!dbFailed) await zapisiPrivolu(data.email, consentVersion, data.marketingOptIn, izvor, ip);

  // 6. Tier 2: obavijest nama (UVIJEK), s markerom ako je baza pala
  let emailSent = false;
  try {
    emailSent = await sendPrijavaNotifikacija({ ...data, dbFailed, dbError });
  } catch (e) {
    console.error("[prijava] notifikacija threw:", e);
  }

  // 7. Tier 3: baza pala I email pao -> dump u log za rucni recovery
  if (dbFailed && !emailSent) {
    console.error(
      "[prijava] LEAD LOST - rucni recovery:",
      JSON.stringify({ ...record, ts: new Date().toISOString() }),
    );
    return NextResponse.json(
      { error: "Trenutno nije moguce spremiti prijavu. Javi nam se na ivan.bobanovic@fraviz.com." },
      { status: 500 },
    );
  }

  // 8. Potvrda prijavljenom. MORA biti await: na Vercel serverless-u se
  //    neawaitani "fire and forget" poziv ugasi cim je odgovor poslan, pa
  //    potvrda cesto nikad ne ode (obavijest nama radi jer je gore awaitana).
  await sendPrijavaPotvrda(
    data.ime,
    data.email,
    data.webinar ? false : WEBINAR.waitlistMode,
    data.webinar,
  );

  return NextResponse.json({ success: true, degraded: dbFailed });
}

// Zapis privole u privole_log (povijesni dokaz). Greska ne rusi prijavu.
async function zapisiPrivolu(
  email: string,
  consentVersion: string,
  marketingOptIn: boolean,
  izvor: string,
  ip: string,
) {
  try {
    const { error } = await supabaseAdmin().from("privole_log").insert({
      email,
      dogadjaj: "privola",
      consent_version: consentVersion,
      marketing_opt_in: marketingOptIn,
      izvor,
      ip,
    });
    if (error) console.error("[prijava] privole_log error:", error);
  } catch (e) {
    console.error("[prijava] privole_log threw:", e);
  }
}
