# Feature development process

Every `dev/<feature-name>` branch follows the two phases below. **This applies to `dev/` only** — not `bug/`, `doc/`, `audit/`, or `claude/`, which each have their own simpler flows in [workflow.md](workflow.md).

The goal: prevent half-understood features, avoid building the wrong thing, and leave a trail of what was decided and why.

---

## Phase 1 — Discovery (before any code, before any branch)

Clément describes a feature. Claude does **not** immediately say "yes, let's do it" and start coding. Instead:

### 1.1 Ask questions until the scope is real

Clarifying questions come first. Keep them specific and load-bearing — don't ask for the sake of asking. Target 2–5 questions per round, not 15.

Good clarifying questions answer things like:
- **Who is this for?** Which visitor (recruiter, professor, peer, future collaborator) is supposed to care?
- **What's the success criterion?** How will Clément know the feature worked? Is there a visible outcome, a metric, a qualitative judgment?
- **What's explicitly out of scope?** Every feature has an implicit "not this" — make it explicit.
- **What does it replace or break?** Does it conflict with existing content, existing flows, the Schematic/DotPattern data, the static-export constraint?
- **Is there a deadline or dependency?** (application deadline, conference, recruiter deck, travel)
- **What would make this NOT worth building?**

Bad clarifying questions: vague preferences ("how do you feel about it?"), hypotheticals that don't change the build ("what if 10,000 people visited?"), questions whose answers are already in [project-map.md](project-map.md) or the codebase.

### 1.2 Push back directly when something is a bad idea

Claude's job is not to be agreeable. If a proposed feature is:
- A poor use of visitor attention
- Inconsistent with the existing design language
- A large lift for small value
- Solving a problem nobody has
- Requiring a runtime (this is a static export)
- Duplicating something that already exists

...say so, plainly, in the response. No hedging, no "if you're sure". Name the specific concern, propose an alternative or a compromise, and let Clément decide.

"I don't think this is worth building because X. A smaller version that would get 80% of the value: Y. Want me to try Y instead?" is the right shape.

### 1.3 Consult the team in parallel

Always spawn these two subagents in parallel via the Agent tool during discovery (one Agent tool block, multiple calls):

- **`pm`** — decides what's worth building and for whom; will push back on scope and visitor value
- **`tech-lead`** — decides what's sane to build on this stack; will push back on architecture, complexity, and dependency creep

Add **conditionally**, in the same parallel block:
- **`ux-designer`** — when the feature adds a new page, flow, or interaction
- **`qa`** — when the feature touches areas with known-fragile tests (canvas, routing, i18n)
- **`frontend-eng`** — when feasibility is in doubt (canvas work, React 19 hook constraints, tricky state)
- **`ui-designer`** — when the feature has significant visual weight
- **`typst-eng`** — when the feature touches CV content that should sync with the site

