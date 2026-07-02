import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { WEBINAR } from "@/lib/webinar";
import "./globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://aiprobaj.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Besplatni AI webinar na hrvatskom | aiprobaj.com",
  description:
    "Nauči raditi s AI-em od praktičara. Pet područja u jednom webinaru: AI osnove i napredni rad, AI arhitektura, SEO/AEO/GEO i sigurnost. Besplatno, online, uživo.",
  keywords: [
    "AI webinar",
    "naučiti AI",
    "AI edukacija hrvatski",
    "AI radionica",
    "SEO AEO GEO",
    "AI automatizacija",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "aiprobaj.com",
    locale: "hr_HR",
    title: "Besplatni AI webinar na hrvatskom | aiprobaj.com",
    description:
      "Nauči raditi s AI-em od praktičara. Pet područja u jednom webinaru. Prijavi se, mjesta su ograničena.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Besplatni AI webinar na hrvatskom | aiprobaj.com",
    description: "Nauči raditi s AI-em od praktičara. Pet područja u jednom webinaru.",
  },
  robots: { index: true, follow: true },
};

const startISO = WEBINAR.dateISO;
const endISO = new Date(
  new Date(WEBINAR.dateISO).getTime() + WEBINAR.durationMin * 60000,
).toISOString();

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Event",
      name: "aiprobaj.com: besplatan online AI webinar",
      description:
        "Besplatan online webinar: nauči raditi s AI-em od praktičara. Pet područja: AI osnove i napredni rad, AI arhitektura, SEO/AEO/GEO i sigurnost.",
      startDate: startISO,
      endDate: endISO,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
      location: { "@type": "VirtualLocation", url: SITE },
      image: [`${SITE}/opengraph-image`],
      organizer: [
        { "@type": "Organization", name: "Fraviz Studio", url: "https://fraviz.com" },
        { "@type": "Organization", name: "SEO Lick" },
      ],
      performer: [
        { "@type": "Person", name: "Ivan Bobanović" },
        { "@type": "Person", name: "Ivan Radica" },
        { "@type": "Person", name: "Marko Smolčić Uzunović" },
      ],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: `${SITE}/#prijava`,
        validFrom: "2026-07-01T00:00:00+02:00",
      },
    },
    {
      "@type": "Organization",
      name: "aiprobaj.com",
      url: SITE,
      description:
        "Edukativna platforma za učenje AI-a na hrvatskom jeziku. Projekt Fraviz Studija i SEO Licka.",
      founder: [
        { "@type": "Person", name: "Ivan Bobanović" },
        { "@type": "Person", name: "Ivan Radica" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        ["Trebam li ikakvo predznanje?", "Ne. Krećemo od nule i idemo sve do naprednih tehnika, korak po korak."],
        ["Je li webinar stvarno besplatan?", "Da. Prvi, uvodni webinar je potpuno besplatan."],
        ["Gdje se održava?", "Online, uživo putem Zooma. Link dobiješ na email prije početka."],
        ["Hoću li dobiti snimku?", "Da. Svi prijavljeni dobivaju snimku, čak i ako ne mogu pratiti uživo."],
        ["Koliko traje?", "Oko 90 minuta sadržaja plus Q&A na kraju."],
        ["Za koga je ovo namijenjeno?", "Za sve, od potpunih početnika do naprednih korisnika, poduzetnika, marketingaša i developera."],
      ].map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hr" className={`${grotesk.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
