import type { Metadata } from "next";
import Link from "next/link";
import { AI_MOZAK } from "@/lib/webinar";
import { SKOOL_URL } from "@/lib/linkovi";
import "../ai-mozak/ai-mozak.css";

// Landing za AIprobaj Skool zajednicu. Gumb vodi na SKOOL_URL (lib/linkovi.ts).

export const metadata: Metadata = {
  title: "AIprobaj Skool zajednica: postavi AI mozak sam | aiprobaj.com",
  description:
    "Besplatna zajednica: paket AI mozga, lekcije korak po korak i pitanja zajednici. Postavi AI koji zna tvoj posao, svojim tempom.",
  alternates: { canonical: "/skool" },
};

const SKOOL = `${SKOOL_URL}?utm_source=aiprobaj&utm_medium=landing&utm_campaign=ai-mozak`;

const UNUTRA = [
  { n: "01", h: "Paket AI mozga", p: "Gotova struktura, pravila i 7 naredbi. Skineš, otvoriš u VS Codeu i Obsidianu i kreneš.", c: ["Struktura", "7 naredbi"] },
  { n: "02", h: "Tri lekcije korak po korak", p: "Isti put kao na webinaru: složi mozak, skupi znanje u njega i daj agentu prvi posao, jutarnji brief i zatvaranje dana.", c: ["Složi mozak", "Skupi znanje", "Prvi posao"] },
  { n: "03", h: "Snimka webinara", p: `Cijeli webinar „${AI_MOZAK.naziv}“ (${AI_MOZAK.datum}), za gledanje kad stigneš.`, c: ["Nakon webinara"] },
  { n: "04", h: "Pitanja zajednici i nama", p: "Zapne li negdje, pitaš. Odgovaraju ljudi koji AI mozak koriste svaki dan.", c: ["Zajednica"] },
];

const FAQ = [
  ["Je li stvarno besplatno?", "Da. Pridružuješ se besplatnim Skool računom."],
  ["Što mi treba za vlastiti AI mozak?", "Laptop (Mac ili Windows) i AI pretplata. Paket je složen za Claude (Claude Pro, 20 USD mjesečno), a VS Code i Obsidian su besplatni. Tvoje znanje je u običnim datotekama, pa ga kasnije možeš koristiti i s ChatGPT-om ili drugim alatom."],
  ["Trebam li znati programirati?", "Ne. Sve se radi klikom i kopiranjem teksta, a diktat je dovoljan."],
  ["Što ako želim da ga postavite umjesto mene?", `Prvi korak za oba puta je besplatna 30-minutna konzultacija, za sve prijavljene na webinar do ${AI_MOZAK.konzultacijaDo}.`],
];

export default function SkoolPage() {
  return (
    <div className="am">
      <nav>
        <div className="wrap">
          <Link className="logo" href="/">
            <span className="ai">ai</span>probaj<span className="com">.com</span>
          </Link>
          <div className="navlinks">
            <Link href="/ai-mozak">Webinar</Link>
            <Link href="/konzultacija">Konzultacija</Link>
          </div>
          <a className="btn" href={SKOOL} target="_blank" rel="noopener">Pridruži se</a>
        </div>
      </nav>

      <header className="hero">
        <div className="wrap" style={{ gridTemplateColumns: "1fr" }}>
          <div>
            <span className="date-pill">
              <span className="dot" />
              AIPROBAJ SKOOL ZAJEDNICA · BESPLATNO
            </span>
            <h1>
              Postavi <span className="lime">AI{" "}mozak</span> sam, korak po korak.
            </h1>
            <p className="lead">
              Ne moraš ništa zapisivati s webinara. Paket, lekcije i pitanja čekaju te na jednom mjestu. Svojim tempom, od prvog dokumenta do prvog posla koji predaš agentu.
            </p>
            <div style={{ marginTop: 30 }}>
              <a className="btn" href={SKOOL} target="_blank" rel="noopener" style={{ fontSize: 17, padding: "17px 28px" }}>
                Pridruži se na Skoolu →
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="sec">
        <div className="wrap">
          <span className="kicker">{"// Što je unutra"}</span>
          <h2>Sve što trebaš za prvi AI mozak</h2>
          <div className="rows">
            {UNUTRA.map((k) => (
              <div className="row" key={k.n}>
                <span className="n">{k.n}</span>
                <div>
                  <h3>{k.h}</h3>
                  <p>{k.p}</p>
                  <div className="chips">{k.c.map((c) => <span className="chip" key={c}>{c}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <span className="kicker">{"// Zašto"}</span>
          <h2>Svaki novi chat počinje od nule. Tvoj AI mozak ne mora.</h2>
          <p className="brainline" style={{ marginTop: 28 }}>
            <b>AI mozak je folder s tvojim znanjem koji AI pročita prije svakog zadatka.</b> Jednom zapišeš tko si, s kim radiš i kako pišeš, a AI to zna svaki put. Alat se mijenja, mozak ostaje: znanje je u običnim datotekama, pa ga čita i sljedeći alat koji dođe.
          </p>
        </div>
      </section>

      <section className="sec" id="faq">
        <div className="wrap">
          <span className="kicker">{"// FAQ"}</span>
          <h2>Česta pitanja</h2>
          <div className="faq">
            {FAQ.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="final">
        <div className="wrap">
          <span className="kicker">{"// Besplatno"}</span>
          <h2>
            Jednom zapiši. <span className="lime">AI zna svaki put.</span>
          </h2>
          <p>
            Radije s nama? Prvi korak za oba puta je <Link href="/konzultacija" className="lime">besplatna konzultacija</Link>, do {AI_MOZAK.konzultacijaDo}.
          </p>
          <a className="btn" href={SKOOL} target="_blank" rel="noopener" style={{ fontSize: 17, padding: "17px 28px" }}>
            Pridruži se na Skoolu →
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
