# STATUS

This file is the living snapshot of the repo as it exists right now. Update it when routes, architecture, assets,
verification status, product scope, or active backlog meaningfully change.

Last updated: 2026-03-31T02:46:55.4101374-04:00

## Project Snapshot

- Product name: RU Tap
- Repo type: single frontend-only web app
- Stack: Vite 8, React 19, TypeScript 5, ESLint 9, Prettier 3
- Package manager: `pnpm`
- Package manager pin: `pnpm@10.33.0` declared in `package.json`
- Backend: none
- Router package: none
- Global state store: none
- Primary scope document: `FinalConceptualDesign.tex`
- Primary durable instruction document: `AGENTS.md`
- Primary volatile state document: `STATUS.md`
- README status: rewritten around RU Tap rather than the default Vite template

## Product Scope and Posture

- RU Tap is still a prototype.
- The four-domain framing is still:
    - academics
    - transit and rideshare
    - maps and rooms
    - careers
- The implementation still should not claim live Rutgers production integrations in the UI.
- Current implementation assumptions that remain in force:
    - no database
    - short-lived caching
    - CAS-aligned path when possible
    - baseline `$0` spend

## Current Route Coverage

| Route / Surface | State                 | Current Implementation                                                 | Notes                                                                |
| --------------- | --------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `/`             | Implemented           | Landing page with RU Tap product framing and preview launch links      | Static product surface only                                          |
| `/myrutgers`    | Implemented prototype | Academic service directory plus preview panel driven by fixture data   | Integration framework only; no real Rutgers widget wiring yet        |
| `/rooms`        | Implemented prototype | Classroom finder and room-detail directory driven by Rutgers room data | Finder/details UI only; no live indoor map or availability layer yet |
| `/transit`      | Implemented prototype | Live Rutgers transit board using the Passio feed                       | Most actively iterated surface in the repo right now                 |
| Maps / rooms    | Partially started     | Room finder page exists and is backed by `src/data/rooms.ts`           | Maps/wayfinding and live availability are still not implemented      |
| Careers         | Not started           | No dedicated page route or data surface yet                            | Still conceptual only                                                |

## Runtime and Build Architecture

- Entry flow is `index.html` -> `src/main.tsx` -> `src/App.tsx`.
- `src/main.tsx` mounts the app inside `StrictMode`.
- `src/main.tsx` imports `src/styles/global/index.css`.
- `src/main.tsx` registers the service worker only in production.
- The service worker is registered with:
    - `withBasePath("/sw.js")`
    - `{ type: "module" }`
- `src/App.tsx` lazy-loads page modules with `React.lazy`.
- `src/App.tsx` uses manual pathname routing rather than a router package.
- Path normalization is handled by `normalizeAppPath(...)` in `src/utils/basePath.ts`.
- `src/App.tsx` currently routes to:
    - `src/pages/LandingPage.tsx`
    - `src/pages/MyRutgersPage.tsx`
    - `src/pages/RoomsPage.tsx`
    - `src/pages/TransitPage.tsx`
- `Suspense` still uses `fallback={null}`, so route chunk loading still has a blank interim state.
- `vite.config.ts` builds both:
    - the main app entry from `index.html`
    - the service worker entry from `src/sw.ts`
- The built service worker is emitted as `dist/sw.js`.
- The repo uses the `@` alias for `src/*`.

## Base Path and Deployment Status

- GitHub Pages deployment workflow exists at `.github/workflows/deploy-pages.yml`.
- The workflow:
    - runs on pushes to `main`
    - supports manual dispatch
    - installs with `pnpm`
    - builds `dist`
    - adds `404.html` for SPA fallback
    - deploys with the standard GitHub Pages actions
- Pages workflow Node runtime migration status (2026-03-31):
    - upgraded to `actions/checkout@v6` (`node24`)
    - upgraded to `actions/setup-node@v6` (`node24`)
    - upgraded to `actions/configure-pages@v6` (`node24`)
    - replaced `actions/upload-pages-artifact` with explicit tar creation + `actions/upload-artifact@v6`
    - upgraded to `actions/deploy-pages@v5` (`node24`)
    - set workflow env `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24=true` to force transitive JavaScript actions to Node 24
