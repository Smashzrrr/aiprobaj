import { z } from "zod";
import { RAZINE, ULOGE } from "./leadTypes";
import { PRIVOLA_VERZIJE } from "./privola";

// Server-side validacija prijave (allowlist). Klijentska validacija je samo UX.
export const prijavaSchema = z.object({
  ime: z.string().trim().min(1, "Upiši ime i prezime").max(120),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Upiši ispravan email")
    .max(200),
  telefon: z
    .string()
    .trim()
    .max(40)
    .optional()
    .transform((v) => (v ? v : undefined)),
  razina: z
    .enum(RAZINE)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  uloga: z
    .enum(ULOGE)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  ciljevi: z.array(z.string().max(60)).max(12).optional().default([]),
  // Oznaka webinara s posebnog landinga (npr. /ai-mozak). Bez nje = glavni landing.
  webinar: z.enum(["ai-mozak"]).optional(),
  // Consent mora biti tocno true (GDPR pristanak).
  consent: z.literal(true, {
    message: "Potreban je pristanak na obradu podataka",
  }),
  // Verzija teksta privole koju je forma prikazala (lib/privola.ts).
  // Stari klijent je ne salje; ruta tada upisuje PRIVOLA_BEZ_VERZIJE.
  consentVersion: z.enum(PRIVOLA_VERZIJE).optional(),
  // Zasebna, neobavezna privola za buduce edukacije i novosti.
  marketingOptIn: z.boolean().optional().default(false),
});

export type PrijavaParsed = z.infer<typeof prijavaSchema>;
