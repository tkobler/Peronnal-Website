import { useMemo } from "react";
import { generateContourField } from "@/lib/contours";

interface ContourFieldProps {
  /** Text color token to draw in — should match the section's theme. */
  stroke?: string;
}

/**
 * A faint field of topographic contour rings, sat behind hero content.
 * Static (no animation) — the "wow" moment is the AscentLine drawing over
 * it, not this field moving. Purely decorative: aria-hidden, no pointer
 * events, generated once per mount from a fixed seed so it never shifts
 * on re-render.
 */
export default function ContourField({ stroke = "var(--light-text)" }: ContourFieldProps) {
  const rings = useMemo(() => generateContourField(1970, 100, 100, 6), []);

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {rings.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={stroke}
          strokeWidth={0.12}
          opacity={0.05 + (i % 3) * 0.015}
        />
      ))}
    </svg>
  );
}
