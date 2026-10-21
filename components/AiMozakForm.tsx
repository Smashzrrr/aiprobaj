"use client";

import { useState } from "react";
import Link from "next/link";
import { RAZINE, RAZINA_LABEL, type Razina } from "@/lib/leadTypes";
import { AI_MOZAK } from "@/lib/webinar";

// Prijava za webinar "Postavi AI mozak". Salje na isti /api/prijava kao glavni
// landing, s oznakom webinar: "ai-mozak" (izvor u bazi + posebna potvrda).

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

export default function AiMozakForm() {
  const [ime, setIme] = useState("");
  const [email, setEmail] = useState("");
  const [razina, setRazina] = useState<Razina | "">("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!ime.trim()) return setError("Upiši ime i prezime.");
    if (!EMAIL_RE.test(email.trim())) return setError("Upiši ispravan email.");
    if (!consent) return setError("Potreban je pristanak na obradu podataka.");
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/prijava", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ime: ime.trim(),
          email: email.trim(),
          razina,
          consent,
          website,
          webinar: AI_MOZAK.slug,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || "Nešto je pošlo po zlu. Pokušaj ponovno za koji trenutak.");
        setLoading(false);
        return;
      }
      const w = window as unknown as { gtag?: (...a: unknown[]) => void };
      w.gtag?.("event", "sign_up", { method: "aiprobaj_ai_mozak" });
      setDone(true);
    } catch {
      setError("Nema veze sa serverom. Provjeri internet i pokušaj ponovno.");
    }
    setLoading(false);
  }

  if (done) {
    return (
      <div className="card" id="prijava">
        <div className="thanks" aria-live="polite" style={{ display: "block" }}>
          <span className="kicker">{"// Prijava primljena"}</span>
          <h3>Mjesto je tvoje.</h3>
          <p>
            Potvrda i link za webinar stižu ti na mail. Vidimo se:{" "}
            {AI_MOZAK.dan.toLowerCase()} {AI_MOZAK.datum} u {AI_MOZAK.sat}.
          </p>
          <p>
            Dok čekaš: pridruži se <a href="/skool">Skool zajednici</a>. Tamo su upute i paket nakon webinara.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card" id="prijava">
      <form onSubmit={onSubmit} noValidate>
        <div className="card-top">
          <span>Prijava</span>
          <span className="live">
            ● {AI_MOZAK.datum} u {AI_MOZAK.sat}
          </span>
        </div>
        <div className="bonus">
          <span className="dot" />
          <span>
            <b>Samo za polaznike:</b> besplatna 30-minutna AI konzultacija
          </span>
        </div>
        <h3>Rezerviraj mjesto</h3>
        <label className="l" htmlFor="am-ime">Ime i prezime</label>
        <input className="field" id="am-ime" value={ime} onChange={(e) => setIme(e.target.value)} placeholder="Ana Horvat" autoComplete="name" />
        <label className="l" htmlFor="am-email">Email</label>
        <input className="field" id="am-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ana@email.com" autoComplete="email" />
        <span className="l">Koliko već koristiš AI?</span>
        <div className="chips" role="group" aria-label="Razina AI iskustva">
          {RAZINE.map((r) => (
            <button key={r} type="button" className="pick" aria-pressed={razina === r} onClick={() => setRazina(razina === r ? "" : r)}>
              {RAZINA_LABEL[r]}
            </button>
          ))}
        </div>
        {/* honeypot: ljudi ga ne vide, botovi ga popune */}
        <input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} name="website" />
        <label className="consent">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          <span>
            Prihvaćam da aiprobaj (Fraviz Studio) obradi moje podatke radi prijave na webinar i slanja detalja. Vidi{" "}
            <Link href="/privatnost">Politiku privatnosti</Link>.
          </span>
        </label>
        {error && (
          <p role="alert" style={{ color: "var(--hot)", fontFamily: "var(--font-m)", fontSize: 12, margin: "0 0 12px" }}>
            {error}
          </p>
        )}
        <button className="btn big" type="submit" disabled={loading}>
          {loading ? "Šaljem…" : "Rezerviraj mjesto →"}
        </button>
        <p className="fine">Bez spama. Odjava jednim klikom. Šaljemo samo detalje webinara.</p>
      </form>
    </div>
  );
}
