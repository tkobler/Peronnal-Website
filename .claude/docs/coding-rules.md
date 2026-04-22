# Coding rules

Language, structure, and testing rules that apply to all code in this repo. Frontend-specific rules are in [frontend-guidelines.md](frontend-guidelines.md); this file is the general layer under them.

## TypeScript

- **Strict mode is on.** No `any`, no `@ts-ignore`, no `// @ts-expect-error` without an inline reason.
- **Prefer `type` over `interface`** for props and data shapes unless you need declaration merging.
- **Derive types where possible.** `typeof projects[number]`, `ReturnType<…>`, `Parameters<…>` beat redeclaring.
- **Discriminated unions** for polymorphic data (e.g. `Schematic` has `mode: 'paths' | 'pads' | …` — narrow on `mode`, don't cast).
- **No enums.** Use string literal unions.
- **Readonly where it helps.** Data tables in [src/data/](../../src/data/) can be `as const` — keeps types narrow and prevents accidental mutation.

**Example** — deriving types instead of re-declaring:
```ts
// ❌ re-declared, can drift from the data
type Project = { id: string; title: string; domain: string; /* … */ };

// ✅ derived — type always matches reality
import { projects } from '@/data/projects';
type Project = typeof projects[number];
```

**Example** — narrowing a discriminated union:
```ts
// ✅ narrow on the discriminant, don't cast
function render(schematic: Schematic) {
  switch (schematic.mode) {
    case 'paths':   return renderPaths(schematic.paths);   // type-safe access
    case 'pads':    return renderPads(schematic.pads);
    case 'regions': return renderRegions(schematic.regions);
    case 'bitmap':  return renderBitmap(schematic.bitmap);
  }
}
```

## Imports

**Example** — import style:
```ts
// ❌ deep relative, painful to move files
import { projects } from '../../../../data/projects';

// ✅ path alias, works from anywhere
import { projects } from '@/data/projects';
```

- **Always use `@/*`** for internal imports: `import { projects } from '@/data/projects'`. Never `../../../data/projects`.
- **Import order**: (1) node/react/next, (2) third-party, (3) `@/*`, (4) relative. Separate groups with blank lines. ESLint does not enforce this today — do it by habit.
- **Side-effect imports** (CSS, polyfills) go at the top of the file.
- **No barrel files** (`index.ts` re-exports) unless one already exists. They hurt tree-shaking and make grep harder.

## Data modeling (src/data/)

- Data files are the source of truth. Treat them like a schema.
- **Every new project / card / experience entry must have the same shape** as existing ones. If you need a new field, update the TS type first, then add it everywhere.
- **IDs are stable.** Never renumber existing project IDs — other things (tests, URLs, translations) key off them.
- **Translations stay in sync with data.** If you add a project with `id: "foo"`, add `projects.foo.*` keys in both `en/projects.ts` and `fr/projects.ts`.

## File & naming conventions

- **Components**: `PascalCase.tsx`
- **Hooks**: `useCamelCase.ts`
- **Data / utils / lib**: `camelCase.ts`
- **Types**: prefer colocating with the component/module; global shared types go in [src/types/](../../src/types/).
- **Tests**: `*.test.ts(x)` for Vitest (colocated or in `tests/unit/`), `*.spec.ts` for Playwright (in `tests/e2e/` or `tests/visual/`).

## Functions & complexity

- Short functions. If you're past ~40 lines and it isn't a reducer or a renderer, split it.
- **Early returns over nested `if`s.**
- **No default exports** except for Next.js page/layout files (which require them).
- **Pure functions where possible.** Side effects belong in `useEffect` or explicit handlers.

## Error handling

- Trust internal data. `projects.ts` is hand-maintained — don't wrap reads in `try`/`catch`.
- Validate at boundaries only: user input, URL params, `localStorage` reads, external API responses.
- When something genuinely can go wrong (canvas context acquisition, `typst` not installed), fail loudly with a clear message, not a silent fallback.

## Testing

- **Unit tests** (Vitest) for: data validation, pure helpers in `src/lib/`, translation key parity, non-trivial hook logic.
- **E2E tests** (Playwright) for: user-facing flows. Already organized in tiers — slot new tests into the right tier rather than inventing new files.
- **Visual tests** for: pages/components where pixel diffs matter. Update baselines only when the change is intentional.
- **When fixing a bug**, add a test that fails without the fix. Always.
- **When adding a feature**, at minimum add a unit test for any logic and an e2e smoke test for any new route/interaction.

## Comments

- Default: write none. Good names beat comments.
- When you DO write a comment, explain **why**, not what. "Fixes flash of wrong locale because React hydrates after the localStorage read" is useful. "Set the locale" is not.
- Never leave `// TODO` without an owner and context. Either fix it or file it.
- Never reference task/PR numbers in code comments — they rot.

## Git hygiene

- Don't commit: `out/`, `.next/`, `node_modules/`, `public/cv-*.pdf`, `cv/output/`, `tests/visual/baselines/`, `test-results/`, `.env*`, `docs/`, `cv/archive/`.
- Prefer small, focused commits. One concern per commit.
- Commit messages: lowercase, imperative, short. Match the existing style in `git log` — most messages here are one line, no prefix.

## When in doubt
- Read a neighbor. If you're editing a page, look at how other pages do it and match.
- Ask before introducing a new pattern — consistency beats novelty in a codebase this small.
