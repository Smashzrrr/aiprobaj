// Vanjski linkovi za CTA-ove webinara "Postavi AI mozak".
// Mijenjaju se samo ovdje.

export const SKOOL_URL = "https://www.skool.com/ai-probaj-1893";

// Google Calendar "appointment schedule" (rezervacija termina).
// Upisi embed URL iz Google Kalendara: Rezervacija termina -> Dijeli -> Ugradi
// (oblik: https://calendar.google.com/calendar/appointments/schedules/...?gv=true).
// Dok je prazno, /konzultacija pokazuje da se termini otvaraju na dan webinara.
export const KONZULTACIJA_CAL_URL = "";

// Zajednicka navigacija: naslovnica (desktop i mobilni izbornik) i footer.
// Interni linkovi bez UTM-a (UTM na internom linku prekida sesiju u analitici).
export const SITE_NAV = [
  { href: "/ai-mozak", label: "Webinar" },
  { href: "/skool", label: "Skool zajednica" },
  { href: "/konzultacija", label: "Konzultacija" },
  { href: "/#faq", label: "FAQ" },
] as const;
