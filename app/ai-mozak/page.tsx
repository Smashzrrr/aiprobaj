import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AiMozakForm from "@/components/AiMozakForm";
import AiMozakSpots from "@/components/AiMozakSpots";
import { AI_MOZAK } from "@/lib/webinar";
import "./ai-mozak.css";

// Landing za webinar "Postavi AI mozak". Termin i naziv dolaze iz lib/webinar.ts (AI_MOZAK).

const TERMIN = `${AI_MOZAK.dan} ${AI_MOZAK.datum} · ${AI_MOZAK.sat}`;
const OPIS =
  "Besplatni webinar: uživo pokazujemo kako radi AI mozak i kako orkestrira tim cloud agenata koji rade 24/7. Context engineering u praksi.";

export const metadata: Metadata = {
  title: `${AI_MOZAK.naziv} | Besplatni AI webinar | aiprobaj.com`,
  description: OPIS,
  alternates: { canonical: "/ai-mozak" },
  openGraph: {
    type: "website",
    url: "/ai-mozak",
    siteName: "aiprobaj.com",
    title: `${AI_MOZAK.naziv}: besplatni webinar, ${AI_MOZAK.dan.toLowerCase()} ${AI_MOZAK.datum} u ${AI_MOZAK.sat}`,
    description: OPIS,
    locale: "hr_HR",
    // Neutralni vizual webinara (bez lica). Bez njega LinkedIn uzima prvu sliku sa stranice.
    images: [{ url: "/og/ai-mozak.png", width: 1200, height: 628, alt: `${AI_MOZAK.naziv}: besplatni webinar, ${AI_MOZAK.datum} u ${AI_MOZAK.sat}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${AI_MOZAK.naziv}: besplatni webinar, ${AI_MOZAK.datum} u ${AI_MOZAK.sat}`,
    description: OPIS,
    images: ["/og/ai-mozak.png"],
  },
};

const PREDAVACI = [
  { img: "/predavaci/ivan-radica-zg.webp", ime: "Ivan Radica", uloga: "Suosnivač i CEO, SEO LICK", p: "Agenciju vodi uz AI mozak s 300+ bilješki o klijentima, odlukama i procesima.", chip: "AI mozak u praksi" },
  { img: "/predavaci/marko-smolcic-uzunovic-zg.webp", ime: "Marko Smolčić Uzunović", uloga: "Suosnivač i CTO, SEO LICK", p: "Uvodi AI mozak cijelom timu SEO LICK-a, od strukture do svakodnevnog rada.", chip: "Struktura i postava" },
  { img: "/predavaci/ivan-bobanovic.webp", ime: "Ivan Bobanović", uloga: "Osnivač, Fraviz Studio", p: "Testirao je sve relevantne AI modele i gradio AI arhitekture za tvrtke.", chip: "AI arhitektura" },
];

const ZAMISLI = [
  { h: "Ponuda s mobitela", p: "Ono što bi 2 sata pisao na laptopu, dobiješ 90% gotovo preko mobitela. Ti samo dotjeraš." },
  { h: "Mailovi spremni u draftu", p: "Odgovori te čekaju 80% spremni za slanje. Pregledaš, dotjeraš, pošalješ." },
  { h: "Asistentica za inbox", p: "Prati sve što ti stiže i pomaže ti složiti što je danas važno." },
  { h: "Web i newsletter", p: "Agent radi izmjene na webu i slaže newsletter, a ti samo odobriš." },
];

// Tko još govori o context engineeringu. Parafraze javnih izjava, ne citati.
const GLASOVI = [
  { ime: "Tobi Lütke", uloga: "CEO, Shopify", p: "Context engineering mu je bolji pojam od prompt engineeringa: vještina da AI dobije sav kontekst koji treba za zadatak." },
  { ime: "Anthropic", uloga: "Tvorci Claudea", p: "Context engineering opisuju kao ključ za AI agente koji rade pouzdano i na duže staze." },
  { ime: "Ante Dagelić", uloga: "Unicorn Marketing Meetup, Split", p: "Context engineering nazvao je jednom od najgorućih tema u AI-ju trenutačno." },
];

const FAQ: [string, string, string?, string?][] = [
  ["Radi li ovo za moju branšu?", "Da, ako radiš s puno znanja: klijenti, ponude, procesi, odluke. Paket je napravljen neutralno na branšu. Mi ga koristimo u agenciji, a postavili smo ga i za praksu nutricionistice."],
  ["Koliko vremena traži?", "Postavljanje oko sat vremena, prvi unos znanja pola sata. Poslije toga par minuta ujutro i par minuta navečer."],
  ["Trebam li znati programirati?", "Ne. Sve što pokazujemo radi se klikom i kopiranjem teksta."],
  ["Gdje se održava?", "Online, na Google Meetu. Link ti stiže mailom prije početka."],
  ["Moram li išta instalirati prije webinara?", "Ne. Na webinaru samo gledaš. Upute za postavljanje dobiješ poslije, u Skool zajednici."],
  ["Što mi treba za vlastiti AI mozak?", "Laptop (Mac ili Windows) i Claude Pro, 20 USD mjesečno. VS Code i Obsidian su besplatni."],
  ["Mogu li umjesto Claudea koristiti ChatGPT?", "Paket je napravljen za Claude Code. Bilješke su obični tekstualni fileovi pa ih može čitati bilo koji AI, ali naredbe su pisane za Claude."],
  ["Je li webinar besplatan?", "Da. Konzultacija za polaznike je također besplatna."],
  ["Što je s privatnošću?", "Mozak živi na tvom laptopu. Ono što AI pročita šalje se na obradu, zato pokazujemo što u mozak ide, a što ne."],
  ["Možete li mi vi postaviti AI mozak?", "Da. O tome je besplatna konzultacija za polaznike: pogledamo tvoj posao i kažemo što ima smisla spojiti."],
  ["Što ako ne stignem uživo?", "Prijavi se svejedno. Snimka i upute stižu ti na mail."],
];

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://aiprobaj.com";
const EVENT_LD = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: `${AI_MOZAK.naziv}: besplatni AI webinar`,
  description: OPIS,
  startDate: AI_MOZAK.dateISO,
  endDate: new Date(new Date(AI_MOZAK.dateISO).getTime() + AI_MOZAK.durationMin * 60000).toISOString(),
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: { "@type": "VirtualLocation", url: `${SITE}/ai-mozak` },
  inLanguage: "hr",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR", url: `${SITE}/ai-mozak`, availability: "https://schema.org/InStock" },
  organizer: { "@type": "Organization", name: "aiprobaj.com", url: SITE },
  performer: [
    { "@type": "Person", name: "Ivan Radica" },
    { "@type": "Person", name: "Marko Smolčić Uzunović" },
    { "@type": "Person", name: "Ivan Bobanović" },
  ],
};

export default function AiMozakPage() {
  return (
    <div className="am">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(EVENT_LD) }} />
      {/* === NAV === */}
      <nav>
        <div className="wrap">
          <Link className="logo" href="/">
            <span className="ai">ai</span>probaj<span className="com">.com</span>
          </Link>
          <div className="navlinks">
            <a href="#predavaci">Predavači</a>
            <a href="#faq">FAQ</a>
          </div>
          <a className="btn" href="#prijava">Rezerviraj mjesto</a>
        </div>
      </nav>

      {/* === HERO === */}
      <header className="hero">
        <div className="wrap">
          <div>
            <span className="date-pill">
              <span className="dot" />
              BESPLATNI WEBINAR · {TERMIN.toUpperCase()}
            </span>
            <h1>
              Izgradi <span className="lime">AI{" "}mozak</span>.
              <span className="h1-sub">Upravljaj timom agenata.</span>
            </h1>
            <p className="lead">
              Uživo ćeš vidjeti kako radi AI mozak i kako orkestrira tim cloud agenata koji rade 24/7.
            </p>
            <ul className="checks">
              <li>Google Meet, {AI_MOZAK.trajanje} minuta, snimka za sve prijavljene</li>
            </ul>
            <div className="from">
              Predavači iz <b>Fraviz Studio</b> / <b>SEO LICK</b>
            </div>
            <AiMozakSpots />
          </div>
          <AiMozakForm />
        </div>
      </header>

      {/* === ZAMISLI === */}
      <section className="sec">
        <div className="wrap">
          <h2>Zamisli da imaš tim koji radi 24/7.</h2>
          <div className="imagine">
            {ZAMISLI.map((z, i) => (
              <div className="im" key={z.h}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{z.h}</h3>
                <p>{z.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === PROBLEM === */}
      <section className="sec">
        <div className="wrap">
          <span className="kicker">{"// Problem"}</span>
          <h2>Svaki novi chat počinje od nule.</h2>
          <div className="pains">
            <div className="pain"><span className="x">✕ 01</span>Objašnjavaš isto po deseti put.</div>
            <div className="pain"><span className="x">✕ 02</span>Promijeniš alat i izgubiš sve što je AI „znao“.</div>
            <div className="pain"><span className="x">✕ 03</span>Ne vidiš što AI o tebi zna, pa ga ne možeš ni ispraviti.</div>
          </div>
          <p className="verdict">
            Problem nije u promptu. <span className="lime">Problem je što AI ne zna tvoj posao.</span>
          </p>
        </div>
      </section>

      {/* === CONTEXT ENGINEERING === */}
      <section className="sec">
        <div className="wrap">
          <span className="kicker">{"// Rješenje: context engineering"}</span>
          <h2>Najbolji agent ne pomaže ako AI nema kontekst.</h2>
          <div className="versus">
            <div className="vs">
              <span className="tag">Bez AI mozga</span>
              <h3>Svaki agent kreće od nule.</h3>
              <ul><li>u svakom chatu objašnjavaš tko si</li><li>svaki agent zna nešto drugo</li><li>promijeniš alat i počinješ ispočetka</li></ul>
            </div>
            <div className="vs">
              <span className="tag">S AI mozgom</span>
              <h3>Svi agenti znaju tvoj posao.</h3>
              <ul><li>tko si i čime se baviš</li><li>tvoji klijenti, projekti i odluke</li><li>kako pišeš i što nikad ne radiš</li></ul>
            </div>
          </div>
          <p className="lead-in">Ne radimo to samo mi. <span className="lime">Tako rade i najveći u AI-ju.</span></p>
          <div className="quote">
            <span className="q">“</span>
            <div>
              <blockquote>Context engineering je umijeće popunjavanja AI‑jevog konteksta točno onim informacijama koje trebaju za sljedeći korak.</blockquote>
              <cite>Andrej Karpathy · suosnivač OpenAI-ja · slobodan prijevod</cite>
            </div>
          </div>
          <div className="voices">
            {GLASOVI.map((g) => (
              <div className="voice" key={g.ime}>
                <b>{g.ime}</b>
                <span>{g.uloga}</span>
                <p>{g.p}</p>
              </div>
            ))}
          </div>
          <div className="statement">
            <h3>AI mozak je <span className="lime">context engineering za tvoj posao.</span></h3>
            <p>Folder s tvojim znanjem koji AI pročita prije svakog zadatka: obični tekstualni fileovi, a ne znanje zaključano u jednoj aplikaciji. Isti mozak čitaju svi agenti, zato rade kao tim, a ne kao četiri prazna chata.</p>
          </div>
        </div>
      </section>

      {/* === STO DOBIVAS === */}
      <section className="sec">
        <div className="wrap">
          <span className="kicker">{"// Što dobivaš"}</span>
          <h2>Gledaš uživo, a postaviš kad stigneš</h2>
          <div className="gets">
            <div className="get"><span className="ic">[ paket ]</span><h3>Paket AI mozga</h3><p>Struktura, pravila i 7 naredbi. Stiže nakon webinara.</p></div>
            <div className="get"><span className="ic">[ snimka ]</span><h3>Snimka webinara</h3><p>Stiže svim prijavljenima. Ne moraš stići uživo.</p></div>
            <div className="get"><span className="ic">[ lekcije ]</span><h3>Upute korak po korak</h3><p>Pisane lekcije u Skool zajednici: postavljanje, unos znanja i automatski ritam.</p></div>
            <div className="get hot"><span className="ic">samo za polaznike</span><h3>Besplatna AI konzultacija, 30 min</h3><p>Inače 100 € po satu. Pogledamo tvoj posao i kažemo što AI mozak može preuzeti. Termin rezerviraš do {AI_MOZAK.konzultacijaDo}, dan nakon webinara.</p></div>
          </div>
        </div>
      </section>

      {/* === ZA KOGA === */}
      <section className="sec">
        <div className="wrap">
          <span className="kicker">{"// Za koga"}</span>
          <h2>Je li ovo za tebe</h2>
          <div className="who">
            <div className="box yes">
              <h3 className="lime">DA, AKO SI</h3>
              <ul>
                <li>poduzetnik ili vlasnik firme</li>
                <li>konzultant, freelancer ili trener</li>
                <li>dio marketing tima unutar brenda</li>
                <li>netko tko želi iskoristiti potencijal AI-ja</li>
              </ul>
            </div>
            <div className="box no">
              <h3 style={{ color: "var(--hot)" }}>NE, AKO</h3>
              <ul>
                <li>te AI ne zanima</li>
                <li>ne želiš isprobavati nove stvari</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* === PREDAVACI === */}
      <section className="sec" id="predavaci">
        <div className="wrap">
          <span className="kicker">{"// Predavači"}</span>
          <h2>AI mozak koristimo svaki dan, u stvarnom poslu</h2>
          <div className="speakers">
            {PREDAVACI.map((s) => (
              <div className="sp" key={s.ime}>
                <Image src={s.img} alt={s.ime} width={74} height={74} />
                <h3>{s.ime}</h3>
                <div className="role">{s.uloga}</div>
                <p>{s.p}</p>
                <span className="chip">{s.chip}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === FAQ === */}
      <section className="sec" id="faq">
        <div className="wrap">
          <span className="kicker">{"// FAQ"}</span>
          <h2>Česta pitanja</h2>
          <div className="faq">
            {FAQ.map(([q, a, href, label]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>
                  {a}
                  {href && (
                    <>
                      {" "}
                      <Link href={href}>{label} →</Link>
                    </>
                  )}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* === FINAL CTA === */}
      <section className="final">
        <div className="wrap">
          <span className="kicker">{`// ${TERMIN}`}</span>
          <h2>
            Neka AI agenti rade umjesto tebe. <span className="lime">Izgradi AI mozak.</span>
          </h2>
          <p>Ponuda gotova s mobitela, mailovi spremni u draftu, inbox pod kontrolom. To su sati i sati rada i živaca manje. A kad oslobodiš vrijeme i glavu, postaješ efikasniji i radiš ono što si oduvijek htio, umjesto da se gubiš u moru administracije.</p>
          <a className="btn" href="#prijava" style={{ fontSize: 17, padding: "17px 28px" }}>
            Rezerviraj mjesto →
          </a>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <span>aiprobaj.com · Fraviz Studio × SEO LICK</span>
          <span>
            info@aiprobaj.com · <Link href="/privatnost">Politika privatnosti</Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