- `vite.config.ts` computes the Vite `base` automatically for project-site Pages builds.
- `src/utils/basePath.ts` centralizes:
    - `withBasePath(...)`
    - `normalizeAppPath(...)`
- The current app is therefore set up to run from:
    - `/` in normal/local environments
    - `/<repo-name>/` on GitHub Pages project sites

## Landing Page Status

- File: `src/pages/LandingPage.tsx`
- Active styles: `src/styles/pages/landingPage.css`
- Purpose: RU Tap product-facing landing page
- Current hero framing:
    - wordmark: `RU Tap · Rutgers New Brunswick`
    - headline: `One place for your Rutgers day.`
    - supporting copy frames academics, transit, maps, and careers as one product
- Current sections:
    - Why RU Tap
    - Core Experiences
    - Open the previews
    - Footer
- Current reusable building blocks used on the page:
    - `ActionLinks` from `src/components/landing/`
    - `CoreExperienceCard` from `src/components/landing/`
    - `FloatingTopButton` from `src/components/landing/`
    - `PanelCard` from `src/components/layout/`
    - `SectionBlock` from `src/components/layout/`
- Landing-page content arrays remain page-local and typed through:
    - `src/types/content/domainCard.ts`
    - `src/types/content/pillar.ts`
- Current preview launch state:
    - links to `/myrutgers`
    - links to `/rooms`
    - links to `/transit`
- Route-chunk status:
    - JS chunk emitted separately from the main shell
    - CSS chunk emitted separately from the main shell

## myRutgers Status

- File: `src/pages/MyRutgersPage.tsx`
- Active styles: `src/styles/pages/myRutgersPage.css`
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
    - `selectedService` derived from fixture metadata
    - selecting a card populates the preview panel
    - no selected service shows an empty-state preview panel
- Current implementation status of services:
    - count: 5
    - all services currently marked `planned`
    - all services currently use `embedMode: "placeholder"`
    - no live iframe integrations are currently enabled
- Current services in the fixture set:
    - Course Schedule
    - Grades
    - Holds
    - Registration
    - Announcements
- Current component path:
    - `MyRutgersPage` -> `src/components/myRutgers/ServiceButtonGrid.tsx` -> `ServiceButtonCard`
    - `MyRutgersPage` -> `src/components/myRutgers/ServiceWidgetPanel.tsx` -> `WidgetPlaceholder` or iframe
- Current styling posture:
    - intentionally simpler two-panel layout after earlier rejected redesigns
    - service and preview panels are set up to align in height on desktop
    - component prop types now live under `src/types/components/props/`
    - myRutgers model types now live under `src/types/myRutgers/models/`

## Component Layout Status

- Components are now categorized under `src/components/` by role:
    - `src/components/landing/`
    - `src/components/layout/`
    - `src/components/myRutgers/`
    - `src/components/rooms/`
    - `src/components/transit/`
- All moved component modules now use default exports.
- Current folder split:
    - `landing/`: `ActionLinks`, `CoreExperienceCard`, `FloatingTopButton`
    - `layout/`: `PanelCard`, `SectionBlock`
    - `myRutgers/`: `ServiceButtonCard`, `ServiceButtonGrid`, `ServiceWidgetPanel`, `WidgetPlaceholder`
    - `rooms/`: `RoomsDetailsPanel`, `RoomsDirectoryRow`, `RoomsDirectoryTable`, `RoomsMetricCard`, `RoomsSortButton`
    - `transit/`: `TransitBusCard`, `TransitMetricCard`, `TransitRouteButton`, `TransitRouteGroup`

## Transit Status

- File: `src/pages/TransitPage.tsx`
- Active styles: `src/styles/pages/transitPage.css`
- Purpose: first-pass RU Tap transit board for Rutgers New Brunswick buses
- Current page structure:
    - `TransitPage.tsx` now acts as the stateful orchestration shell
    - transit-presentational subcomponents now live under `src/components/transit/`
    - the generic responsive hook lives at `src/hooks/useMediaQuery.ts`
    - transit geolocation state now lives in `src/hooks/transit/useTransitLocation.ts`
    - transit route selection, collapse, minimize, and mobile autoscroll state now live in
      `src/hooks/transit/useTransitRouteSelection.ts`
    - transit snapshot/refresh orchestration now lives in `src/hooks/transit/useTransitSnapshot.ts`
    - transit route-board/view-state derivation now lives in `src/utils/transit/boardViewState.ts`
    - shared transit display/formatting helpers live at `src/utils/transit/display.ts`

