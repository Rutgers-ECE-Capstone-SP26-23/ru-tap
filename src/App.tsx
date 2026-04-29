import { lazy, Suspense } from "react";
import { normalizeAppPath } from "@/utils/basePath.ts";

const LandingPage = lazy(() => import("@/pages/LandingPage.tsx"));
const MyRutgersPage = lazy(() => import("@/pages/MyRutgersPage.tsx"));
const RoomsPage = lazy(() => import("@/pages/RoomsPage.tsx"));
const TransitPage = lazy(() => import("@/pages/TransitPage.tsx"));

/**
 * Resolves the current normalized pathname to the matching top-level RU Tap page.
 */
function App() {
	const normalizedPath = normalizeAppPath(globalThis.location.pathname);
	const page = (() => {
		if (normalizedPath === "/") return <LandingPage />;
		if (normalizedPath === "/myrutgers") return <MyRutgersPage />;
		if (normalizedPath === "/rooms") return <RoomsPage />;
		if (normalizedPath === "/transit") return <TransitPage />;

		throw new Response("Not found", {
			status: 404,
			statusText: `No RU Tap route matches ${normalizedPath}`
		});
	})();

	return <Suspense fallback={null}>{page}</Suspense>;
}

export default App;
