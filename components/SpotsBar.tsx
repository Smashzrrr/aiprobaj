"use client";

import { useEffect, useState } from "react";
import { WEBINAR } from "@/lib/webinar";

interface Mjesta {
  taken: number;
  total: number;
  left: number;
}

export default function SpotsBar({
  variant = "hero",
}: {
  variant?: "hero" | "urgency";
}) {
  const [m, setM] = useState<Mjesta>({
    taken: 0,
    total: WEBINAR.spotsTotal,
    left: WEBINAR.spotsTotal,
  });

  useEffect(() => {
    let alive = true;
    fetch("/api/mjesta")
      .then((r) => r.json())
      .then((d) => {
        if (alive && d && typeof d.total === "number") setM(d);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const pct = m.total > 0 ? Math.min(100, Math.round((m.taken / m.total) * 100)) : 0;
  const big = variant === "urgency";

  // Lista cekanja: prikazi samo broj prijava od zadnjeg webinara, bez trake.
  // Traka bi na capu od 1000 bila ~2% ispunjena i izgledala kao da nema nikoga.
  if (WEBINAR.waitlistMode) {
    return (
      <div style={big ? { background: "var(--bg2)", border: "1px solid var(--line2)", borderRadius: 16, padding: 22 } : { maxWidth: 360 }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            color: "var(--ink-mut)",
          }}
        >
          Lista čekanja
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 9, marginTop: big ? 10 : 7 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: big ? "clamp(28px,4vw,40px)" : 24,
              lineHeight: 1,
              color: "var(--accent)",
            }}
          >
            {m.taken}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: big ? 13 : 12,
              color: "var(--ink-mut)",
            }}
          >
            na listi za sljedeći termin
          </span>
        </div>
      </div>
    );
  }

  return (
    <div style={big ? { background: "var(--bg2)", border: "1px solid var(--line2)", borderRadius: 16, padding: 22 } : { maxWidth: 360 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: big ? 11 : 8,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            color: "var(--ink-mut)",
          }}
        >
          Rezervirano mjesta
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: big ? 15 : 12,
            color: "var(--ink)",
          }}
        >
          <span style={{ color: "var(--accent)" }}>{m.taken}</span> / {m.total}
        </span>
      </div>
      <div
        style={{
          height: big ? 12 : 8,
          borderRadius: 999,
          background: "rgba(255,255,255,.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: 999,
            background: big
              ? "linear-gradient(90deg,var(--accent),#a6e400)"
              : "var(--accent)",
            width: `${pct}%`,
            transition: "width .5s ease",
          }}
        />
      </div>
      {big && (
        <div
          style={{
            marginTop: 12,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--ink-mut)",
          }}
        >
          {m.left <= 0 ? (
            <span style={{ color: "var(--hot)" }}>Popunjeno</span>
          ) : (
            <>
              <span style={{ color: "var(--hot)" }}>{m.left} mjesta</span> još slobodno
            </>
          )}
        </div>
      )}
    </div>
  );
}
