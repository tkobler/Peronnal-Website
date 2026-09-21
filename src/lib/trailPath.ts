import { mulberry32 } from "./contours";

interface Point {
  x: number;
  y: number;
}

function midpoint(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

/** Smooths an ordered point list into a rounded SVG path via quadratic midpoint smoothing. */
function smoothPath(points: Point[]): string {
  if (points.length < 2) return "";
  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const m = midpoint(points[i], points[i + 1]);
    d += ` Q ${points[i].x.toFixed(2)} ${points[i].y.toFixed(2)} ${m.x.toFixed(2)} ${m.y.toFixed(2)}`;
  }
  const last = points[points.length - 1];
  return d + ` L ${last.x.toFixed(2)} ${last.y.toFixed(2)}`;
}

/**
 * Generates a gently meandering vertical path — a hiking trail traced down
 * a topo map, not a ruler-straight line. A sum of a few low-frequency sine
 * terms with random phase/frequency (rather than one clean sine wave) keeps
 * the wander irregular and non-repeating, closer to a real trail than an
 * obviously mathematical squiggle. Deterministic and seeded, same as the
 * contour generator, so it's stable across server/client renders.
 */
export function generateTrailPath(seed: number, width: number, height: number, segments = 24): string {
  const rand = mulberry32(seed);
  const centerX = width / 2;

  // One dominant low-frequency term for the main wander, plus two smaller,
  // higher-frequency ones layered on top for organic texture. Deliberately
  // NOT normalized by the sum of amplitudes — three sines rarely peak
  // together, so dividing by their sum would crush the real range down to
  // a fraction of what it looks like it should be. The 0.22 multiplier is
  // sized against the worst-case combined amplitude (1.0 + 0.4 + 0.18 =
  // 1.58) to comfortably stay within the viewBox.
  const terms = [
    { freq: 1 + rand() * 1.2, phase: rand() * Math.PI * 2, amp: 1.0 },
    { freq: 2.5 + rand() * 2, phase: rand() * Math.PI * 2, amp: 0.4 },
    { freq: 5 + rand() * 3, phase: rand() * Math.PI * 2, amp: 0.18 },
  ];
  const amplitude = width * 0.22;

  const points: Point[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    let wander = 0;
    for (const term of terms) {
      wander += Math.sin(t * Math.PI * term.freq + term.phase) * term.amp;
    }
    points.push({ x: centerX + wander * amplitude, y: t * height });
  }
  return smoothPath(points);
}
