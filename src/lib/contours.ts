/**
 * Real topographic contour generation: a smooth 2D height field (sum of a
 * few broad Gaussian "peaks"), sampled on a grid, then traced into iso-lines
 * via marching squares. Because every line is a level set of one continuous
 * field, lines can nest around a peak or merge at a saddle, but they can
 * never cross each other — same as a real elevation map.
 *
 * Deterministic and seeded: same seed always produces the same field, so
 * output is stable across server/client renders (no hydration mismatch).
 */

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

interface Peak {
  x: number;
  y: number;
  height: number;
  radius: number;
}

export interface ContourLine {
  d: string;
  /** Every Nth level is a thicker "index" line, matching topo-map convention. */
  major: boolean;
}

function midpoint(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

/** Smooths an open polyline into a rounded SVG path via quadratic midpoint smoothing. */
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

/** Sum of broad Gaussian bumps — a few sweeping peaks, not dense/noisy terrain. */
function makeHeightField(peaks: Peak[]) {
  return (x: number, y: number): number => {
    let h = 0;
    for (const p of peaks) {
      const dx = x - p.x;
      const dy = y - p.y;
      h += p.height * Math.exp(-(dx * dx + dy * dy) / (2 * p.radius * p.radius));
    }
    return h;
  };
}

/** One cell's line segments for a given threshold — 0, 1, or 2 segments (2 at an ambiguous saddle). */
function cellSegments(
  a: number,
  b: number,
  c: number,
  d: number,
  x0: number,
  y0: number,
  cw: number,
  ch: number,
  threshold: number
): [Point, Point][] {
  const above = (v: number) => v >= threshold;
  const topCross = above(a) !== above(b);
  const rightCross = above(b) !== above(c);
  const bottomCross = above(d) !== above(c);
  const leftCross = above(a) !== above(d);

  const lerp = (v0: number, v1: number) => (threshold - v0) / (v1 - v0);
  const topPt = topCross ? { x: x0 + cw * lerp(a, b), y: y0 } : null;
  const rightPt = rightCross ? { x: x0 + cw, y: y0 + ch * lerp(b, c) } : null;
  const bottomPt = bottomCross ? { x: x0 + cw * lerp(d, c), y: y0 + ch } : null;
  const leftPt = leftCross ? { x: x0, y: y0 + ch * lerp(a, d) } : null;

  const crossCount = [topCross, rightCross, bottomCross, leftCross].filter(Boolean).length;
  const segs: [Point, Point][] = [];

  if (crossCount === 2) {
    const pts = [topPt, rightPt, bottomPt, leftPt].filter((p): p is Point => p !== null);
    segs.push([pts[0], pts[1]]);
  } else if (crossCount === 4) {
    // Saddle point — disambiguate via the cell's average value.
    const center = (a + b + c + d) / 4;
    if (center >= threshold) {
      segs.push([topPt!, leftPt!]);
      segs.push([rightPt!, bottomPt!]);
    } else {
      segs.push([topPt!, rightPt!]);
      segs.push([leftPt!, bottomPt!]);
    }
  }
  return segs;
}

/** Stitches unordered segments sharing endpoints into continuous polylines. */
function stitchSegments(segments: [Point, Point][]): Point[][] {
  const key = (p: Point) => `${p.x.toFixed(3)},${p.y.toFixed(3)}`;
  const adjacency = new Map<string, { point: Point; other: Point }[]>();

  const addEntry = (from: Point, to: Point) => {
    const k = key(from);
    if (!adjacency.has(k)) adjacency.set(k, []);
    adjacency.get(k)!.push({ point: from, other: to });
  };
  for (const [p1, p2] of segments) {
    addEntry(p1, p2);
    addEntry(p2, p1);
  }

  const used = new Set<[Point, Point]>();
  const polylines: Point[][] = [];

  for (const seg of segments) {
    if (used.has(seg)) continue;
    used.add(seg);
    const line: Point[] = [seg[0], seg[1]];

    // Extend forward from the end.
    let extended = true;
    while (extended) {
      extended = false;
      const tail = line[line.length - 1];
      const candidates = adjacency.get(key(tail)) ?? [];
      for (const cand of candidates) {
        const match = segments.find(
          (s) =>
            !used.has(s) &&
            ((key(s[0]) === key(tail) && key(s[1]) === key(cand.other)) ||
              (key(s[1]) === key(tail) && key(s[0]) === key(cand.other)))
        );
        if (match) {
          used.add(match);
          line.push(cand.other);
          extended = true;
          break;
        }
      }
    }
    polylines.push(line);
  }
  return polylines;
}

/**
 * Traces one iso-contour (all lines at a single elevation threshold) across
 * a sampled height-field grid.
 */
function traceLevel(
  grid: number[][],
  cols: number,
  rows: number,
  width: number,
  height: number,
  threshold: number
): Point[][] {
  const cw = width / cols;
  const ch = height / rows;
  const segments: [Point, Point][] = [];

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const a = grid[j][i];
      const b = grid[j][i + 1];
      const c = grid[j + 1][i + 1];
      const d = grid[j + 1][i];
      segments.push(...cellSegments(a, b, c, d, i * cw, j * ch, cw, ch, threshold));
    }
  }
  return stitchSegments(segments);
}

/**
 * Generates a full topographic contour field: a handful of broad peaks,
 * traced at evenly spaced elevation levels. Every `indexEvery`-th level is
 * flagged `major` (thicker/more opaque), echoing the index-contour
 * convention on real topo maps.
 */
export function generateTopoContours(
  seed: number,
  width: number,
  height: number,
  options: { peakCount?: number; levels?: number; indexEvery?: number; gridCols?: number; gridRows?: number } = {}
): ContourLine[] {
  const { peakCount = 3, levels = 11, indexEvery = 4, gridCols = 56, gridRows = 40 } = options;
  const rand = mulberry32(seed);

  const peaks: Peak[] = Array.from({ length: peakCount }, () => ({
    x: width * (0.1 + rand() * 0.8),
    y: height * (0.1 + rand() * 0.8),
    height: 0.6 + rand() * 0.4,
    // Broad radii — sweeping, large-scale lines rather than dense/tight detail.
    radius: width * (0.28 + rand() * 0.24),
  }));
  const field = makeHeightField(peaks);

  const grid: number[][] = [];
  for (let j = 0; j <= gridRows; j++) {
    const row: number[] = [];
    for (let i = 0; i <= gridCols; i++) {
      row.push(field((i / gridCols) * width, (j / gridRows) * height));
    }
    grid.push(row);
  }

  let min = Infinity;
  let max = -Infinity;
  for (const row of grid) for (const v of row) { if (v < min) min = v; if (v > max) max = v; }

  const lines: ContourLine[] = [];
  for (let l = 1; l <= levels; l++) {
    const threshold = min + (max - min) * (l / (levels + 1));
    const polylines = traceLevel(grid, gridCols, gridRows, width, height, threshold);
    const major = l % indexEvery === 0;
    for (const line of polylines) {
      if (line.length < 3) continue; // skip near-degenerate slivers
      lines.push({ d: smoothPath(line), major });
    }
  }
  return lines;
}
