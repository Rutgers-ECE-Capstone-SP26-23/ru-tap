import { lazy, Suspense } from "react";
import { normalizeAppPath } from "@/utils/basePath.ts";

const LandingPage = lazy(() => import("@/pages/LandingPage.tsx"));
const MyRutgersPage = lazy(() => import("@/pages/MyRutgersPage.tsx"));
const RoomsPage = lazy(() => import("@/pages/RoomsPage.tsx"));
const TransitPage = lazy(() => import("@/pages/TransitPage.tsx"));

function App() {
	const normalizedPath = normalizeAppPath(globalThis.location.pathname);
	let Page = LandingPage;

	if (normalizedPath === "/myrutgers") Page = MyRutgersPage;
	else if (normalizedPath === "/rooms") Page = RoomsPage;
	else if (normalizedPath === "/transit") Page = TransitPage;

	return (
		<Suspense fallback={null}>
			<Page />
		</Suspense>
	);
}

export default App;
