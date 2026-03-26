# AGENTS Guide

## Read This First

- `STATUS.md` is the living source of truth for the current repo state.
- Put volatile details in `STATUS.md`, including implemented routes, active UI status, verification snapshots, known
  gaps, and the next queued work.
- Keep `AGENTS.md` for durable guardrails, conventions, and workflow expectations only.

## Scope and Product Guardrails

- `FinalConceptualDesign.tex` in the repo root is the main scope document.
- Preserve the RU Tap four-domain framing unless the user explicitly changes it:
    - academics
    - transit and rideshare
    - maps and rooms
    - careers
- Do not claim live Rutgers production integrations in the UI.
- Preserve the current product posture unless the user explicitly changes it:
    - no database
    - short-lived caching
    - CAS-aligned path when possible
- Keep Rutgers identity cues visible, but avoid noisy or off-brand redesign work unless the user explicitly wants it.

## Architecture Conventions

- This repo is a frontend-only app. Do not assume a backend, router package, or global state store exists.
- Entry flow remains `index.html` -> `src/main.tsx` -> `src/App.tsx`.
- Route selection is manual pathname branching unless the user explicitly asks for a routing change.
- Keep config and content arrays centralized and typed. Do not scatter service metadata or landing-page literals across
  unrelated components.
- Keep components in the closest role-based folder under `src/components/`:
    - `landing`
    - `layout`
    - `myRutgers`
    - `transit`
- Prefer default exports for component modules.
- Keep shared hooks under `src/hooks/`, and keep transit-specific hooks under `src/hooks/transit/` unless the user
  explicitly asks for a different split.
- Use the `@` alias for app-local imports (`@/*` -> `src/*`).
- Keep explicit `.ts` and `.tsx` import extensions in TypeScript files.
- Active styles live under `src/styles/` and are categorized by role:
    - `global`
    - `pages`
    - `components`

## TypeScript and Linting Guardrails

- `tsconfig.app.json` is intentionally strict. Preserve the strict posture.
- Keep type-only imports where appropriate.
- `src/types/` uses role-based folders and a one-type-per-file convention.
- Prefer default type exports plus `import type X from "..."` for app-local types.
- Prefer erasable TypeScript constructs that do not bloat emitted JavaScript.
- Keep component props readonly. Use `Readonly<{ ... }>` props and readonly arrays where appropriate.
- If you touch ESLint config, keep `eslint-config-prettier/flat` as the final config entry unless the user explicitly
  asks for a linting rewrite.
- Treat `.prettierrc.json` as effectively immutable unless the user explicitly requests a formatting config change.
- Do not run broad formatting passes or formatting-only edits unless the user explicitly asks for them.

## Manifest and Asset Rules

- `public/manifest.webmanifest` includes the in-file schema `https://www.schemastore.org/web-manifest.json`.
- Treat `public/` assets as the live install/runtime surfaces.
- Treat `src/assets/` as working or app-local assets unless the user explicitly asks to promote them into live public
  surfaces.
- Keep the manifest in sync when app identity changes, including name, description, scope, start URL, theme color, or
  icons.
- When public brand assets change, update any related metadata in `index.html`, the manifest, and other install surfaces
  as needed.

## Developer Workflows

- Assume the terminal starts in the project root.
- Do not pipe routine command output through `Out-String`.
- Install deps with `pnpm install`.
- Run the dev server with `pnpm dev`.
- Build with `pnpm build`.
- Lint with `pnpm lint`.
- Use `pnpm lint:fix` only when the task actually calls for autofixes.
- Use `pnpm format` or `pnpm format:check` only when formatting work is explicitly requested.
- Preview the production build with `pnpm preview`.

## AGENTS.md Policy

- Do not modify `AGENTS.md` unless the user explicitly asks for it.
