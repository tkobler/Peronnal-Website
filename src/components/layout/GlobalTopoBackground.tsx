import { generateTopoContours, contoursToDataUri } from "@/lib/contours";

// The multi-peak, organic-relief pattern Tim picked out (originally seen
// under the "Autonomous Terrain Rover" project section) — now the single
// fixed pattern used site-wide instead of one instance per section.
const PATTERN_SEED = 43;

// Computed once at module load: this output never changes, so there's no
// need to regenerate or re-derive it per render.
const TOPO_URI = contoursToDataUri(generateTopoContours(PATTERN_SEED, 100, 100), "#0A1F2E");

/**
 * One topographic contour field, fixed to the viewport — it never scrolls.
 * Section color washes (semi-transparent, see .section-dark/.section-light
 * in globals.css) scroll on top of it, so different parts of the same fixed
 * pattern show through as the page moves.
 *
 * Deliberately static: a single always-on navy-line image, same everywhere,
 * with no light/dark color swap based on the section currently in view. An
 * earlier version tried to flip the line color to stay legible on dark
 * sections, which meant swapping between two images at runtime — that
 * swap reproducibly failed to paint on any page whose first section starts
 * dark (About, and the dark project sections on Projects), leaving the
 * background blank there. Removing the swap removes the bug: this is now
 * a plain static image, identical on every page, with no per-render state.
 */
export default function GlobalTopoBackground() {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- data URI, not an optimizable asset
    <img
      aria-hidden="true"
      alt=""
      src={TOPO_URI}
      className="pointer-events-none fixed inset-0 h-full w-full object-cover"
      style={{ opacity: 0.78 }}
    />
  );
}
