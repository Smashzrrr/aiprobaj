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
    // Broji samo prave prijave prvog termina, ne waitlist unose.
    const { count, error } = await supabase
      .from("prijave")
      .select("*", { count: "exact", head: true })
      .neq("izvor", "waitlist");
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
