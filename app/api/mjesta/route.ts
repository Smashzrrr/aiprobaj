import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { WEBINAR } from "@/lib/webinar";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Vraca stvaran broj prijava za progress bar. Ne izlaze podatke, samo broj.
export async function GET() {
  let taken = 0;
  try {
    const supabase = supabaseAdmin();
    // Broji sve prijave od countFromISO nadalje, bez obzira na izvor.
    // Prva grupa (sve prije 22.07.2026 17:00) se ne broji, a nove prijave su
    // trenutno sve izvor="waitlist" pa filter po izvoru ovdje ne smije stajati.
    const { count, error } = await supabase
      .from("prijave")
      .select("*", { count: "exact", head: true })
      .gte("created_at", WEBINAR.countFromISO);
    if (!error && typeof count === "number") {
      taken = count;
    } else if (error) {
      console.error("[mjesta] count error:", error);
    }
  } catch (e) {
    console.error("[mjesta] threw:", e);
  }
  const total = WEBINAR.spotsTotal;
  const display = Math.min(total, taken + WEBINAR.spotsBaseline);
  return NextResponse.json(
    { taken: display, total, left: Math.max(0, total - display) },
    { headers: { "Cache-Control": "public, max-age=30, s-maxage=30" } },
  );
}
