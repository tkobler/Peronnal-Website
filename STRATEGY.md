# Mobile locale toggle — Strategy

## Symptom

> "on phone -> only english button is available + FR button is invisible, happens on every page, every time I load the site"

Reported device: Google Pixel 9, Chrome (Brave browser), 412×915 CSS viewport. Deterministic — every load, every page.

## Reproduction

1. Open the site on a Pixel 9 (or equivalent ~412px mobile viewport) in Chrome/Brave with the light theme (default on `/`)
2. Observe the top-right corner where the FR · EN locale toggle should be
3. **Expected**: two buttons visible — the active one at full brightness, the inactive one dimmer but still clearly perceptible as a tappable target
4. **Actual**: only one button (the active locale, EN by default) is visible. The FR button is present in the DOM at the correct position and size but is **perceptually invisible** against the hero background

Reproduced in Playwright "Pixel 7" preset (412×839, near-identical to Pixel 9). BEFORE screenshot: [tests/visual/repro/mobile-locale-toggle/before.png](tests/visual/repro/mobile-locale-toggle/before.png) — confirmed by two independent panel agents (frontend-eng, ui-designer) reading the screenshot directly.

## Root cause

`src/app/globals.css` lines 389–397 and 407–409:

```css
.nav-locale-toggle[data-theme="light"] button {
  color: var(--light-text);
  opacity: 0.25;
}
.nav-locale-toggle[data-theme="dark"] button {
  color: #FFFFFF;
  opacity: 0.25;
}
.nav-locale-sep {
  opacity: 0.2;
}
```

Inactive locale buttons are rendered at `opacity: 0.25`, and the `·` separator at `opacity: 0.2`. The active button overrides to `opacity: 1` via `.nav-locale-toggle button.active`.

At `font-size: 0.65rem` (≈10.4px) Space Mono on a light-theme hero with the dot-pattern canvas behind it, on a mobile OLED display in typical ambient light, 0.25 opacity is below the perceptual floor — the dimmed text blends into the background and reads as "not there at all". This is a **design bug, not a rendering bug**: the button exists, has a 44×44 tap target, and is accessible to Playwright's hit-testing (which is why existing tests in `tests/e2e/language-toggle.spec.ts:19-24` using `toBeVisible()` pass — Playwright considers `opacity > 0` visible even when a human cannot see it).

ui-designer's sharper framing: on a locale toggle, the **inactive** button IS the CTA — a French speaker needs to find it. Burying the CTA at 0.25 inverts the affordance hierarchy.

## Fix approach

Three-line CSS change in `src/app/globals.css`. No JSX changes, no layout changes, no structural changes, no locale-detection changes.

```diff
  .nav-locale-toggle[data-theme="light"] button {
    color: var(--light-text);
-   opacity: 0.25;
+   opacity: 0.55;
  }
  .nav-locale-toggle[data-theme="dark"] button {
    color: #FFFFFF;
-   opacity: 0.25;
+   opacity: 0.55;
  }
  ...
  .nav-locale-sep {
-   opacity: 0.2;
+   opacity: 0.4;
  }
```

- **0.55** keeps a clear hierarchy with the active button (1.0) — ~1.8× contrast between states — while making the inactive glyph unambiguously present.
- **0.4** on the separator preserves the "two options here" visual cue that's currently lost.
- **Why not add a border, pill background, or underline?** Rejected by ui-designer: would break the site's restrained, technical, schematic-inspired design language. Nothing else on the site wears that kind of chrome.

## Test plan

- [x] Write failing regression test FIRST in `tests/e2e/language-toggle.spec.ts`: assert both locale buttons have computed opacity ≥ 0.5 at Pixel 7 viewport (412×839). Must fail on main against the 0.25 inactive value.
- [ ] Apply the CSS fix
- [ ] Confirm the failing test now passes
- [ ] Run full tier 1 (`npm run test:e2e:tier1`) to ensure no adjacent regressions
- [ ] Capture AFTER screenshot at Pixel 7 for PR evidence
- [ ] Run `npm run lint` + `npm run test:unit` + `npm run validate:i18n` (CI gate equivalent)

## Panel input (from Phase 1)

- **qa**: Was cautious — proposed "don't proceed yet, get more repro detail" because Playwright's `toBeVisible()` passes at opacity 0.25 and language-toggle.spec.ts already exists. Proposed a concrete computed-opacity regression test that I adopted verbatim in the test plan above. Also flagged an orthogonal concern about Brave shields / `navigator.language` that does not affect this fix.
- **frontend-eng**: Read the screenshot, confirmed "only EN visible", named the 0.25 opacity as the cause, proposed the exact three-line fix above (0.25 → 0.55, 0.2 → 0.45). Listed what not to touch: JSX, positioning, locale script.
- **ui-designer**: Agreed with frontend-eng on the numbers (0.55 inactive, 0.4 separator). Added the affordance-hierarchy framing: on a locale toggle the inactive state IS the CTA. Rejected alternative visual affordances (border, underline, pill bg) as breaking the design language. Optional upside: bump font-size 0.65rem → 0.7rem for cheap legibility — **left out of this fix** to keep it minimal, can revisit.

**Conflicts resolved**: qa's procedural gate ("more data first") is satisfied by two independent builders reading the screenshot, agreeing on the cause, and the user's deterministic report. Siding with builders was the right call. qa's test suggestion was adopted regardless.

## Visual evidence

- **Before**: [tests/visual/repro/mobile-locale-toggle/before.png](tests/visual/repro/mobile-locale-toggle/before.png)
- **After**: [tests/visual/repro/mobile-locale-toggle/after.png](tests/visual/repro/mobile-locale-toggle/after.png) (captured post-fix, committed with the PR via `git add -f`)
