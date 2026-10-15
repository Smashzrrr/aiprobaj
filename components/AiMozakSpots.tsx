"use client";

import { useEffect, useState } from "react";
import { AI_MOZAK } from "@/lib/webinar";

interface Mjesta {
  taken: number;
  total: number;
  left: number;
}

// Brojac za /ai-mozak, isti izgled kao "urgency" brojac na glavnoj stranici:
// "Rezervirano mjesta X / 500" + traka. Stil u ai-mozak.css (.am .spots*).
export default function AiMozakSpots() {
  const [m, setM] = useState<Mjesta>({
    taken: 0,
    total: AI_MOZAK.spotsTotal,
    left: AI_MOZAK.spotsTotal,
  });

  useEffect(() => {
    let alive = true;
    fetch("/api/mjesta-ai-mozak")
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
