import "server-only";

// Prijave s weba idu i u Klaviyo (podsjetnici, follow-up, kampanje).
// Tier 4 uz Supabase i Resend: fail-open, prijava nikad ne pada zbog Klaviya.
// Bez KLAVIYO_PRIVATE_API_KEY ili KLAVIYO_LIST_ID tiho se preskace.
//
// Profil se samo dodaje na listu, bez marketinske privole (subscribe API):
// privola s forme pokriva prijavu na webinar i slanje detalja, ne newsletter.

const API = "https://a.klaviyo.com/api";
const REVISION = "2024-10-15";
const TIMEOUT_MS = 4000;

export interface KlaviyoPrijava {
  ime: string;
  email: string;
  telefon?: string;
  razina?: string;
  uloga?: string;
  izvor: string;
}

function headers(key: string): HeadersInit {
  return {
    Authorization: `Klaviyo-API-Key ${key}`,
    revision: REVISION,
    accept: "application/vnd.api+json",
    "content-type": "application/vnd.api+json",
  };
}

export async function addPrijavaToKlaviyo(p: KlaviyoPrijava): Promise<boolean> {
  const key = process.env.KLAVIYO_PRIVATE_API_KEY;
  const listId = process.env.KLAVIYO_LIST_ID;
  if (!key || !listId) return false;

  const [first, ...rest] = p.ime.trim().split(/\s+/);
  try {
    // 1. Kreiraj ili azuriraj profil (po emailu) i vrati njegov id.
    const res = await fetch(`${API}/profile-import/`, {
      method: "POST",
      headers: headers(key),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      body: JSON.stringify({
        data: {
          type: "profile",
          attributes: {
            email: p.email,
            first_name: first,
            last_name: rest.join(" ") || undefined,
            properties: {
              aiprobaj_izvor: p.izvor,
              aiprobaj_razina: p.razina ?? null,
              aiprobaj_uloga: p.uloga ?? null,
              aiprobaj_prijava_ts: new Date().toISOString(),
            },
          },
        },
      }),
    });
    if (!res.ok) {
      console.error("[klaviyo] profile-import", res.status, await res.text());
      return false;
    }
    const profileId = ((await res.json()) as { data?: { id?: string } }).data?.id;
    if (!profileId) return false;

    // 2. Dodaj profil na listu prijava.
    const rel = await fetch(`${API}/lists/${listId}/relationships/profiles/`, {
      method: "POST",
      headers: headers(key),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      body: JSON.stringify({ data: [{ type: "profile", id: profileId }] }),
    });
    if (!rel.ok) {
      console.error("[klaviyo] list add", rel.status, await rel.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error("[klaviyo] threw:", e);
    return false;
  }
}
