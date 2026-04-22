# STATUS

This file is the living snapshot of the repo as it exists right now. Update it when routes, architecture, assets,
verification status, product scope, or active backlog meaningfully change.

Last updated: 2026-04-22T10:13:38-04:00

## Project Snapshot

- Product name: RU Tap
- Repo type: single frontend-only web app
- Stack: Vite 8, React 19, TypeScript 6, ESLint 9, Prettier 3
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
- The current product framing is:
    - academics
    - transit and rideshare
    - maps and rooms
- The implementation still should not claim live Rutgers production integrations in the UI.
- Current implementation assumptions that remain in force:
    - no database
    - short-lived caching
    - CAS-aligned path when possible
    - baseline `$0` spend

## Current Route Coverage

| Route / Surface | State                 | Current Implementation                                                         | Notes                                                                                          |
| --------------- | --------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `/`             | Implemented           | Landing page with RU Tap product framing and preview launch links              | Static product surface only                                                                    |
| `/myrutgers`    | Implemented prototype | Academic service directory plus preview panel with a live course-search module | Condensed Rutgers SOC data drives course search; CSP and WebReg remain Rutgers-hosted handoffs |
| `/rooms`        | Implemented prototype | Classroom finder and room-detail directory driven by Rutgers room data         | Finder/details UI only; no live indoor map or availability layer yet                           |
| `/transit`      | Implemented prototype | Live Rutgers transit board using the Passio feed                               | Most actively iterated surface in the repo right now                                           |
| Maps / rooms    | Partially started     | Room finder page exists and is backed by `src/data/rooms.ts`                   | Maps/wayfinding and live availability are still not implemented                                |

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
    - runs on pushes to `main` and `dev`
    - supports manual dispatch
    - installs with `pnpm`
    - builds `dist`
    - rebuilds one published site tree before deploying with the standard GitHub Pages actions
    - preserves the production root deployment while updating the `/dev/` preview deployment
    - keeps the published site tree cached on the `pages-content` branch so each branch deploy can preserve the other
      endpoint
- Pages workflow Node runtime migration status (2026-03-31):
    - upgraded to `actions/checkout@v6` (`node24`)
    - upgraded to `actions/setup-node@v6` (`node24`)
    - upgraded to `actions/configure-pages@v6` (`node24`)
    - replaced `actions/upload-pages-artifact` with explicit tar creation + `actions/upload-artifact@v6`
    - upgraded to `actions/deploy-pages@v5` (`node24`)
    - set workflow env `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24=true` to force transitive JavaScript actions to Node 24
- `vite.config.ts` computes the Vite `base` automatically for project-site Pages builds and now accepts
  `PAGES_DEPLOY_SUBPATH` for nested Pages targets such as `/dev/`.
- `src/utils/basePath.ts` centralizes:
    - `withBasePath(...)`
    - `normalizeAppPath(...)`
- The current app is therefore set up to run from:
    - `/` in normal/local environments
    - `/<repo-name>/` on GitHub Pages project sites
    - `/<repo-name>/dev/` for the branch-backed Pages preview deployment

## Landing Page Status

- File: `src/pages/LandingPage.tsx`
- Active styles: `src/styles/pages/landingPage.css`
- Purpose: RU Tap product-facing landing page
- Current hero framing:
    - wordmark: `RU Tap · Rutgers New Brunswick`
    - headline: `One place for your Rutgers day.`
    - supporting copy frames academics, transit, and maps as one product
    - no hero CTA row
- Current sections:
    - Why RU Tap
    - Core Experiences
    - Footer
- Current reusable building blocks used on the page:
    - `FloatingTopButton` from `src/components/landing/`
    - `PanelCard` from `src/components/layout/`
    - `SectionBlock` from `src/components/layout/`
- Current utility behavior:
    - the page now uses shared `src/utils/scrollToTop.ts` behavior for the floating back-to-top control
- Landing-page content arrays remain page-local and currently use:
    - `src/types/content/pillar.ts`
- Current preview launch state:
    - the `Core Experiences` section temporarily duplicates the same `pillar-grid` and base `PanelCard` treatment used
      by `Why RU Tap`
    - those duplicated cards now carry the saved `Core Experiences` title/body/highlight/CTA copy, with a red border and
      red final line accent
    - each duplicated card is now clickable as a whole while preserving the plain-card presentation
    - the prior card copy is preserved in `/tmp/core-experiences-current-copy.md`
