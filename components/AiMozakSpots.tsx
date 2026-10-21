"use client";

import { useEffect, useState } from "react";

interface Mjesta {
  taken: number;
  total: number;
  left: number;
}

// Brojac za /ai-mozak, isti izgled kao "urgency" brojac na glavnoj stranici:
// "Rezervirano mjesta X / 150" + traka. Stil u ai-mozak.css (.am .spots*).
export default function AiMozakSpots() {
  const [m, setM] = useState<Mjesta | null>(null);

  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch("/api/mjesta-ai-mozak", { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (
            alive && d &&
            typeof d.taken === "number" && typeof d.total === "number" && typeof d.left === "number"
          ) setM(d);
        })
        .catch(() => {});
    load();
    // Osvjezi svakih 60 s, da nova prijava bude vidljiva bez reloada.
    const t = setInterval(load, 60_000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);

  // Dok broj nije ucitan (ili baza ne odgovara) ne prikazujemo nista,
  // da se ne vidi lazno "0 / 150".
  if (!m) return null;

  const pct = m.total > 0 ? Math.min(100, Math.round((m.taken / m.total) * 100)) : 0;

  return (
    <div className="spots">
      <div className="spots-row">
        <span className="spots-l">Rezervirano mjesta</span>
        <span className="spots-c">
          <span className="spots-n">{m.taken}</span> / {m.total}
        </span>
      </div>
      <div className="spots-track">
        <div className="spots-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="spots-t">
        {m.left <= 0 ? (
          <span className="spots-hot">Popunjeno</span>
        ) : (
          <>
            <span className="spots-hot">{m.left} mjesta</span> još slobodno
          </>
        )}
      </div>
    </div>
  );
}
