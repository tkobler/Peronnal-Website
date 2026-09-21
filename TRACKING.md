# Sync template with main — Tracking

## Current status
Steps 1–6 done. Ran a systematic diff sweep (every touched file compared against main) after the hydration-bug near-miss made clear that "port the parts I already know about" wasn't catching everything — found and fixed several more real, generic bugs (missing documents/link/sourceLink UI, a broken `/projects/${id}` link, a filter-pill-clipping hero height bug, dead DotPattern-era event code, an unwired trailPath.ts). Every touched file now diffs clean against main except the deliberate hobby/about/personal-content divergences. Starting step 8 (documentation rewrite).
Last updated: 2026-09-21

## Tasks
- [x] Create STRATEGY.md and TRACKING.md
- [x] Step 1a — Schema: translations/index.ts (ProjectDocument, documents/learnMoreLabel/sourceLabel, drop hero.phrases, add variousProfessors)
- [x] Step 1b — projects.ts: new taxonomy, drop Schematic, add link/sourceLink/documents, replace ring-resonator with micro-force-sensor (Biomedical & Precision Instrumentation)
- [x] Step 1c — courses.ts: drop professor field, migrate domain values, professorLinks:[] example on MICRO-373
- [x] Step 1d — EN/FR translation files (projects, homeCards, about, hero, projectDetails) + project_details.ts
- [x] Step 1e — AboutClient.tsx variousProfessors fallback (small, self-contained, not the full about-restructure we're skipping)
- [x] Step 1f — experience.ts: ExperienceCategory enum (add education/volunteering, drop music) + EN/FR, 2 new example entries, ExperienceTimeline.tsx color map + globals.css category tokens
- [x] Step 2 — Update tests/unit/projects-data.test.ts (VALID_DOMAINS) and translations.test.ts (drop hero.phrases test)
- [x] Home cards: drop to 3 (HomePage.tsx, ProjectSection.tsx ported from main, homeCards.ts + translations updated)
- [x] Cleanup — deleted dead DomainView.tsx/FullPortfolioPage.tsx, fixed ProjectsPage.tsx DOMAIN_KEYS
- [x] Step 3 — Assets: public/cv/ restructure (+ README), placeholder documents PDF (public/documents/signal-relay/), ContactClient.tsx href fixes
- [x] Step 4 — New standalone modules: contours.ts, trailPath.ts, GlobalTopoBackground.tsx, useHashScroll.ts (ported from main, scrubbed one stray "Tim" code comment)
- [x] Step 5a — Delete DotPattern.tsx + Schematic type, rewire ClientShell.tsx to GlobalTopoBackground — verified tsc clean + full build
- [x] Step 5b — Add ContactFab.tsx, wire into ClientShell.tsx, port globals.css (.contact-fab, z-index fixes, translucent sections, category colors) — verified tsc clean + full build, globals.css now diffs clean against main
- [x] Step 6 — Genericize hardcoded strings: layout.tsx and Footer.tsx needed no changes (already correct), Navigation.tsx button restyle ported, ContactClient.tsx z-10/section-light treatment ported, sitemap.xml project id fixed
- [x] Ported generic e2e fixes (accessibility.spec.ts, project-cards.spec.ts, language-toggle.spec.ts, responsive-matrix.spec.ts) and new generic docs/skills (MAINTAINING.md, add-project/add-activity skills, .vscode/settings.json)
- [x] Fixed a real LanguageProvider hydration-mismatch bug (ported the regression test before realizing the underlying fix wasn't ported — corrected in the next commit)
- [x] Ran test:e2e:tier1, investigated all 14 failures — see decisions log
- [x] Diff sweep — compared every touched component/page against main, found and fixed 6 more real issues (see decisions log); all touched files now diff clean against main except deliberate divergences
- [ ] Step 8 — Documentation rewrite (~15 files)
- [ ] Final verification: lint, test:unit, validate:i18n, build (re-run after doc changes)
- [ ] Manual click-through of every page
- [ ] /merge-check before opening PR

## Decisions log

### 2026-09-21 — Overwrote template's original STRATEGY.md/TRACKING.md without reading them first
Mistake: wrote fresh STRATEGY.md/TRACKING.md for this sync work without reading the files already at those paths on `template`, which turned out to hold the branch's founding history (Clément Chalut's original portfolio → Tim's personalization → this generic template, plus the rationale for keeping EPFL references and replacing `/flight` with a minimal `/hobby`). Recovered the content via `git show`, since the prior commit still has it, and folded a summary into this branch's STRATEGY.md under "Prior branch history" rather than losing it. Lesson for next time: always Read a file before Write, even one this tool assumed was new — the tool's own instructions say so for exactly this reason.

### 2026-09-21 — Never merge/cherry-pick from main
Branches diverged in both directions with content mixed into structural diffs throughout. Decided to use `git checkout main -- <path>` only for confirmed-zero-personal-content files, and hand-edit (diffed, not retyped) everything else against a saved reference. See STRATEGY.md Approach.

### 2026-09-21 — Keep /hobby live, diverge from main
Main parked `/hobby` into an About "Beyond Engineering" section — a personal-narrative choice. pm review argued a template benefits more from a live example of "how to add a top-level page." User confirmed: keep `/hobby` live and generic. This means the About page and translations do NOT get main's GPA-removal/Beyond-Engineering restructuring.

### 2026-09-21 — Drop home cards from 4 to 3
Confirmed with user: mirror main's 3-card layout, dropping the redundant project-spotlight card (pm's reasoning: it duplicates the Projects page nav link, not just "because main did it").

### 2026-09-21 — Spread new project fields across separate examples
pm review: don't bundle `documents`/`link`/`sourceLink` onto one placeholder project — each needs its own example so a template user sees every field actually rendered.

### 2026-09-21 — tier1 e2e: 14 failures, none are regressions from this branch
Ran `npm run test:e2e:tier1` after step 6: 14 failed / 242 passed. Broke it down into two groups:

1. **6 failures on `language-toggle.spec.ts`'s new hydration-mismatch test** (chromium/firefox/webkit/iphone-se/ipad/ipad-landscape) — real bug. The test was ported in the previous commit but the fix it was regression-testing (`LanguageContext.tsx`'s `useState` initializer reading `window`/`localStorage` synchronously during hydration, diverging from the always-English static-export server HTML) was not. Ported the fix from main in the next commit; re-ran the test on chromium — 9/9 pass including the previously-failing one.
2. **7 failures, all on `navigation.spec.ts` at the `ultrawide` viewport** (pill scroll-hide, 3 hamburger-menu interactions, menu navigation, Get in Touch button, route transition) — investigated by stashing all of this branch's changes and running the identical suite against unmodified `template`. Ran it **twice** on the clean baseline: both runs failed the exact same 7 tests (not a shifting subset — a first stashed run that only showed 5 failures turned out to be noise, not signal). This confirms the failures are 100% pre-existing on `template` itself, unrelated to any change made on this branch. Matches the failure signature (`<element> subtree intercepts pointer events` during a hamburger-menu dialog transition) that the branch's own prior TRACKING.md history already documented as a known CSS-transition-timing race, non-deterministic across runs but present on unmodified `main`/`template` alike.

