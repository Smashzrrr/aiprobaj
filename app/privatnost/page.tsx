import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politika privatnosti | aiprobaj.com",
  description: "Kako aiprobaj.com obrađuje osobne podatke iz prijave na webinar.",
  robots: { index: true, follow: true },
};

const H2: React.CSSProperties = {
  fontFamily: "var(--font-grotesk)",
  fontWeight: 700,
  fontSize: 20,
  letterSpacing: "-.01em",
  color: "var(--ink)",
  margin: "34px 0 10px",
};
const P: React.CSSProperties = {
  fontSize: 15.5,
  lineHeight: 1.65,
  color: "var(--ink-mut)",
  margin: "0 0 10px",
};

export default function Privatnost() {
  return (
    <main style={{ maxWidth: 760, margin: "0 auto", padding: "96px 24px 80px" }}>
      <Link
        href="/"
        style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", textDecoration: "none" }}
      >
        ← Natrag na aiprobaj.com
      </Link>

      <h1
        style={{
          fontFamily: "var(--font-grotesk)",
          fontWeight: 700,
          fontSize: "clamp(28px,4vw,40px)",
          letterSpacing: "-.02em",
          color: "var(--ink)",
          margin: "20px 0 8px",
        }}
      >
        Politika privatnosti
      </h1>
      <p style={{ ...P, color: "var(--ink-dim)", fontFamily: "var(--font-mono)", fontSize: 12 }}>
        Zadnje ažurirano: srpanj 2026.
      </p>

      <h2 style={H2}>Voditelj obrade</h2>
      <p style={P}>
        Fraviz, obrt za usluge, OIB 01080689479, Ul. dr. Ante Starčevića 18,
        Drage, Hrvatska. Kontakt za zaštitu podataka: ivan.bobanovic@fraviz.com.
      </p>

      <h2 style={H2}>Koje podatke prikupljamo</h2>
      <p style={P}>
        Kroz prijavu na webinar prikupljamo: ime i prezime, email adresu, po
        želji broj telefona, te neobavezno razinu AI iskustva, čime se baviš i
        područja interesa. Bilježimo i vrijeme i IP adresu davanja privole kao
        dokaz pristanka.
      </p>

      <h2 style={H2}>Svrha i pravna osnova</h2>
      <p style={P}>
        Podatke obrađujemo isključivo radi organizacije webinara: slanja Zoom
        linka i podsjetnika, snimke, te obećanih bonus materijala. Pravna osnova
        je tvoja privola (čl. 6. st. 1. t. a GDPR-a), koju daješ označavanjem
        kvačice pri prijavi.
      </p>

      <h2 style={H2}>Tko ima pristup</h2>
      <p style={P}>
        Podatke ne prodajemo i ne dijelimo s trećima u marketinške svrhe.
        Koristimo pouzdane obrađivače isključivo za tehničku isporuku: Supabase
        (pohrana podataka, poslužitelji u EU), Resend (slanje email poruka) i
        Vercel Analytics (anonimna statistika posjeta, bez osobnih podataka).
        Resend i Vercel su američke tvrtke, pa se prijenos podataka izvan EU
        odvija na temelju EU-US Data Privacy Framework, odnosno standardnih
        ugovornih klauzula. Pristup imaju samo Fraviz Studio i SEO Lick kao
        organizatori.
      </p>

      <h2 style={H2}>Koliko čuvamo podatke</h2>
      <p style={P}>
        Podatke čuvamo do godine dana nakon održanog webinara, odnosno do
        trenutka kad povučeš privolu ili zatražiš brisanje, što god nastupi
        prije.
      </p>

      <h2 style={H2}>Tvoja prava</h2>
      <p style={P}>
        Imaš pravo na pristup svojim podacima, ispravak, brisanje, ograničenje
        obrade, prenosivost i prigovor, te pravo povući privolu u svakom
        trenutku. Zahtjev pošalji na ivan.bobanovic@fraviz.com i odgovaramo u
        zakonskom roku. Imaš i pravo pritužbe Agenciji za zaštitu osobnih
        podataka (AZOP).
      </p>

      <h2 style={H2}>Kolačići i analitika</h2>
      <p style={P}>
        Stranica ne koristi kolačiće za praćenje. Koristimo Vercel Analytics za
        anonimnu statistiku posjeta (broj pregleda, referrer, zemlja): ovaj alat
        ne postavlja kolačiće, ne sprema IP adresu i ne prati te preko drugih
        stranica.
      </p>
    </main>
  );
}
