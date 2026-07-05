// Sav statični sadržaj landing page-a. Mijenjaj ovdje, ne u page.tsx.

export const PILLARS = [
  {
    n: "01",
    title: "Osnove AI",
    desc: "Kako AI stvarno radi, koje vrste alata postoje i gdje ti donose pravu vrijednost.",
    tags: ["Osnove", "Alati", "Mindset"],
  },
  {
    n: "02",
    title: "Rad sa AI-em: od osnovnog do naprednog korisnika",
    desc: "Prompting, workflowovi i praktični zadaci: od prvih koraka do toga da napraviš jednostavnu web stranicu uz pomoć Claude dizajna i generiraš leadove uz minimalan trošak.",
    tags: ["Prompting", "Workflow", "Praksa"],
  },
  {
    n: "03",
    title: "AI arhitektura",
    desc: "Posloži AI oko vlastitog rada: folder struktura i markdown fileovi za tvoj AI \"brain\", kako graditi skillove i povezati AI s API ključevima.",
    tags: ["Struktura", "Skillovi", "API"],
  },
  {
    n: "04",
    title: "SEO, AEO i GEO uz AI",
    desc: "Podigni vidljivost: klasični SEO, Answer Engine i Generative Engine optimizacija uz pomoć AI-a.",
    tags: ["SEO", "AEO", "GEO"],
  },
  {
    n: "05",
    title: "Sigurnost i AI",
    desc: "Što je prompt injection, kako zaštititi API ključeve i kako ne postati rizik dok koristiš AI alate u poslu.",
    tags: ["Zaštita", "Privatnost", "Prompt injection"],
  },
] as const;

export const OUTCOMES = [
  {
    t: "Razumiješ kako AI zapravo radi",
    d: "Kako LLM modeli poput ChatGPT-a funkcioniraju ispod haube, korak po korak.",
  },
  {
    t: "Kako pretvoriti poslovni problem u digitalno rješenje",
    d: "Od konkretnog problema u tvom poslu do gotove web stranice ili alata, cijeli proces, ne samo teorija.",
  },
  {
    t: "Kako generirati leadove uz minimalan trošak",
    d: "Kako pronaći i kontaktirati prave email adrese uz AI, jeftinije i brže nego s klasičnim alatima.",
  },
  {
    t: "Kako upravljati projektima uz pomoć AI i uštediti vrijeme",
    d: "Konkretne operacije vođenja projekata: zadaci, rokovi i izvještaji koje AI radi umjesto tebe.",
  },
  {
    t: "Što je bitno da se pojaviš u AI pretraživačima",
    d: "AEO i GEO u praksi: kako te ChatGPT, Perplexity i Google AI Overview prepoznaju i preporuče.",
  },
  {
    t: "Kako napraviti svoj AI brain da smanjiš halucinacije AI",
    d: "Poveži AI s vlastitim znanjem i podacima za točnije i pouzdanije odgovore.",
  },
] as const;

export const FOR_WHO = [
  "Početnik koji ne zna odakle krenuti s AI-em",
  "Poduzetnik koji želi AI ubaciti u svakodnevni posao",
  "Marketing ili SEO čovjek koji želi prednost",
  "Zaposlenik koji želi automatizirati dosadne zadatke",
] as const;

export const NOT_FOR = [
  "Tražiš \"čarobno dugme\" bez ikakvog rada",
  "Ne želiš isprobavati alate u praksi",
  "Tražiš suhoparno akademsko predavanje bez primjene",
] as const;

export const INSTRUCTORS = [
  {
    id: "ivan-bobanovic",
    name: "Ivan Bobanović",
    role: "Osnivač Fraviz Studio",
    bio: "U AI-u od samih početaka: testirao sve relevantne AI modele i gradio AI arhitekture za tvrtke.",
    tag: "AI arhitektura",
    imageSrc: "/predavaci/ivan-bobanovic.webp",
  },
  {
    id: "ivan-radica",
    name: "Ivan Radica",
    role: "Suosnivač i CEO SEO Lick",
    bio: "Vodi kako AI koristiti za SEO, AEO i GEO vidljivost koja stvarno diže promet i upite, ne samo rang u tražilici.",
    tag: "SEO · AEO · GEO",
    imageSrc: "/predavaci/ivan-radica.webp",
  },
  {
    id: "marko-smolcic-uzunovic",
    name: "Marko Smolčić Uzunović",
    role: "Suosnivač i CTO SEO Lick",
    bio: "Kao CTO SEO Licka odgovoran je za tehničku implementaciju: crawl, indeksacija, brzina stranice.",
    tag: "Tehnički SEO",
    imageSrc: "/predavaci/marko-smolcic-uzunovic.webp",
  },
] as const;

export const AGENDA = [
  {
    t: "00",
    title: "Zašto baš sada AI",
    desc: "Realna slika: gdje AI stvarno pomaže, a gdje je samo hype.",
    time: "~10 min",
  },
  {
    t: "01",
    title: "AI osnove i alati",
    desc: "Kako AI radi i koji alati ti stvarno koriste: uživo demo.",
    time: "uživo demo",
  },
  {
    t: "02",
    title: "Napredni workflowovi i AI arhitektura",
    desc: "Automatizacije i agenti posloženi oko tvog posla.",
    time: "napredno",
  },
  {
    t: "03",
    title: "SEO, AEO i GEO uz AI",
    desc: "Vidljivost u tražilicama i u AI odgovorima.",
    time: "SEO Lick",
  },
  {
    t: "04",
    title: "Sigurnost u doba AI-a",
    desc: "Praktični savjeti kako se zaštititi i ne postati rizik.",
    time: "praktično",
  },
  {
    t: "05",
    title: "Pitanja i sljedeći koraci",
    desc: "Odgovaramo na tvoja pitanja uživo.",
    time: "Q&A",
  },
] as const;

export const STATS = [
  { n: "10+", l: "godina SEO iskustva u timu" },
  { n: "3", l: "stručnjaka koji AI koriste svaki dan" },
  { n: "5", l: "područja u jednom webinaru" },
  { n: "0 €", l: "cijena prvog webinara" },
] as const;

export const FAQ = [
  {
    q: "Trebam li ikakvo predznanje?",
    a: "Ne. Krećemo od nule i idemo sve do naprednih tehnika, korak po korak.",
  },
  {
    q: "Je li webinar stvarno besplatan?",
    a: "Da. Prvi, uvodni webinar je potpuno besplatan.",
  },
  {
    q: "Gdje se održava?",
    a: "Online, uživo putem Zooma. Link dobiješ na email prije početka.",
  },
  {
    q: "Hoću li dobiti snimku?",
    a: "Da. Svi prijavljeni dobivaju snimku, čak i ako ne mogu pratiti uživo.",
  },
  {
    q: "Koliko traje?",
    a: "Oko 90 minuta sadržaja plus Q&A na kraju.",
  },
  {
    q: "Za koga je ovo namijenjeno?",
    a: "Za sve: od potpunih početnika do naprednih korisnika, poduzetnika, marketingaša i developera.",
  },
] as const;

export const MARQUEE_ITEMS = [
  "AI OSNOVE",
  "NAPREDNI RAD",
  "AI ARHITEKTURA",
  "SEO",
  "AEO",
  "GEO",
  "SIGURNOST",
  "AUTOMATIZACIJA",
] as const;

export const HERO_BULLETS = [
  "Od potpunog početnika do naprednog",
  "Uživo na Zoomu + snimka za sve prijavljene",
  "Konkretni primjeri i alati koje koristimo svaki dan",
] as const;
