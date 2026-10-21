import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import AiMozakCountdown from "@/components/AiMozakCountdown";
import AiMozakForm from "@/components/AiMozakForm";
import AiMozakSpots from "@/components/AiMozakSpots";
import { AI_MOZAK } from "@/lib/webinar";
import "./v3.css";

// Landing za webinar "Postavi AI mozak", v3. Termin i naziv dolaze iz lib/webinar.ts.

const OPIS =
  "Piše ponude. Radi na webu. Šalje mailove. Slaže newsletter. Ne pričamo o tome, pokazujemo uživo. Pa ti pokažemo kako postaviti AI mozak koji to omogućuje.";

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
    images: [{ url: "/og/ai-mozak.png", width: 1200, height: 628, alt: `${AI_MOZAK.naziv}: besplatni webinar, ${AI_MOZAK.datum} u ${AI_MOZAK.sat}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${AI_MOZAK.naziv}: besplatni webinar, ${AI_MOZAK.datum} u ${AI_MOZAK.sat}`,
    description: OPIS,
    images: ["/og/ai-mozak.png"],
  },
};

const DEMOS = [
  "Isti zadatak dvaput: u praznom chatu i u AI-ju s mozgom",
  "Postavljanje uživo: paket, prvi unos znanja i prvo pitanje",
  "AI mozak agencije nakon par mjeseci: 300+ bilješki u radu",
];

const BOLOVI = [
  ["✕ 01", "Objašnjavaš isto po deseti put."],
  ["✕ 02", "Promijeniš alat i izgubiš sve što je AI „znao“."],
  ["✕ 03", "Ne vidiš što AI o tebi zna, pa ga ne možeš ni ispraviti."],
];

const KORACI: [string, string, string][] = [
  ["KORAK 1", "Paket", "Otvaramo prazan paket. U CLAUDE.md upisujemo ime i posao."],
  ["KORAK 2", "Prvi unos znanja", "AI te pita i sam zapisuje. Diktat je dovoljan. Traje oko pola sata."],
  ["KORAK 3", "/ingest i /ask", "Dokument iz inboxa postaje wiki bilješke. Odgovor dolazi s poveznicama na izvore."],
];

const PREDAVACI = [
  { img: "/predavaci/ivan-radica.webp", ime: "Ivan Radica", uloga: "Suosnivač i CEO, SEO LICK", p: "Agenciju vodi uz AI mozak s 300+ bilješki o klijentima, odlukama i procesima." },
  { img: "/predavaci/marko-smolcic-uzunovic.webp", ime: "Marko Smolčić Uzunović", uloga: "Suosnivač i CTO, SEO LICK", p: "Uvodi AI mozak cijelom timu SEO LICK-a, od strukture do svakodnevnog rada." },
  { img: "/predavaci/ivan-bobanovic.webp", ime: "Ivan Bobanović", uloga: "Osnivač, Fraviz Studio", p: "Testirao je sve relevantne AI modele i gradio AI arhitekture za tvrtke." },
];

const STATS: [string, string][] = [
  ["10+", "godina SEO iskustva u timu"],
  ["3", "stručnjaka koji AI koriste svaki dan"],
  ["300+", "bilješki u našem AI mozgu"],
  ["0 €", "cijena webinara"],
];

