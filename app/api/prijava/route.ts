import { NextResponse } from "next/server";
import { prijavaSchema } from "@/lib/validation";
import { supabaseAdmin } from "@/lib/supabase";
import { allowRequest } from "@/lib/rateLimit";
import { sendPrijavaNotifikacija, sendPrijavaPotvrda } from "@/lib/email";

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

  const record = {
    ime: data.ime,
    email: data.email,
    telefon: data.telefon ?? null,
    razina: data.razina ?? null,
    uloga: data.uloga ?? null,
    ciljevi: data.ciljevi ?? [],
    consent: true,
    consent_ts: new Date().toISOString(),
    consent_ip: ip,
    izvor: "landing",
  };

  // 5. Tier 1: Supabase insert
  let dbFailed = false;
  let dbError: string | null = null;
  let duplicate = false;
  try {
    const supabase = supabaseAdmin();
    const { error } = await supabase.from("prijave").insert(record);
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

  // Duplikat: vec prijavljen, idempotentno vrati uspjeh, bez novog maila.
  if (duplicate) {
    return NextResponse.json({ success: true, duplicate: true });
  }

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
  await sendPrijavaPotvrda(data.ime, data.email);

  return NextResponse.json({ success: true, degraded: dbFailed });
}
