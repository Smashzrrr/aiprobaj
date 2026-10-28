// Vanjski linkovi za CTA-ove webinara "Postavi AI mozak".
// Mijenjaju se samo ovdje.

export const SKOOL_URL = "https://www.skool.com/ai-probaj-1893";

// Google Calendar "appointment schedule" (rezervacija termina).
// Upisi embed URL iz Google Kalendara: Rezervacija termina -> Dijeli -> Ugradi
// (oblik: https://calendar.google.com/calendar/appointments/schedules/...?gv=true).
// Dok je prazno, /konzultacija pokazuje da se termini otvaraju na dan webinara.
export const KONZULTACIJA_CAL_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1tyXw741Mtk5oI4WNacxIkjXD6As8BhVS22m6TJ39_1bOBSWHFdF9oaaZqnBXrOejT5fx1c3hq?gv=true";

// Zajednicka navigacija: naslovnica (desktop i mobilni izbornik) i footer.
// Interni linkovi bez UTM-a (UTM na internom linku prekida sesiju u analitici).
// /skool i /konzultacija su skriveni do webinara 28.10.: bez linkova s weba [Ivan, 21.10.].
export const SITE_NAV = [
  { href: "/ai-mozak", label: "Webinar" },
  { href: "/#faq", label: "FAQ" },
] as const;
