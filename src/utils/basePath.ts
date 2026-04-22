const appBaseUrl = import.meta.env.BASE_URL;
const normalizedBaseUrl = appBaseUrl.endsWith("/") ? appBaseUrl : `${appBaseUrl}/`;
const normalizedBasePath = normalizedBaseUrl.replace(/\/+$/, "") || "/";

export function withBasePath(path: string) {
	return path === "/" ? normalizedBaseUrl : `${normalizedBaseUrl}${path.replace(/^\/+/, "")}`;
}

export function normalizeAppPath(pathname: string) {
	const trimmedPathname = pathname.replace(/\/+$/, "") || "/";
	if (normalizedBasePath !== "/" && trimmedPathname.toLowerCase().startsWith(normalizedBasePath.toLowerCase())) {
		const strippedPath = trimmedPathname.slice(normalizedBasePath.length) || "/";
		return (strippedPath.startsWith("/") ? strippedPath : `/${strippedPath}`).toLowerCase();
	}
	return trimmedPathname.toLowerCase();
}
