import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

// Keep-alive protiv Supabase free-tier pauze. Vercel cron ga zove dnevno
// i automatski salje Authorization: Bearer ${CRON_SECRET}.
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization");
  // Fail-closed: bez postavljenog CRON_SECRET ruta odbija svaki zahtjev.
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const supabase = supabaseAdmin();
    const { count, error } = await supabase
      .from("prijave")
      .select("*", { count: "exact", head: true });
    if (error) throw error;
    return NextResponse.json({ ok: true, count });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
