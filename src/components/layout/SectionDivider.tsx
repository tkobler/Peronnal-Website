"use client";

import { useMemo } from "react";
import { generateAscentPath } from "@/lib/contours";

interface SectionDividerProps {
  /** Theme of the section being entered — the line is drawn in that theme's text color. */
  theme: "light" | "dark";
  /** Distinguishes dividers so each gets a visually distinct (but stable) line. */
  seed: number;
}

/**
 * A single hairline contour-style line sitting at the seam between two
 * alternating sections. Deliberately just one thin line, not a field — the
 * hero gets the full contour treatment, everywhere else gets this
 * restrained echo of it.
 */
export default function SectionDivider({ theme, seed }: SectionDividerProps) {
  const d = useMemo(
    () => generateAscentPath(seed, 100, 16, 18, 8),
    [seed]
  );
  const stroke = theme === "dark" ? "var(--dark-text)" : "var(--light-text)";

  return (
    <div aria-hidden="true" className="relative h-[clamp(2rem,5vw,3.5rem)] overflow-hidden">
      <svg
        viewBox="0 0 100 24"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path d={d} fill="none" stroke={stroke} strokeWidth={0.5} opacity={0.22} />
      </svg>
    </div>
  );
}
