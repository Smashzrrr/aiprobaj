import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { supabaseAdmin } from "./supabase";

// Odjava s mailova: potpisani token po emailu (HMAC-SHA256, env ODJAVA_SECRET),
// zapis odjave u prijave.odjava_ts i provjera prije svakog slanja.

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://aiprobaj.com";

export type OdjavaIzvor = "link" | "one-click" | "resend" | "rucno";

// webinar: obavijesti o webinaru na koji se osoba prijavila (termin, link,
//          podsjetnik, snimka). Treba samo da nije odjavljena.
// promo:   sve ostalo (druge edukacije, novosti). Treba i marketing_opt_in.
export type VrstaMaila = "webinar" | "promo";

let upozoreno = false;

function secret(): string | null {
  const s = process.env.ODJAVA_SECRET;
  if (!s || s.length < 32) {
    if (upozoreno) return null;
    upozoreno = true;
    console.error(
      "[odjava] ODJAVA_SECRET nije postavljen ili je kraci od 32 znaka. Linkovi za odjavu su iskljuceni. Generiraj: openssl rand -hex 32",
    );
    return null;
  }
  return s;
}

export function normalizirajEmail(email: string): string {
  return email.trim().toLowerCase();
}

function potpis(email: string, s: string): Buffer {
  return createHmac("sha256", s).update(`odjava:v1:${normalizirajEmail(email)}`).digest();
}

export function odjavaToken(email: string): string | null {
  const s = secret();
  return s ? potpis(email, s).toString("base64url") : null;
}

export function provjeriToken(email: string, token: string): boolean {
  const s = secret();
  if (!s || !token) return false;
  const ocekivani = potpis(email, s);
  const dobiveni = Buffer.from(token, "base64url");
  return dobiveni.length === ocekivani.length && timingSafeEqual(dobiveni, ocekivani);
}

// Email u URL-u ide base64url kodiran, da ne stoji citljiv u logovima.
export function kodirajEmail(email: string): string {
  return Buffer.from(normalizirajEmail(email), "utf8").toString("base64url");
}

export function dekodirajEmail(e: string | null | undefined): string | null {
  if (!e) return null;
  try {
    const email = Buffer.from(e, "base64url").toString("utf8");
    return email.includes("@") && email.length <= 200 ? normalizirajEmail(email) : null;
  } catch {
    return null;
  }
}

function query(email: string): string | null {
  const t = odjavaToken(email);
  return t ? `e=${kodirajEmail(email)}&t=${t}` : null;
}

// Link za podnozje maila: stranica s potvrdom (GET nista ne mijenja).
export function odjavaUrl(email: string): string | null {
  const q = query(email);
  return q ? `${SITE}/odjava?${q}` : null;
}

// URL za List-Unsubscribe header: POST na njega odjavljuje (RFC 8058).
export function odjavaApiUrl(email: string): string | null {
  const q = query(email);
  return q ? `${SITE}/api/odjava?${q}` : null;
}

// Upisuje odjavu. Idempotentno: vec odjavljen ostaje s prvim vremenom.
// Vraca false samo kad baza ne odgovori; nepostojeci email nije greska
// (ne otkrivamo tko je u bazi).
export async function odjavi(email: string, izvor: OdjavaIzvor): Promise<boolean> {
  const e = normalizirajEmail(email);
  try {
    const supabase = supabaseAdmin();
    const { data, error } = await supabase
      .from("prijave")
      .update({
        odjava_ts: new Date().toISOString(),
        odjava_izvor: izvor,
        marketing_opt_in: false,
      })
      .eq("email", e)
      .is("odjava_ts", null)
      .select("izvor");
    if (error) {
      console.error("[odjava] update error:", error);
      return false;
    }
    if (data && data.length > 0) {
      const { error: logError } = await supabase.from("privole_log").insert({
        email: e,
        dogadjaj: "odjava",
        marketing_opt_in: false,
        izvor,
      });
      if (logError) console.error("[odjava] privole_log error:", logError);
    }
    return true;
  } catch (err) {
    console.error("[odjava] threw:", err);
    return false;
  }
}

// Provjera prije slanja. Fail-closed: ako baza ne odgovori ili osobe nema u
// prijavama, ne saljemo.
export async function smijeSlati(email: string, vrsta: VrstaMaila): Promise<boolean> {
  try {
    const { data, error } = await supabaseAdmin()
      .from("prijave")
      .select("odjava_ts, marketing_opt_in")
      .eq("email", normalizirajEmail(email))
      .maybeSingle();
    if (error) {
      console.error("[odjava] provjera error:", error);
      return false;
    }
    if (!data || data.odjava_ts) return false;
    return vrsta === "webinar" || data.marketing_opt_in === true;
  } catch (err) {
    console.error("[odjava] provjera threw:", err);
    return false;
  }
}
