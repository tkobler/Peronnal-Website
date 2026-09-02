# Projects filter pill overflow — Strategy

## Branch note

This fix is being applied directly on `add_first_projects` rather than a fresh `bug/`-prefixed
branch off `main`. Reason: the bug is only fully reproducible with the real (longer) domain
names introduced by this branch's uncommitted work — `DOMAIN_KEYS` and the FR/EN domain
translations were renamed from the template's short placeholders
("Microelectronics & Photonics", etc.) to longer real names
("Biomedical & Precision Instrumentation", etc.) here, and that length increase is what pushes
the filter row past the hero's fixed height. The clipping mechanism itself
(`h-[40vh]` + `overflow-hidden`) already exists on `main`, so this is a genuine bug, not a
regression introduced only by this branch — but a clean repro against `main` would need the old
placeholder domain names and wouldn't show the reported symptom as clearly. Fixing it here keeps
the fix and its triggering content change in the same review.

## Symptom

Reported by the site owner (translated from French): on the `/projects` page, the domain-filter
pills row at the top of the page — in French, one category label is longer and disappears behind
the gray/dark zone of the first project section (Swiss Solar Boat). Same problem on iPhone
display: the filter row's height doesn't adapt to the wrapped pill layout.

## Reproduction

- URL: `/projects`
- French locale (click the FR toggle, or `localStorage.setItem("locale", "fr")`)
- Desktop (1280px): the last ~1.5 filter pills ("Biomédical & Instrumentation de Précision") sit
  clipped right at the boundary with the first project section below.
- iPhone SE (375px), even in English: the entire filter pill row is clipped away — none of the
  pills render at all, because the wrapped rows exceed the 40vh box height entirely.
- Confirmed with Playwright screenshots at both viewports/locales — see
  `tests/visual/repro/projects-filter-pill-overflow/`.

## Root cause

`src/components/projects/ProjectsPage.tsx` — the `/projects` hero `<section>` uses a fixed
`h-[40vh]` height combined with `overflow-hidden`:

```
<section className="section-light relative grid h-[40vh] place-items-center overflow-hidden" ...>
```

The filter pill row (`role="group"`, `flex flex-wrap`) wraps onto additional rows whenever the
combined pill width exceeds the available line width — which happens with longer FR labels, or
with any labels on a narrow mobile viewport. `h-[40vh]` never grows to accommodate the extra
row(s), so `overflow-hidden` silently clips whatever doesn't fit, and that clipped content
visually disappears at the exact point the next `<section>` (a dark-themed project card) begins,
reading as "swallowed by the gray zone."

## Fix approach

Change the hero section's height constraint from fixed to a floor: `h-[40vh]` → `min-h-[40vh]`,
and drop `overflow-hidden`. This preserves the intended look for the common case (short content
still centers within exactly 40vh via `place-items-center`) while letting the section grow to fit
extra wrapped pill rows instead of clipping them. `overflow-hidden` on this section isn't
protecting any decorative/canvas element (confirmed: no `DotPattern`/canvas is rendered in this
section) — it's not needed once the height is no longer fixed.

This is a one-line-per-class change, isolated to this single section; no other `h-[Nvh]` +
`overflow-hidden` combination in this file has wrappable content (the footer spacer at the bottom
is empty).

## Test plan

- [x] Failing regression test written first — `tests/e2e/responsive-matrix.spec.ts`, new test
      `/projects — filter pills are not clipped by the hero section (FR locale)`, run once per
      device profile in `DEVICES`. Asserts every filter pill's bounding-box bottom stays within
      the hero section's bounding-box bottom (deterministic geometry check, not a Playwright
      visibility heuristic, so it fails/passes correctly regardless of `overflow` value).
- [ ] Test tier to run after the fix: `npm run test:e2e:tier2` (this file is part of tier 2 —
      responsive matrix)
- [ ] Visual verification (before/after screenshots) at Desktop Chrome (FR) and iPhone SE (FR +
      EN)

## Panel input (from Phase 1)

- **qa**: confirmed root cause; flagged that `responsive-matrix.spec.ts` only checks *horizontal*
  overflow today, never vertical clipping from a fixed-height + `overflow-hidden` container, and
  never runs against FR locale — that's the coverage gap. Recommended `min-h-[40vh]` + dropping
  `overflow-hidden` as the minimal fix; recommended a visual-regression baseline as a follow-up.
- **frontend-eng**: confirmed root cause by reading `globals.css` — `.section-light`/`.section-dark`
  are plain translucent gradients, no canvas/`DotPattern` is painted into this hero, so
  `overflow-hidden` isn't guarding anything. `h-[40vh]` is used exactly once in this file (not a
  shared design constant), so the fix can't ripple elsewhere. Recommended the same
  `min-h-[40vh]` + drop-`overflow-hidden` fix.
- **ui-designer**: confirmed a fixed-height hero with wrappable content is the anti-pattern here;
  not concerned about the resulting EN/FR height difference (a hero that hugs its content reads as
  correct, not inconsistent). Minor secondary suggestion (not applied): could trim pill horizontal
  padding at `sm:` to reduce wrapping slightly, but that's cosmetic, not the fix.
- **Conflicts surfaced**: none — all three agreed on both root cause and fix. Only a minor,
  non-conflicting note from ui-designer that `overflow-hidden` is "harmless" once height isn't
  fixed; qa/frontend-eng recommended dropping it outright since nothing depends on it. Following
  qa/frontend-eng's fuller investigation (they checked what `overflow-hidden` might be protecting)
  and dropping it.

## Visual evidence

- Before: `tests/visual/repro/projects-filter-pill-overflow/before-desktop-fr-hero.png`,
  `before-mobile-fr-hero.png`, `before-mobile-en.png`
- After: `tests/visual/repro/projects-filter-pill-overflow/after-*.png` (captured after the fix)