- Route-chunk status:
    - JS chunk emitted separately from the main shell
    - CSS chunk emitted separately from the main shell

## myRutgers Status

- File: `src/pages/MyRutgersPage.tsx`
- Active styles: `src/styles/pages/myRutgersPage.css`
- Purpose: academic preview / integration-framework surface
- Current header structure:
    - home link text: `RU Tap`
    - eyebrow: `Academics preview`
    - home link and eyebrow now share one inline metadata row
    - routed-page hero sizing and spacing now follow the landing-page baseline
    - main heading: `Plan classes faster.`
    - lead copy summarizing catalog search, schedule planning, and WebReg
    - supporting copy explaining that course search lives in RU Tap while CSP and WebReg stay close by
- Current layout:
    - initial state: full-width tool selector
    - selected state: left selector rail plus right preview/widget panel
    - desktop split begins at `min-width: 980px`
    - the service column is narrower on widescreen layouts so the main panel gets more room
- Current interaction model:
    - local `selectedServiceId` state
    - `selectedService` derived from fixture metadata
    - no service is selected by default on load
    - the tool grid starts in a horizontal layout and collapses into a vertical selector once a tool is opened
    - selecting a card populates the preview panel
    - the `All tools` action returns the page to the initial full-width selector state
    - the tool-selection transition now animates instead of snapping, with the widget workspace sliding in and out as
      the layout changes
- Current service mix:
    - count: 3
    - the course-search service uses `embedMode: "module"`
    - Course Schedule Planner and WebReg use `embedMode: "iframe"`
    - the iframe-backed services keep authentication on Rutgers and provide a direct external fallback if framing is
      blocked
- Current services in the fixture set:
    - Course Search
    - Course Schedule Planner
    - WebReg
- Current component path:
    - `MyRutgersPage` -> `src/components/myRutgers/ServiceButtonGrid.tsx` -> `ServiceButtonCard`
    - `MyRutgersPage` -> `src/components/myRutgers/ServiceWidgetPanel.tsx` -> `CourseSearchModule`, `WidgetPlaceholder`,
      or iframe
    - the prior multi-result course-search browser now lives undeployed at
      `src/components/myRutgers/undeployed/ArchivedCourseSearchModule.tsx`
- Current styling posture:
    - intentionally simpler two-panel layout after earlier rejected redesigns
    - the tool selector now starts as a horizontal grid and becomes a vertical rail after selection
    - the iframe-backed Rutgers tools now fill the full widget body again after the animated workspace wrapper was
      introduced
    - the service panel no longer stretches its buttons to match the preview panel height
    - on widescreen layouts, the right-hand widget panel now enforces a viewport-aligned minimum height on initial load
      so the information surface reaches the bottom of the screen
    - the live course-search module is now a search-driven information panel rather than a full browsable course
      directory
    - the live course-search module no longer renders the full course list or campus filter chip row
    - the previous two-panel course-search browser has been archived as undeployed code for later iteration instead of
      remaining on the shipped path
    - the page now includes the shared floating back-to-top control
    - component prop types now live under `src/types/components/props/`
    - myRutgers model types now live under `src/types/myRutgers/models/`

## Academics Data Status

- A first condensed Rutgers SOC dataset now exists at `public/data/academics/2026/9/NB/courses.condensed.min.json`.
- The generated snapshot is based on `https://classes.rutgers.edu/soc/api/courses.json?year=2026&term=9&campus=NB`.
- Current generator path: `scripts/buildSocCatalog.mjs`
- Package entrypoint: `pnpm build:academics`
- Current generated snapshot stats:
    - original payload bytes: `20377665`
    - condensed payload bytes: `4492356`
    - bytes saved: `15885309`
    - reduction: `77.95%`
    - courses: `4397`
    - sections: `11641`
- Current condensed course shape keeps:
    - course code
    - school code
    - department code
    - course number
    - course name
    - prereqs
    - sections
- Current condensed section shape keeps:
    - section ID
    - registration index
    - meeting day / time / campus / building / room / mode
    - professor list
    - cross-listings
    - `openTo`
    - eligibility text
    - section notes
    - comments
