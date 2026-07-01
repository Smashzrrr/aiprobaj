"use client";

import { useState } from "react";

const NAV_LINKS = [
  { href: "#program", label: "Program" },
  { href: "#predavaci", label: "Predavači" },
  { href: "#agenda", label: "Agenda" },
  { href: "#faq", label: "FAQ" },
] as const;

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <>
      {/* Hamburger button — visible only below 720px */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Zatvori meni" : "Otvori meni"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        style={{
          display: "none",
          alignItems: "center",
          justifyContent: "center",
          width: 44,
          height: 44,
          background: "transparent",
          border: "1px solid var(--line2)",
          borderRadius: 9,
          cursor: "pointer",
          flexShrink: 0,
        }}
        className="mobile-hamburger"
      >
        {/* Three-line hamburger / X icon */}
        <span
          aria-hidden="true"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            width: 18,
          }}
        >
          <span
            style={{
              display: "block",
              height: 2,
              background: "var(--ink)",
              borderRadius: 2,
              transformOrigin: "center",
              transform: open ? "translateY(7px) rotate(45deg)" : "none",
              transition: "transform 0.18s",
            }}
          />
          <span
            style={{
              display: "block",
              height: 2,
              background: "var(--ink)",
              borderRadius: 2,
              opacity: open ? 0 : 1,
              transition: "opacity 0.18s",
            }}
          />
          <span
            style={{
              display: "block",
              height: 2,
              background: "var(--ink)",
              borderRadius: 2,
              transformOrigin: "center",
              transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
              transition: "transform 0.18s",
            }}
          />
        </span>
      </button>

      {/* Mobile dropdown menu */}
      {open && (
        <div
          id="mobile-menu"
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            background: "rgba(8,8,10,0.97)",
            borderBottom: "1px solid var(--line)",
            padding: "16px 24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            zIndex: 49,
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
          className="mobile-menu-panel"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={close}
              style={{
                textDecoration: "none",
                fontSize: 16,
                fontWeight: 500,
                color: "var(--ink-mut)",
                padding: "12px 0",
                borderBottom: "1px solid var(--line)",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#prijava"
            onClick={close}
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--accent)",
              color: "var(--accent-ink)",
              fontFamily: "var(--font-grotesk), system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 14,
              padding: "12px 16px",
              borderRadius: 9,
              letterSpacing: "-0.01em",
              marginTop: 12,
            }}
          >
            Rezerviraj mjesto
          </a>
        </div>
      )}
    </>
  );
}
