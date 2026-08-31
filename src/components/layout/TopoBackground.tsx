import { useMemo } from "react";
import { generateTopoContours } from "@/lib/contours";

interface TopoBackgroundProps {
  /** Section theme — controls line color so it reads on both dark and light. */
  theme: "light" | "dark";
  /** Distinguishes instances so different sections get different (but stable) fields. */
  seed: number;
}

/**
 * A faint, real topographic contour field — the site's persistent visual
 * identity, replacing the old dot-grid canvas. One instance per section:
 * absolutely positioned behind that section's content, never crossing
 * itself (lines are literal iso-elevation level sets), never more than a
 * faint watermark.
 */
export default function TopoBackground({ theme, seed }: TopoBackgroundProps) {
  const lines = useMemo(() => generateTopoContours(seed, 100, 100), [seed]);
  const stroke = theme === "dark" ? "var(--dark-text)" : "var(--light-text)";

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {lines.map((line, i) => (
        <path
          key={i}
          d={line.d}
          fill="none"
          stroke={stroke}
          strokeWidth={line.major ? 0.22 : 0.1}
          opacity={line.major ? 0.16 : 0.08}
        />
      ))}
    </svg>
  );
}
