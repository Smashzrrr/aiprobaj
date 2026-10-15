import type { Metadata } from "next";
import Link from "next/link";
import { dekodirajEmail, provjeriToken } from "@/lib/odjava";

export const metadata: Metadata = {
  title: "Odjava | aiprobaj.com",
  description: "Odjava s aiprobaj mailova.",
  robots: { index: false, follow: false },
};

const H1: React.CSSProperties = {
  fontFamily: "var(--font-grotesk)",
  fontWeight: 700,
  fontSize: "clamp(28px,4vw,40px)",
  letterSpacing: "-.02em",
  color: "var(--ink)",
  margin: "20px 0 14px",
};
const P: React.CSSProperties = {
  fontSize: 15.5,
  lineHeight: 1.65,
  color: "var(--ink-mut)",
  margin: "0 0 12px",
};
const BTN: React.CSSProperties = {
  marginTop: 10,
  background: "var(--accent)",
  color: "var(--accent-ink)",
  fontFamily: "var(--font-grotesk)",
  fontWeight: 700,
  fontSize: 16,
  padding: "14px 22px",
  border: "none",
  borderRadius: 11,
  cursor: "pointer",
};

const KONTAKT = "ivan.bobanovic@fraviz.com";

function str(v: string | string[] | undefined): string {
  return typeof v === "string" ? v : "";
}

// a***@domena.hr: dovoljno da osoba prepozna svoju adresu.
function maskiraj(email: string): string {
  const [ime, domena] = email.split("@");
  return `${ime.slice(0, 2)}***@${domena}`;
}

export default async function Odjava({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const status = str(sp.status);
  const e = str(sp.e);
  const t = str(sp.t);
  const email = dekodirajEmail(e);
  const valjan = !!email && provjeriToken(email, t);

  let sadrzaj: React.ReactNode;
  if (status === "odjavljen") {
    sadrzaj = (
      <>
        <h1 style={H1}>Odjavljen/a si.</h1>
        <p style={P}>
          Više ti nećemo slati mailove o webinarima ni novosti. Ako se kasnije
          ponovno prijaviš na neki webinar, slat ćemo ti samo obavijesti za
          njega.
        </p>
      </>
    );
  } else if (valjan && email) {
    sadrzaj = (
      <>
        <h1 style={H1}>Odjava s aiprobaj mailova</h1>
        {status === "greska" && (
          <p role="alert" style={{ ...P, color: "var(--hot)" }}>
            Odjava trenutno nije uspjela. Pokušaj ponovno za koju minutu.
          </p>
        )}
        <p style={P}>
          Odjavljuješ adresu <b style={{ color: "var(--ink)" }}>{maskiraj(email)}</b>.
          Nakon odjave više nećeš primati obavijesti o webinarima, podsjetnike
          ni novosti, uključujući link i snimku webinara na koji si prijavljen/a.
        </p>
        <form method="post" action={`/api/odjava?e=${encodeURIComponent(e)}&t=${encodeURIComponent(t)}`}>
          <button type="submit" style={BTN}>
            Potvrdi odjavu
          </button>
        </form>
      </>
    );
  } else {
    sadrzaj = (
      <>
        <h1 style={H1}>Link za odjavu nije ispravan</h1>
        <p style={P}>
          Link je možda nepotpun ili kopiran samo djelomično. Otvori ga ponovno
          iz maila ili nam piši na{" "}
          <a href={`mailto:${KONTAKT}?subject=Odjava`} style={{ color: "var(--accent)" }}>
            {KONTAKT}
          </a>{" "}
          i odjavit ćemo te ručno.
        </p>
      </>
    );
  }

  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "96px 24px 80px" }}>
      <Link
        href="/"
        style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)", textDecoration: "none" }}
      >
        ← Natrag na aiprobaj.com
      </Link>
      {sadrzaj}
      <p style={{ ...P, marginTop: 28, fontSize: 13, color: "var(--ink-dim)" }}>
        Više o tome kako obrađujemo podatke: <Link href="/privatnost" style={{ color: "var(--ink-mut)" }}>Politika privatnosti</Link>.
      </p>
    </main>
  );
}
