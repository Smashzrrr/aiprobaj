import Link from "next/link";
import { AI_MOZAK, PROMO_HREF } from "@/lib/webinar";

// Kartica u heroju naslovnice dok je PROMO_AI_MOZAK ukljucen (lib/webinar.ts).
// Zamjenjuje formu liste cekanja: prijava se radi na /ai-mozak.

const GROTESK = "var(--font-grotesk), 'Space Grotesk', system-ui, sans-serif";
const MONO = "var(--font-mono), 'Space Mono', monospace";

const STAVKE = [
  "Isti zadatak dvaput: u praznom chatu i u AI-ju s mozgom",
  "Postavljanje uživo: paket, prvi unos znanja i prvo pitanje",
  "Snimka, paket i upute u Skool zajednici nakon webinara",
];

export default function SljedeciWebinarCard() {
  return (
    <div
      style={{
        background: "var(--bg2)",
        border: "1px solid var(--line2)",
        borderRadius: 18,
        padding: 26,
        boxShadow: "0 30px 80px -40px rgba(0,0,0,.9)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: MONO,
          fontSize: 10.5,
          letterSpacing: ".12em",
          textTransform: "uppercase",
          color: "var(--ink-dim)",
        }}
      >
        <span>Sljedeći webinar</span>
        <span style={{ color: "var(--accent)", letterSpacing: ".04em", textTransform: "none", fontSize: 11.5 }}>
          ● {AI_MOZAK.datum} u {AI_MOZAK.sat}
        </span>
      </div>
      <h3
        style={{
          margin: "18px 0 0",
          fontFamily: GROTESK,
          fontWeight: 700,
          fontSize: 34,
          lineHeight: 1.02,
          letterSpacing: "-0.03em",
          color: "var(--ink)",
        }}
      >
        Postavi <span style={{ color: "var(--accent)" }}>AI mozak</span>
      </h3>
      <p style={{ margin: "12px 0 0", fontSize: 15, lineHeight: 1.55, color: "var(--ink-mut)" }}>
        {AI_MOZAK.dan} {AI_MOZAK.datum} u {AI_MOZAK.sat} · Google Meet · oko {AI_MOZAK.durationMin} minuta · besplatno
      </p>
      <ul style={{ listStyle: "none", margin: "18px 0 0", padding: 0, display: "grid", gap: 9 }}>
        {STAVKE.map((s) => (
          <li key={s} style={{ display: "flex", gap: 10, fontSize: 14.5, lineHeight: 1.45, color: "var(--ink)" }}>
            <span style={{ color: "var(--accent)", flexShrink: 0 }}>✓</span>
            {s}
          </li>
        ))}
      </ul>
      <div
        style={{
          margin: "18px 0 0",
          border: "1px dashed var(--line2)",
          borderRadius: 10,
          padding: "11px 13px",
          fontFamily: MONO,
          fontSize: 11.5,
          lineHeight: 1.5,
          color: "var(--ink-mut)",
        }}
      >
        <b style={{ color: "var(--ink)" }}>Samo za polaznike:</b> besplatna 30-minutna AI konzultacija.
      </div>
      <Link
        href={PROMO_HREF}
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
          background: "var(--accent)",
          color: "var(--accent-ink)",
          fontFamily: GROTESK,
          fontWeight: 700,
          fontSize: 16,
          padding: "15px 20px",
          borderRadius: 11,
          textDecoration: "none",
        }}
      >
        Rezerviraj mjesto →
      </Link>
      <p style={{ margin: "12px 0 0", textAlign: "center", fontFamily: MONO, fontSize: 11, color: "var(--ink-dim)" }}>
        Besplatno. Snimka za sve prijavljene.
      </p>
    </div>
  );
}
