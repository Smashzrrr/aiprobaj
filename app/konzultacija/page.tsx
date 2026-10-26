import type { Metadata } from "next";
import Link from "next/link";
import { AI_MOZAK } from "@/lib/webinar";
import { KONZULTACIJA_CAL_URL, SKOOL_URL } from "@/lib/linkovi";
import "../ai-mozak/ai-mozak.css";

// Besplatna 30-min AI konzultacija za sve prijavljene na webinar "Izgradi AI mozak" (prvi korak za oba puta: sam ili s nama).
// Kalendar: KONZULTACIJA_CAL_URL u lib/linkovi.ts (Google Calendar rezervacija termina).

export const metadata: Metadata = {
  title: "Besplatna AI konzultacija, 30 min | aiprobaj.com",
  description:
    "30 minuta, online: prođemo tvoj posao i okvirno izračunamo koliko vremena AI mozak može vratiti. Besplatno za sve prijavljene na webinar Izgradi AI mozak.",
  alternates: { canonical: "/konzultacija" },
};

const KORACI = [
  { n: "01", h: "Tvoj posao i alati", p: "Čime se baviš i što koristiš svaki dan: mail, kalendar, CRM, dokumenti, chat s AI-jem." },
  { n: "02", h: "Okvirna računica uštede", p: "Zadaci koji se ponavljaju: koliko ti sad uzimaju, a koliko bi uz AI mozak. Prije i sad, kao na webinaru." },
  { n: "03", h: "Što spojiti prvo", p: "Jedan konkretan prvi korak. Možeš ga napraviti sam ili s nama." },
];

const FAQ = [
  ["Je li stvarno besplatno?", `Da, za sve prijavljene na webinar, i one koji su gledali snimku, ako termin rezerviraju do ${AI_MOZAK.konzultacijaDo}. Jedan termin po osobi. Inače konzultacije naplaćujemo 100 € po satu.`],
  ["Moram li nešto pripremiti?", "Popis alata koje koristiš i dva ili tri zadatka koja ti uzimaju najviše vremena. Ništa više."],
  ["Hoćete li mi nešto prodavati?", "Reći ćemo ti što ima smisla napraviti sam, a što s nama. Odluka je tvoja."],
  ["Koji AI alat mi treba?", "Bilo koji koji već koristiš. AI mozak su obične datoteke s tvojim znanjem, pa ih čita Claude, ChatGPT ili Grok. Alat se mijenja, mozak ostaje."],
  ["Što je s mojim podacima?", "Lozinke, OIB i zdravstveni podaci ne idu u mozak. Agenti rade u nacrtima: ništa ne ide van bez tvog klika."],
  ["Gdje se održava?", "Online, preko Google Meeta. Link stiže u pozivnici kalendara."],
];

export default function KonzultacijaPage() {
  return (
    <div className="am">
      <nav>
        <div className="wrap">
          <Link className="logo" href="/">
            <span className="ai">ai</span>probaj<span className="com">.com</span>
          </Link>
          <div className="navlinks">
            <Link href="/ai-mozak">Webinar</Link>
            <Link href="/skool">Skool</Link>
          </div>
          <a className="btn" href="#termin">Odaberi termin</a>
        </div>
      </nav>

      <header className="hero">
        <div className="wrap" style={{ gridTemplateColumns: "1fr" }}>
          <div>
            <span className="date-pill">
              <span className="dot" />
              BESPLATNA AI KONZULTACIJA · 30 MIN · ONLINE
            </span>
            <h1>
              Pogledajmo koliko vremena <span className="lime">AI{" "}mozak</span> može vratiti tvom poslu.
            </h1>
            <p className="lead">
              30 minuta, online. Prođemo tvoj posao, alate i zadatke koji se ponavljaju i kažemo ti što ima smisla spojiti s AI mozgom, a što ne.
            </p>
            <div className="chips" style={{ marginTop: 18 }}>
              {["Marketing", "Ponude", "Inbox", "Izvještaji"].map((c) => <span className="chip" key={c}>{c}</span>)}
            </div>
            <ul className="checks">
              <li>Inače 100 € po satu</li>
              <li>Besplatno za sve prijavljene na webinar „{AI_MOZAK.naziv}“ ako termin rezerviraš do {AI_MOZAK.konzultacijaDo}, dan nakon webinara</li>
              <li>Jedan termin po osobi</li>
            </ul>
          </div>
        </div>
      </header>

      {/* === TERMIN (Google Kalendar) === */}
      <section className="sec" id="termin">
        <div className="wrap">
          <span className="kicker">{"// Odaberi termin"}</span>
          <h2>Rezerviraj svojih 30 minuta</h2>
          {KONZULTACIJA_CAL_URL ? (
            <div style={{ marginTop: 32, border: "1px solid var(--line2)", borderRadius: 20, overflow: "hidden", background: "#fff" }}>
              <iframe
                src={KONZULTACIJA_CAL_URL}
                title="Rezervacija termina za AI konzultaciju"
                style={{ border: 0, width: "100%", height: 720, display: "block" }}
                loading="lazy"
              />
            </div>
          ) : (
            <div className="brainline" style={{ marginTop: 32 }}>
              <b>Termini se otvaraju na dan webinara, {AI_MOZAK.dan.toLowerCase()} {AI_MOZAK.datum} u {AI_MOZAK.sat}.</b> Ako još nemaš prijavu na webinar,{" "}
              <Link href="/ai-mozak" className="lime">prijavi se ovdje</Link>. Pitanja: info@aiprobaj.com
            </div>
          )}
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <span className="kicker">{"// Kako izgleda"}</span>
          <h2>Što prođemo u 30 minuta</h2>
          <div className="rows">
            {KORACI.map((k) => (
              <div className="row" key={k.n}>
                <span className="n">{k.n}</span>
                <div>
                  <h3>{k.h}</h3>
                  <p>{k.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <span className="kicker">{"// Nakon konzultacije"}</span>
          <h2>Dva puta, ti biraš</h2>
          <div className="versus">
            <div className="vs">
              <span className="tag">Put 1 · sam</span>
              <h3>Skool zajednica, besplatno</h3>
              <ul>
                <li>paket AI mozga sa 7 naredbi</li>
                <li>lekcije korak po korak</li>
                <li>pitanja zajednici i nama</li>
              </ul>
              <a className="btn" href={SKOOL_URL} target="_blank" rel="noopener" style={{ marginTop: 22 }}>Pridruži se na Skoolu →</a>
            </div>
            <div className="vs">
              <span className="tag">Put 2 · s nama</span>
              <h3>Postavimo ga za tebe</h3>
              <ul>
                <li>AI mozak složen za tvoj posao</li>
                <li>agenti spojeni na tvoje alate</li>
                <li>naučimo tebe i tim kako se radi</li>
              </ul>
              <p style={{ marginTop: 22, fontSize: 20, fontWeight: 700 }}>
                Opseg i cijenu dogovaramo na konzultaciji.
              </p>
            </div>
          </div>
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
          <span className="kicker">{"// 30 minuta"}</span>
          <h2>
            Ne mogu odlučiti umjesto tebe. <span className="lime">Mogu ti pokazati što ima smisla.</span>
          </h2>
          <p>Jedan razgovor, konkretan prvi korak. Bez obveze. Besplatno do {AI_MOZAK.konzultacijaDo}.</p>
          <a className="btn" href="#termin" style={{ fontSize: 17, padding: "17px 28px" }}>
            Odaberi termin →
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