const FAQ: { q: string; a: ReactNode }[] = [
  { q: "Radi li ovo za moju branšu?", a: "Da, ako radiš s puno znanja: klijenti, ponude, procesi, odluke. Paket je neutralan na branšu. Mi ga koristimo u agenciji, a postavili smo ga i za praksu nutricionistice." },
  { q: "Koliko vremena traži?", a: "Postavljanje oko sat vremena, prvi unos znanja pola sata. Poslije par minuta ujutro i par minuta navečer." },
  { q: "Trebam li znati programirati?", a: "Ne. Sve što pokazujemo radi se klikom i kopiranjem teksta." },
  { q: "Gdje se održava?", a: "Online, na Google Meetu. Link ti stiže mailom prije početka." },
  {
    q: "Moram li išta instalirati prije webinara?",
    a: (
      <>
        Ne moraš. Linkove za Obsidian i Claude Code šaljemo mailom prije webinara. Ako instaliraš, radiš s nama. Ako ne, gledaš, a upute su u{" "}
        <Link href="/skool">Skool zajednici</Link>.
      </>
    ),
  },
  { q: "Što mi treba za vlastiti AI mozak?", a: "Laptop (Mac ili Windows) i Claude Pro, 20 USD mjesečno. VS Code i Obsidian su besplatni." },
  { q: "Mogu li umjesto Claudea koristiti ChatGPT?", a: "Paket je napravljen za Claude Code. Bilješke su obični tekstualni fileovi pa ih može čitati bilo koji AI, ali naredbe su pisane za Claude." },
  { q: "Je li webinar besplatan?", a: "Da. Konzultacija za polaznike je također besplatna i vrijedi 24 sata nakon webinara." },
  { q: "Što je s privatnošću?", a: "Mozak živi na tvom laptopu. Ono što AI pročita šalje se na obradu, zato pokazujemo što u mozak ide, a što ne." },
  { q: "Što ako ne stignem uživo?", a: "Prijavi se svejedno. Snimka i upute stižu ti na mail." },
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
    <div className="am3">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(EVENT_LD) }} />

      <div className="wrap">
        <header>
          <Link className="logo" href="/">
            ai<b>probaj</b>.com
          </Link>
          <nav>
            <Link href="/skool">Skool zajednica</Link>
            <Link href="/konzultacija">Konzultacija</Link>
            <a href="#predavaci">Predavači</a>
            <a href="#faq">FAQ</a>
            <a className="btn" href="#prijava">Rezerviraj mjesto</a>
          </nav>
        </header>

        <div className="hero">
          <div>
            <div className="kick l">
              Besplatni webinar · {AI_MOZAK.dan.toLowerCase()} {AI_MOZAK.datum} · {AI_MOZAK.sat}
            </div>
            <h1>
              Zamisli tim AI agenata koji ti preko mobitela pomaže <em>voditi biznis.</em>
            </h1>
            <p className="lead">
              Piše ponude. Radi na webu. Šalje mailove. Slaže newsletter. Ne pričamo o tome, pokazujemo uživo. Pa ti pokažemo kako postaviti AI mozak koji to omogućuje.
            </p>
            <div className="demos">
              {DEMOS.map((t, i) => (
                <div key={t}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {t}
                </div>
              ))}
            </div>
            <div className="meta">
              <b>{AI_MOZAK.naziv}</b> · Google Meet · oko {AI_MOZAK.durationMin} minuta · snimka za sve prijavljene
              <br />
              Predavači iz Fraviz Studio / SEO LICK
            </div>
            <AiMozakCountdown />
            <AiMozakSpots />
          </div>
          <AiMozakForm />
        </div>
      </div>

      <section className="intro">
        <div className="wrap what">
          <div>
            <div className="kick l">{"// Što je AI mozak"}</div>
            <h2>
              Context engineering za <em>tvoj posao.</em>
            </h2>
          </div>
          <p>
            To je <b>folder s tvojim znanjem koji AI pročita prije svakog zadatka</b>: obični tekstualni fileovi na tvom laptopu, a ne znanje zaključano u jednoj aplikaciji. AI zna tko si, na čemu radiš i kako pišeš. Prije nego ga išta pitaš.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="kick">{"// Problem"}</div>
          <div className="big">
            Svaki novi chat počinje <em>od nule.</em>
          </div>
          <div className="x3">
            {BOLOVI.map(([n, t]) => (
              <div key={n}>
                <span>{n}</span>
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="kick">{"// Rješenje"}</div>
          <h2>
            Ne dužim promptom. Ne novim alatom. <em>Kontekstom.</em>
          </h2>
          <div className="vs">
            <div>
              <div className="kick" style={{ margin: 0 }}>Prompt engineering</div>
              <h3>Kako pitaš.</h3>
              <ul>
                <li>duži prompt</li>
                <li>više uputa</li>
                <li>„ponašaj se kao stručnjak za…“</li>
              </ul>
            </div>
            <div className="on">
              <div className="kick l" style={{ margin: 0 }}>Context engineering</div>
              <h3>Što AI zna prije nego pitaš.</h3>
              <ul>
                <li>tko si i čime se baviš</li>
                <li>tvoji klijenti, projekti i odluke</li>
                <li>kako pišeš i što nikad ne radiš</li>
              </ul>
            </div>
          </div>
          <blockquote>
            „Context engineering je umijeće popunjavanja AI-jevog konteksta točno onim informacijama koje trebaju za sljedeći korak.“
            <cite>Andrej Karpathy · slobodan prijevod</cite>
          </blockquote>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="kick l">{"// Kako je složen"}</div>
          <h2>
            Tri sloja. <em>Ti skupljaš, AI piše.</em>
          </h2>
          <p className="lead">Fileove vidiš, ispraviš i poneseš u bilo koji AI.</p>
          <div className="diag">
            <div className="bx">
              <div className="b">inbox/</div>
              <div className="c">Ti skupljaš.</div>
              <div className="s">Sirovi izvori: dokumenti, bilješke, diktati.</div>
            </div>
            <div className="ar" aria-hidden="true">→</div>
            <div className="bx">
              <div className="b on">wiki/</div>
              <div className="c">AI piše.</div>
              <div className="s">Povezano znanje koje čitaš u Obsidianu.</div>
            </div>
            <div className="ar" aria-hidden="true">←</div>
            <div className="bx">
              <div className="b">CLAUDE.md</div>
              <div className="c">Pravila dogovarate.</div>
              <div className="s">Kako AI radi s tvojim znanjem.</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="kick">{"// Praksa"}</div>
          <h2>
            Od praznog foldera do <em>prvog znanja.</em>
          </h2>
          <div className="chips">
            <div className="chip">Obsidian</div>
            <div className="chip">Claude Code</div>
            <div className="chip on">Paket AI mozga</div>
          </div>
          <p className="lead">
            Linkove šaljemo mailom prije webinara. Ako instaliraš unaprijed, radiš s nama. Ako ne, gledaj. Sve je korak po korak u Skoolu.
          </p>
          <div className="steps">
            {KORACI.map(([k, h, p]) => (
              <div key={k}>
                <span>{k}</span>
                <div>
                  {h}
                  <p>{p}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="cmds">/today /capture /ingest /ask /draft /closeday /lint</div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="kick">{"// Što dobivaš"}</div>
          <h2>
            Gledaš uživo, a postaviš <em>kad stigneš.</em>
          </h2>
          <div className="get">
            <div>
              <span>[ PAKET ]</span>
              <h3>Paket AI mozga</h3>
              <p>Struktura, pravila i 7 naredbi.</p>
            </div>
            <div>
              <span>[ SNIMKA ]</span>
              <h3>Snimka webinara</h3>
              <p>Stiže svim prijavljenima. Ne moraš stići uživo.</p>
            </div>
            <div>
              <span>[ LEKCIJE ]</span>
              <h3>Upute korak po korak</h3>
              <p>
                Pisane lekcije u <Link href="/skool">Skool zajednici</Link>: postavljanje, unos znanja i automatski ritam.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="kick l">{"// Nakon webinara"}</div>
          <h2>
            Dva puta. <em>Ti biraš.</em>
          </h2>
          <div className="cta2">
            <div className="card on">
              <div className="kick l" style={{ margin: 0 }}>Samo za polaznike</div>
              <h3>Besplatna AI konzultacija, 30 min</h3>
              <p>Pogledamo tvoj posao i kažemo što AI mozak može preuzeti. Inače 100 € po satu.</p>
              <div className="note">Vrijedi 24 sata nakon webinara.</div>
              <div className="url">aiprobaj.com/konzultacija</div>
              <Link className="btn" href="/konzultacija">Rezerviraj termin →</Link>
            </div>
            <div className="card">
              <div className="kick" style={{ margin: 0 }}>Skool zajednica</div>
              <h3>Postavi ga sam, besplatno.</h3>
              <p>Paket AI mozga sa 7 naredbi, upute korak po korak (postavljanje, unos znanja, automatski ritam), snimka webinara i pitanja nama.</p>
              <div className="url">aiprobaj.com/skool</div>
              <Link className="btn ghost" href="/skool">Uđi u Skool →</Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="kick">{"// Za koga"}</div>
          <h2>Je li ovo za tebe</h2>
          <div className="yn">
            <div>
              <h4>DA, AKO SI</h4>
              <ul>
                <li>poduzetnik ili vlasnik agencije koji AI koristi svaki dan</li>
                <li>konzultant, freelancer ili trener koji radi s puno znanja</li>
                <li>dio marketing tima koji brand objašnjava iznova u svakom chatu</li>
                <li>netko kome je dosta kopiranja konteksta u svaki razgovor</li>
              </ul>
            </div>
            <div className="no">
              <h4>NE, AKO</h4>
              <ul>
                <li>tražiš čarobni gumb bez ikakvog rada</li>
                <li>ne želiš ništa zapisivati, jer AI mozak radi samo kad ga puniš</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="predavaci">
        <div className="wrap">
          <div className="kick">{"// O nama · Fraviz Studio × SEO LICK"}</div>
          <h2>
            AI mozak koristimo svaki dan, <em>u stvarnom poslu.</em>
          </h2>
          <div className="team">
            {PREDAVACI.map((s) => (
              <div key={s.ime}>
                <Image src={s.img} alt={s.ime} width={220} height={220} />
                <h3>{s.ime}</h3>
                <div className="r">{s.uloga}</div>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
          <div className="stats">
            {STATS.map(([n, l]) => (
              <div key={l}>
                <b>{n}</b>
                <span>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap spon">
          <div>
            <div className="kick">{"// Sponzor webinara"}</div>
            <h2>Rank Rush</h2>
          </div>
          <div className="ph">[PLACEHOLDER: Rank Rush logo]</div>
          <p className="lead">
            <span className="phi">[PLACEHOLDER: što Rank Rush nudi / ponuda za polaznike]</span>
          </p>
        </div>
      </section>

      <section id="faq">
        <div className="wrap">
          <div className="kick">{"// FAQ"}</div>
          <h2>Česta pitanja</h2>
          <div className="faq">
            {FAQ.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="end">
        <div className="wrap">
          <div className="kick l">
            {`// ${AI_MOZAK.dan} ${AI_MOZAK.datum} · ${AI_MOZAK.sat} · Google Meet`}
          </div>
          <div className="big">
            Svaki chat počinje od nule.
            <br />
            <em>Tvoj mozak ne mora.</em>
          </div>
          <p className="lead">
            Imaš dva puta. Nastaviti kao dosad: novi chat, isti kontekst, opet od nule. Ili jednom zapisati što AI treba znati i pustiti ga da radi s tobom.
          </p>
          <a className="btn" href="#prijava">Rezerviraj mjesto →</a>
        </div>
      </section>

      <div className="wrap">
        <footer>
          <span>aiprobaj.com · Fraviz Studio × SEO LICK</span>
          <span>
            info@aiprobaj.com · <Link href="/privatnost">Politika privatnosti</Link>
          </span>
        </footer>
      </div>
    </div>
  );
}
