---
name: cv-pipeline
description: Walk a CV bullet, cover letter paragraph, or project description through the full career-writing review chain — supportive consultant → domain MIT professor → neutral consultant → grumpy recruiter. Invoke when the user wants a complete pass on application material, or says "/cv-pipeline".
---

# cv-pipeline

Orchestrate the four career-writing agents to give a complete review of a piece of application content (CV bullet, cover letter paragraph, project description, LinkedIn summary).

## How the chain works

```
1. resume-consultant-supportive  →  2. mit-prof-<domain>  →  3. resume-consultant-neutral  →  4. grumpy-recruiter
   (brainstorm, find wins)          (technical accuracy)       (polish, keep/rewrite/cut)     (6-second reject test)
```

Each stage reads the content fresh (they don't share context), so you must pass the full content to each one.

## What to do

1. **Gather the content.**
   - Read the exact text the user wants reviewed. If they point at a file (`cv/variants/generic-en.typ`, a cover letter in `cv/archive/`, a project description in `src/data/projects.ts`), read it.
   - If the content is ambiguous ("review my CV"), ask: what specific part? A bullet? A section? The whole thing?
   - Determine the **language** (EN/FR) and the **target domain** (RF, photonics, embedded, or general) — you'll need these to pick the right MIT professor and to instruct each agent about language.

2. **Pick the right MIT professor** based on domain:
   - RF / antennas / microwave / wireless → `mit-prof-rf`
   - Optics / photonics / lasers / silicon photonics / quantum optics → `mit-prof-photonics`
   - MCU / firmware / RTOS / real-time / hardware peripherals → `mit-prof-embedded`
   - If the content is general (bio, cover letter intro, non-technical), **skip step 2** and jump from supportive → neutral directly. Note the skip in the report.
   - If the content spans multiple domains, pick the one that's most specific, and note you could run again for others.

3. **Run the chain, one agent at a time, via the Agent tool.** Pass each agent:
   - The full content under review
   - The target role/company context if the user provided it
   - The language rule (respond in the language of the content)
   - Any prior feedback from earlier stages — but clearly labeled so the agent can choose to read or ignore it (they're supposed to judge independently)

4. **Collate results** into a single report:

   ```
   ## CV pipeline review: <short description of content>
   Language: <EN/FR> · Domain: <rf/photonics/embedded/general>

   ### Stage 1 — Supportive consultant
   <their output verbatim or tightly summarized>

   ### Stage 2 — MIT Prof, <domain>
   <their output verbatim or tightly summarized>
   (or: skipped — content is non-technical)

   ### Stage 3 — Neutral consultant
   <their output verbatim or tightly summarized>

   ### Stage 4 — Grumpy recruiter
   <their verdict: reject/maybe/interview + 3 reasons + the one change that moves it a tier>

   ### Synthesis
   - Top 3 changes to make (ranked by impact)
   - Biggest disagreement between agents (if any) — and which side you'd bet on
   - Recommended next version of the content (rewritten, ready to drop in)
   ```

5. **If agents conflict**, don't hide it. The four agents are deliberately different voices — conflict is signal. Example: the supportive consultant loves a bullet that the grumpy recruiter rejects. That means the bullet is risky — it works for some readers and fails others. Surface this honestly.

## What this skill does NOT do

- Does not rewrite the file on disk. The user decides what changes to apply.
- Does not skip stages. If the content is non-technical, skip stage 2 explicitly; don't silently drop other stages.
- Does not ask the agents to be nicer or harsher than their system prompts define them to be. Their voices are the point.
- Does not translate content between languages. If the user wants a FR version of an EN bullet, that's a separate task (consult `resume-consultant-neutral` or translate manually).

## Cost note

This runs 3–4 subagents per invocation, each with the full content in context. It's not free. Use it for pieces of content the user is about to ship, not for early brainstorms — for those, call `resume-consultant-supportive` alone.

## Fallback

If the user's content is too vague or too generic to review (e.g., "tell me if my CV is good"), respond by asking for:
1. The specific bullet, paragraph, or section under review
2. The target role or company (if any)
3. The language of the final document

Then run the chain.
