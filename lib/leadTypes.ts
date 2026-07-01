// Dijeljeni tipovi i enumovi za prijavu.
// BEZ server-only ovisnosti da ih klijentske komponente smiju uvoziti
// (lekcija: server-only modul + client import rusi Next build).

export const RAZINE = ["pocetnik", "srednja", "napredni"] as const;
export type Razina = (typeof RAZINE)[number];

export const RAZINA_LABEL: Record<Razina, string> = {
  pocetnik: "Početnik",
  srednja: "Srednja razina",
  napredni: "Napredni",
};

export const ULOGE = [
  "poduzetnik",
  "marketing",
  "prodaja",
  "it",
  "menadzment",
  "student",
  "ostalo",
] as const;
export type Uloga = (typeof ULOGE)[number];

export const ULOGA_LABEL: Record<Uloga, string> = {
  poduzetnik: "Poduzetnik / vlasnik biznisa",
  marketing: "Marketing / SEO",
  prodaja: "Prodaja",
  it: "IT / razvoj",
  menadzment: "Menadžment",
  student: "Student",
  ostalo: "Ostalo",
};

export const CILJEVI = [
  "AI osnove",
  "Napredni rad s AI-em",
  "AI arhitektura",
  "SEO / AEO / GEO",
  "Sigurnost",
  "Automatizacija posla",
] as const;

// Oblik koji forma salje na /api/prijava.
export interface PrijavaInput {
  ime: string;
  email: string;
  telefon?: string;
  razina?: string;
  uloga?: string;
  ciljevi?: string[];
  consent: boolean;
  website?: string; // honeypot: mora ostati prazno
}