- Meeting campus names in the generated snapshot now match the rooms-page capitalization for shared campuses, including
  `College Ave`, with non-campus meetings falling back to `Campus TBA`.
- Runtime loader path: `src/data/academics.ts`
- The runtime loader now targets the minified static asset under `public/data/academics/.../courses.condensed.min.json`.
- A tiny generated manifest now ships alongside each condensed dataset at
  `public/data/academics/.../courses.condensed.min.meta.json`.
- The academics loader now uses a versioned browser-side `IndexedDB` cache with manifest comparison, so returning visits
  can load the local snapshot first and only pull the full dataset again when the shipped catalog changed.
- The local academics cache now has a bumped schema version and a stronger network-refresh fallback so stale
  pre-manifest catalogs do not keep winning in the browser.
- The condensed academics dataset is now wired into the Course Search module on `/myrutgers`.
- `MyRutgersPage` now warms the academics cache on mount via `prefetchAcademicCatalog()`.
- The course-search campus filter is now section-aware in the details pane and result summaries, so a campus-filtered
  course only shows the sections that actually match the selected campus.

## Component Layout Status

- Components are now categorized under `src/components/` by role:
    - `src/components/landing/`
    - `src/components/layout/`
    - `src/components/myRutgers/`
    - `src/components/rooms/`
    - `src/components/transit/`
- All moved component modules now use default exports.
- Current folder split:
    - `landing/`: `CoreExperienceCard`, `FloatingTopButton`
    - `layout/`: `PanelCard`, `SectionBlock`
    - `myRutgers/`: `CourseSearchModule`, `ServiceButtonCard`, `ServiceButtonGrid`, `ServiceWidgetPanel`,
      `WidgetPlaceholder`
    - `myRutgers/undeployed/`: `ArchivedCourseSearchModule`
    - `rooms/`: `RoomsDetailsPanel`, `RoomsDirectoryRow`, `RoomsDirectoryTable`, `RoomsMetricCard`, `RoomsSortButton`
    - `transit/`: `TransitBusCard`, `TransitMetricCard`, `TransitRouteButton`, `TransitRouteGroup`

## Transit Status

- File: `src/pages/TransitPage.tsx`
- Active styles: `src/styles/pages/transitPage.css`
- Purpose: first-pass RU Tap transit board for Rutgers New Brunswick buses
- Current page structure:
    - `TransitPage.tsx` now acts as the stateful orchestration shell
    - the page now includes the shared floating back-to-top control
    - the hero home link and preview label now share one inline metadata row
    - routed-page hero sizing and spacing now follow the landing-page baseline
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
    - the hero home link and preview label now share one inline metadata row
    - routed-page hero sizing and spacing now follow the landing-page baseline
    - rooms-presentational subcomponents now live under `src/components/rooms/`
- Current room finder behavior:
    - route path: `/rooms`
    - search matches room code, building, campus, seating, type, and address text
    - selected room defaults to the first visible room in the filtered result set
    - desktop layout uses a finder/details split view
    - the hero metric rail and the sticky details rail now share the same desktop right-column width for cleaner
      alignment
    - wide screens keep the right-side details stack sticky and independently scrollable to prevent vertical viewport
      clipping
    - mobile layout stacks the details panel below the directory
    - stacked/mobile layout now autoscrolls to the room details panel after an explicit room selection
    - the page now includes the shared floating back-to-top control
- Current room detail panel shows:
    - room ID
    - building
    - campus
    - room style
    - seating
    - capacity
    - street address
    - `Open in Maps` external link
- The room snapshot fields now render as a 2x2 grid across breakpoints.
- The selected-room campus badge now stays pinned in the top-right corner of the details header.
- Current gaps on the maps/rooms surface:
    - no indoor map or floorplan layer
    - no live room availability
    - no pathfinding
    - no building image/panorama layer

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
- The root app stylesheet now reserves a stable scrollbar gutter on both sides so centered page shells keep visually
  matching left and right margins on desktop.
- Landing-page styles live in `src/styles/pages/landingPage.css`.
- myRutgers-page styles live in `src/styles/pages/myRutgersPage.css`.
- transit-page styles live in `src/styles/pages/transitPage.css`.
- Component-specific styles now live in `src/styles/components/` for:
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
- Shared scroll helper:
    - `src/utils/scrollToTop.ts` now centralizes the smooth/reduced-motion-aware back-to-top behavior used across the
      routed pages

