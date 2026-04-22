"use client";

import { useEffect, useRef, useCallback, useMemo, useState } from "react";
import type { Schematic } from "@/data/projects";

// ============================================
// TYPES
// ============================================
interface GridPoint {
  cx: number;
  cy: number;
}

interface ShapeFlags {
  isShape: boolean[];
  isPad: boolean[];
  isRegion: boolean[];
}

interface SectionInfo {
  top: number;
  bottom: number;
  theme: string;
  projectId?: string;
}

interface ComputedSchematic {
  flags: ShapeFlags;
  pixelPaths: [number, number, number, number][];
  /** Extra infill points inside regions, rendered only during reveal for higher density. */
  infillPoints: GridPoint[];
}

// Reveal state machine: idle → revealing → revealed → fading → idle
type RevealPhase = "idle" | "revealing" | "revealed" | "fading";

// ============================================
// CONSTANTS
// ============================================
const GRID_SPACING = 14;
const DOT_RADIUS = 1;
const PAD_RADIUS = 2;
const BASE_OPACITY = 0.12;
const SHAPE_REVEAL_OPACITY = 0.45;
const REGION_FILL_OPACITY = 0.32;  // softer than outline for pointillist fill
const CURSOR_GLOW_RADIUS = 100;
const GLOW_MAX_OPACITY = 0.25;
const SHAPE_GLOW_OPACITY = 0.35;
const SHAPE_THRESHOLD = 9;
const PAD_THRESHOLD = 14;
const TRANSITION_ZONE = 120;

// Reveal behaviour — tuned for subtle, discoverable feel
const DISCOVERY_RADIUS = 25;
const SUSTAIN_RADIUS = 80;
const WAVE_SPEED = 350;
const FADE_WAVE_SPEED = 800;
const WAVE_SOFT_EDGE = 80;
const SECTION_COVERAGE = 0.85;
const SCROLL_DEBOUNCE = 80;
const DWELL_TIME = 300; // ms cursor must linger near trace before reveal

// ============================================
// GEOMETRY HELPERS
// ============================================

