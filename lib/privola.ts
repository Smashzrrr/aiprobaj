// Tekstovi privole s formi, po verzijama. BEZ server-only ovisnosti: uvoze ih
// i forme i /api/prijava.
//
// Kad se tekst promijeni: dodaj NOVU verziju (datum izmjene) u PRIVOLE i
// prebaci PRIVOLA_VERZIJA na nju. Staru verziju NE brisi, jer su uz nju dane
// postojece privole (consent_version u bazi).

export const PRIVOLE = {
  // Tekst na formama do 15.10.2026. Bez zasebne marketinske privole.
  "2026-07": {
    privola:
      "Prihvaćam da aiprobaj (Fraviz Studio) obradi moje podatke radi prijave na webinar i slanja detalja.",
    marketing: null,
  },
  "2026-10-15": {
    privola:
      "Pristajem da Fraviz Studio i SEO LICK obrađuju moje podatke radi prijave na aiprobaj webinar i slanja obavijesti o njemu: potvrde, termina, linka, podsjetnika i snimke. Odjava je moguća u svakom mailu.",
    marketing:
      "Neobavezno: želim primati obavijesti o budućim edukacijama i novostima aiprobaja. Odjava je moguća u svakom mailu.",
  },
} as const;

export type PrivolaVerzija = keyof typeof PRIVOLE;

export const PRIVOLA_VERZIJE = Object.keys(PRIVOLE) as [PrivolaVerzija, ...PrivolaVerzija[]];

// Verzija koju forme trenutno prikazuju.
export const PRIVOLA_VERZIJA: PrivolaVerzija = "2026-10-15";

// Stari klijent (stranica otvorena prije deploya) ne salje verziju, a
// prikazivao je tekst iz srpnja.
export const PRIVOLA_BEZ_VERZIJE: PrivolaVerzija = "2026-07";

export const PRIVOLA_TEKST = PRIVOLE[PRIVOLA_VERZIJA].privola;
export const MARKETING_TEKST = PRIVOLE[PRIVOLA_VERZIJA].marketing;