## Verification Snapshot

Verified on: 2026-04-21

- `pnpm build`: last known passing status is still the 2026-03-25 snapshot; it was not rerun in this turn
- `pnpm lint`: last known passing status is still the 2026-03-25 snapshot; it was not rerun in this turn
- `node ./scripts/buildSocCatalog.mjs --input /tmp/rutgers_courses_2026_9_NB.json --output public/data/academics/2026/9/NB/courses.condensed.min.json`:
  passes
- `tsc --noEmit -p tsconfig.app.json`: passes

Fresh browser verification status:

- No fresh end-to-end browser pass was run after the latest transit polish in this update cycle.
- No browser pass was run after the myRutgers course-search module landed in this update cycle.
- No browser pass was run after the 2026-04-22 mobile course-search layout fix.
- No browser pass was run after the 2026-04-22 course-search simplification and archive split.
- A fresh `tsc --noEmit -p tsconfig.app.json` rerun was attempted in this turn, but this WSL shell still lacks a Linux
  `node` binary on `PATH`, and Windows `node.exe` interop failed with a WSL socket error.
- The most recent verified TypeScript check is still the earlier `tsc --noEmit -p tsconfig.app.json` pass recorded in
  the 2026-04-21 snapshot.

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
- This includes active edits across dependency manifests, styles, UI components, room/transit/type files, and the new
  academics data pipeline surfaces.
- `STATUS.md` itself is also modified by this update.

## Known Gaps and Constraints

- No backend
- No database
- No live Rutgers system integration beyond the public transit feed
- No CAS/session wiring beyond product-direction messaging
- No maps-and-rooms page yet
- No router package
- No global state store
- No analytics or telemetry layer
- No test suite
- `Suspense` route fallback is still `null`
- Course Search is a live local module, and Course Schedule Planner plus WebReg are live Rutgers iframe surfaces
- transit still has no map, stop search, favorites, or rideshare layer

## Important Files and Responsibilities

