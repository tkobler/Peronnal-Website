/**
 * Deterministic, seeded generators for topographic-style contour paths.
 * Pure functions — same seed always produces the same path, so output is
 * stable across server/client renders (no hydration mismatch).
 */

/** Mulberry32 PRNG — small, fast, good-enough distribution for visual noise. */
function mulberry32(seed: number): () => number {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Point {
  x: number;
  y: number;
}

function midpoint(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

/** Smooths a closed polygon into a rounded SVG path via quadratic midpoint smoothing. */
function smoothClosedPath(points: Point[]): string {
  const n = points.length;
  const start = midpoint(points[n - 1], points[0]);
  let d = `M ${start.x.toFixed(2)} ${start.y.toFixed(2)}`;
  for (let i = 0; i < n; i++) {
    const next = points[(i + 1) % n];
    const m = midpoint(points[i], next);
    d += ` Q ${points[i].x.toFixed(2)} ${points[i].y.toFixed(2)} ${m.x.toFixed(2)} ${m.y.toFixed(2)}`;
  }
  return d + " Z";
}

/** Smooths an open polyline into a rounded SVG path via quadratic midpoint smoothing. */
function smoothOpenPath(points: Point[]): string {
  const n = points.length;
  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
  for (let i = 0; i < n - 1; i++) {
    const m = midpoint(points[i], points[i + 1]);
    d += ` Q ${points[i].x.toFixed(2)} ${points[i].y.toFixed(2)} ${m.x.toFixed(2)} ${m.y.toFixed(2)}`;
  }
  const last = points[n - 1];
  return d + ` L ${last.x.toFixed(2)} ${last.y.toFixed(2)}`;
}

/**
 * Generates one irregular closed contour ring, organic rather than circular —
 * radius is perturbed by a few summed sine harmonics so it reads as elevation
 * data rather than a hand-drawn blob.
 */
export function generateContourRing(
  seed: number,
  cx: number,
  cy: number,
  baseRadius: number,
  irregularity: number,
  segments = 48
): string {
  const rand = mulberry32(seed);
  // A random, non-fixed set of harmonics per ring — otherwise every ring
  // reads as a scaled copy of the same "3-5 lobed blob" and the field looks
  // like sonar/radar rings instead of independently irregular terrain.
  const harmonicCount = 3 + Math.floor(rand() * 2);
  const harmonics = Array.from({ length: harmonicCount }, () => {
    const freq = 2 + Math.floor(rand() * 6);
    return {
      freq,
      phase: rand() * Math.PI * 2,
      amp: (rand() * 0.7 + 0.3) / freq,
    };
  });

  const points: Point[] = [];
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    let offset = 0;
    for (const h of harmonics) {
      offset += Math.sin(angle * h.freq + h.phase) * h.amp;
    }
    const r = baseRadius * (1 + offset * irregularity);
    points.push({
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    });
  }
  return smoothClosedPath(points);
}

/**
 * Generates a set of nested-but-not-concentric contour rings around a shared
 * rough center — like a real topo map, each ring drifts slightly rather than
 * sharing one exact center.
 */
export function generateContourField(
  seed: number,
  viewW: number,
  viewH: number,
  count = 5
): string[] {
  const rand = mulberry32(seed);
  const cx = viewW * (0.4 + rand() * 0.2);
  const cy = viewH * (0.35 + rand() * 0.2);
  const rings: string[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const baseRadius = viewW * (0.14 + t * 0.4);
    // Drift grows with radius so outer rings wander further from the rough
    // center — breaks the "perfectly nested" sonar-ring read.
    const driftX = (rand() - 0.5) * viewW * (0.08 + t * 0.22);
    const driftY = (rand() - 0.5) * viewH * (0.08 + t * 0.22);
    rings.push(
      generateContourRing(seed + i * 97, cx + driftX, cy + driftY, baseRadius, 0.26, 48)
    );
  }
  return rings;
}

/**
 * Generates a single open elevation-profile line spanning a width — rises
 * and falls like a mountain silhouette read as a line graph, not a filled
 * shape. Used for the hero's animated "ascent path" reveal.
 */
export function generateAscentPath(
  seed: number,
  width: number,
  height: number,
  baseline: number,
  steps = 10
): string {
  const rand = mulberry32(seed);
  const points: Point[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width;
    // Weight toward higher (lower y) excursions in the middle third for a
    // recognizable "climb, summit, descend" read rather than pure noise.
    const centerWeight = 1 - Math.abs(i / steps - 0.5) * 1.4;
    const y = baseline - rand() * height * Math.max(0.15, centerWeight);
    points.push({ x, y });
  }
  return smoothOpenPath(points);
}
