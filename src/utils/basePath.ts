const appBaseUrl = import.meta.env.BASE_URL;
const normalizedBaseUrl = appBaseUrl.endsWith("/") ? appBaseUrl : `${appBaseUrl}/`;
const normalizedBasePath = normalizedBaseUrl.replace(/\/+$/, "") || "/";

/**
 * Prefixes an app-relative path with Vite's configured base URL.
 *
 * This keeps links, public assets, and service-worker URLs working both at the
 * domain root and under GitHub Pages project-site paths such as `/app/dev/`.
 */
export function withBasePath(path: string) {
	return path === "/" ? normalizedBaseUrl : `${normalizedBaseUrl}${path.replace(/^\/+/, "")}`;
}

/**
 * Converts the current browser pathname into the app's route namespace.
 *
 * The manual route switch in `App.tsx` expects root-relative paths, so this
 * strips the deployment base path before route matching.
 */
export function normalizeAppPath(pathname: string) {
	const trimmedPathname = pathname.replace(/\/+$/, "") || "/";
	if (normalizedBasePath !== "/" && trimmedPathname.toLowerCase().startsWith(normalizedBasePath.toLowerCase())) {
		const strippedPath = trimmedPathname.slice(normalizedBasePath.length) || "/";
		return (strippedPath.startsWith("/") ? strippedPath : `/${strippedPath}`).toLowerCase();
	}
	return trimmedPathname.toLowerCase();
}
