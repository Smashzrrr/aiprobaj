import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { AI_MOZAK } from "@/lib/webinar";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Brojac za /ai-mozak. Vraca samo broj, nikad podatke o prijavama.
// Broji: izvor = "ai-mozak" (sve, bez datuma) + izvor = "waitlist" od
// AI_MOZAK.waitlistFromISO. Email je jedinstven u tablici, nema duplikata.
export async function GET() {
  let taken: number | null = null;
  try {
    const supabase = supabaseAdmin();
    const { count, error } = await supabase
      .from("prijave")
      .select("*", { count: "exact", head: true })
      .or(
        `izvor.eq.${AI_MOZAK.slug},and(izvor.eq.waitlist,created_at.gte."${AI_MOZAK.waitlistFromISO}")`,
      );
    if (!error && typeof count === "number") {
      taken = count;
    } else if (error) {
      console.error("[mjesta-ai-mozak] count error:", error);
    }
  } catch (e) {
    console.error("[mjesta-ai-mozak] threw:", e);
  }
  const total = AI_MOZAK.spotsTotal;
  if (taken === null) {
    // Greska baze ne smije izgledati kao "0 prijavljenih".
    return NextResponse.json({ error: "unavailable" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
  const display = Math.min(total, taken);
  return NextResponse.json(
    { taken: display, total, left: Math.max(0, total - display) },
    { headers: { "Cache-Control": "public, max-age=30, s-maxage=30" } },
  );
}
