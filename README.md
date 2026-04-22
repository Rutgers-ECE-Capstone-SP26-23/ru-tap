# RU Tap

RU Tap is a Rutgers workflow prototype that brings academics, transit, and maps and rooms into one installable web app
experience.

## Current Repo Scope

- Landing page for the RU Tap product direction
- myRutgers academic integration framework at `/myrutgers`
- Frontend-only prototype built with fixture data
- PWA shell with manifest metadata and service-worker caching

## Stack

- Vite 8
- React 19
- TypeScript 5
- ESLint 9
- Prettier 3

## Scripts

- `pnpm install`
- `pnpm dev`
- `pnpm build`
- `pnpm lint`
- `pnpm lint:fix`
- `pnpm format`
- `pnpm format:check`
- `pnpm preview`

## Product Notes

- RU Tap is currently a prototype and should not claim live Rutgers production integrations.
- The conceptual design source of truth is `FinalConceptualDesign.tex`.
- Current implementation posture remains:
    - no database
    - short-lived caching
    - CAS-aligned path when possible
    - baseline `$0` prototype spend
