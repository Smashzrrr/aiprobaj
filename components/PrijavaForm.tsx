"use client";

import { useEffect, useState } from "react";
import {
  RAZINE,
  RAZINA_LABEL,
  ULOGE,
  ULOGA_LABEL,
  CILJEVI,
  type Razina,
  type Uloga,
} from "@/lib/leadTypes";
import { WEBINAR } from "@/lib/webinar";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
const WL = WEBINAR.waitlistMode;

const inputBase: React.CSSProperties = {
  width: "100%",
  padding: "13px 14px",
  background: "#0b0b0f",
  borderRadius: 10,
  color: "var(--ink)",
  fontFamily: "var(--font-grotesk), system-ui, sans-serif",
  fontSize: 15,
  outline: "none",
};

const labelMono: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 10.5,
  letterSpacing: ".1em",
  textTransform: "uppercase",
  color: "var(--ink-mut)",
};

export default function PrijavaForm() {
  const [ime, setIme] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [razina, setRazina] = useState("");
  const [uloga, setUloga] = useState("");
  const [ciljevi, setCiljevi] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("aiprobaj_signup");
      if (raw) {
        const s = JSON.parse(raw);
        if (s && s.name) {
          setSubmitted(true);
          setSubmittedName(s.name);
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  const step1Valid = ime.trim().length > 0 && EMAIL_RE.test(email.trim());

  function clearErr(k: string) {
    setErrors((e) => ({ ...e, [k]: false }));
  }

  function toggleCilj(c: string) {
    setCiljevi((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );
  }

  function validate(): Record<string, boolean> {
    const e: Record<string, boolean> = {};
    if (!ime.trim()) e.ime = true;
    if (!EMAIL_RE.test(email.trim())) e.email = true;
    if (step1Valid) {
      if (!razina) e.razina = true;
      if (!uloga) e.uloga = true;
    }
    if (!consent) e.consent = true;
    return e;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setLoading(true);
    setServerError("");
    try {
      const res = await fetch("/api/prijava", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ime: ime.trim(),
          email: email.trim(),
          telefon: telefon.trim(),
          razina,
          uloga,
          ciljevi,
          consent,
          website,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setServerError(
          data?.error || "Nešto je pošlo po zlu. Pokušaj ponovno za koji trenutak.",
        );
        setLoading(false);
        return;
      }
      const name = ime.trim();
      // Spremamo samo ime za prikaz, bez emaila (privacy).
      try {
        localStorage.setItem(
          "aiprobaj_signup",
          JSON.stringify({ name, ts: Date.now() }),
        );
      } catch {
        /* ignore */
      }
      if (typeof window !== "undefined") {
        const w = window as unknown as { gtag?: (...a: unknown[]) => void };
        w.gtag?.("event", "sign_up", { method: "aiprobaj_webinar" });
      }
      setSubmittedName(name);
      setSubmitted(true);
      setLoading(false);
    } catch {
      setServerError("Nema veze sa serverom. Provjeri internet i pokušaj ponovno.");
      setLoading(false);
    }
  }

  function reset() {
    try {
      localStorage.removeItem("aiprobaj_signup");
    } catch {
      /* ignore */
    }
    setSubmitted(false);
    setSubmittedName("");
    setIme("");
    setEmail("");
    setTelefon("");
    setRazina("");
    setUloga("");
    setCiljevi([]);
    setConsent(false);
    setErrors({});
    setServerError("");
  }

  const cardStyle: React.CSSProperties = {
    background: "var(--bg2)",
    border: "1px solid var(--line2)",
    borderRadius: 18,
    padding: 26,
    boxShadow: "0 30px 80px -40px rgba(0,0,0,.9)",
  };

  if (submitted) {
    return (
      <div style={cardStyle}>
        <div style={{ textAlign: "center", padding: "12px 4px 6px" }}>
          <div
            style={{
              width: 58,
              height: 58,
              margin: "0 auto",
              borderRadius: "50%",
              background: "rgba(198,255,58,.14)",
              border: "1px solid var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              color: "var(--accent)",
            }}
          >
            ✓
          </div>
          <h3
            style={{
              margin: "18px 0 0",
              fontFamily: "var(--font-grotesk)",
              fontWeight: 700,
              fontSize: 23,
              letterSpacing: "-.02em",
              color: "var(--ink)",
            }}
          >
            {WL ? `Na listi si, ${submittedName}!` : `Vidimo se, ${submittedName}!`}
          </h3>
          <p
            style={{
              margin: "10px auto 0",
              maxWidth: 320,
              fontSize: 15,
              lineHeight: 1.55,
              color: "var(--ink-mut)",
            }}
          >
            {WL
              ? "Javljamo ti datum sljedećeg termina čim ga potvrdimo. Popis AI alata i resursa stiže na email."
              : "Tvoje mjesto je rezervirano. Zoom link i sve detalje šaljemo na email prije webinara."}
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 18,
              background: "transparent",
              border: "none",
              color: "var(--ink-dim)",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Nisi ti? Prijavi drugu osobu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...cardStyle, scrollMarginTop: 88 }}>
      <style>{`
        .apf-field:focus{border-color:var(--accent) !important;box-shadow:0 0 0 3px rgba(198,255,58,.14);}
        .apf-chip{padding:9px 13px;border-radius:999px;font-family:var(--font-mono);font-size:11.5px;letter-spacing:.02em;cursor:pointer;user-select:none;transition:all .15s;border:1px solid var(--line2);background:transparent;color:var(--ink-mut);}
        .apf-chip[data-on="true"]{border-color:var(--accent);background:rgba(198,255,58,.14);color:var(--ink);}
      `}</style>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-mut)" }}>
          {WL ? "Lista čekanja" : "Besplatna prijava"}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--ink-dim)" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--hot)" }} />
          {WL ? "Prvi termin popunjen" : "Ograničena mjesta"}
        </span>
      </div>

      <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10, padding: "11px 13px", border: "1px dashed var(--line2)", borderRadius: 11, background: "rgba(198,255,58,.04)" }}>
        <span style={{ flex: "none", width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }} />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, lineHeight: 1.4, color: "var(--ink-mut)" }}>
          <span style={{ color: "var(--ink)" }}>Bonus za prijavljene:</span> popis AI alata + resursa na email.
        </span>
      </div>

      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 14 }}>
        <h3 style={{ margin: 0, fontFamily: "var(--font-grotesk)", fontWeight: 700, fontSize: 22, letterSpacing: "-.02em", color: "var(--ink)" }}>
          {WL ? "Lista čekanja za sljedeći termin" : "Rezerviraj svoje mjesto"}
        </h3>

        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={labelMono}>Ime i prezime</span>
          <input
            className="apf-field"
            type="text"
            value={ime}
            onChange={(e) => { setIme(e.target.value); clearErr("ime"); }}
            placeholder="Ivan Horvat"
            autoComplete="name"
            style={{ ...inputBase, border: `1px solid ${errors.ime ? "var(--hot)" : "var(--line2)"}` }}
          />
          {errors.ime && <span style={{ fontSize: 11, color: "var(--hot)" }}>Upiši ime i prezime</span>}
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={labelMono}>Email</span>
          <input
            className="apf-field"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); clearErr("email"); }}
            placeholder="ivan@email.com"
            autoComplete="email"
            style={{ ...inputBase, border: `1px solid ${errors.email ? "var(--hot)" : "var(--line2)"}` }}
          />
          {errors.email && <span style={{ fontSize: 11, color: "var(--hot)" }}>Upiši ispravan email</span>}
        </label>

        {step1Valid && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14, animation: "aip-reveal .38s ease both" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ ...labelMono, color: "var(--ink-dim)" }}>Još par kratkih pitanja</span>
              <span style={{ flex: 1, height: 1, background: "var(--line)" }} />
            </div>

            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={labelMono}>Telefon <span style={{ textTransform: "none", letterSpacing: 0, color: "var(--ink-dim)" }}>(neobavezno)</span></span>
              <input
                className="apf-field"
                type="tel"
                value={telefon}
                onChange={(e) => setTelefon(e.target.value)}
                placeholder="+385 91 234 5678"
                autoComplete="tel"
                style={{ ...inputBase, border: "1px solid var(--line2)" }}
              />
            </label>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <label style={{ flex: "1 1 148px", display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={labelMono}>Razina AI iskustva</span>
                <select
                  className="apf-field"
                  value={razina}
                  onChange={(e) => { setRazina(e.target.value); clearErr("razina"); }}
                  style={{ ...inputBase, border: `1px solid ${errors.razina ? "var(--hot)" : "var(--line2)"}` }}
                >
                  <option value="">Odaberi…</option>
                  {RAZINE.map((r) => (
                    <option key={r} value={r}>{RAZINA_LABEL[r as Razina]}</option>
                  ))}
                </select>
                {errors.razina && <span style={{ fontSize: 11, color: "var(--hot)" }}>Odaberi razinu</span>}
              </label>

              <label style={{ flex: "1 1 148px", display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={labelMono}>Čime se baviš</span>
                <select
                  className="apf-field"
                  value={uloga}
                  onChange={(e) => { setUloga(e.target.value); clearErr("uloga"); }}
                  style={{ ...inputBase, border: `1px solid ${errors.uloga ? "var(--hot)" : "var(--line2)"}` }}
                >
                  <option value="">Odaberi…</option>
                  {ULOGE.map((u) => (
                    <option key={u} value={u}>{ULOGA_LABEL[u as Uloga]}</option>
                  ))}
                </select>
                {errors.uloga && <span style={{ fontSize: 11, color: "var(--hot)" }}>Odaberi opciju</span>}
              </label>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              <span style={labelMono}>Što te najviše zanima? <span style={{ textTransform: "none", letterSpacing: 0, color: "var(--ink-dim)" }}>(neobavezno)</span></span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {CILJEVI.map((c) => (
                  <span key={c} className="apf-chip" data-on={ciljevi.includes(c)} onClick={() => toggleCilj(c)}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Honeypot: skriveno polje, botovi ga popune, ljudi ne. */}
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        />

        <label style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => { setConsent(e.target.checked); clearErr("consent"); }}
            style={{ marginTop: 3, accentColor: "var(--accent)", width: 16, height: 16, flex: "none" }}
          />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, lineHeight: 1.5, color: errors.consent ? "var(--hot)" : "var(--ink-mut)" }}>
            Prihvaćam da aiprobaj (Fraviz Studio) obradi moje podatke radi prijave na webinar i slanja detalja. Vidi{" "}
            <a href="/privatnost" target="_blank" style={{ color: "var(--accent)" }}>Politiku privatnosti</a>.
          </span>
        </label>

        {serverError && (
          <div style={{ fontSize: 12.5, color: "var(--hot)", fontFamily: "var(--font-mono)", lineHeight: 1.5 }}>
            {serverError}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 4,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 9,
            width: "100%",
            background: "var(--accent)",
            color: "var(--accent-ink)",
            fontFamily: "var(--font-grotesk)",
            fontWeight: 700,
            fontSize: 16,
            padding: "15px 20px",
            border: "none",
            borderRadius: 11,
            cursor: loading ? "wait" : "pointer",
            letterSpacing: "-.01em",
            opacity: loading ? 0.75 : 1,
            boxShadow: "0 10px 30px -14px rgba(198,255,58,.6)",
          }}
        >
          {loading ? "Šaljem…" : WL ? "Prijavi se na listu čekanja →" : "Rezerviraj besplatno mjesto →"}
        </button>
        <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 11, lineHeight: 1.5, color: "var(--ink-dim)", textAlign: "center" }}>
          Bez spama. Odjava jednim klikom. Šaljemo samo detalje webinara.
        </p>
      </form>
    </div>
  );
}
