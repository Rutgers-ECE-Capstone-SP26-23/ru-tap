# STATUS

This file is the living snapshot of the repo as it exists right now. Update it when routes, architecture, assets,
verification status, product scope, or active backlog meaningfully change.

Last updated: 2026-03-24

## Project Snapshot

- Product name: RU Tap
- Repo type: single frontend-only web app
- Stack: Vite 8, React 19, TypeScript 5, ESLint 9, Prettier 3
- Package manager: `pnpm`
- Backend: none
- Router package: none
- Global state store: none
- Primary scope document: `FinalConceptualDesign.tex`
- README status: rewritten around RU Tap and broadly aligned with the current repo

## Current Route Coverage

| Route / Surface        | Status                | Current Implementation                                                       | Notes                                                                            |
| ---------------------- | --------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `/`                    | Implemented           | Landing page with product framing, domain cards, and preview launch paths    | Static marketing/product surface only                                            |
| `/myrutgers`           | Implemented prototype | Academic service directory plus preview panel driven by fixture data         | Integration framework only; every service is still placeholder-backed            |
| `/transit`             | Implemented prototype | Live Rutgers transit board with route filtering and per-bus stop predictions | Built around the Passio feed and excludes the six routes the user said to ignore |
| Maps and rooms surface | Not started           | No dedicated route or page yet                                               | Still conceptual only                                                            |
| Careers surface        | Not started           | No dedicated route or page yet                                               | Still conceptual only                                                            |

## Runtime and Build Architecture

- Entry flow is `index.html` -> `src/main.tsx` -> `src/App.tsx`.
- `src/main.tsx` mounts the app inside `StrictMode`.
- `src/main.tsx` imports `src/styles/index.css`.
- `src/main.tsx` registers a service worker in production with `navigator.serviceWorker.register("/sw.js")`.
- `src/App.tsx` lazy-loads the current page modules with `React.lazy`.
- `src/App.tsx` normalizes `globalThis.location.pathname`, strips trailing slashes, lowercases the path, and picks the
  page manually.
- `src/App.tsx` currently renders three page modules:
    - `src/pages/LandingPage.tsx`
    - `src/pages/MyRutgersPage.tsx`
    - `src/pages/TransitPage.tsx`
- `Suspense` currently uses `fallback={null}`, so route-chunk loading still produces a blank interim state.
- `vite.config.ts` builds both the main app entry and `src/sw.ts`.
- The built service worker is emitted as `dist/sw.js`.
- The repo uses the `@` alias for `src/*`.

## Product and Messaging Posture

- RU Tap is still a prototype.
- The app should not claim live Rutgers production integrations.
- Current implementation emphasis is still frontend integration framing rather than live Rutgers system integration.
- The intended four-domain framing is still:
    - academics
    - transit and rideshare
    - maps and rooms
    - careers
- Current implementation assumptions that remain in force:
    - no database
    - short-lived caching
    - CAS-aligned path when possible
    - baseline `$0` spend

## Landing Page Status

- File: `src/pages/LandingPage.tsx`
- Active styles: `src/styles/App.css`
- Purpose: act as the RU Tap product-facing landing page
- Current hero framing:
    - wordmark: `RU Tap · Rutgers New Brunswick`
    - headline: `One place for your Rutgers day.`
    - supporting copy explains academics, transit, maps, and careers in one product
- Current sections:
    - Why RU Tap
    - Core Experiences
    - Open the previews
    - Footer
- Current reusable building blocks used on the page:
    - `ActionLinks`
    - `CoreExperienceCard`
    - `FloatingTopButton`
    - `PanelCard`
    - `SectionBlock`
- Landing-page content arrays remain local to the page module and typed through:
    - `src/types/DomainCard.ts`
    - `src/types/Pillar.ts`
- Current preview launch state:
    - transit preview is linked from the landing page
    - myRutgers preview is linked from the landing page
- Route chunk status:
    - JS chunk emitted separately from the main shell
    - CSS chunk emitted separately from the main shell

## myRutgers Status

- File: `src/pages/MyRutgersPage.tsx`
- Active styles: `src/styles/myRutgersPage.css`
- Purpose: academic preview / integration-framework surface
- Current header structure:
    - home link text: `RU Tap`
    - main heading: `RU Tap`
    - kicker: `myRutgers academic preview`
    - lead copy summarizing schedules, grades, holds, registration, and announcements
- Current layout:
    - left column: service directory panel
    - right column: preview/widget panel
    - desktop split begins at `min-width: 980px`
- Current interaction model:
    - local `selectedServiceId` state
    - `selectedService` derived from `myRutgersServices`
    - selecting a card populates the preview panel
    - no selected service shows an empty-state preview panel
- Current implementation status of services:
    - count: 5
    - all services are currently `planned`
    - all services currently use `embedMode: "placeholder"`
    - no live iframe integrations are currently enabled
