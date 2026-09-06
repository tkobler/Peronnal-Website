"use client";

import type { ReactNode } from "react";
import { useViewTransitionRouter } from "@/hooks/useViewTransitionRouter";
import { useLanguage } from "@/context/LanguageContext";

/* ============================================================================
   CONTACT FAB — the floating "Get in touch" button pinned to the bottom-right
   corner of the home page.

   ┌─ WANT TO CHANGE HOW IT LOOKS? Three knobs, right below this comment ────┐
   │                                                                         │
   │   SHAPE       — outline of the button  ("pill" | "circle" | "squircle") │
   │   ICON        — glyph inside it        ("mail" | "paperPlane" | ...)    │
   │   STATUS_DOT  — the small green "available" dot                         │
   │                                                                         │
   │ "pill" shows the icon plus a written label; "circle" and "squircle" are │
   │ icon-only (and much easier to miss — the label is what makes the button │
   │ findable). The label text is the existing `nav.getInTouch` translation,  │
   │ so it follows EN/FR automatically.                                      │
   │                                                                         │
   │ To add a glyph of your own, drop an SVG path into the ICONS map below   │
   │ and add its name to the FabIcon union. Size, colours and distance from  │
   │ the corner live in globals.css under "CONTACT FAB".                     │
   └─────────────────────────────────────────────────────────────────────────┘
   ========================================================================== */

type FabShape = "pill" | "circle" | "squircle";
type FabIcon = "mail" | "paperPlane" | "chat" | "arrow";

/** Outline of the button. "pill" carries the written label; the others don't. */
const SHAPE: FabShape = "pill";

/** Glyph inside the button. */
const ICON: FabIcon = "mail";

/** The green dot borrowed from the nav menu's contact button — "I'm reachable". */
const STATUS_DOT = true;

/* ── Glyphs ────────────────────────────────────────────────────────────────
   Every icon is a 24×24 outline drawn with `currentColor`, so it inherits the
   button's colour on hover. Keep new ones in the same style: no fills, 1.75
   stroke width, round caps.
   ------------------------------------------------------------------------ */
const ICONS: Record<FabIcon, ReactNode> = {
  // Envelope — the default. Reads as "contact" everywhere, no explanation needed.
  mail: (
    <path d="M3 8.5l8.4 5.2a2 2 0 002.2 0L22 8.5M5.5 19h13a2.5 2.5 0 002.5-2.5v-9A2.5 2.5 0 0018.5 5h-13A2.5 2.5 0 003 7.5v9A2.5 2.5 0 005.5 19z" />
  ),

  // Paper plane — a bit more playful. Nudged with a translate so the diagonal
  // shape looks optically centred inside a round button.
  paperPlane: (
    <g transform="translate(-0.5, 0.5)">
      <path d="M21.5 3.5L2.5 10.2l7.1 2.9M21.5 3.5l-3.4 16.9-6.2-6.1M21.5 3.5L9.6 13.1m0 0v5.4l3.2-3.2" />
    </g>
  ),

  // Speech bubble — friendlier, reads as "let's chat".
  chat: (
    <path d="M21 11.5a7.5 7.5 0 01-8.5 7.4L7 21l.9-3.4A7.5 7.5 0 1121 11.5z" />
  ),

  // Arrow up-right — abstract "go somewhere", pairs well with a pill shape.
  arrow: <path d="M8 16L16 8M9.5 8H16v6.5" />,
};

export default function ContactFab() {
  const router = useViewTransitionRouter();
  const { t } = useLanguage();

  // Real href so middle-click / "open in new tab" still work; the click handler
  // takes over for the in-app view transition. Same pattern as the nav menu.
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    router.push("/contact");
  };

  return (
    <a
      href="/contact"
      onClick={handleClick}
      className="contact-fab"
      data-shape={SHAPE}
      aria-label={t.nav.getInTouch}
      title={t.nav.getInTouch}
    >
      {/* width/height give the glyph an intrinsic size, so it stays small even
          if the stylesheet has not arrived yet — an SVG with only a viewBox
          falls back to 300×150. `.contact-fab svg` still wins once CSS loads. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {ICONS[ICON]}
      </svg>

      {SHAPE === "pill" && (
        <span className="contact-fab-label">{t.nav.getInTouch}</span>
      )}

      {STATUS_DOT && <span className="contact-fab-dot" aria-hidden="true" />}
    </a>
  );
}