### Transit Data Source and Feed Mapping

- Data source: `https://store.piemadd.com/passio_go/rutgers`
- Current feed shape consumed by the app:
    - route metadata from `lines`
    - stop metadata from `stations`
    - live vehicles from `trains`
    - notices from `alerts`
    - timestamp from `lastUpdated`
    - top-level disruption state from `shitsFucked`
- The raw Passio feed is normalized into RU Tap-specific route, stop, bus, alert, and system-status models before
  render.
- Route models currently keep:
    - route ID
    - full route name
    - short name
    - route color and text color
    - route-level `updatedAt`
    - stop list
    - inferred campus list
    - live bus list
- Bus models currently keep:
    - run number
    - destination
    - heading
    - real-time flag
    - up to three stop predictions

### Transit Filtering and Ordering

- The following routes are excluded from the RU Tap transit board:
    - Camden
    - Campus Connect
    - Campus Connect Express
    - Newark Hotel Route
    - Penn Station Local
    - Penn Station Express
- Ordered route preference is currently hardcoded in `src/data/transit.ts`.
- When fine mobile location is available and a nearest stop can be inferred, active routes touching that stop are
  prioritized to the top of the mobile active list.

### Transit Refresh Behavior

- Current board refresh interval: 30 seconds
- Current selected-route refresh interval: 15 seconds
- Current refresh model:
    - initial fetch on page load
    - board clock starts after first successful load
    - board clock refreshes the overall route board every 30 seconds
    - selected route gets its own 15-second refresh clock
    - selected route ignores board-clock route updates while selected
    - manual `Refresh Now` refreshes the full board immediately
- Merge logic is handled so stale selected-route refreshes do not clobber newer board state.

### Transit Interaction Model

- No route is selected by default.
- Selected route state is local to the page.
- The selected-route UI state is now coordinated through `src/hooks/transit/useTransitRouteSelection.ts`.
- The selected route is preserved across refreshes when still present.
- A selected route can be minimized back out of the detail panel.
- Bus labels display as `Bus <number>` rather than `Run <number>`.
- Numeric portions of run numbers are parsed to remove leading zeroes in the display layer.
- The selected route detail header now:
    - removes the redundant trailing word `Route` from the title when applicable
    - uses a bolder route title for emphasis
    - omits the old `Service is active in the feed.` line
    - tints the entire route detail panel with the route color instead of using a large duplicate route badge

### Transit Layout Behavior

- Wide screens (`min-width: 1040px`):
    - no selection: route board occupies the available width while the detail panel space is collapsed
    - with selection: the route board shrinks into the left rail and the detail panel animates in on the right
    - minimizing reverses that motion
- Mobile screens (`max-width: 759px`):
    - no selection: detail panel does not render
    - selected route detail panel rolls open below the route board
    - minimizing rolls the panel back up
    - route selection also attempts to autoscroll the viewport to the route detail panel
    - the mobile autoscroll now waits for active-route autocollapse before computing its target

### Transit Mobile Location Behavior

- Mobile route-board behavior attempts location immediately on page load.
- Current behavior is best-effort geolocation rather than true permission-tier detection.
- Current location flow:
    - request high-accuracy location first
    - if that fails, request lower-accuracy location
    - infer `fine` vs `coarse` from the returned accuracy threshold
    - fall back to `location unavailable` behavior if no usable position is returned
- Current mobile collapsed-state behavior:
    - if fine location is available and a nearest stop is inferred:
        - show routes serving that stop
        - prioritize those routes to the top
    - if only coarse location is available:
        - show routes serving the inferred campus
    - if location is still resolving:
        - show `Finding nearby routes...`
    - if location is unavailable:
        - show `Location unavailable. Expand to browse all routes.`
- Current geolocation robustness notes:
    - a timeout now forces the page out of the indefinite resolving state
    - the dev-only StrictMode effect replay issue that could strand the page in `Finding nearby routes...` was patched
      by resetting the request guard during cleanup