Do NOT consult: the career-writing agents (they're for CV/cover letter work), reserve roles (`eng-manager`, `scrum-master`, `backend-eng`, `data-scientist`) unless specifically relevant.

Pass each agent the same brief: what Clément asked for, what's been clarified so far, and a request for their take. **Parallel** so the agents don't anchor on each other — you want genuinely independent opinions.

### 1.4 Collate and surface conflicts — don't average them

When the panel reports back, present their takes **honestly**, not blended into a single consensus view. If `pm` says "don't build this" and `tech-lead` says "technically trivial", surface that directly:

> - **pm**: doesn't see visitor value; would cut
> - **tech-lead**: half a day of work, no architectural risk
> - Conflict: this is a value question, not a feasibility question. I'd side with pm unless you have a specific reason this matters to a specific visitor.

Then ask Clément to decide. Don't decide for him on value questions, but **do** make a concrete recommendation.

### 1.5 Stop conditions

Do NOT proceed to Phase 2 if:
- Scope is still fuzzy after ~3 rounds of clarification — instead, name the ambiguity and ask Clément to commit to one interpretation
- The panel unanimously recommends against building it — restate their reasoning and ask if Clément still wants to override
- The feature would violate a hard invariant (breaks static export, requires a runtime, duplicates an existing feature) — explain the conflict before asking for a decision

Phase 1 ends when Clément explicitly says "OK, let's build it" **and** scope is clear enough that STRATEGY.md can be written.

---

## Phase 2 — Execution

### 2.1 Create the branch

```bash
git checkout main && git pull
git checkout -b dev/<feature-name>
```

### 2.2 Write STRATEGY.md and TRACKING.md at the branch root (before any code)

Both files live at the **repository root** on the feature branch, not in `.claude/`. They ship with the branch and disappear on merge — they are working documents for this one feature.

**STRATEGY.md** is written once at the start of Phase 2 and updated only when scope materially changes (which triggers a mini Phase-1 re-consultation). Structure:

```markdown
# <Feature name> — Strategy

## Goal
One sentence. What does this feature do, and why does it exist?

## Visitor value
Who is the visitor this is for? What do they need to leave knowing, believing, or doing?

## Scope
### In scope
- Bullet list of things this branch WILL deliver

### Out of scope
- Bullet list of things this branch will NOT do, even though they're adjacent

### Non-goals
- Things someone might assume are goals but are deliberately not. Name them.

## Approach
A few paragraphs on how we'll build it. What files change, what pattern we follow, what existing code we extend vs replace.

## Risks
What could go wrong? Known fragile areas? Things that might not work?

## Tradeoffs
What are we giving up? What's the alternative we rejected, and why?

## Test plan
Which tiers get run, what manual checks, what's the acceptance criterion?

## Panel input (from Phase 1)
- **pm**: <one-line summary of their take>
- **tech-lead**: <one-line summary>
- **<other agents>**: <one-line each>
- **Conflicts surfaced**: <any disagreements and how they were resolved>
```

**TRACKING.md** is written once and then updated continuously as work progresses. Structure:

```markdown
# <Feature name> — Tracking

## Current status
One sentence. What state is this branch in right now?
Last updated: <YYYY-MM-DD>

## Tasks
- [x] Create STRATEGY.md and TRACKING.md
- [ ] <task> — <owner agent, if applicable>
- [ ] ...

## Decisions log
Chronological, most recent last.

### YYYY-MM-DD — <short decision title>
What was decided, what alternatives were considered, why this choice.

## Blockers
Anything preventing progress, with what's needed to unblock.

## Team consultations during execution
Record follow-up agent invocations beyond Phase 1.
- **YYYY-MM-DD — <agent>**: <why called, key take>
```

### 2.3 Work the tasks

Follow the `dev/` workflow from [workflow.md](workflow.md): small focused commits, run the right test tier for the change, `/merge-check` before opening the PR, wait for Clément's approval.

During execution, update `TRACKING.md` as you go:
- Check off tasks as they complete
- Add new tasks when they surface
- Add a decision log entry when you make a non-trivial call
- Flag blockers immediately, don't silently work around them

### 2.4 Capture visual evidence for UI-affecting features

For any feature that changes what the site looks like (new page, new component, new section, restyled element), capture an **AFTER screenshot** at the primary viewport(s) the feature targets using the procedure in [visual-reproduction.md](visual-reproduction.md):

```bash
npm run dev  # in another terminal
npm run visual:repro -- --url /<route> --viewport "<device>" --out tests/visual/repro/<feature-slug>/after.png
```

Commit the screenshot into the PR with `git add -f <path>` so it appears in the diff for the reviewer. BEFORE screenshots are optional for features (most features are additive, not regressive) — capture one only if you're modifying an existing visual area.

### 2.5 When to re-consult the panel during execution

Spawn an agent mid-execution when:
- A decision has architectural consequences (→ `tech-lead`)
- Scope creeps or shrinks (→ `pm`)
- A UX question surfaces that wasn't in Phase 1 (→ `ux-designer`)
- An implementation detail turns out harder than expected (→ `frontend-eng` or the relevant builder)

Log the consultation in `TRACKING.md`.

### 2.6 At merge time

Both `STRATEGY.md` and `TRACKING.md` are part of the PR — they're part of the story of the feature, and the reviewer (Clément) reads them along with the diff. They get merged to main along with the code, where they live under the branch name's "history". **This is fine**, even though they're not useful on main long-term — they're cheap to keep and they document real decisions.

If you later want to purge accumulated STRATEGY/TRACKING files from main, that's a `doc/cleanup-old-feature-docs` branch.

---

## What NOT to do

- Don't skip Phase 1 because "it's a small feature". Even a 1-hour feature deserves 5 minutes of "who is this for?"
- Don't blend panel opinions into a single recommendation when they actually disagree. Conflict is signal.
- Don't write STRATEGY.md *after* the code is written. The whole point is to commit to scope before the code makes it easy to rationalize.
- Don't update STRATEGY.md silently when scope drifts. A scope change is a decision — log it, get Clément's OK, then update.
- Don't forget to update TRACKING.md. If it says "task 3 in progress" but you're actually on task 7, the document is a lie and useless.
- Don't impersonate the panel agents from the main conversation. Invoke them via the Agent tool — their voices are different from Claude's default voice for a reason.
- Don't start Phase 2 on a `bug/` branch. Bugs have their own flow (reproduce → failing test → fix).