- Current services in the fixture set:
    - Course Schedule
    - Grades
    - Holds
    - Registration
    - Announcements
- Current component path:
    - `MyRutgersPage` -> `ServiceButtonGrid` -> `ServiceButtonCard`
    - `MyRutgersPage` -> `ServiceWidgetPanel` -> `WidgetPlaceholder` or iframe
- Current styling posture:
    - simpler two-panel layout after several rejected redesign iterations
    - service and preview panels are set up to stretch to equal row height on desktop
    - header text measure and wrap behavior were recently adjusted to reduce awkward line breaks

## Transit Status

- File: `src/pages/TransitPage.tsx`
- Active styles: `src/styles/transitPage.css`
- Purpose: first-pass RU Tap transit board for Rutgers buses
- Current data source:
    - `https://store.piemadd.com/passio_go/rutgers`
- Current feed shape consumed by the app:
    - live buses from `trains`
    - route metadata from `lines`
    - service notices from `alerts`
    - update timestamp from `lastUpdated`
    - top-level system health from `shitsFucked`
- Current polling behavior:
    - fetches live data on load
    - starts a 30-second board refresh clock after the first successful page load
    - updates unselected routes on the 30-second board clock
    - gives the currently selected route its own 5-second refresh clock
    - the selected route ignores 30-second board refresh updates while it remains selected
    - supports manual full-board refresh
- Current route filtering:
    - Camden is excluded
    - Campus Connect is excluded
    - Campus Connect Express is excluded
    - Newark Hotel Route is excluded
    - Penn Station Local is excluded
    - Penn Station Express is excluded
- Current board structure:
    - hero with live route, bus, alert, and board-update metrics
    - filtered route selector rail
    - selected-route detail panel
    - per-bus cards with up to three stop predictions each
    - collapsed inactive-route disclosure for routes not running right now
    - alert banner area for included-route notices
- Current interaction model:
    - route selection is local page state
    - the first available filtered route is selected by default
    - the board keeps the current route selected across refreshes when possible
    - inactive selected routes stay visible in the route picker while selected
- Current browser verification:
    - route switching was checked on `http://localhost:5173/transit`
    - a duplicate-key warning from repeated stop IDs was found and fixed
    - a follow-up console check after the fix reported zero errors
- Current implementation limits:
    - no map view yet
    - no stop search yet
    - no favorites yet
    - no rideshare layer yet
    - no transit-specific offline cache strategy yet

## Data and Type Status

- myRutgers metadata is centralized in `src/data/myRutgersServices.ts`.
- myRutgers types live in `src/types/myRutgers.ts`.
- Transit-specific models now live in `src/types/transit.ts`.
- Transit feed adaptation now lives in `src/data/transit.ts`.
- The raw Passio feed is adapted into filtered RU Tap route, bus, alert, and system-status models before rendering.
- `MyRutgersService` currently models:
    - `id`
    - `title`
    - `summary`
    - `status`
    - `embedMode`
    - optional `embedUrl`
    - optional `notes`
- `MyRutgersServiceStatus` currently allows:
    - `ready`
    - `planned`
- `MyRutgersEmbedMode` currently allows:
    - `iframe`
    - `placeholder`
- Transit route modeling currently keeps:
    - route ID, name, short name, color, and text color
    - route-level `updatedAt` timestamps
    - bus run number, destination, heading, and real-time flag
    - up to three next-stop predictions per bus
    - filtered alerts and top-level feed health

## PWA and Installability Status

- Manifest file: `public/manifest.webmanifest`
- Manifest schema is wired in-file through `https://www.schemastore.org/web-manifest.json`.
- Current manifest identity:
    - `name`: `RU Tap`
    - `short_name`: `RU Tap`
    - `display`: `standalone`
    - `start_url`: `/`
    - `scope`: `/`
- Current manifest category posture:
    - education
    - productivity
    - navigation
- Current app icon source: `public/favicon.svg`
- Current favicon status:
    - Rutgers-scarlet tile
    - animated pulse/ring accent
    - white `R` on the topmost layer
- Current install model:
    - one site-wide install target only
    - no separate per-page manifests
    - no multi-page install setup

## Service Worker Status

- Source file: `src/sw.ts`
- Extracted worker types: `src/types/serviceWorker.ts`
- Built output: `dist/sw.js`
- Current cache names:
    - `ru-tap-shell-v1`
    - `ru-tap-runtime-v1`
- Current app-shell precache list:
    - `/`
    - `/manifest.webmanifest`
    - `/favicon.svg`
    - `/up-arrow.svg`
- Current navigation behavior:
    - network-first style fetch
    - falls back to cached `/` on failure
- Current same-origin runtime caching:
    - scripts
    - styles
    - images
    - fonts
    - web manifests
- No route-specific service worker scopes or separate PWAs currently exist.

## Styling and File Layout Status