### Transit Disclosure and Animation Behavior

- Active routes and inactive routes are both collapsible.
- Active routes:
    - keep route-colored buttons and badges
    - auto-collapse after selecting a route
    - now stage the peek-state appearance so the collapse feels smoother
- Inactive routes:
    - stay styled as simpler chips
    - remain collapsed by default
- The route detail panel:
    - fades and slides in
    - fades and slides out on minimize
    - uses slower motion than the earlier version

### Current Transit Gaps

- No map view yet
- No stop search yet
- No favorites yet
- No rideshare layer yet
- No transit-specific offline cache strategy yet
- No automated UI tests yet

## Maps and Rooms Status

- File: `src/pages/RoomsPage.tsx`
- Active styles: `src/styles/pages/roomsPage.css`
- Purpose: first-pass classroom finder / room detail surface for Rutgers New Brunswick
- A typed room dataset now exists at `src/data/rooms.ts`.
- `src/data/rooms.ts` currently provides:
    - `roomsByCampus` as the primary grouped structure
    - derived flat `rooms`
    - imports its room model types from `src/types/rooms/models/`
- The dataset is grouped by campus rather than stored as one flat literal with repeated campus values.
- The current page interaction model takes inspiration from Rutgers Digital Classroom Services classroom finder:
    - searchable room directory
    - campus filter chips
    - selected-room details panel
    - external map handoff for the selected room
- Current page structure:
    - `RoomsPage.tsx` now acts as the rooms stateful orchestration shell
    - rooms-presentational subcomponents now live under `src/components/rooms/`
- Current room finder behavior:
    - route path: `/rooms`
    - search matches room code, building, campus, seating, type, and address text
    - selected room defaults to the first visible room in the filtered result set
    - desktop layout uses a finder/details split view
    - mobile layout stacks the details panel below the directory
- Current room detail panel shows:
    - room ID
    - building
    - campus
    - room style
    - seating
    - capacity
    - street address
    - `Open in Maps` external link
- Current gaps on the maps/rooms surface:
    - no indoor map or floorplan layer
    - no live room availability
    - no pathfinding
    - no building image/panorama layer

## Careers Status

- No dedicated careers route exists yet.
- No careers-specific data layer exists yet.
- The careers surface remains conceptual and is only represented in landing-page messaging.

## Data and Type Layout Status

- myRutgers fixture metadata lives in `src/data/myRutgersServices.ts`.
- Transit feed adaptation lives in `src/data/transit.ts`.
- Rooms data scaffolding lives in `src/data/rooms.ts`.
- Type modules under `src/types/` now follow a one-type-per-file default-export convention.
- The current import style for app-local types is therefore `import type X from "...";` rather than named type imports.
- Shared landing/content types now live under `src/types/content/`.
- Component prop types now live under `src/types/components/props/`.
- Rooms model types now live under `src/types/rooms/models/`.
- Rooms UI prop types now live under `src/types/rooms/props/`.
- Rooms page-local types now currently live under `src/types/rooms/pages/`.
- Current rooms type files include:
    - model types in `src/types/rooms/models/`: `campusRoomRecord.ts`, `roomAddress.ts`, `roomCampus.ts`,
      `roomCatalog.ts`, `roomCode.ts`, `roomListing.ts`, `roomRecord.ts`, `roomSeating.ts`, `roomType.ts`
    - UI prop types in `src/types/rooms/props/`: `roomsDetailsPanelProps.ts`, `roomsDirectoryRowProps.ts`,
      `roomsDirectoryTableProps.ts`, `roomsMetricCardProps.ts`, `roomsSortButtonProps.ts`
    - page-local room types in `src/types/rooms/pages/`: `roomSortDirection.ts`, `roomSortKey.ts`
- myRutgers model types now live under `src/types/myRutgers/models/`:
    - `myRutgersService.ts`
    - `myRutgersServiceStatus.ts`
    - `myRutgersEmbedMode.ts`
