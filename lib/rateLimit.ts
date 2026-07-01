import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let limiter: Ratelimit | null = null;
let tried = false;

function getLimiter(): Ratelimit | null {
  if (tried) return limiter;
  tried = true;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null; // bez Upstash env -> rate limit iskljucen
  const redis = new Redis({ url, token });
  limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "60 s"),
    prefix: "aiprobaj:prijava",
    analytics: false,
  });
  return limiter;
}

// Vraca true ako je zahtjev dozvoljen.
// Bez Upstash env vraca true (stite honeypot + unique email).
// Fail-open: greska u rate limitu ne smije oboriti prijave.
export async function allowRequest(ip: string): Promise<boolean> {
  const l = getLimiter();
  if (!l) return true;
  try {
    const { success } = await l.limit(ip);
    return success;
  } catch (e) {
    console.error("[ratelimit] greska, propustam zahtjev:", e);
    return true;
  }
}