- Active styles are under `src/styles/`.
- The active global stylesheet is `src/styles/index.css`.
- Landing-page styles live in `src/styles/App.css`.
- myRutgers-page styles live in `src/styles/myRutgersPage.css`.
- transit-page styles live in `src/styles/transitPage.css`.
- Component-specific styles currently exist for:
    - `ActionLinks`
    - `CoreExperienceCard`
    - `FloatingTopButton`
    - `PanelCard`
    - `SectionBlock`
    - `ServiceButtonCard`
    - `ServiceButtonGrid`
    - `ServiceWidgetPanel`
    - `WidgetPlaceholder`
- `src/App.css` and `src/index.css` in the repo root are legacy copies and are not part of the active import graph.

## Verification Snapshot

Verified on: 2026-03-24

- `pnpm lint`: passes
- `pnpm build`: passes
- Local browser check against `http://localhost:5173/transit`: completed

Current build artifact snapshot from the latest verified build:

| Output                                   | Size      | Gzip     |
| ---------------------------------------- | --------- | -------- |
| `dist/index.html`                        | 0.90 kB   | 0.47 kB  |
| `dist/assets/main-Dy08tWEJ.css`          | 1.64 kB   | 0.74 kB  |
| `dist/assets/LandingPage-CXcsF3BE.css`   | 3.96 kB   | 1.37 kB  |
| `dist/assets/MyRutgersPage-BjKSSzqQ.css` | 4.19 kB   | 1.25 kB  |
| `dist/assets/TransitPage-CYx28Rml.css`   | 6.86 kB   | 1.83 kB  |
| `dist/assets/jsx-runtime-CGqjDhly.js`    | 0.44 kB   | 0.29 kB  |
| `dist/sw.js`                             | 1.02 kB   | 0.54 kB  |
| `dist/assets/MyRutgersPage-CSPWXTlD.js`  | 4.47 kB   | 1.43 kB  |
| `dist/assets/LandingPage-C5rvRefv.js`    | 5.10 kB   | 2.00 kB  |
| `dist/assets/TransitPage-C68gpwpP.js`    | 12.92 kB  | 4.05 kB  |
| `dist/assets/main-Dlf4hznV.js`           | 192.14 kB | 60.71 kB |

Testing status:

- No automated test suite is configured yet.
- There are no committed unit, integration, or end-to-end tests in the current repo.

## Known Gaps and Constraints

- No live Rutgers system integration beyond public transit data
- No backend
- No database
- No CAS/session wiring beyond product-direction messaging
- No maps-and-rooms page yet
- No careers page yet
- No router package
- No global state store
- No analytics or telemetry layer
- No test suite
- `Suspense` route fallback is still `null`
- myRutgers services remain placeholder content rather than real widgets
- transit currently has no map, stop search, favorites, or rideshare layer

## Important Files and Responsibilities

| File                            | Current Responsibility                                        |
| ------------------------------- | ------------------------------------------------------------- |
| `index.html`                    | Base HTML document, manifest link, app metadata, favicon link |
| `src/main.tsx`                  | React mount point and production service-worker registration  |
| `src/App.tsx`                   | Manual pathname routing and lazy page loading                 |
| `src/pages/LandingPage.tsx`     | RU Tap landing page content and section composition           |
| `src/pages/MyRutgersPage.tsx`   | myRutgers page state, layout, and service selection           |
| `src/pages/TransitPage.tsx`     | Transit page state, route selection, and live bus board UI    |
| `src/data/myRutgersServices.ts` | Fixture metadata for academic services                        |
| `src/data/transit.ts`           | Rutgers transit feed fetch, filtering, and transformation     |
| `src/types/myRutgers.ts`        | myRutgers data model types                                    |
| `src/types/transit.ts`          | Transit feed and UI model types                               |
| `src/sw.ts`                     | Service worker runtime logic                                  |
| `src/types/serviceWorker.ts`    | Service worker type helpers                                   |
| `src/styles/index.css`          | Active global styling entry                                   |
| `src/styles/App.css`            | Landing page styling                                          |
| `src/styles/myRutgersPage.css`  | myRutgers page styling                                        |
| `src/styles/transitPage.css`    | Transit page styling                                          |
| `public/manifest.webmanifest`   | Install metadata                                              |
| `public/favicon.svg`            | Animated app icon / favicon                                   |
| `vite.config.ts`                | Vite config, aliasing, and service-worker build wiring        |

## Next Queued Work

The active feature area is now transit expansion rather than transit setup.

High-signal next steps for transit:

- add a map surface
- add stop-focused views or search
- add favorites if the product still wants them
- decide whether weekend and overnight routes need a different presentation
- decide how rideshare should fit into the transit surface

## Documentation Policy

- Keep `STATUS.md` current when the repo state changes.
- Keep `AGENTS.md` focused on durable instructions and conventions.
- If a detail can go stale quickly, it belongs here instead of `AGENTS.md`.
