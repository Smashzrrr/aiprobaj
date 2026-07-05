// Centralna konfiguracija webinara. Mijenja se ovdje, ne po komponentama.

export const WEBINAR = {
  // Fiksni termin (potvrdio Bobi). Vremenska zona CEST = +02:00.
  dateISO: "2026-07-22T19:00:00+02:00",
  durationMin: 90,
  spotsTotal: 50,
  // Prvi termin popunjen: forma i CTA-ovi se prebacuju na listu čekanja za
  // sljedeći termin. Kad se dogovori novi termin (Bobi + Ivan Radica): postavi
  // na false, azuriraj dateISO, i po potrebi resetiraj/arhiviraj prijave.
  waitlistMode: true,
  // Koliko dodati na STVARNI broj prijava pri prikazu brojaca.
  // 0 = cisto stvarno. Za pocetni momentum promijeni npr. na 8.
  spotsBaseline: 0,
  organizatori: ["Fraviz Studio", "SEO Lick"],
} as const;

export function webinarDate(): Date {
  return new Date(WEBINAR.dateISO);
}

export function isPast(now: number = Date.now()): boolean {
  return webinarDate().getTime() - now <= 0;
}
