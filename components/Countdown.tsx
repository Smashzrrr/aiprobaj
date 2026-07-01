"use client";

import { useEffect, useState } from "react";
import { webinarDate } from "@/lib/webinar";

function calc(target: number, now: number) {
  let diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  diff -= d * 86400000;
  const h = Math.floor(diff / 3600000);
  diff -= h * 3600000;
  const m = Math.floor(diff / 60000);
  diff -= m * 60000;
  const s = Math.floor(diff / 1000);
  return { d, h, m, s, past: target - now <= 0 };
}

const pad = (n: number) => String(n).padStart(2, "0");

const LABELS = ["DANA", "SATI", "MIN", "SEK"] as const;

export default function Countdown({
  variant = "hero",
}: {
  variant?: "hero" | "urgency";
}) {
  const target = webinarDate().getTime();
  // Initial (SSR i prvi render): sve nule, deterministicki, bez hydration mismatcha.
  const [t, setT] = useState(() => calc(target, target));

  useEffect(() => {
    const tick = () => setT(calc(target, Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const big = variant === "urgency";
  const numSize = big ? "clamp(28px,4vw,40px)" : "24px";
  const boxMin = big ? 76 : 58;

  if (t.past) {
    return (
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          color: "var(--ink-mut)",
        }}
      >
        Webinar je održan. Prijavi se za snimku i sljedeći termin.
      </div>
    );
  }

  const cells: Array<[number, string]> = [
    [t.d, LABELS[0]],
    [t.h, LABELS[1]],
    [t.m, LABELS[2]],
    [t.s, LABELS[3]],
  ];

  return (
    <div
      style={{ display: "flex", gap: big ? 12 : 9 }}
      aria-hidden="true"
    >
      {cells.map(([val, label], i) => (
        <div
          key={label}
          style={{
            minWidth: boxMin,
            padding: big ? "16px 10px" : "10px 6px",
            background: big ? "var(--bg2)" : "var(--bg)",
            border: "1px solid var(--line2)",
            borderRadius: big ? 14 : 11,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              fontSize: numSize,
              lineHeight: 1,
              color: i === 3 ? "var(--accent)" : "var(--ink)",
            }}
          >
            {pad(val)}
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: ".12em",
              color: "var(--ink-mut)",
              marginTop: big ? 7 : 5,
            }}
          >
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
