# Home page card pass — Strategy

Covers both home-page card changes that landed on `add_first_projects`: the ARTORG update to the "Work Experience" card (PR #6) and the card reorder + new "Get in Touch" card (PR #7).

## Goal
Replace the remaining template placeholders on the home page with real content: feature the ARTORG cochlear-implant work behind the "Work Experience" card, promote "Beyond Engineering" into the third slot, and close the page with a "Get in Touch" card pointing at the existing `/contact` page.

## Visitor value
A recruiter or professor skimming the home page previously hit two placeholder cards ("REPLACE THIS IMAGE") and a card for a project that doesn't exist ("Autonomous Terrain Rover" → `/projects#terrain-rover`). Each of those is a dead end. The pass gives the Work Experience card a concrete hook, removes the dead-end card, and ends the scroll on a call to action instead of a second lifestyle card.

## Scope
### In scope
- `src/data/homeCards.ts`:
  - `job-experience` — placeholder image → the existing ARTORG project hero (`cochlear-implant-insertion-mechanism/hero.jpeg`); descriptor rewritten to the cochlear-implant work.
  - `engineering-project` (Autonomous Terrain Rover) — removed entirely.
  - `hobby` (Beyond Engineering) — moved to slot 3 (`number: "03"`).
  - `get-in-touch` — new card in slot 4 (`number: "04"`), linking to `/contact`.
- `src/data/translations/{en,fr}/homeCards.ts`: matching descriptor rewrite, `engineering-project` entry dropped, `get-in-touch` entry added.

### Out of scope
- The `academic-research` card (already real content).
- The `/contact` and `/hobby` pages themselves.
- A hero image for the Get in Touch and Beyond Engineering cards — none exists yet, so they keep the placeholder image convention.

### Non-goals
- Building a real "Autonomous Terrain Rover" project — the card was removed as a placeholder, not deferred.
- Restyling the card/section components.

## Approach
Pure data edits. `HomePage.tsx` renders `getHomeCards()` in array order and overlays `t.homeCards[card.id]`, so reordering the array and swapping ids covers both the ordering and the linking. No component, schema, or dependency changes. Images reuse assets already in `public/images/`.

## Risks
Low. Only real risk was i18n key drift, mitigated by editing EN/FR together and running `validate:i18n`.

## Tradeoffs
Two of the four cards still use the placeholder image (`hobby`, `get-in-touch`) because no real asset exists for them yet. Accepted rather than blocking the rest of the pass on sourcing images.

## Test plan
- `npm run lint`, `npm run test:unit`, `npm run validate:i18n`
- `npm run test:e2e:tier1` (linking changed — new `/contact` target)
- Manual check in `npm run dev`, EN + FR

## Panel input (from Phase 1)
Phase 1 pm/tech-lead panel skipped on both branches: pure content/data edits reusing existing assets and existing pages, with no scope or architecture decision — same rationale as the documented skill-driven content exception in `docs/workflow.md`.