function distToSegment(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return Math.hypot(px - x1, py - y1);
  const t = Math.max(
    0,
    Math.min(1, ((px - x1) * dx + (py - y1) * dy) / lenSq)
  );
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

/** Ray-casting point-in-polygon test. */
function pointInPolygon(px: number, py: number, polygon: [number, number][]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

// ============================================
// GRID BUILDING
// ============================================

function buildGridPoints(w: number, h: number): GridPoint[] {
  const cols = Math.floor(w / GRID_SPACING);
  const rows = Math.floor(h / GRID_SPACING);
  const offsetX = (w - (cols - 1) * GRID_SPACING) / 2;
  const offsetY = (h - (rows - 1) * GRID_SPACING) / 2;

  const points: GridPoint[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      points.push({
        cx: offsetX + col * GRID_SPACING,
        cy: offsetY + row * GRID_SPACING,
      });
    }
  }
  return points;
}

function computeSchematic(
  grid: GridPoint[],
  schematic: Schematic,
  w: number,
  h: number
): ComputedSchematic {
  const pixelPaths = schematic.paths.map(
    ([x1, y1, x2, y2]) =>
      [
        (x1 * w) / 100,
        (y1 * h) / 100,
        (x2 * w) / 100,
        (y2 * h) / 100,
      ] as [number, number, number, number]
  );
  const pads = schematic.pads.map(
    ([x, y]) => [(x * w) / 100, (y * h) / 100] as const
  );

  // Pre-compute pixel regions (polygons converted from % to px)
  const pixelRegions = (schematic.regions ?? []).map((poly) =>
    poly.map(([x, y]) => [(x * w) / 100, (y * h) / 100] as [number, number])
  );

  const isShape: boolean[] = new Array(grid.length);
  const isPad: boolean[] = new Array(grid.length);
  const isRegion: boolean[] = new Array(grid.length);

  for (let i = 0; i < grid.length; i++) {
    const { cx, cy } = grid[i];

    let minDist = Infinity;
    for (const [x1, y1, x2, y2] of pixelPaths) {
      const d = distToSegment(cx, cy, x1, y1, x2, y2);
      if (d < minDist) minDist = d;
    }
    const onShape = minDist <= SHAPE_THRESHOLD;

    let onPad = false;
    for (const [px, py] of pads) {
      if (Math.hypot(cx - px, cy - py) <= PAD_THRESHOLD) {
        onPad = true;
        break;
      }
    }

    let inRegion = false;
    for (const poly of pixelRegions) {
      if (pointInPolygon(cx, cy, poly)) {
        inRegion = true;
        break;
      }
    }

    // Bitmap sampling: check if dot falls on an active bitmap pixel
    let inBitmap = false;
    const bm = schematic.bitmap;
    if (bm) {
      const bmLeft = (bm.x * w) / 100;
      const bmTop = (bm.y * h) / 100;
      const bmW = (bm.w * w) / 100;
      const bmH = (bm.h * h) / 100;
      if (cx >= bmLeft && cx < bmLeft + bmW && cy >= bmTop && cy < bmTop + bmH) {
        const col = Math.floor(((cx - bmLeft) / bmW) * bm.cols);
        const row = Math.floor(((cy - bmTop) / bmH) * bm.rows);
        const idx = row * bm.cols + col;
        if (idx >= 0 && idx < bm.data.length && bm.data[idx] === "1") {
          inBitmap = true;
        }
      }
    }

    isShape[i] = onShape || onPad || inRegion || inBitmap;
    isPad[i] = onPad;
    isRegion[i] = inRegion;
  }

  // Build infill sub-grid: half-spacing points inside regions/bitmap only.
  // These are NOT on the main grid — they fill in between existing dots.
  const INFILL_SPACING = GRID_SPACING / 2;
  const infillPoints: GridPoint[] = [];
  const hasFillAreas = pixelRegions.length > 0 || !!schematic.bitmap;
  if (hasFillAreas) {
    const infillCols = Math.floor(w / INFILL_SPACING);
    const infillRows = Math.floor(h / INFILL_SPACING);
    const offX = (w - (infillCols - 1) * INFILL_SPACING) / 2;
    const offY = (h - (infillRows - 1) * INFILL_SPACING) / 2;
    const bm = schematic.bitmap;
    for (let row = 0; row < infillRows; row++) {
      for (let col = 0; col < infillCols; col++) {
        if (row % 2 === 0 && col % 2 === 0) continue;
        const cx = offX + col * INFILL_SPACING;
        const cy = offY + row * INFILL_SPACING;
        let inside = false;
        for (const poly of pixelRegions) {
          if (pointInPolygon(cx, cy, poly)) { inside = true; break; }
        }
        if (!inside && bm) {
          const bmLeft = (bm.x * w) / 100;
          const bmTop = (bm.y * h) / 100;
          const bmW = (bm.w * w) / 100;
          const bmH = (bm.h * h) / 100;
          if (cx >= bmLeft && cx < bmLeft + bmW && cy >= bmTop && cy < bmTop + bmH) {
            const bc = Math.floor(((cx - bmLeft) / bmW) * bm.cols);
            const br = Math.floor(((cy - bmTop) / bmH) * bm.rows);
            const bi = br * bm.cols + bc;
            if (bi >= 0 && bi < bm.data.length && bm.data[bi] === "1") inside = true;
          }
        }
        if (inside) infillPoints.push({ cx, cy });
      }
    }
  }

  return { flags: { isShape, isPad, isRegion }, pixelPaths, infillPoints };
}

// ============================================
// SCROLL COLOR
// ============================================

function getSectionBlend(
  screenY: number,
  sections: SectionInfo[]
): number {
  for (const section of sections) {
    if (
      screenY >= section.top + TRANSITION_ZONE &&
      screenY <= section.bottom - TRANSITION_ZONE
    ) {
      return section.theme === "light" ? 1 : 0;
    }
    if (screenY >= section.top && screenY < section.top + TRANSITION_ZONE) {
      const t = (screenY - section.top) / TRANSITION_ZONE;
      const prev =
        sections.find((s) => Math.abs(s.bottom - section.top) < 2)?.theme ??
        section.theme;
      const from = prev === "light" ? 1 : 0;
      const to = section.theme === "light" ? 1 : 0;
      return from + (to - from) * t;
    }
    if (
      screenY > section.bottom - TRANSITION_ZONE &&
      screenY <= section.bottom
    ) {
      const t =
        (screenY - (section.bottom - TRANSITION_ZONE)) / TRANSITION_ZONE;
      const next =
        sections.find((s) => Math.abs(s.top - section.bottom) < 2)?.theme ??
        section.theme;
      const from = section.theme === "light" ? 1 : 0;
      const to = next === "light" ? 1 : 0;
      return from + (to - from) * t;
    }
  }
  return 0;
}

// ============================================
// COMPONENT
// ============================================

interface DotPatternProps {
  schematics?: Record<string, Schematic>;
  /** Set to false to disable schematic reveal (dots + glow still render). */
  enableReveal?: boolean;
}

export default function DotPattern({
  schematics = {},
  enableReveal = true,
}: DotPatternProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Two canvases: normal dots on top, shape animation behind content
  const normalCanvasRef = useRef<HTMLCanvasElement>(null);
  const shapeCanvasRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<GridPoint[]>([]);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const sectionsRef = useRef<SectionInfo[]>([]);
  const animRef = useRef<number>(0);
  const isRunningRef = useRef(false);

  // Active schematic
  const activeIdRef = useRef<string | null>(null);
  const computedRef = useRef<ComputedSchematic | null>(null);

  // Cache per viewport-size + project
  const cacheKeyRef = useRef("");
  const shapeCacheRef = useRef<Map<string, ComputedSchematic>>(new Map());

  // Reveal state
  const phaseRef = useRef<RevealPhase>("idle");
  const waveOriginRef = useRef({ x: 0, y: 0 });
  const waveStartRef = useRef(0);
  const waveMaxDistRef = useRef(0);
  const frozenWaveRadiusRef = useRef(0);
  const fadeStartRef = useRef(0);

  // Scroll tracking
  const isScrollingRef = useRef(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Dwell tracking — cursor must linger near a trace before reveal triggers
  const dwellStartRef = useRef<number | null>(null);

  // Pulse mode state
  const pulseActiveRef = useRef(false);
  const pulseStartRef = useRef(0);
  const pulseFadeStartRef = useRef(0);

  // Parallax
  const parallaxYRef = useRef(0);

  // Signal burst rings — triggered by external events (e.g. contact button hover)
  const burstRingsRef = useRef<{ x: number; y: number; startTime: number }[]>([]);
  const BURST_SPEED = 1200;      // px/s — fast propagation
  const BURST_RING_WIDTH = 60;   // px — width of each ring
  const BURST_MAX_AGE = 3000;    // ms — remove rings after this
  const BURST_OPACITY = 0.35;    // peak brightness of ring

  // Stabilise schematics reference so the effect doesn't re-run on every render
  const schematicsKeys = Object.keys(schematics).sort().join(",");
  const stableSchematics = useMemo(
    () => schematics,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [schematicsKeys]
  );

  // ---- Helpers ----

  const updateSections = useCallback(() => {
    sectionsRef.current = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section-theme]")
    ).map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        top: rect.top,
        bottom: rect.bottom,
        theme: el.dataset.sectionTheme!,
        projectId: el.dataset.projectId,
      };
    });
  }, []);

  const getActiveProjectId = useCallback((): string | null => {
    const vh = window.innerHeight;
    for (const section of sectionsRef.current) {
      if (!section.projectId) continue;
      const top = Math.max(section.top, 0);
      const bot = Math.min(section.bottom, vh);
      if ((bot - top) / vh >= SECTION_COVERAGE) {
        return section.projectId;
      }
    }
    return null;
  }, []);

  const applySchematic = useCallback(
    (projectId: string | null) => {
      if (!projectId || !stableSchematics[projectId]) {
        activeIdRef.current = null;
        computedRef.current = null;
        return;
      }

      activeIdRef.current = projectId;

      const key = cacheKeyRef.current + ":" + projectId;
      const cached = shapeCacheRef.current.get(key);
      if (cached) {
        computedRef.current = cached;
        return;
      }

      const w = window.innerWidth;
      const h = window.innerHeight;
      const result = computeSchematic(
        gridRef.current,
        stableSchematics[projectId],
        w,
        h
      );
      computedRef.current = result;
      shapeCacheRef.current.set(key, result);
    },
    [stableSchematics]
  );

  /** Distance from cursor to nearest path segment (Infinity if no schematic). */
  const cursorPathDist = useCallback(
    (mx: number, my: number): number => {
      const computed = computedRef.current;
      if (!computed) return Infinity;
      let minDist = Infinity;
      for (const [x1, y1, x2, y2] of computed.pixelPaths) {
        const d = distToSegment(mx, my, x1, y1, x2, y2);
        if (d < minDist) minDist = d;
      }
      return minDist;
    },
    []
  );

  /** Max distance from a point to any shape dot (for wave limit). */
  const computeMaxShapeDist = useCallback(
    (ox: number, oy: number): number => {
      const grid = gridRef.current;
      const flags = computedRef.current?.flags;
      if (!flags) return 0;
      let maxDist = 0;
      for (let i = 0; i < grid.length; i++) {
        if (flags.isShape[i]) {
          const d = Math.hypot(grid[i].cx - ox, grid[i].cy - oy);
          if (d > maxDist) maxDist = d;
        }
      }
      return maxDist;
    },
    []
  );

  /** Does any project section cover ≥ threshold of the viewport? */
  const isSectionDominant = useCallback((): boolean => {
    const vh = window.innerHeight;
    for (const section of sectionsRef.current) {
      if (!section.projectId) continue;
      const top = Math.max(section.top, 0);
      const bot = Math.min(section.bottom, vh);
      if ((bot - top) / vh >= SECTION_COVERAGE) return true;
    }
    return false;
  }, []);

  // ---- Transition helpers ----

  const startReveal = useCallback(
    (mx: number, my: number, now: number) => {
      phaseRef.current = "revealing";
      waveOriginRef.current = { x: mx, y: my };
      waveStartRef.current = now;
      waveMaxDistRef.current = computeMaxShapeDist(mx, my);
    },
    [computeMaxShapeDist]
  );

  const startFade = useCallback(
    (now: number, currentPhase: RevealPhase) => {
      if (currentPhase === "revealing") {
        const elapsed = now - waveStartRef.current;
        frozenWaveRadiusRef.current = (WAVE_SPEED * elapsed) / 1000;
      } else {
        frozenWaveRadiusRef.current =
          waveMaxDistRef.current + WAVE_SOFT_EDGE;
      }
      phaseRef.current = "fading";
      fadeStartRef.current = now;
    },
    []
  );

  // ---- Render loop ----

  const render = useCallback(() => {
    const normalCanvas = normalCanvasRef.current;
    const shapeCanvas = shapeCanvasRef.current;
    if (!normalCanvas) return;
    const normalCtx = normalCanvas.getContext("2d");
    const shapeCtx = shapeCanvas?.getContext("2d") ?? null;
    if (!normalCtx) return;
    const mobile = isMobile;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const now = performance.now();

    const parallaxOffset = parallaxYRef.current;

    // Clear canvases
    normalCtx.setTransform(dpr, 0, 0, dpr, 0, parallaxOffset);
    normalCtx.clearRect(0, -parallaxOffset, w, h + Math.abs(parallaxOffset));
    if (shapeCtx) {
      shapeCtx.setTransform(dpr, 0, 0, dpr, 0, parallaxOffset);
      shapeCtx.clearRect(0, -parallaxOffset, w, h + Math.abs(parallaxOffset));
    }

    const sections = sectionsRef.current;
    const mouse = mouseRef.current;
    const computed = computedRef.current;
    const grid = gridRef.current;
    let phase = phaseRef.current;

    // ===== DETECT MODE =====
    const activeSchematic = activeIdRef.current ? stableSchematics[activeIdRef.current] : null;
    const isPulseMode = activeSchematic?.mode === "pulse";

    // ===== STATE TRANSITIONS (desktop only) =====
    if (mobile) phase = "idle";

    if (!isPulseMode) {
      // --- REVEAL MODE (original wave reveal) ---

      // 1. Scroll triggers a fast fade
      if (isScrollingRef.current && phase !== "idle" && phase !== "fading") {
        startFade(now, phase);
        phase = "fading";
      }

      // 2. idle → revealing (with dwell time)
      if (
        enableReveal &&
        phase === "idle" &&
        mouse &&
        computed &&
        !isScrollingRef.current &&
        isSectionDominant() &&
        cursorPathDist(mouse.x, mouse.y) <= DISCOVERY_RADIUS
      ) {
        if (dwellStartRef.current === null) {
          dwellStartRef.current = now;
        } else if (now - dwellStartRef.current >= DWELL_TIME) {
          startReveal(mouse.x, mouse.y, now);
          phase = "revealing";
          dwellStartRef.current = null;
        }
      } else if (phase === "idle") {
        dwellStartRef.current = null;
      }

      // 3. revealing → revealed
      if (phase === "revealing") {
        const elapsed = now - waveStartRef.current;
        const waveR = (WAVE_SPEED * elapsed) / 1000;
        if (waveR >= waveMaxDistRef.current + WAVE_SOFT_EDGE) {
          phase = "revealed";
          phaseRef.current = "revealed";
        }
      }

      // 4. revealing / revealed → fading
      if (phase === "revealing" || phase === "revealed") {
        const tooFar = mouse === null || cursorPathDist(mouse.x, mouse.y) > SUSTAIN_RADIUS;
        if (tooFar) { startFade(now, phase); phase = "fading"; }
      }

      // 5. fading → idle
      if (phase === "fading") {
        const elapsed = now - fadeStartRef.current;
        const fadeWaveR = (FADE_WAVE_SPEED * elapsed) / 1000;
        const visibleR = frozenWaveRadiusRef.current - fadeWaveR;
        if (visibleR + WAVE_SOFT_EDGE <= 0) { phase = "idle"; phaseRef.current = "idle"; }
      }

      // 6. fading → revealing (re-discover with dwell)
      if (enableReveal && phase === "fading" && mouse && computed && !isScrollingRef.current && isSectionDominant() && cursorPathDist(mouse.x, mouse.y) <= DISCOVERY_RADIUS) {
        if (dwellStartRef.current === null) { dwellStartRef.current = now; }
        else if (now - dwellStartRef.current >= DWELL_TIME) { startReveal(mouse.x, mouse.y, now); phase = "revealing"; dwellStartRef.current = null; }
      }
    } else {
      // --- PULSE MODE (traveling ECG signal) ---
      const PULSE_DISCOVERY = 60; // px — how close cursor must be to the line
      const nearLine = mouse && computed && !isScrollingRef.current &&
        isSectionDominant() && cursorPathDist(mouse.x, mouse.y) <= PULSE_DISCOVERY;

      if (nearLine && !pulseActiveRef.current) {
        // Start pulsing
        pulseActiveRef.current = true;
        pulseStartRef.current = now;
        pulseFadeStartRef.current = 0;
      } else if (!nearLine && pulseActiveRef.current && pulseFadeStartRef.current === 0) {
        // Cursor left — begin fading
        pulseFadeStartRef.current = now;
      }

      // Fade out over 1.5 seconds after cursor leaves
      if (pulseFadeStartRef.current > 0 && now - pulseFadeStartRef.current > 1500) {
        pulseActiveRef.current = false;
        pulseFadeStartRef.current = 0;
      }
    }

    // ===== DRAW DOTS =====

    // Pre-compute bounding box for cursor glow spatial culling
    const GLOW_R = CURSOR_GLOW_RADIUS;
    const glowMinX = mouse ? mouse.x - GLOW_R : 0;
    const glowMaxX = mouse ? mouse.x + GLOW_R : 0;
    const glowMinY = mouse ? mouse.y - GLOW_R : 0;
    const glowMaxY = mouse ? mouse.y + GLOW_R : 0;

    for (let i = 0; i < grid.length; i++) {
      const { cx, cy } = grid[i];

      // Section-aware color
      const blend =
        sections.length > 0 ? getSectionBlend(cy, sections) : 0;
      const cr = Math.round(255 + (10 - 255) * blend);
      const cg = Math.round(255 + (31 - 255) * blend);
      const cb = Math.round(255 + (46 - 255) * blend);

      const isShape = computed?.flags.isShape?.[i] ?? false;
      const isPad = computed?.flags.isPad?.[i] ?? false;
      const inRegion = computed?.flags.isRegion?.[i] ?? false;
      const r = isPad ? PAD_RADIUS : DOT_RADIUS;
      // Region fills use softer opacity; outlines/pads use full reveal opacity
      const targetRevealOpacity = (inRegion && !isPad) ? REGION_FILL_OPACITY : SHAPE_REVEAL_OPACITY;

      // --- Normal canvas (top layer): base grid + cursor glow ---
      let normalOpacity = BASE_OPACITY;
      if (mouse && cx >= glowMinX && cx <= glowMaxX && cy >= glowMinY && cy <= glowMaxY) {
        const dist = Math.hypot(cx - mouse.x, cy - mouse.y);
        if (dist < CURSOR_GLOW_RADIUS) {
          const f = 1 - dist / CURSOR_GLOW_RADIUS;
          const target = isShape ? SHAPE_GLOW_OPACITY : GLOW_MAX_OPACITY;
          normalOpacity = Math.max(normalOpacity, target * f * f);
        }
      }
      // --- Burst ring contribution ---
      for (const ring of burstRingsRef.current) {
        const age = now - ring.startTime;
        if (age < 0) continue; // not yet started (staggered)
        const radius = (age / 1000) * BURST_SPEED;
        const dist = Math.hypot(cx - ring.x, cy - ring.y);
        const ringDist = Math.abs(dist - radius);
        if (ringDist < BURST_RING_WIDTH) {
          const intensity = 1 - ringDist / BURST_RING_WIDTH;
          const ageFade = Math.max(0, 1 - age / BURST_MAX_AGE);
          normalOpacity = Math.max(normalOpacity, BURST_OPACITY * intensity * intensity * ageFade);
        }
      }

      normalCtx.fillStyle = `rgba(${cr},${cg},${cb},${normalOpacity})`;
      normalCtx.beginPath();
      normalCtx.arc(cx, cy, r, 0, Math.PI * 2);
      normalCtx.fill();

      // --- Shape canvas (bottom layer): schematic reveal animation only (desktop) ---
      if (shapeCtx && isShape && computed && phase !== "idle") {
        const origin = waveOriginRef.current;
        const distFromOrigin = Math.hypot(cx - origin.x, cy - origin.y);
        let shapeOpacity = 0;

        if (phase === "revealing") {
          const elapsed = now - waveStartRef.current;
          const waveR = (WAVE_SPEED * elapsed) / 1000;
          if (distFromOrigin <= waveR) {
            const edge = Math.min(
              1,
              Math.max(0, (waveR - distFromOrigin) / WAVE_SOFT_EDGE)
            );
            shapeOpacity =
              BASE_OPACITY +
              (targetRevealOpacity - BASE_OPACITY) * edge;
          }
        } else if (phase === "revealed") {
          shapeOpacity = targetRevealOpacity;
        } else if (phase === "fading") {
          const elapsed = now - fadeStartRef.current;
          const fadeWaveR = (FADE_WAVE_SPEED * elapsed) / 1000;
          const frozenR = frozenWaveRadiusRef.current;
          const visibleR = frozenR - fadeWaveR;

          const revealEdge = Math.min(
            1,
            Math.max(0, (frozenR - distFromOrigin) / WAVE_SOFT_EDGE)
          );
          const fadeEdge = Math.min(
            1,
            Math.max(
              0,
              (visibleR + WAVE_SOFT_EDGE - distFromOrigin) / WAVE_SOFT_EDGE
            )
          );
          const edge = Math.min(revealEdge, fadeEdge);
          shapeOpacity =
            BASE_OPACITY +
            (targetRevealOpacity - BASE_OPACITY) * edge;
        }

        if (shapeOpacity > 0) {
          shapeCtx.fillStyle = `rgba(${cr},${cg},${cb},${shapeOpacity})`;
          shapeCtx.beginPath();
          shapeCtx.arc(cx, cy, r, 0, Math.PI * 2);
          shapeCtx.fill();
        }
      }
    }

    // ===== PULSE MODE RENDERING =====
    if (shapeCtx && isPulseMode && pulseActiveRef.current && computed) {
      const PULSE_SPEED = 400;       // px/s — how fast the pulse travels
      const PULSE_WIDTH = 30;        // px — width of the bright spike
      const PULSE_TAIL = 120;        // px — length of the fading tail behind the spike
      const PULSE_INTERVAL = 1800;   // ms — time between heartbeats
      const PULSE_OPACITY = 0.55;    // peak brightness
      const PULSE_DOT_BOOST = 1.5;   // dot size multiplier at peak

      const elapsed = now - pulseStartRef.current;
      // Fade envelope (0→1 ramp in, holds, fades out)
      let envelope = 1;
      if (elapsed < 500) envelope = elapsed / 500; // ramp in
      if (pulseFadeStartRef.current > 0) {
        const fadeElapsed = now - pulseFadeStartRef.current;
        envelope = Math.max(0, 1 - fadeElapsed / 1500);
      }

      if (envelope > 0) {
        // Multiple pulses: calculate position of each active pulse
        const totalTravel = w + PULSE_TAIL;
        const cycleTime = totalTravel / PULSE_SPEED * 1000; // ms per full crossing
        const intervalMs = Math.max(PULSE_INTERVAL, 400);

        for (let i = 0; i < grid.length; i++) {
          const { cx, cy } = grid[i];
          const isOnLine = computed.flags.isShape?.[i] ?? false;
          if (!isOnLine) continue;

          // Calculate pulse intensity at this dot's x position
          let maxIntensity = 0;

          // Check multiple pulse waves
          for (let p = 0; p * intervalMs < elapsed + cycleTime; p++) {
            const pulseAge = elapsed - p * intervalMs;
            if (pulseAge < 0) continue;
            const pulseX = (pulseAge / 1000) * PULSE_SPEED;

            const dist = cx - pulseX;
            if (dist >= -PULSE_TAIL && dist <= PULSE_WIDTH) {
              let intensity: number;
              if (dist >= 0) {
                // Front of pulse — sharp peak
                intensity = 1 - dist / PULSE_WIDTH;
                intensity = intensity * intensity; // sharpen
              } else {
                // Tail — gradual fade
                intensity = 1 + dist / PULSE_TAIL;
                intensity = Math.max(0, intensity * intensity * 0.4); // softer tail
              }
              maxIntensity = Math.max(maxIntensity, intensity);
            }
          }

          if (maxIntensity > 0) {
            const finalOpacity = maxIntensity * PULSE_OPACITY * envelope;
            const blend = sections.length > 0 ? getSectionBlend(cy, sections) : 0;
            const cr = Math.round(255 + (10 - 255) * blend);
            const cg = Math.round(255 + (31 - 255) * blend);
            const cb = Math.round(255 + (46 - 255) * blend);
            const dotR = DOT_RADIUS * (1 + (PULSE_DOT_BOOST - 1) * maxIntensity * envelope);

            shapeCtx.fillStyle = `rgba(${cr},${cg},${cb},${finalOpacity})`;
            shapeCtx.beginPath();
            shapeCtx.arc(cx, cy, dotR, 0, Math.PI * 2);
            shapeCtx.fill();
          }
        }
      }
    }

    // ===== INFILL DOTS (dense sub-grid inside regions, only during reveal) =====
    if (shapeCtx && computed && phase !== "idle" && computed.infillPoints.length > 0) {
      const origin = waveOriginRef.current;
      for (const { cx, cy } of computed.infillPoints) {
        const distFromOrigin = Math.hypot(cx - origin.x, cy - origin.y);
        let fillOpacity = 0;

        if (phase === "revealing") {
          const elapsed = now - waveStartRef.current;
          const waveR = (WAVE_SPEED * elapsed) / 1000;
          if (distFromOrigin <= waveR) {
            const edge = Math.min(1, Math.max(0, (waveR - distFromOrigin) / WAVE_SOFT_EDGE));
            fillOpacity = REGION_FILL_OPACITY * edge;
          }
        } else if (phase === "revealed") {
          fillOpacity = REGION_FILL_OPACITY;
        } else if (phase === "fading") {
          const elapsed = now - fadeStartRef.current;
          const fadeWaveR = (FADE_WAVE_SPEED * elapsed) / 1000;
          const frozenR = frozenWaveRadiusRef.current;
          const visibleR = frozenR - fadeWaveR;
          const revealEdge = Math.min(1, Math.max(0, (frozenR - distFromOrigin) / WAVE_SOFT_EDGE));
          const fadeEdge = Math.min(1, Math.max(0, (visibleR + WAVE_SOFT_EDGE - distFromOrigin) / WAVE_SOFT_EDGE));
          fillOpacity = REGION_FILL_OPACITY * Math.min(revealEdge, fadeEdge);
        }

        if (fillOpacity > 0) {
          const blend = sections.length > 0 ? getSectionBlend(cy, sections) : 0;
          const cr = Math.round(255 + (10 - 255) * blend);
          const cg = Math.round(255 + (31 - 255) * blend);
          const cb = Math.round(255 + (46 - 255) * blend);
          shapeCtx.fillStyle = `rgba(${cr},${cg},${cb},${fillOpacity})`;
          shapeCtx.beginPath();
          shapeCtx.arc(cx, cy, DOT_RADIUS * 0.8, 0, Math.PI * 2);
          shapeCtx.fill();
        }
      }
    }

    // ===== CLEANUP BURST RINGS =====
    burstRingsRef.current = burstRingsRef.current.filter(
      (ring) => now - ring.startTime < BURST_MAX_AGE
    );

    // ===== LOOP CONTROL =====
    const needsLoop =
      mouse !== null ||
      phase === "revealing" ||
      phase === "fading" ||
      dwellStartRef.current !== null ||
      pulseActiveRef.current ||
      burstRingsRef.current.length > 0;

    if (needsLoop) {
      animRef.current = requestAnimationFrame(render);
    } else {
      isRunningRef.current = false;
    }
  }, [
    enableReveal,
    cursorPathDist,
    isSectionDominant,
    startReveal,
    startFade,
    isMobile,
    stableSchematics,
  ]);

  const scheduleRender = useCallback(() => {
    if (!isRunningRef.current) {
      isRunningRef.current = true;
      animRef.current = requestAnimationFrame(render);
    }
  }, [render]);

  // ---- Build ----

  const build = useCallback(() => {
    const normalCanvas = normalCanvasRef.current;
    const shapeCanvas = shapeCanvasRef.current;
    if (!normalCanvas) return;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    for (const canvas of [normalCanvas, shapeCanvas].filter(Boolean) as HTMLCanvasElement[]) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    }

    const newKey = `${w}x${h}`;
    if (cacheKeyRef.current !== newKey) {
      cacheKeyRef.current = newKey;
      shapeCacheRef.current.clear();
    }

    gridRef.current = buildGridPoints(w, h);
    updateSections();

    const projectId = getActiveProjectId();
    applySchematic(projectId);

    phaseRef.current = "idle";

    // Reset loop guard so scheduleRender always works after a rebuild
    isRunningRef.current = false;
    scheduleRender();
  }, [updateSections, scheduleRender, getActiveProjectId, applySchematic]);

  // ---- Event wiring ----

  useEffect(() => {
    build();

    const onScroll = () => {
      updateSections();

      const projectId = getActiveProjectId();
      if (projectId !== activeIdRef.current) {
        applySchematic(projectId);
      }

      parallaxYRef.current = window.scrollY * 0.03;

      isScrollingRef.current = true;
      if (phaseRef.current !== "idle" && phaseRef.current !== "fading") {
        startFade(performance.now(), phaseRef.current);
      }
      clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, SCROLL_DEBOUNCE);

      scheduleRender();
    };

    const onResize = () => build();

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      scheduleRender();
    };

    const onMouseLeave = () => {
      mouseRef.current = null;
      scheduleRender();
    };

    // Lightweight re-detect after route change (no canvas clear/rebuild)
    const onRouteChange = () => {
      updateSections();
      const projectId = getActiveProjectId();
      if (projectId !== activeIdRef.current) {
        applySchematic(projectId);
      }
      scheduleRender();
    };

    // Signal burst handler — dispatched from contact button hover
    const onBurst = (e: Event) => {
      const { x, y, count } = (e as CustomEvent).detail ?? {};
      const now = performance.now();
      const rings = [];
      for (let i = 0; i < (count ?? 3); i++) {
        rings.push({ x: x ?? 0, y: y ?? 0, startTime: now + i * 120 });
      }
      burstRingsRef.current.push(...rings);
      scheduleRender();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("route-change", onRouteChange);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("dot-pattern-burst", onBurst);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(animRef.current);
      isRunningRef.current = false;
      clearTimeout(scrollTimerRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("route-change", onRouteChange);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("dot-pattern-burst", onBurst);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [build, updateSections, scheduleRender, getActiveProjectId, applySchematic, startFade]);

  return (
    <>
      {/* Shape canvas: animated schematic reveals — desktop only */}
      {!isMobile && (
        <canvas
          ref={shapeCanvasRef}
          className="pointer-events-none fixed inset-0"
          style={{ zIndex: "var(--z-dot-bg)" }}
          aria-hidden="true"
        />
      )}
      {/* Normal canvas: base grid dots + cursor glow — visible on all devices */}
      <canvas
        ref={normalCanvasRef}
        className="pointer-events-none fixed inset-0"
        style={{ zIndex: "var(--z-dot-fg)" }}
        aria-hidden="true"
      />
    </>
  );
}
