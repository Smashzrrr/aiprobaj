import Image from "next/image";
import PrijavaForm from "@/components/PrijavaForm";
import Countdown from "@/components/Countdown";
import SpotsBar from "@/components/SpotsBar";
import MobileNav from "@/components/MobileNav";
import {
  PILLARS,
  OUTCOMES,
  FOR_WHO,
  NOT_FOR,
  INSTRUCTORS,
  AGENDA,
  STATS,
  FAQ,
  MARQUEE_ITEMS,
  HERO_BULLETS,
} from "@/components/content";

// Metadata je definiran u app/layout.tsx (keyword-first title, OG, canonical, JSON-LD).

// Shared font shorthand used across inline styles
const GROTESK = "var(--font-grotesk), 'Space Grotesk', system-ui, sans-serif";
const MONO = "var(--font-mono), 'Space Mono', monospace";

// Shared input base style (used in PrijavaForm, referenced here for structural fidelity)
const TAG_PILL: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: 11,
  letterSpacing: "0.04em",
  color: "var(--ink-mut)",
  border: "1px solid var(--line2)",
  borderRadius: 999,
  padding: "5px 11px",
};

export default function Page() {
  return (
    <>
      {/* ── NAV ──────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: 64,
          display: "flex",
          alignItems: "center",
          background: "rgba(8,8,10,0.72)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          {/* Logo */}
          <a
            href="#vrh"
            style={{
              textDecoration: "none",
              fontFamily: GROTESK,
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
              flexShrink: 0,
            }}
          >
            <span style={{ color: "var(--accent)" }}>ai</span>probaj
            <span style={{ color: "var(--ink-dim)", fontWeight: 500 }}>.com</span>
          </a>

          {/* Desktop nav links — hidden below 720px via CSS class */}
          <div
            className="desktop-nav-links"
            style={{ display: "flex", alignItems: "center", gap: 26 }}
          >
            <a
              href="#program"
              style={{
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
                color: "var(--ink-mut)",
                padding: "12px 0",
              }}
            >
              Program
            </a>
            <a
              href="#predavaci"
              style={{
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
                color: "var(--ink-mut)",
                padding: "12px 0",
              }}
            >
              Predavači
            </a>
            <a
              href="#agenda"
              style={{
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
                color: "var(--ink-mut)",
                padding: "12px 0",
              }}
            >
              Agenda
            </a>
            <a
              href="#faq"
              style={{
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
                color: "var(--ink-mut)",
                padding: "12px 0",
              }}
            >
              FAQ
            </a>
          </div>

          {/* Right side: CTA + mobile hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <a
              href="#prijava"
              style={{
                textDecoration: "none",
                background: "var(--accent)",
                color: "var(--accent-ink)",
                fontFamily: GROTESK,
                fontWeight: 700,
                fontSize: 13.5,
                padding: "12px 16px",
                borderRadius: 9,
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
              }}
            >
              Rezerviraj mjesto
            </a>
            {/* MobileNav renders hamburger button + dropdown (client island) */}
            <MobileNav />
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        id="vrh"
        style={{ position: "relative", overflow: "hidden", padding: "120px 0 74px" }}
      >
        {/* Background radial glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(1100px 520px at 80% -10%,rgba(198,255,58,.11),transparent 60%),radial-gradient(700px 420px at 2% 24%,rgba(198,255,58,.05),transparent 55%)",
          }}
        />
        {/* Grid overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.55,
            backgroundImage:
              "linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
            WebkitMaskImage:
              "radial-gradient(720px 520px at 78% 4%,#000,transparent 74%)",
            maskImage:
              "radial-gradient(720px 520px at 78% 4%,#000,transparent 74%)",
          }}
        />

        <div
          style={{
            position: "relative",
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            flexWrap: "wrap",
            gap: 52,
            alignItems: "flex-start",
          }}
        >
          {/* Left column */}
          <div style={{ flex: "1 1 470px", minWidth: 300, paddingTop: 12 }}>
            <h1
              style={{
                margin: "22px 0 0",
                fontFamily: GROTESK,
                fontWeight: 700,
                fontSize: "clamp(38px, 6.4vw, 74px)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "var(--ink)",
              }}
            >
              Nauči <span style={{ color: "var(--accent)" }}>AI</span> od ljudi koji ga
              koriste svaki dan
            </h1>

            <p
              style={{
                margin: "22px 0 0",
                maxWidth: 544,
                fontSize: "clamp(16px, 2vw, 19px)",
                lineHeight: 1.62,
                color: "var(--ink-mut)",
              }}
            >
              Besplatan webinar koji ti daje konkretne alate i znanje za rad s
              AI-em: od osnova do naprednih tehnika.
            </p>

            {/* Bullets */}
            <div
              style={{
                margin: "26px 0 0",
                display: "flex",
                flexDirection: "column",
                gap: 11,
              }}
            >
              {HERO_BULLETS.map((bullet) => (
                <div
                  key={bullet}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontFamily: MONO,
                    fontSize: 13,
                    color: "var(--ink-mut)",
                  }}
                >
                  <span style={{ color: "var(--ink-mut)", flexShrink: 0 }}>✓</span>
                  {bullet}
                </div>
              ))}
            </div>

            {/* Countdown island */}
            <div style={{ margin: "32px 0 0" }}>
              <Countdown variant="hero" />
            </div>

            {/* SpotsBar island */}
            <div style={{ margin: "16px 0 0", maxWidth: 360 }}>
              <SpotsBar variant="hero" />
            </div>

            {/* Trust line */}
            <div
              style={{
                margin: "30px 0 0",
                display: "flex",
                alignItems: "center",
                gap: 14,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--ink-dim)",
                }}
              >
                Predavači iz
              </span>
              <span
                style={{
                  fontFamily: GROTESK,
                  fontWeight: 700,
                  fontSize: 15,
                  color: "var(--ink)",
                }}
              >
                Fraviz Studio
              </span>
              <span style={{ color: "var(--line2)" }}>/</span>
              <span
                style={{
                  fontFamily: GROTESK,
                  fontWeight: 700,
                  fontSize: 15,
                  color: "var(--ink)",
                }}
              >
                SEO Lick
              </span>
            </div>
          </div>

          {/* Right column — form */}
          <div
            id="prijava"
            style={{
              flex: "0 1 428px",
              minWidth: 300,
              width: "100%",
              scrollMarginTop: 88,
            }}
          >
            <PrijavaForm />
          </div>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
          background: "var(--bg2)",
          padding: "15px 0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "max-content",
            animation: "aip-marq 30s linear infinite",
          }}
        >
          {/* First set */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 30,
              paddingRight: 30,
            }}
          >
            {MARQUEE_ITEMS.map((item) => (
              <span key={`a-${item}`} style={{ display: "contents" }}>
                <span
                  style={{
                    fontFamily: GROTESK,
                    fontWeight: 700,
                    fontSize: 14,
                    letterSpacing: "0.03em",
                    color: "var(--ink)",
                  }}
                >
                  {item}
                </span>
                <span style={{ color: "var(--accent)" }}>✦</span>
              </span>
            ))}
          </div>
          {/* Duplicate set — aria-hidden so screen readers skip it */}
          <div
            aria-hidden="true"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 30,
              paddingRight: 30,
            }}
          >
            {MARQUEE_ITEMS.map((item) => (
              <span key={`b-${item}`} style={{ display: "contents" }}>
                <span
                  style={{
                    fontFamily: GROTESK,
                    fontWeight: 700,
                    fontSize: 14,
                    letterSpacing: "0.03em",
                    color: "var(--ink)",
                  }}
                >
                  {item}
                </span>
                <span style={{ color: "var(--accent)" }}>✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── INTRO VIDEO (uskoro) ──────────────────────────────── */}
      <section style={{ padding: "76px 0 4px" }}>
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "0 24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 12,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            {"// 60 sekundi"}
          </div>
          <h2
            style={{
              margin: "14px 0 0",
              fontFamily: GROTESK,
              fontWeight: 700,
              fontSize: "clamp(26px, 3.4vw, 40px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
            }}
          >
            Pogledaj zašto baš aiprobaj
          </h2>
          <div
            style={{
              marginTop: 26,
              position: "relative",
              aspectRatio: "16 / 9",
              border: "1px solid var(--line2)",
              borderRadius: 18,
              overflow: "hidden",
              background:
                "radial-gradient(600px 320px at 50% 0,rgba(198,255,58,.12),var(--bg2))",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.5,
                backgroundImage:
                  "linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px)",
                backgroundSize: "48px 48px",
                WebkitMaskImage:
                  "radial-gradient(420px 300px at 50% 42%,#000,transparent 72%)",
                maskImage:
                  "radial-gradient(420px 300px at 50% 42%,#000,transparent 72%)",
              }}
            />
            {/* Uskoro stanje */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 76,
                  height: 76,
                  borderRadius: "50%",
                  background: "rgba(198,255,58,0.12)",
                  border: "1px solid var(--line2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Play triangle */}
                <span
                  aria-hidden="true"
                  style={{
                    marginLeft: 6,
                    borderStyle: "solid",
                    borderWidth: "15px 0 15px 24px",
                    borderColor: "transparent transparent transparent var(--ink-dim)",
                  }}
                />
              </div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--ink-mut)",
                }}
              >
                Uskoro
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAM ──────────────────────────────────────────── */}
      <section id="program" style={{ padding: "104px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ maxWidth: 680 }}>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 12,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--accent)",
              }}
            >
              {"// Program"}
            </div>
            <h2
              style={{
                margin: "16px 0 0",
                fontFamily: GROTESK,
                fontWeight: 700,
                fontSize: "clamp(30px, 4.2vw, 50px)",
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
                color: "var(--ink)",
              }}
            >
              Pet područja. Jedan webinar
            </h2>
            <p
              style={{
                margin: "16px 0 0",
                fontSize: 17,
                lineHeight: 1.6,
                color: "var(--ink-mut)",
              }}
            >
              Sve što ti treba da AI prestane biti buzzword i postane alat koji
              koristiš svaki dan.
            </p>
          </div>

          <div style={{ marginTop: 44, borderTop: "1px solid var(--line)" }}>
            {PILLARS.map((pillar) => (
              <div
                key={pillar.n}
                style={{
                  display: "grid",
                  gridTemplateColumns: "92px 1fr",
                  gap: 26,
                  alignItems: "start",
                  padding: "30px 14px 30px 6px",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <div
                  style={{
                    fontFamily: MONO,
                    fontWeight: 700,
                    fontSize: "clamp(30px, 4vw, 46px)",
                    lineHeight: 0.9,
                    color: "var(--accent)",
                  }}
                >
                  {pillar.n}
                </div>
                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: GROTESK,
                      fontWeight: 700,
                      fontSize: "clamp(20px, 2.5vw, 27px)",
                      letterSpacing: "-0.02em",
                      color: "var(--ink)",
                    }}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    style={{
                      margin: "9px 0 0",
                      maxWidth: 660,
                      fontSize: 16,
                      lineHeight: 1.6,
                      color: "var(--ink-mut)",
                    }}
                  >
                    {pillar.desc}
                  </p>
                  <div
                    style={{
                      marginTop: 14,
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                    }}
                  >
                    {pillar.tags.map((tag) => (
                      <span key={tag} style={TAG_PILL}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ISHODI ───────────────────────────────────────────── */}
      <section
        style={{
          padding: "104px 0",
          borderTop: "1px solid var(--line)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ maxWidth: 720 }}>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 12,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--accent)",
              }}
            >
              {"// Ishodi"}
            </div>
            <h2
              style={{
                margin: "16px 0 0",
                fontFamily: GROTESK,
                fontWeight: 700,
                fontSize: "clamp(30px, 4.2vw, 50px)",
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
                color: "var(--ink)",
              }}
            >
              Što ćeš naučiti tijekom webinara
            </h2>
            <p
              style={{
                margin: "16px 0 0",
                fontSize: 17,
                lineHeight: 1.6,
                color: "var(--ink-mut)",
              }}
            >
              Nesebično dijelimo znanje: na tebi je što ćeš napraviti nakon.
            </p>
          </div>

          <div
            style={{
              marginTop: 40,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 16,
            }}
          >
            {OUTCOMES.map((outcome) => (
              <div
                key={outcome.t}
                style={{
                  display: "flex",
                  gap: 14,
                  background: "var(--bg2)",
                  border: "1px solid var(--line)",
                  borderRadius: 14,
                  padding: 22,
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    flexShrink: 0,
                    width: 28,
                    height: 28,
                    borderRadius: 9,
                    background: "rgba(198,255,58,0.14)",
                    border: "1px solid var(--accent)",
                    color: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                  }}
                >
                  ✓
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: GROTESK,
                      fontWeight: 600,
                      fontSize: 17,
                      letterSpacing: "-0.01em",
                      color: "var(--ink)",
                    }}
                  >
                    {outcome.t}
                  </div>
                  <div
                    style={{
                      marginTop: 5,
                      fontSize: 14.5,
                      lineHeight: 1.55,
                      color: "var(--ink-mut)",
                    }}
                  >
                    {outcome.d}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ZA KOGA ──────────────────────────────────────────── */}
      <section
        style={{
          padding: "104px 0",
          borderTop: "1px solid var(--line)",
          background: "var(--bg2)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ maxWidth: 680 }}>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 12,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--accent)",
              }}
            >
              {"// Za koga"}
            </div>
            <h2
              style={{
                margin: "16px 0 0",
                fontFamily: GROTESK,
                fontWeight: 700,
                fontSize: "clamp(30px, 4.2vw, 50px)",
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
                color: "var(--ink)",
              }}
            >
              Je li ovo za tebe
            </h2>
          </div>

          <div
            style={{
              marginTop: 40,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {/* DA kolona */}
            <div
              style={{
                background: "var(--bg)",
                border: "1px solid var(--line2)",
                borderRadius: 16,
                padding: 28,
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                }}
              >
                DA, ovo je za tebe ako si
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  marginTop: 18,
                }}
              >
                {FOR_WHO.map((item) => (
                  <div
                    key={item}
                    style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        flexShrink: 0,
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: "rgba(198,255,58,0.15)",
                        border: "1px solid var(--accent)",
                        color: "var(--accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        marginTop: 1,
                      }}
                    >
                      ✓
                    </span>
                    <span
                      style={{ fontSize: 15.5, lineHeight: 1.5, color: "var(--ink)" }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* NE kolona */}
            <div
              style={{
                background: "var(--bg)",
                border: "1px solid var(--line)",
                borderRadius: 16,
                padding: 28,
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--hot)",
                }}
              >
                NE, preskoči ako
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  marginTop: 18,
                }}
              >
                {NOT_FOR.map((item) => (
                  <div
                    key={item}
                    style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        flexShrink: 0,
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid var(--line2)",
                        color: "var(--ink-dim)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        marginTop: 1,
                      }}
                    >
                      ✕
                    </span>
                    <span
                      style={{
                        fontSize: 15.5,
                        lineHeight: 1.5,
                        color: "var(--ink-mut)",
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PREDAVAČI ────────────────────────────────────────── */}
      <section
        id="predavaci"
        style={{ padding: "104px 0", borderTop: "1px solid var(--line)" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ maxWidth: 700 }}>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 12,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--accent)",
              }}
            >
              {"// Predavači"}
            </div>
            <h2
              style={{
                margin: "16px 0 0",
                fontFamily: GROTESK,
                fontWeight: 700,
                fontSize: "clamp(30px, 4.2vw, 50px)",
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
                color: "var(--ink)",
              }}
            >
              Uče te ljudi koji AI koriste svaki dan
            </h2>
            <p
              style={{
                margin: "16px 0 0",
                fontSize: 17,
                lineHeight: 1.6,
                color: "var(--ink-mut)",
              }}
            >
              Ne teoretičari: praktičari koji AI-em vode stvarne projekte i tvrtke.
            </p>
          </div>

          <div
            style={{
              marginTop: 44,
              maxWidth: 640,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 18,
            }}
          >
            {INSTRUCTORS.map((instructor) => (
              <div
                key={instructor.id}
                style={{
                  background: "var(--bg2)",
                  border: "1px solid var(--line2)",
                  borderRadius: 18,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                  {/* Avatar with next/image + initials fallback */}
                  <div
                    style={{
                      position: "relative",
                      width: 74,
                      height: 74,
                      flexShrink: 0,
                      borderRadius: "50%",
                      border: "1px solid var(--line2)",
                      overflow: "hidden",
                      background: "var(--bg3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src={instructor.imageSrc}
                      alt={instructor.name}
                      fill
                      sizes="74px"
                      style={{ objectFit: "cover" }}
                    />
                    {/* Initials shown when image missing — hidden by CSS once image loads */}
                    <span
                      aria-hidden="true"
                      className="instructor-initials"
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: GROTESK,
                        fontWeight: 700,
                        fontSize: 22,
                        color: "var(--ink-mut)",
                        zIndex: -1,
                      }}
                    >
                      {instructor.initials}
                    </span>
                  </div>

                  <div>
                    <div
                      style={{
                        fontFamily: GROTESK,
                        fontWeight: 700,
                        fontSize: 18,
                        letterSpacing: "-0.01em",
                        color: "var(--ink)",
                      }}
                    >
                      {instructor.name}
                    </div>
                    <div
                      style={{
                        fontFamily: MONO,
                        fontSize: 12,
                        color: "var(--ink-mut)",
                        marginTop: 3,
                      }}
                    >
                      {instructor.role}
                    </div>
                  </div>
                </div>

                <p
                  style={{
                    margin: 0,
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: "var(--ink-mut)",
                  }}
                >
                  {instructor.bio}
                </p>

                <div style={{ marginTop: "auto" }}>
                  <span
                    style={{
                      display: "inline-block",
                      fontFamily: MONO,
                      fontSize: 11,
                      letterSpacing: "0.06em",
                      color: "var(--accent)",
                      border: "1px solid var(--accent)",
                      borderRadius: 999,
                      padding: "5px 11px",
                    }}
                  >
                    {instructor.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AGENDA ───────────────────────────────────────────── */}
      <section
        id="agenda"
        style={{
          padding: "104px 0",
          borderTop: "1px solid var(--line)",
          background: "var(--bg2)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div style={{ maxWidth: 560 }}>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                }}
              >
                {"// Agenda"}
              </div>
              <h2
                style={{
                  margin: "16px 0 0",
                  fontFamily: GROTESK,
                  fontWeight: 700,
                  fontSize: "clamp(30px, 4.2vw, 50px)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.025em",
                  color: "var(--ink)",
                }}
              >
                Kako izgleda webinar
              </h2>
              <p
                style={{
                  margin: "16px 0 0",
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: "var(--ink-mut)",
                }}
              >
                ~90 minuta konkretnog sadržaja, uživo, plus Q&amp;A na kraju.
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {["Online · Zoom", "~90 min", "Snimka uključena"].map((badge) => (
                <span key={badge} style={TAG_PILL}>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 40, borderTop: "1px solid var(--line)" }}>
            {AGENDA.map((item) => (
              <div
                key={item.t}
                style={{
                  display: "grid",
                  gridTemplateColumns: "64px 1fr auto",
                  gap: 20,
                  alignItems: "center",
                  padding: "20px 6px",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <div
                  style={{
                    fontFamily: MONO,
                    fontWeight: 700,
                    fontSize: 19,
                    color: "var(--accent)",
                    border: "1px solid var(--line2)",
                    borderRadius: 10,
                    padding: "11px 0",
                    textAlign: "center",
                  }}
                >
                  {item.t}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: GROTESK,
                      fontWeight: 600,
                      fontSize: 18,
                      color: "var(--ink)",
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: "var(--ink-mut)",
                      marginTop: 3,
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    letterSpacing: "0.04em",
                    color: "var(--ink-dim)",
                    border: "1px solid var(--line)",
                    borderRadius: 999,
                    padding: "5px 11px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────── */}
      <section style={{ padding: "86px 0", borderTop: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 1,
              background: "var(--line)",
              border: "1px solid var(--line)",
              borderRadius: 18,
              overflow: "hidden",
            }}
          >
            {STATS.map((stat) => (
              <div
                key={stat.n}
                style={{
                  background: "var(--bg)",
                  padding: "34px 24px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: MONO,
                    fontWeight: 700,
                    fontSize: "clamp(34px, 4.4vw, 46px)",
                    lineHeight: 1,
                    color: "var(--accent)",
                  }}
                >
                  {stat.n}
                </div>
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 13.5,
                    lineHeight: 1.4,
                    color: "var(--ink-mut)",
                  }}
                >
                  {stat.l}
                </div>
              </div>
            ))}
          </div>
          <p
            style={{
              margin: "22px auto 0",
              textAlign: "center",
              fontSize: 14,
              lineHeight: 1.5,
              color: "var(--ink-dim)",
              maxWidth: 640,
            }}
          >
            Iza aiprobaj.com stoje Fraviz Studio i SEO Lick: timovi koji AI i SEO rade
            profesionalno, svaki dan.
          </p>
        </div>
      </section>

      {/* ── CERTIFIKAT ───────────────────────────────────────── */}
      <section style={{ padding: "100px 0", borderTop: "1px solid var(--line)" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            flexWrap: "wrap",
            gap: 44,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ flex: "1 1 340px" }}>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 12,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--accent)",
              }}
            >
              {"// Certifikat"}
            </div>
            <h2
              style={{
                margin: "16px 0 0",
                fontFamily: GROTESK,
                fontWeight: 700,
                fontSize: "clamp(30px, 4.2vw, 50px)",
                lineHeight: 1.02,
                letterSpacing: "-0.025em",
                color: "var(--ink)",
              }}
            >
              Potvrda o sudjelovanju
            </h2>
            <p
              style={{
                margin: "16px 0 0",
                fontSize: 17,
                lineHeight: 1.6,
                color: "var(--ink-mut)",
                maxWidth: 460,
              }}
            >
              Svi koji odgledaju webinar dobivaju digitalnu potvrdu o sudjelovanju:
              dokaz da si uložio u svoje AI vještine.
            </p>
            <div
              style={{
                marginTop: 22,
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              {["Digitalni PDF", "Na tvoje ime", "Za LinkedIn / CV"].map((badge) => (
                <span key={badge} style={TAG_PILL}>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Certificate visual */}
          <div style={{ flex: "0 1 460px", minWidth: 280, width: "100%" }}>
            <div
              style={{
                position: "relative",
                aspectRatio: "1.5 / 1",
                border: "1px solid var(--line2)",
                borderRadius: 16,
                background: "linear-gradient(140deg, var(--bg2), var(--bg))",
                padding: 26,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 30px 80px -44px rgba(0,0,0,.9)",
                overflow: "hidden",
              }}
              aria-label="Certifikat o sudjelovanju, aiprobaj.com"
              role="img"
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  right: -40,
                  top: -40,
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle,rgba(198,255,58,.14),transparent 70%)",
                }}
              />
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: GROTESK,
                    fontWeight: 700,
                    fontSize: 17,
                    letterSpacing: "-0.03em",
                    color: "var(--ink)",
                  }}
                >
                  <span style={{ color: "var(--accent)" }}>ai</span>probaj
                </span>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    color: "var(--ink-dim)",
                  }}
                >
                  CERTIFIKAT
                </span>
              </div>
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 10.5,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--ink-dim)",
                  }}
                >
                  Potvrda o sudjelovanju
                </div>
                <div
                  style={{
                    marginTop: 9,
                    fontFamily: GROTESK,
                    fontWeight: 700,
                    fontSize: "clamp(20px, 3vw, 26px)",
                    letterSpacing: "-0.02em",
                    color: "var(--ink)",
                  }}
                >
                  Ime Prezime
                </div>
                <div
                  style={{
                    marginTop: 4,
                    fontFamily: MONO,
                    fontSize: 12,
                    color: "var(--ink-mut)",
                  }}
                >
                  AI Webinar · aiprobaj.com
                </div>
              </div>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <div>
                  <div
                    style={{
                      height: 1,
                      width: 120,
                      background: "var(--line2)",
                    }}
                  />
                  <div
                    style={{
                      marginTop: 6,
                      fontFamily: MONO,
                      fontSize: 10,
                      color: "var(--ink-dim)",
                    }}
                  >
                    Fraviz Studio × SEO Lick
                  </div>
                </div>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    border: "1px solid var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent)",
                    fontFamily: MONO,
                    fontSize: 9,
                    letterSpacing: "0.04em",
                  }}
                >
                  AI ✦
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── URGENCY ──────────────────────────────────────────── */}
      <section
        style={{
          padding: "62px 0",
          borderTop: "1px solid var(--line)",
          background:
            "linear-gradient(180deg, rgba(255,92,53,.07), transparent 72%)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            flexWrap: "wrap",
            gap: 32,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ flex: "1 1 320px" }}>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--hot)",
              }}
            >
              {"// Ograničena mjesta"}
            </div>
            <h2
              style={{
                margin: "12px 0 0",
                fontFamily: GROTESK,
                fontWeight: 700,
                fontSize: "clamp(26px, 3.4vw, 40px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
              }}
            >
              Broj mjesta je ograničen
            </h2>
            <p
              style={{
                margin: "10px 0 0",
                fontSize: 16,
                lineHeight: 1.55,
                color: "var(--ink-mut)",
                maxWidth: 420,
              }}
            >
              Krećemo s malom grupom. Prijavi se i javljamo ti termin prvome.
            </p>
            <a
              href="#prijava"
              style={{
                marginTop: 22,
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                background: "var(--accent)",
                color: "var(--accent-ink)",
                fontFamily: GROTESK,
                fontWeight: 700,
                fontSize: 16,
                padding: "14px 24px",
                borderRadius: 11,
                textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              Rezerviraj mjesto →
            </a>
          </div>

          <div style={{ flex: "0 1 400px", minWidth: 280 }}>
            {/* Countdown island */}
            <Countdown variant="urgency" />
            {/* SpotsBar island */}
            <div style={{ marginTop: 22 }}>
              <SpotsBar variant="urgency" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section
        id="faq"
        style={{
          padding: "104px 0",
          borderTop: "1px solid var(--line)",
          background: "var(--bg2)",
        }}
      >
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 12,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            {"// FAQ"}
          </div>
          <h2
            style={{
              margin: "16px 0 0",
              fontFamily: GROTESK,
              fontWeight: 700,
              fontSize: "clamp(30px, 4.2vw, 50px)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              color: "var(--ink)",
            }}
          >
            Česta pitanja
          </h2>

          <div
            style={{ marginTop: 34, borderTop: "1px solid var(--line)" }}
          >
            {FAQ.map((item) => (
              <details
                key={item.q}
                style={{ borderBottom: "1px solid var(--line)" }}
              >
                <summary
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    cursor: "pointer",
                    listStyle: "none",
                    padding: "22px 4px",
                    fontFamily: GROTESK,
                    fontWeight: 600,
                    fontSize: "clamp(16px, 2vw, 19px)",
                    color: "var(--ink)",
                  }}
                >
                  <span>{item.q}</span>
                  {/* Plus / minus indicator via CSS */}
                  <span
                    aria-hidden="true"
                    className="faq-indicator"
                    style={{
                      flexShrink: 0,
                      fontFamily: MONO,
                      fontSize: 22,
                      lineHeight: 1,
                      color: "var(--ink-dim)",
                      userSelect: "none",
                    }}
                  />
                </summary>
                <p
                  style={{
                    margin: 0,
                    padding: "0 4px 24px",
                    fontSize: 15.5,
                    lineHeight: 1.6,
                    color: "var(--ink-mut)",
                    maxWidth: 700,
                  }}
                >
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── ZAVRŠNI CTA ──────────────────────────────────────── */}
      <section
        style={{
          background: "var(--accent)",
          color: "var(--accent-ink)",
          padding: "clamp(64px, 9vw, 112px) 0",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "0 24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 12,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(10,10,10,0.6)",
            }}
          >
            {"// Besplatno · online · uživo"}
          </div>
          <h2
            style={{
              margin: "18px 0 0",
              fontFamily: GROTESK,
              fontWeight: 700,
              fontSize: "clamp(34px, 6vw, 68px)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: "#0A0A0A",
            }}
          >
            Spreman probati AI kako treba
          </h2>
          <p
            style={{
              margin: "18px auto 0",
              maxWidth: 520,
              fontSize: 18,
              lineHeight: 1.5,
              color: "rgba(10,10,10,0.72)",
            }}
          >
            Rezerviraj svoje besplatno mjesto i nauči AI od ljudi koji ga koriste
            svaki dan.
          </p>
          <a
            href="#prijava"
            style={{
              marginTop: 30,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#0A0A0A",
              color: "var(--accent)",
              fontFamily: GROTESK,
              fontWeight: 700,
              fontSize: 17,
              padding: "17px 30px",
              borderRadius: 13,
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            Rezerviraj besplatno mjesto →
          </a>
          <div
            style={{
              marginTop: 18,
              fontFamily: MONO,
              fontSize: 12,
              color: "rgba(10,10,10,0.6)",
            }}
          >
            Bez rizika. Besplatno. Snimka za sve prijavljene.
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer
        style={{
          background: "var(--bg)",
          borderTop: "1px solid var(--line)",
          padding: "46px 0",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            flexWrap: "wrap",
            gap: 26,
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: GROTESK,
                fontWeight: 700,
                fontSize: 19,
                letterSpacing: "-0.03em",
                color: "var(--ink)",
              }}
            >
              <span style={{ color: "var(--accent)" }}>ai</span>probaj
              <span style={{ color: "var(--ink-dim)", fontWeight: 500 }}>.com</span>
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 13,
                lineHeight: 1.5,
                color: "var(--ink-dim)",
                maxWidth: 360,
              }}
            >
              Središnje mjesto za učenje AI-a. Projekt Fraviz Studija u suradnji sa
              SEO Lick.
            </div>
            <div
              style={{
                marginTop: 12,
                fontFamily: MONO,
                fontSize: 11,
                lineHeight: 1.6,
                color: "var(--ink-dim)",
                maxWidth: 360,
              }}
            >
              Fraviz, obrt za usluge · OIB 01080689479
              <br />
              Ul. dr. Ante Starčevića 18, Drage, Hrvatska
            </div>
          </div>
          <nav
            aria-label="Footer navigacija"
            style={{ display: "flex", gap: 22, flexWrap: "wrap", alignItems: "center" }}
          >
            {[
              { href: "#program", label: "Program" },
              { href: "#predavaci", label: "Predavači" },
              { href: "#agenda", label: "Agenda" },
              { href: "#faq", label: "FAQ" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  textDecoration: "none",
                  fontSize: 14,
                  color: "var(--ink-mut)",
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#prijava"
              style={{
                textDecoration: "none",
                fontSize: 14,
                color: "var(--accent)",
              }}
            >
              Prijava
            </a>
          </nav>
        </div>
        <div
          style={{
            maxWidth: 1200,
            margin: "28px auto 0",
            padding: "20px 24px 0",
            borderTop: "1px solid var(--line)",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 10,
            fontFamily: MONO,
            fontSize: 11.5,
            color: "var(--ink-dim)",
          }}
        >
          <span>© 2026 aiprobaj.com</span>
          <a href="/privatnost" style={{ color: "var(--ink-mut)", textDecoration: "none" }}>
            Politika privatnosti
          </a>
          <a
            href="https://www.fraviz.com"
            target="_blank"
            rel="noopener"
            style={{ color: "var(--ink-mut)", textDecoration: "none" }}
          >
            Design by Fraviz Studio
          </a>
        </div>
      </footer>
    </>
  );
}
