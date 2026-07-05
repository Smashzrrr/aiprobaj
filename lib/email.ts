import "server-only";
import { Resend } from "resend";
import { RAZINA_LABEL, ULOGA_LABEL, type Razina, type Uloga } from "./leadTypes";
import { WEBINAR } from "./webinar";

const FROM = process.env.FROM_EMAIL || "aiprobaj <onboarding@resend.dev>";
const NOTIFY = process.env.NOTIFY_EMAIL || "ivan.bobanovic@fraviz.com";

// Glasno upozorenje umjesto tihe degradacije: resend.dev test domena salje SAMO
// na email vlasnika Resend racuna, svi ostali primatelji dobivaju 403.
// (Incident aiprobaj 02.07.2026: FROM_EMAIL nije bio u Vercel envu, mailovi tiho padali.)
if (!process.env.FROM_EMAIL) {
  console.error(
    "[email] UPOZORENJE: FROM_EMAIL nije postavljen. Fallback onboarding@resend.dev NE dostavlja mailove primateljima izvan vlasnickog racuna. Postavi FROM_EMAIL u Vercel env vars i redeployaj.",
  );
}

function client(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function esc(s: string): string {
  return s.replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string,
  );
}

export interface NotifyPayload {
  ime: string;
  email: string;
  telefon?: string;
  razina?: string;
  uloga?: string;
  ciljevi?: string[];
  dbFailed: boolean;
  dbError?: string | null;
}

// Tier 2: obavijest nama. UVIJEK se pokusava. Ako je baza pala, crveni marker.
export async function sendPrijavaNotifikacija(p: NotifyPayload): Promise<boolean> {
  const r = client();
  if (!r) {
    console.error("[email] RESEND_API_KEY nije postavljen; preskacem obavijest.");
    return false;
  }
  const subject =
    (p.dbFailed ? "[BAZA PALA] " : "") +
    (WEBINAR.waitlistMode ? "[LISTA ČEKANJA] " : "") +
    `Nova prijava: ${p.ime}`;
  const banner = p.dbFailed
    ? `<div style="margin:0 0 20px;padding:14px 18px;background:#fef2f2;border:1px solid #fca5a5;border-left:4px solid #dc2626;border-radius:8px;">
         <p style="margin:0 0 6px;font-size:14px;font-weight:700;color:#991b1b;">Baza nije zapisala prijavu</p>
         <p style="margin:0;font-size:13px;line-height:1.5;color:#7f1d1d;">Ova prijava NIJE spremljena u Supabase. Rucno je pohrani. Detalj: ${esc(p.dbError || "n/a")}</p>
       </div>`
    : "";
  const razinaLbl = p.razina ? (RAZINA_LABEL[p.razina as Razina] ?? p.razina) : "-";
  const ulogaLbl = p.uloga ? (ULOGA_LABEL[p.uloga as Uloga] ?? p.uloga) : "-";
  const html = `${banner}
    <h2 style="font-family:sans-serif;">Nova prijava na aiprobaj webinar</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;">
      <tr><td style="padding:4px 12px 4px 0;color:#666;">Ime</td><td>${esc(p.ime)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666;">Email</td><td>${esc(p.email)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666;">Telefon</td><td>${esc(p.telefon || "-")}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666;">Razina</td><td>${esc(razinaLbl)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666;">Uloga</td><td>${esc(ulogaLbl)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#666;">Ciljevi</td><td>${esc((p.ciljevi || []).join(", ") || "-")}</td></tr>
    </table>`;
  try {
    const { error } = await r.emails.send({
      from: FROM,
      to: NOTIFY,
      subject,
      html,
      replyTo: p.email,
    });
    if (error) {
      console.error("[email] notifikacija error:", error);
      return false;
    }
    return true;
  } catch (e) {
    console.error("[email] notifikacija threw:", e);
    return false;
  }
}

// Potvrda prijavljenom. waitlist=true: prvi termin popunjen, osoba je na listi
// cekanja za sljedeci termin (datum jos nije potvrdjen).
export async function sendPrijavaPotvrda(
  ime: string,
  email: string,
  waitlist = false,
): Promise<void> {
  const r = client();
  if (!r) return;
  const html = waitlist
    ? `
    <div style="font-family:sans-serif;max-width:520px;">
      <h2 style="color:#0a0a0a;">Na listi si, ${esc(ime)}!</h2>
      <p style="font-size:15px;line-height:1.6;color:#333;">Prvi termin aiprobaj webinara je popunjen, ali si sad na listi cekanja za sljedeci.</p>
      <p style="font-size:15px;line-height:1.6;color:#333;">Cim potvrdimo datum sljedeceg termina, javljamo ti ga na ovaj email prije nego krene javna prijava. Popis AI alata i resursa svejedno stize na email.</p>
      <p style="font-size:13px;color:#888;">Ako se nisi ti prijavio/la, slobodno ignoriraj ovaj email.</p>
      <p style="font-size:13px;color:#888;">aiprobaj.com &middot; Fraviz Studio x SEO Lick</p>
    </div>`
    : `
    <div style="font-family:sans-serif;max-width:520px;">
      <h2 style="color:#0a0a0a;">Vidimo se, ${esc(ime)}!</h2>
      <p style="font-size:15px;line-height:1.6;color:#333;">Tvoje mjesto na aiprobaj webinaru je rezervirano.</p>
      <p style="font-size:15px;line-height:1.6;color:#333;">Zoom link i sve detalje saljemo na ovaj email prije pocetka. Snimku dobivaju svi prijavljeni, cak i ako ne mogu pratiti uzivo.</p>
      <p style="font-size:13px;color:#888;">Ako se nisi ti prijavio/la, slobodno ignoriraj ovaj email.</p>
      <p style="font-size:13px;color:#888;">aiprobaj.com &middot; Fraviz Studio x SEO Lick</p>
    </div>`;
  try {
    await r.emails.send({
      from: FROM,
      to: email,
      subject: waitlist
        ? "Na listi si za sljedeci aiprobaj webinar"
        : "Prijava zaprimljena - aiprobaj webinar",
      html,
    });
  } catch (e) {
    console.error("[email] potvrda threw:", e);
  }
}
