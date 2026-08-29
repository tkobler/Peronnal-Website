# Visual reproduction

How to capture deterministic before/after screenshots of the running site at specific device viewports. Shared utility used by both [bug-resolution.md](bug-resolution.md) (mandatory for UI bugs) and [feature-development.md](feature-development.md) (required for UI-affecting features).

---

## Why this exists

- Bug reports without screenshots get downgraded to "needs reproduction"
- UI feature PRs with before/after evidence move through review faster
- CSS / layout bugs are easy to "fix" in one viewport and break in another — screenshots at the specific reported viewport catch this
- Mobile bugs especially: most contributors aren't holding a physical iPhone SE when reviewing a PR, and Chrome DevTools' responsive mode doesn't emulate iOS Safari exactly

---

## The tool

A thin wrapper around Playwright's device emulation, runnable from any branch:

```bash
npm run visual:repro -- --url <path> --viewport "<device>" --out <file>
```

Behind the scenes it's [scripts/visual-repro.ts](../../scripts/visual-repro.ts) — launches headless Chromium with the requested Playwright device preset, navigates to the URL, waits for network idle, and writes a full-page screenshot.

### Arguments

| Flag | Default | Description |
|---|---|---|
| `--url` | `/` | Path (like `/projects`) or full URL. Paths are resolved against `--base`. |
| `--viewport` | `iPhone SE` | Playwright device name — must match exactly (case-sensitive). |
| `--out` | `repro.png` | Output PNG path. Parent dirs created as needed. |
| `--base` | `http://localhost:3000` | Base URL, in case you want to screenshot a deployed site. |

### Prerequisites

- **Dev server running at `localhost:3000`**. Start it in another terminal first:
  ```bash
  npm run dev
  ```
- Playwright already installed (`npm ci` covers it).

---

## Typical usage

### For a bug — BEFORE the fix

```bash
# In terminal 1
npm run dev

# In terminal 2
npm run visual:repro -- \
  --url /projects \
  --viewport "iPhone SE" \
  --out tests/visual/repro/mobile-filters/before.png
```

### For a bug — AFTER the fix

```bash
npm run visual:repro -- \
  --url /projects \
  --viewport "iPhone SE" \
  --out tests/visual/repro/mobile-filters/after.png
```

Use the **same viewport** and **same URL** as the before screenshot — otherwise you're not comparing like-for-like.

### For a feature — after implementation

```bash
npm run visual:repro -- \
  --url /about \
  --viewport "iPhone 14" \
  --out tests/visual/repro/now-playing-section/after.png

npm run visual:repro -- \
  --url /about \
  --viewport "Desktop Chrome" \
  --out tests/visual/repro/now-playing-section/after-desktop.png
```

Features are usually additive, so a "before" isn't meaningful — just capture the "after" at the viewports that matter.

---

## Output location convention

All repro screenshots live under:

```
tests/visual/repro/<branch-short-name>/
  ├── before.png
  ├── after.png
  └── (additional viewports as needed)
```

This folder is **gitignored by default** — see [.gitignore](../../.gitignore). That means screenshots don't get committed automatically, which is usually what you want (they're binary, they add repo bloat, and most of them aren't useful long-term).

### When to commit a screenshot to the PR

For most bugs and features: **do it**. The reviewer (Tim) benefits from seeing the evidence in the diff. Add individually with `-f`:

```bash
git add -f tests/visual/repro/mobile-filters/before.png
git add -f tests/visual/repro/mobile-filters/after.png
git commit -m "..."
```

The `-f` is required because of the gitignore. That friction is intentional — it makes each committed screenshot a conscious decision, not an accident.

### When NOT to commit

- The screenshot is for your own debugging, not for the review
- The screenshot contains private data (localhost URLs with your actual tokens, preview of unreleased content)
- The screenshot is huge (> 500 KB) and not essential

---

## Which viewports to test

Match the bug report or the feature's responsive intent. Don't capture every viewport "to be safe" — each one is a reviewer attention tax.

**For mobile issues**:
- `iPhone SE` (375×667) — the narrowest modern iOS screen, breakpoint stress test
- `iPhone 14` (390×844) — typical mid-range mobile

**For tablet issues**:
- `iPad Mini` (768×1024)
- `iPad (gen 7)` (810×1080) in portrait, or just use `{ width: 1080, height: 810 }` landscape

**For desktop regressions**:
- `Desktop Chrome` (1280×720) — Playwright's default desktop preset
- For ultrawide specifically, custom viewport via `--viewport "Desktop Chrome"` won't work — run the ultrawide check via the existing tier-2 matrix test instead

See [Playwright device registry](https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/server/deviceDescriptorsSource.json) for the full list. The script will print available examples if you pass an unknown name.

---

## Integration with the two workflows

### Bug resolution ([bug-resolution.md](bug-resolution.md))
- **Phase 1.2** (triage): capturing a BEFORE screenshot is **mandatory** for any UI bug. Without it, the bug report is downgraded to "needs reproduction" and Phase 2 does not start.
- **Phase 2.5** (verify): capturing an AFTER screenshot is **mandatory** before opening the PR. Use the same viewport and URL.

### Feature development ([feature-development.md](feature-development.md))
- **Phase 2.5** (test + manual verification): for any UI-affecting feature, capture an AFTER screenshot at the primary viewport(s) the feature targets and include it in the PR.
- BEFORE is optional for features (they're additive). Capture one only if you're modifying an existing visual area.

---

## Troubleshooting

- **`connect ECONNREFUSED 127.0.0.1:3000`**: dev server not running. Start `npm run dev` in another terminal.
- **`Unknown viewport: "iphone se"`**: Playwright device names are **case-sensitive**. Use `"iPhone SE"`, not `"iphone se"`. The script prints examples on failure.
- **Screenshot looks different from my browser**: headless Chromium doesn't render 100% identically to your local browser — fonts fall back differently, emoji may vary, system UI (scrollbars, text cursors) is absent. For pixel-perfect parity, use the visual regression suite instead (`npm run test:visual`) which at least compares against a stable baseline.
- **Screenshot is blank / white**: the page may still be loading when the screenshot fires. Try adding a deliberate delay, or use `test:visual` which has stabilization built in.
- **"Navigation timeout"**: the page took > 30 seconds to reach network idle. Usually means the dev server is slow to cold-start. Run `npm run dev` once, visit the URL in a real browser to warm it up, then run the repro command.