No action taken on the navigation.spec.ts failures — flagged here so a future run isn't mistaken for a regression.

### 2026-09-21 — Diff sweep caught 6 real issues the "port what I know about" approach missed
After the hydration-mismatch near-miss (ported a regression test without realizing its underlying fix was a separate, unported hunk), ran `diff <(git show main:<path>) <path>` against every file this branch had touched, rather than trusting memory of what each diff contained. Found:

1. **`ProjectsPage.tsx`/`ProjectDetailPage.tsx` had no UI for the new `documents`/`link`/`sourceLink` project fields.** The data schema was migrated in step 1, but nobody ever wired up the rendering — the fields were silently inert. Fixed by porting the JSX from both components.
2. **A real, pre-existing-on-main bug fix bundled into that same `ProjectsPage.tsx` diff**: the `/projects` hero used a fixed `h-[40vh]` + `overflow-hidden`, which clipped the domain filter pills onto a second row on narrow viewports or long (French) labels — exactly what the newly-ported FR filter-pill-clipping regression test checks for. Fixed alongside the fields.
3. **`AboutClient.tsx`'s course "View project" links pointed at `/projects/${id}`**, a route that immediately redirects back to bare `/projects` (see `ProjectDetailClient.tsx`) — so the link silently lost the deep link. Fixed to `/projects#${id}`.
4. **`HeroSection.tsx` still dispatched a `dot-pattern-burst` CustomEvent** on button hover and carried a `data-project-id="hero"` attribute — both dead code from the deleted DotPattern system, now removed.
5. **`lib/trailPath.ts` was ported in step 4 but never actually imported anywhere.** Wired it into `ExperienceTimeline.tsx` as the meandering central-axis trail, along with `useHashScroll` for `/experience#<id>` deep links.
6. **`ProjectsPage.tsx` had its own hand-rolled hash-scroll `useEffect`/`useRef` duplicate of `useHashScroll`** — refactored to use the shared hook.

Lesson applied going forward: for every file touched via hand-editing (not a straight `git checkout main --`), do the `diff`-against-main check immediately rather than assuming the edit was complete.

## Blockers
None currently.

## Team consultations during execution
- **2026-09-21 — pm, tech-lead** (Phase 1 discovery, parallel): see STRATEGY.md "Panel input" for full summary. Conflict surfaced (pm vs. mirroring main on /hobby) was escalated to the user rather than resolved unilaterally.
