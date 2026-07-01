import "server-only";
import { createClient } from "@supabase/supabase-js";

// Admin klijent: koristi service_role i zaobilazi RLS deny-all.
// SAMO server-side (server-only import sprjecava klijentski import).
export function supabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      "Supabase env nije postavljen (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).",
    );
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
