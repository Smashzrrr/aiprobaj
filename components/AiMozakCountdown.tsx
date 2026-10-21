"use client";

import { useEffect, useState } from "react";
import { AI_MOZAK } from "@/lib/webinar";

// Odbrojavanje do AI_MOZAK.dateISO: 28.10.2026. 18:00 Europe/Zagreb (CET, UTC+1).
// Offset je u samom ISO stringu, ne ovisi o zoni servera.

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

export default function AiMozakCountdown() {
  const target = new Date(AI_MOZAK.dateISO).getTime();
  // SSR i prvi render: nule, bez hydration mismatcha. past je false da se
  // ne bljesne poruka da je webinar prosao prije nego klijent izracuna.
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0, past: false });

  useEffect(() => {
    const tick = () => setT(calc(target, Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  if (t.past) {
    return (
      <p className="cd-past">
        Webinar je održan. Prijavi se za snimku i sljedeći termin.
      </p>
    );
  }

  const cells: Array<[string, string]> = [
    [String(t.d), "dana"],
    [pad(t.h), "sati"],
    [pad(t.m), "min"],
    [pad(t.s), "sek"],
  ];

  return (
    <div className="cd" role="timer" aria-label="Do početka webinara">
      {cells.map(([val, label]) => (
        <div key={label}>
          <b>{val}</b>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