- Transit types now live under role-based folders in `src/types/transit/`:
- Current transit type files include:
    - feed-shape types in `src/types/transit/feed/`: `passioFeed.ts`, `passioLine.ts`, `passioStation.ts`,
      `passioTrain.ts`, `passioPrediction.ts`, `passioAlert.ts`, `passioSystemStatus.ts`
    - hook parameter types in `src/types/transit/hooks/`: `transitRouteSelectionParams.ts`
    - app-model types in `src/types/transit/models/`: `transitAlert.ts`, `transitBus.ts`, `transitCampus.ts`,
      `transitPrediction.ts`, `transitRoute.ts`, `transitSnapshot.ts`, `transitStop.ts`
    - UI prop types in `src/types/transit/props/`: `transitBusCardProps.ts`, `transitMetricCardProps.ts`,
      `transitRouteButtonProps.ts`, `transitRouteGroupProps.ts`
    - page-local transit types in `src/types/transit/pages/`: `transitLocationState.ts`, `transitBoardViewState.ts`,
      `transitBoardViewStateParams.ts`
    - internal transit data types in `src/types/transit/data/`: `mutableTransitRoute.ts`
- Service worker helper types now live under role-based folders in `src/types/serviceWorker/`:
    - global scope type in `src/types/serviceWorker/globals/`
    - event types in `src/types/serviceWorker/events/`

## PWA and Installability Status

- Manifest file: `public/manifest.webmanifest`
- Manifest schema is wired in-file through `https://www.schemastore.org/web-manifest.json`.
- Current manifest identity:
    - `name`: `RU Tap`
    - `short_name`: `RU Tap`
    - `id`: `.`
    - `scope`: `.`
    - `start_url`: `.`
    - `display`: `standalone`
    - `theme_color`: `#c03`
- Current manifest category posture:
    - education
    - productivity
    - navigation
- Current app icon source: `public/favicon.svg`
- Current favicon posture:
    - animated SVG favicon
    - Rutgers-inspired `R`
    - pulsing circle / ring accent
- Current install model:
    - one site-wide install target only
    - no per-page manifests
    - no multi-page install setup

## Brand Asset Snapshot

- Live public install surfaces currently use:
    - `public/favicon.svg`
    - `public/manifest.webmanifest`
    - `index.html`
- Working icon assets currently exist under `src/assets/`:
    - `favicon-new.svg`
    - `favicon-new-still.svg`
    - `favicon-new-still.png`
    - `favicon-still.svg`
    - `favicon-still.png`
- The `favicon-new*` files are currently working assets and are not yet the live favicon/install surface.

## Service Worker Status

- Source file: `src/sw.ts`
- Built output: `dist/sw.js`
- Registration path: `withBasePath("/sw.js")`
- Registration mode: module service worker
- Current cache names:
    - `ru-tap-shell-v2`
    - `ru-tap-runtime-v2`
- Current app-shell precache list:
    - `/`
    - `/manifest.webmanifest`
    - `/favicon.svg`
    - `/up-arrow.svg`
- Current service-worker strategy:
    - navigation requests: network-first with cached shell fallback
    - same-origin scripts / styles / images / fonts / manifests: stale-while-revalidate
- No route-specific service-worker scopes or separate PWAs currently exist.

## Styling and File Layout Status

- Active styles are under `src/styles/`.
- Styles are now categorized by role:
    - `src/styles/global/`
    - `src/styles/pages/`
    - `src/styles/components/`
- The active global stylesheet is `src/styles/global/index.css`.
- Landing-page styles live in `src/styles/pages/landingPage.css`.
- myRutgers-page styles live in `src/styles/pages/myRutgersPage.css`.
- transit-page styles live in `src/styles/pages/transitPage.css`.
- Component-specific styles now live in `src/styles/components/` for:
    - `ActionLinks`
    - `CoreExperienceCard`
    - `FloatingTopButton`
    - `PanelCard`
    - `SectionBlock`
    - `ServiceButtonCard`
    - `ServiceButtonGrid`
    - `ServiceWidgetPanel`
    - `WidgetPlaceholder`
- The legacy root stylesheets `src/App.css` and `src/index.css` have been removed.
- No static component CSS remains stranded inside component TSX files.
- The remaining `style={...}` usage is intentional and dynamic:
    - route-color and panel-tint styles in `src/pages/TransitPage.tsx`
    - the base-aware arrow mask variable in `src/components/landing/FloatingTopButton.tsx`

