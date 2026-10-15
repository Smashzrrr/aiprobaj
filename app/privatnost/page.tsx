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

const UL: React.CSSProperties = {
  ...P,
  paddingLeft: 20,
  display: "flex",
  flexDirection: "column",
  gap: 8,
};
const B: React.CSSProperties = { color: "var(--ink)" };

// Oznaka za mjesta koja treba pravno provjeriti prije objave.
// TODO(pravna provjera): ukloniti kad se podaci potvrde.
function Potvrditi() {
  return (
    <span style={{ color: "var(--hot)", fontFamily: "var(--font-mono)", fontSize: 12 }}>
      [POTVRDITI]
    </span>
  );
}

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
        Zadnje ažurirano: 15. listopada 2026.
      </p>

      <h2 style={H2}>Zajednički voditelji obrade</h2>
      <p style={P}>
        aiprobaj.com i aiprobaj webinare zajednički organiziraju i o obradi
        podataka zajednički odlučuju:
      </p>
      <ul style={UL}>
        <li>
          Fraviz Studio (Fraviz, obrt za usluge), OIB 01080689479, Ul. dr. Ante
          Starčevića 18, Drage, Hrvatska <Potvrditi />
        </li>
        <li>
          SEO LICK, OIB [upisati], adresa [upisati] <Potvrditi />
        </li>
      </ul>
      <p style={P}>
        Međusobne obveze uređene su sporazumom zajedničkih voditelja obrade{" "}
        <Potvrditi />. Bez obzira na to kome se obratiš, zahtjev ćemo riješiti
        zajedno. Kontakt za sva pitanja o podacima: ivan.bobanovic@fraviz.com{" "}
        <Potvrditi />.
      </p>

      <h2 style={H2}>Koje podatke prikupljamo</h2>
      <p style={P}>
        Kroz prijavu na webinar ili listu čekanja prikupljamo: ime i prezime,
        email adresu, po želji broj telefona, te neobavezno razinu AI iskustva,
        čime se baviš i područja interesa. Kao dokaz pristanka bilježimo vrijeme,
        IP adresu i verziju teksta privole koji si vidio/la, te jesi li označio/la
        neobaveznu privolu za novosti. Ako se odjaviš, bilježimo vrijeme odjave.
      </p>

      <h2 style={H2}>Svrhe i pravna osnova</h2>
      <ul style={UL}>
        <li>
          <b style={B}>Organizacija webinara na koji si se prijavio/la</b>{" "}
          (potvrda prijave, obavijest o terminu ako si na listi čekanja, link za
          sudjelovanje, podsjetnici, snimka i obećani materijali). Pravna osnova
          je privola koju daješ obaveznom kvačicom pri prijavi (čl. 6. st. 1. t.
          a GDPR-a) <Potvrditi />.
        </li>
        <li>
          <b style={B}>Obavijesti o budućim edukacijama i novostima.</b> Samo ako
          si označio/la zasebnu, neobaveznu kvačicu. Pravna osnova je tvoja
          privola (čl. 6. st. 1. t. a GDPR-a). Bez te kvačice ne šaljemo ti
          promotivne mailove o drugim događajima.
        </li>
        <li>
          <b style={B}>Poštivanje odjave i dokaz privole.</b> Nakon odjave čuvamo
          tvoju email adresu s oznakom odjave, da ti greškom ne bismo ponovno
          pisali, te zapis privola da možemo dokazati kad si i na što pristao/la.
          Pravna osnova je naš legitimni interes i pravna obveza dokazivanja
          privole (čl. 6. st. 1. t. c i f, čl. 7. st. 1. GDPR-a) <Potvrditi />.
        </li>
      </ul>
      <p style={P}>
        Davanje podataka je dobrovoljno. Bez imena i emaila ne možemo te
        prijaviti na webinar ni javiti ti detalje.
      </p>

      <h2 style={H2}>Primatelji podataka</h2>
      <p style={P}>
        Podatke ne prodajemo i ne dijelimo s trećima u marketinške svrhe. Pristup
        imaju samo Fraviz Studio i SEO LICK kao organizatori. Za tehničku
        isporuku koristimo ove obrađivače, s kojima imamo ugovore o obradi
        podataka <Potvrditi />:
      </p>
      <ul style={UL}>
        <li>Supabase: pohrana podataka prijave (poslužitelji u EU).</li>
        <li>Resend: slanje email poruka (potvrda, obavijesti, podsjetnici).</li>
        <li>
          Vercel: hosting stranice i anonimna statistika posjeta (Vercel
          Analytics, bez kolačića i bez osobnih podataka).
        </li>
        <li>
          Google (Google Meet): održavanje webinara uživo. Na webinaru Google
          obrađuje ime i email kojima se spajaš, prema svojim pravilima
          privatnosti.
        </li>
      </ul>
      <p style={P}>
        Resend, Vercel i Google su američke tvrtke, pa se dio podataka može
        prenositi izvan EU. Prijenos se odvija na temelju EU-US Data Privacy
        Frameworka, odnosno standardnih ugovornih klauzula Europske komisije{" "}
        <Potvrditi />.
      </p>

      <h2 style={H2}>Koliko čuvamo podatke</h2>
      <ul style={UL}>
        <li>
          Podatke prijave čuvamo 12 mjeseci nakon zadnjeg webinara na koji si
          bio/la prijavljen/a, ili do odjave, odnosno zahtjeva za brisanje, što
          god nastupi prije.
        </li>
        <li>
          Nakon odjave ostale podatke prijave brišemo najkasnije u roku od 30
          dana, a čuvamo samo email adresu s oznakom odjave, koliko god vodimo
          listu prijava, da ti ne bismo ponovno pisali <Potvrditi />.
        </li>
        <li>
          Zapis privola (vrijeme, IP adresa, verzija teksta) čuvamo dok traje
          obrada i još 12 mjeseci nakon toga, radi dokazivanja privole{" "}
          <Potvrditi />.
        </li>
      </ul>

      <h2 style={H2}>Odjava i povlačenje privole</h2>
      <p style={P}>
        Svaki naš mail ima link za odjavu u podnožju, a podržavamo i odjavu
        jednim klikom iz mail klijenta (Gmail, Outlook, Apple Mail). Odjava
        povlači privolu za sve mailove, uključujući obavijesti o webinaru. Možeš
        nam se javiti i mailom. Povlačenje privole ne utječe na zakonitost
        obrade prije povlačenja.
      </p>

      <h2 style={H2}>Tvoja prava</h2>
      <p style={P}>
        Imaš pravo na pristup svojim podacima, ispravak, brisanje, ograničenje
        obrade, prenosivost i prigovor na obradu temeljenu na legitimnom
        interesu, te pravo povući privolu u svakom trenutku. Zahtjev pošalji na
        ivan.bobanovic@fraviz.com i odgovaramo najkasnije u roku od mjesec dana.
        Ne donosimo automatizirane odluke ni profiliranje.
      </p>

      <h2 style={H2}>Pritužba nadzornom tijelu</h2>
      <p style={P}>
        Ako smatraš da obrada krši propise, imaš pravo podnijeti pritužbu
        Agenciji za zaštitu osobnih podataka (AZOP), Selska cesta 136, 10000
        Zagreb, azop@azop.hr, www.azop.hr <Potvrditi />.
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
