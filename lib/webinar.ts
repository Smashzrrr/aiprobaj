// Centralna konfiguracija webinara. Mijenja se ovdje, ne po komponentama.

export const WEBINAR = {
  // Fiksni termin (potvrdio Bobi). Vremenska zona CEST = +02:00.
  dateISO: "2026-07-22T19:00:00+02:00",
  durationMin: 90,
  spotsTotal: 1000,
  // Brojac broji SAMO prijave od ovog trenutka nadalje. Reset nakon prvog
  // webinara (22.07.2026): sve prije toga je prva grupa i vise se ne broji.
  countFromISO: "2026-07-22T17:00:00+02:00",
  // Prvi termin popunjen: forma i CTA-ovi se prebacuju na listu čekanja za
  // sljedeći termin. Kad se dogovori novi termin (Bobi + Ivan Radica): postavi
  // na false, azuriraj dateISO, i po potrebi resetiraj/arhiviraj prijave.
  waitlistMode: true,
  // Koliko dodati na STVARNI broj prijava pri prikazu brojaca.
  // 0 = cisto stvarno. Za pocetni momentum promijeni npr. na 8.
  spotsBaseline: 0,
  organizatori: ["Fraviz Studio", "SEO LICK"],
} as const;

export function webinarDate(): Date {
  return new Date(WEBINAR.dateISO);
}

export function isPast(now: number = Date.now()): boolean {
  return webinarDate().getTime() - now <= 0;
}

// Webinar "Postavi AI mozak" (landing /ai-mozak). Termin je okviran dok ga
// Ivan Radica i Bobi ne potvrde: promijeni ovdje, mijenja se i stranica i potvrda.
export const AI_MOZAK = {
  slug: "ai-mozak",
  naziv: "Postavi AI mozak",
  // CET (+01:00): zimsko vrijeme krece 25.10.2026.
  dateISO: "2026-10-28T18:00:00+01:00",
  dan: "Srijeda",
  datum: "28.10.",
  sat: "18:00",
  durationMin: 60,
  // Besplatna konzultacija: termin se rezervira do ovog roka (24 h nakon webinara).
  konzultacijaDo: "četvrtka 29.10. u 19:00",
  // Brojac na /ai-mozak: skala 1-500. Broji prijave s izvorom "ai-mozak" plus
  // listu cekanja (izvor "waitlist") od 22.07. 17:00, prije toga su pozvani na prvi webinar (22 na 15.10.). Email je u bazi
  // jedinstven, pa ponovna prijava s /ai-mozak samo prebaci izvor i ne duplira.
  spotsTotal: 500,
  waitlistFromISO: "2026-07-22T17:00:00+02:00",
} as const;

// Naslovnica promovira AI mozak webinar: kartica u heroju, CTA-ovi vode na
// /ai-mozak, odbrojavanje do AI_MOZAK termina, brojac liste cekanja skriven.
// Nakon webinara (28.10.) postavi na false i naslovnica se vraca na WEBINAR.
export const PROMO_AI_MOZAK = true;
export const PROMO_HREF = "/ai-mozak";

// Termin na koji odbrojava Countdown.
export function countdownDate(): Date {
  return new Date(PROMO_AI_MOZAK ? AI_MOZAK.dateISO : WEBINAR.dateISO);
}