## Verification Snapshot

Verified on: 2026-03-25

- `pnpm build`: passes
- `pnpm lint`: passes

Fresh browser verification status:

- No fresh end-to-end browser pass was run after the latest transit polish in this update cycle.
- The most recent verified checks in this turn are build and lint only.

Current build artifact snapshot from the latest verified build:

| Output                                   | Size      | Gzip     |
| ---------------------------------------- | --------- | -------- |
| `dist/index.html`                        | 0.99 kB   | 0.50 kB  |
| `dist/assets/main-C72oqG2M.css`          | 1.78 kB   | 0.82 kB  |
| `dist/assets/LandingPage-BJFbW4nE.css`   | 4.02 kB   | 1.37 kB  |
| `dist/assets/MyRutgersPage-CWB6A2K3.css` | 4.17 kB   | 1.24 kB  |
| `dist/assets/RoomsPage-BeSBIZNm.css`     | 7.29 kB   | 1.89 kB  |
| `dist/assets/TransitPage-CC9c2vmc.css`   | 9.56 kB   | 2.26 kB  |
| `dist/assets/basePath-DFIoE6gw.js`       | 0.35 kB   | 0.22 kB  |
| `dist/assets/jsx-runtime-CGqjDhly.js`    | 0.44 kB   | 0.29 kB  |
| `dist/sw.js`                             | 1.09 kB   | 0.58 kB  |
| `dist/assets/MyRutgersPage-T7CzC6Pu.js`  | 4.52 kB   | 1.46 kB  |
| `dist/assets/LandingPage-BVgGM73u.js`    | 5.48 kB   | 2.15 kB  |
| `dist/assets/RoomsPage-BHS1Zn40.js`      | 17.41 kB  | 4.04 kB  |
| `dist/assets/TransitPage-CsgP-iR3.js`    | 21.35 kB  | 6.85 kB  |
| `dist/assets/main-Bo8ESS01.js`           | 192.37 kB | 60.81 kB |

Testing status:

- No automated test suite is configured yet.
- There are no committed unit, integration, or end-to-end test files in the repo right now.

## Current Working-Tree Snapshot

- The worktree is currently dirty.
- This includes active edits in:
    - transit page logic
    - working favicon assets under `src/assets/`
    - documentation (`AGENTS.md` and `STATUS.md`)
- `STATUS.md` itself is also modified by this update.

## Known Gaps and Constraints

- No backend
- No database
- No live Rutgers system integration beyond the public transit feed
- No CAS/session wiring beyond product-direction messaging
- No maps-and-rooms page yet
- No careers page yet
- No router package
- No global state store
- No analytics or telemetry layer
- No test suite
- `Suspense` route fallback is still `null`
- myRutgers services remain placeholder content rather than real widgets
- transit still has no map, stop search, favorites, or rideshare layer

## Important Files and Responsibilities

