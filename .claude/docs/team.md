# Team

20 subagents live in [../agents/](../agents/). Each has a distinct voice, a narrow scope, and explicit "when to invoke me" triggers in its frontmatter. The main conversation can invoke them via the Agent tool, by name.

## Build the site (8)

| Agent | When to call |
|---|---|
| [`tech-lead`](../agents/tech-lead.md) | Architecture decisions, tradeoffs, "should we build it this way?" Use before non-trivial implementation. |
| [`frontend-eng`](../agents/frontend-eng.md) | Default builder for UI, Tailwind, i18n, routing, canvas work. Most site tasks go here. |
| [`fullstack-eng`](../agents/fullstack-eng.md) | When a task spans data + components + tests + CV pipeline in one pass. |
| [`backend-eng`](../agents/backend-eng.md) | GitHub API integration, data schemas. Reserve role — static site has little backend. |
| [`typst-eng`](../agents/typst-eng.md) | CV pipeline: variants, template, build.sh, one-page discipline. |
| [`qa`](../agents/qa.md) | Break features, design test cases, pick the right Playwright tier. Use proactively after changes. |
| [`devops`](../agents/devops.md) | CI/CD, GitHub Actions, deploy pipeline, build reproducibility. |
| [`security-eng`](../agents/security-eng.md) | Admin panel token flow, deps, XSS surface. Surface is small but non-trivial. |

## Design & product (6)

| Agent | When to call |
|---|---|
| [`pm`](../agents/pm.md) | What to build, scope cuts, visitor value, prioritization. Call before non-trivial features. |
| [`ux-designer`](../agents/ux-designer.md) | User flows, information architecture, friction points in navigation. |
| [`ui-designer`](../agents/ui-designer.md) | Visual hierarchy, type, color, spacing. Call after UX is settled. |
| [`scrum-master`](../agents/scrum-master.md) | Break fuzzy work into tasks, identify blockers. **Invoke sparingly.** |
| [`eng-manager`](../agents/eng-manager.md) | Step-back conversations, sustainability, scope/energy balance. **Invoke sparingly.** |
| [`data-scientist`](../agents/data-scientist.md) | Flight log stats, course data aggregation. **Reserve role.** |

## Career & writing (6)

| Agent | When to call |
|---|---|
| [`resume-consultant-supportive`](../agents/resume-consultant-supportive.md) | Encouraging early-draft feedback. Unearth buried wins. Build momentum. |
| [`resume-consultant-neutral`](../agents/resume-consultant-neutral.md) | Objective, unflinching bullet-by-bullet review. Keep/rewrite/cut. |
| [`grumpy-recruiter`](../agents/grumpy-recruiter.md) | 6-second reject test from the harshest possible reader. |
| [`mit-prof-rf`](../agents/mit-prof-rf.md) | Validate RF / antenna / microwave / wireless claims for technical accuracy. |
| [`mit-prof-photonics`](../agents/mit-prof-photonics.md) | Validate optics / photonics / lasers / quantum claims. |
| [`mit-prof-embedded`](../agents/mit-prof-embedded.md) | Validate MCU / firmware / real-time / hardware-peripheral claims. |

All six career agents know where Clément's content lives (CV variants, `cv/data/`, `src/data/projects.ts`, translations). They also all respect the **ambitious-not-cocky** tone rule and respond in the language of the document under review.

## The CV review pipeline

For career-writing work, the canonical chain is:

```
resume-consultant-supportive  →  mit-prof-<domain>  →  resume-consultant-neutral  →  grumpy-recruiter
   brainstorm, find wins          technical accuracy     keep/rewrite/cut             6-second reject test
```

The [`/cv-pipeline`](../skills/cv-pipeline/SKILL.md) skill automates this chain end-to-end and collates results (including surfacing conflicts between agents — that's signal, not noise).

Skip the MIT professor step if the content is non-technical (bio, cover-letter intro, general narrative).

## Rules for invoking agents

1. **Match the task to the agent** — don't spawn a Tech Lead to fix a typo.
2. **Pass full context** — subagents don't share the main conversation's memory. Give them what they need.
3. **Don't impersonate** — when a task calls for a specific voice (e.g. the grumpy recruiter's harshness), actually invoke the agent rather than simulating it from the main conversation.
4. **Respect reserve roles** — `scrum-master`, `eng-manager`, `data-scientist`, and `backend-eng` openly admit limited scope. Don't force-fit.
5. **Parallel when independent** — multiple agents for independent questions can run in parallel via a single Agent tool block with multiple calls.