| File                                              | Current Responsibility                                                                  |
| ------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `index.html`                                      | Base HTML document, app metadata, manifest link, favicon link                           |
| `src/main.tsx`                                    | React mount point and production service-worker registration                            |
| `src/App.tsx`                                     | Manual pathname routing and lazy page loading                                           |
| `src/utils/basePath.ts`                           | Base-aware path generation and pathname normalization                                   |
| `src/pages/LandingPage.tsx`                       | RU Tap landing page content and section composition                                     |
| `src/pages/MyRutgersPage.tsx`                     | myRutgers page state, layout, and service selection                                     |
| `src/pages/RoomsPage.tsx`                         | Room finder state, filtering, sorting, and top-level composition                        |
| `src/pages/TransitPage.tsx`                       | Transit page state, route selection, mobile/desktop behavior, and top-level composition |
| `src/components/landing/*`                        | Landing-page-specific reusable UI pieces                                                |
| `src/components/layout/*`                         | Shared structural card/section building blocks                                          |
| `src/components/myRutgers/*`                      | myRutgers selector and preview-panel components                                         |
| `src/components/myRutgers/CourseSearchModule.tsx` | Live search-driven myRutgers course-results information panel                           |
| `src/components/myRutgers/undeployed/ArchivedCourseSearchModule.tsx` | Undeployed archive of the earlier two-panel course-search browser |
| `src/components/rooms/*`                          | Rooms-presentational UI components used by `RoomsPage.tsx`                              |
| `src/components/transit/*`                        | Transit-presentational UI components used by `TransitPage.tsx`                          |
| `scripts/buildSocCatalog.mjs`                     | Rutgers SOC fetch/recompose/write pipeline for the condensed academics dataset          |
| `public/data/academics/2026/9/NB/*.json`          | Generated condensed academic catalog snapshot for the New Brunswick Fall 2026 dataset   |
| `src/data/academics.ts`                           | Base-aware condensed academic catalog URL building and loading helper                   |
| `src/data/myRutgersServices.ts`                   | Fixture metadata for academic services                                                  |
| `src/data/transit.ts`                             | Rutgers transit feed fetch, filtering, normalization, and snapshot merging              |
| `src/data/rooms.ts`                               | Typed rooms dataset grouped by campus                                                   |
| `src/hooks/useMediaQuery.ts`                      | Shared media-query subscription hook                                                    |
| `src/hooks/transit/useTransitLocation.ts`         | Transit geolocation request and fallback behavior                                       |
| `src/hooks/transit/useTransitRouteSelection.ts`   | Transit route selection, collapse, minimize, and mobile autoscroll state                |
| `src/hooks/transit/useTransitSnapshot.ts`         | Transit snapshot loading, refresh cadence, and manual refresh handling                  |
| `src/types/content/*`                             | Landing/content-facing shared types                                                     |
| `src/types/components/props/*`                    | Component prop types extracted from component modules                                   |
| `src/types/academics/models/*`                    | Condensed academics dataset model types                                                 |
| `src/types/rooms/models/*`                        | Rooms domain model types used by `src/data/rooms.ts` and the rooms page                 |
| `src/types/rooms/props/*`                         | Rooms UI prop types                                                                     |
| `src/types/rooms/pages/*`                         | Rooms page-local sort types                                                             |
| `src/types/myRutgers/models/*`                    | myRutgers enums and service model types                                                 |
| `src/types/transit/feed/*`                        | Passio feed-shape types                                                                 |
| `src/types/transit/hooks/*`                       | Transit hook parameter types                                                            |
| `src/types/transit/models/*`                      | Transit app-model types                                                                 |
| `src/types/transit/props/*`                       | Transit UI prop types                                                                   |
| `src/types/transit/pages/*`                       | Transit page-local state and disclosure types                                           |
| `src/types/transit/data/*`                        | Transit data-layer helper types                                                         |
| `src/utils/transit/boardViewState.ts`             | Transit route-board ordering, peek-state, and layout derivation                         |
| `src/utils/transit/display.ts`                    | Transit display formatting and route-color style helpers                                |
| `src/types/serviceWorker/globals/*`               | Service-worker global-scope typing helpers                                              |
| `src/types/serviceWorker/events/*`                | Service-worker event types                                                              |
| `src/sw.ts`                                       | Service-worker runtime logic                                                            |
| `src/assets/favicon-new.svg`                      | Working animated favicon redesign asset                                                 |
| `src/assets/favicon-new-still.svg`                | Static 1-second SVG snapshot of the working favicon redesign                            |
| `src/assets/favicon-new-still.png`                | 4096x4096 PNG export of the working favicon redesign still                              |
| `src/styles/global/index.css`                     | Active global styling entry                                                             |
| `src/styles/pages/landingPage.css`                | Landing page styling                                                                    |
| `src/styles/pages/myRutgersPage.css`              | myRutgers page styling                                                                  |
| `src/styles/pages/roomsPage.css`                  | Room finder page styling                                                                |
| `src/styles/pages/transitPage.css`                | Transit page styling                                                                    |
| `src/styles/components/*`                         | Component-specific stylesheets                                                          |
| `src/styles/components/CourseSearchModule.css`    | Styling for the live search-results-only myRutgers course panel                         |
| `src/styles/components/ArchivedCourseSearchModule.css` | Frozen styling for the undeployed archived course-search browser                    |
| `public/manifest.webmanifest`                     | Install metadata                                                                        |
| `public/favicon.svg`                              | Animated app icon / favicon                                                             |
| `vite.config.ts`                                  | Vite config, aliasing, Pages base logic, and service-worker build wiring                |
| `.github/workflows/deploy-pages.yml`              | GitHub Pages build-and-deploy workflow                                                  |

## Next Queued Work

The active feature area is still transit iteration, but the user explicitly paused that thread after reaching a
satisfactory point for now.

High-signal next steps currently visible in the repo:

- add an actual maps / rooms surface on top of `src/data/rooms.ts`
- deepen the rooms surface with indoor maps, floorplans, availability, or wayfinding
- deepen transit with a map, stop search, favorites, or rideshare integration
- replace the remaining myRutgers placeholders with real preview widgets when product scope allows
- decide how the condensed academics catalog should be sharded, cached, and expanded beyond the first course-search
  module
- decide whether to improve the blank `Suspense` fallback

## Documentation Policy

- Keep `STATUS.md` current when the repo state changes.
- Keep `AGENTS.md` focused on durable instructions and conventions.
- If a detail can go stale quickly, it belongs here instead of `AGENTS.md`.