| File                                            | Current Responsibility                                                                  |
| ----------------------------------------------- | --------------------------------------------------------------------------------------- |
| `index.html`                                    | Base HTML document, app metadata, manifest link, favicon link                           |
| `src/main.tsx`                                  | React mount point and production service-worker registration                            |
| `src/App.tsx`                                   | Manual pathname routing and lazy page loading                                           |
| `src/utils/basePath.ts`                         | Base-aware path generation and pathname normalization                                   |
| `src/pages/LandingPage.tsx`                     | RU Tap landing page content and section composition                                     |
| `src/pages/MyRutgersPage.tsx`                   | myRutgers page state, layout, and service selection                                     |
| `src/pages/RoomsPage.tsx`                       | Room finder state, filtering, sorting, and top-level composition                        |
| `src/pages/TransitPage.tsx`                     | Transit page state, route selection, mobile/desktop behavior, and top-level composition |
| `src/components/landing/*`                      | Landing-page-specific reusable UI pieces                                                |
| `src/components/layout/*`                       | Shared structural card/section building blocks                                          |
| `src/components/myRutgers/*`                    | myRutgers selector and preview-panel components                                         |
| `src/components/rooms/*`                        | Rooms-presentational UI components used by `RoomsPage.tsx`                              |
| `src/components/transit/*`                      | Transit-presentational UI components used by `TransitPage.tsx`                          |
| `src/data/myRutgersServices.ts`                 | Fixture metadata for academic services                                                  |
| `src/data/transit.ts`                           | Rutgers transit feed fetch, filtering, normalization, and snapshot merging              |
| `src/data/rooms.ts`                             | Typed rooms dataset grouped by campus                                                   |
| `src/hooks/useMediaQuery.ts`                    | Shared media-query subscription hook                                                    |
| `src/hooks/transit/useTransitLocation.ts`       | Transit geolocation request and fallback behavior                                       |
| `src/hooks/transit/useTransitRouteSelection.ts` | Transit route selection, collapse, minimize, and mobile autoscroll state                |
| `src/hooks/transit/useTransitSnapshot.ts`       | Transit snapshot loading, refresh cadence, and manual refresh handling                  |
| `src/types/content/*`                           | Landing/content-facing shared types                                                     |
| `src/types/components/props/*`                  | Component prop types extracted from component modules                                   |
| `src/types/rooms/models/*`                      | Rooms domain model types used by `src/data/rooms.ts` and the rooms page                 |
| `src/types/rooms/props/*`                       | Rooms UI prop types                                                                     |
| `src/types/rooms/pages/*`                       | Rooms page-local sort types                                                             |
| `src/types/myRutgers/models/*`                  | myRutgers enums and service model types                                                 |
| `src/types/transit/feed/*`                      | Passio feed-shape types                                                                 |
| `src/types/transit/hooks/*`                     | Transit hook parameter types                                                            |
| `src/types/transit/models/*`                    | Transit app-model types                                                                 |
| `src/types/transit/props/*`                     | Transit UI prop types                                                                   |
| `src/types/transit/pages/*`                     | Transit page-local state and disclosure types                                           |
| `src/types/transit/data/*`                      | Transit data-layer helper types                                                         |
| `src/utils/transit/boardViewState.ts`           | Transit route-board ordering, peek-state, and layout derivation                         |
| `src/utils/transit/display.ts`                  | Transit display formatting and route-color style helpers                                |
| `src/types/serviceWorker/globals/*`             | Service-worker global-scope typing helpers                                              |
| `src/types/serviceWorker/events/*`              | Service-worker event types                                                              |
| `src/sw.ts`                                     | Service-worker runtime logic                                                            |
| `src/assets/favicon-new.svg`                    | Working animated favicon redesign asset                                                 |
| `src/assets/favicon-new-still.svg`              | Static 1-second SVG snapshot of the working favicon redesign                            |
| `src/assets/favicon-new-still.png`              | 4096x4096 PNG export of the working favicon redesign still                              |
| `src/styles/global/index.css`                   | Active global styling entry                                                             |
| `src/styles/pages/landingPage.css`              | Landing page styling                                                                    |
| `src/styles/pages/myRutgersPage.css`            | myRutgers page styling                                                                  |
| `src/styles/pages/roomsPage.css`                | Room finder page styling                                                                |
| `src/styles/pages/transitPage.css`              | Transit page styling                                                                    |
| `src/styles/components/*`                       | Component-specific stylesheets                                                          |
| `public/manifest.webmanifest`                   | Install metadata                                                                        |
| `public/favicon.svg`                            | Animated app icon / favicon                                                             |
| `vite.config.ts`                                | Vite config, aliasing, Pages base logic, and service-worker build wiring                |
| `.github/workflows/deploy-pages.yml`            | GitHub Pages build-and-deploy workflow                                                  |

## Next Queued Work

The active feature area is still transit iteration, but the user explicitly paused that thread after reaching a
satisfactory point for now.

High-signal next steps currently visible in the repo:

- add an actual maps / rooms surface on top of `src/data/rooms.ts`
- deepen the rooms surface with indoor maps, floorplans, availability, or wayfinding
- add a careers surface
- deepen transit with a map, stop search, favorites, or rideshare integration
- replace myRutgers placeholders with real preview widgets when product scope allows
- decide whether to improve the blank `Suspense` fallback

## Documentation Policy

- Keep `STATUS.md` current when the repo state changes.
- Keep `AGENTS.md` focused on durable instructions and conventions.
- If a detail can go stale quickly, it belongs here instead of `AGENTS.md`.
