import { inferTransitCampus } from "@/data/transit.ts";
import type TransitBoardViewState from "@/types/transit/pages/transitBoardViewState.ts";
import type TransitBoardViewStateParams from "@/types/transit/pages/transitBoardViewStateParams.ts";
import type TransitCampus from "@/types/transit/models/transitCampus.ts";
import type TransitRoute from "@/types/transit/models/transitRoute.ts";
import type TransitStop from "@/types/transit/models/transitStop.ts";

type ActiveRouteDisplayMode = "collapsed" | "expanded";
type ActiveRoutePeekParams = Readonly<{
	hideSuggestedActiveRoutes: boolean;
	isAutoCollapsingActiveRoutes: boolean;
	isMobileDevice: boolean;
	isResolvingLocation: boolean;
	locationState: TransitBoardViewStateParams["locationState"];
	peekRouteCount: number;
	selectedRouteId: string | null;
	showAllActiveRoutes: boolean;
}>;

/**
 * Calculates a real-world distance between two latitude/longitude points.
 */
function getDistanceBetweenPoints(
	startLatitude: number,
	startLongitude: number,
	endLatitude: number,
	endLongitude: number
) {
	const earthRadiusMeters = 6_371_000;
	const latitudeDelta = ((endLatitude - startLatitude) * Math.PI) / 180;
	const longitudeDelta = ((endLongitude - startLongitude) * Math.PI) / 180;
	const startLatitudeRadians = (startLatitude * Math.PI) / 180;
	const endLatitudeRadians = (endLatitude * Math.PI) / 180;
	const haversineA =
		Math.sin(latitudeDelta / 2) ** 2 +
		Math.cos(startLatitudeRadians) * Math.cos(endLatitudeRadians) * Math.sin(longitudeDelta / 2) ** 2;

	return earthRadiusMeters * 2 * Math.atan2(Math.sqrt(haversineA), Math.sqrt(1 - haversineA));
}

/**
 * Finds the closest unique stop across all known route stop lists.
 */
function getNearestTransitStop(
	routes: readonly TransitRoute[],
	latitude: number,
	longitude: number
): TransitStop | null {
	const uniqueStops = new Map<string, TransitStop>();

	for (const route of routes)
		for (const stop of route.stops) if (!uniqueStops.has(stop.id)) uniqueStops.set(stop.id, stop);

	let nearestStop: TransitStop | null = null;
	let nearestDistance = Number.POSITIVE_INFINITY;

	for (const stop of uniqueStops.values()) {
		const distance = getDistanceBetweenPoints(latitude, longitude, stop.latitude, stop.longitude);

		if (distance < nearestDistance) {
			nearestDistance = distance;
			nearestStop = stop;
		}
	}

	return nearestStop;
}

/**
 * Moves contextual routes to the front while preserving each group's order.
 */
function getPrioritizedRoutes(routes: readonly TransitRoute[], prioritizedRouteIds: ReadonlySet<string>) {
	const prioritizedRoutes: TransitRoute[] = [];
	const remainingRoutes: TransitRoute[] = [];

	for (const route of routes) {
		if (prioritizedRouteIds.has(route.id)) {
			prioritizedRoutes.push(route);
			continue;
		}

		remainingRoutes.push(route);
	}

	return [...prioritizedRoutes, ...remainingRoutes];
}

/**
 * Formats route counts for compact active/inactive group labels.
 */
function getRouteCountLabel(routeCount: number) {
	return `${routeCount} route${routeCount === 1 ? "" : "s"}`;
}

/**
 * Builds the active-route group meta label for collapsed and expanded views.
 */
function getActiveRouteMetaLabel(
	totalRouteCount: number,
	visibleRouteCount: number,
	displayMode: ActiveRouteDisplayMode
) {
	return displayMode === "expanded" || visibleRouteCount === 0 || visibleRouteCount === totalRouteCount
		? getRouteCountLabel(totalRouteCount)
		: `${visibleRouteCount} shown · ${getRouteCountLabel(totalRouteCount)}`;
}

/**
 * Chooses the outer transit layout class from viewport and selection state.
 */
function getLayoutClassName(isWideDesktop: boolean, hasSelectedRoute: boolean) {
	if (!isWideDesktop) {
		return "transit-layout stacked";
	}

	return hasSelectedRoute ? "transit-layout wide has-selection" : "transit-layout wide no-selection";
}

/**
 * Chooses the route-detail panel animation class for desktop and mobile layouts.
 */
function getBoardShellClassName(isWideDesktop: boolean, hasSelectedRoute: boolean, isClosingRoutePanel: boolean) {
	if (isWideDesktop) {
		if (hasSelectedRoute) {
			return "transit-board-shell visible";
		}

		return isClosingRoutePanel ? "transit-board-shell closing" : "transit-board-shell";
	}

	if (hasSelectedRoute) {
		return "transit-board-shell mobile visible";
	}

	return isClosingRoutePanel ? "transit-board-shell mobile closing" : "transit-board-shell mobile";
}

/**
 * Finds active route IDs that serve the provided stop.
 */
function getRouteIdsForStop(routes: readonly TransitRoute[], stop: TransitStop | null) {
	const routeIds = new Set<string>();
	if (!stop) return routeIds;

	for (const route of routes) if (route.stops.some(routeStop => routeStop.id === stop.id)) routeIds.add(route.id);

	return routeIds;
}

/**
 * Finds active route IDs that serve the inferred user campus.
 */
function getRouteIdsForCampus(routes: readonly TransitRoute[], campus: TransitCampus | null) {
	const routeIds = new Set<string>();
	if (!campus) return routeIds;

	for (const route of routes) if (route.campuses.includes(campus)) routeIds.add(route.id);

	return routeIds;
}

/**
 * Builds the collapsed active-route set shown as the mobile contextual peek.
 */
function getCollapsedActiveRouteIds(
	displayedRoute: TransitRoute | null,
	activeRouteIds: ReadonlySet<string>,
	contextualRouteIds: ReadonlySet<string>,
	isMobileDevice: boolean,
	selectedRouteId: string | null,
	hideSuggestedActiveRoutes: boolean
) {
	const collapsedActiveRouteIds = new Set<string>();

	if (displayedRoute && activeRouteIds.has(displayedRoute.id)) collapsedActiveRouteIds.add(displayedRoute.id);

	if (isMobileDevice && !selectedRouteId && !hideSuggestedActiveRoutes)
		for (const routeId of contextualRouteIds) collapsedActiveRouteIds.add(routeId);

	return collapsedActiveRouteIds;
}

/**
 * Chooses fine-location stop routes before broader campus routes when available.
 */
function getContextualRouteIds(
	locationState: TransitBoardViewStateParams["locationState"],
	nearestStopRouteIds: ReadonlySet<string>,
	campusRouteIds: ReadonlySet<string>
) {
	return locationState?.precision === "fine" && nearestStopRouteIds.size > 0 ? nearestStopRouteIds : campusRouteIds;
}

/**
 * Returns the nearest stop only when location precision is good enough for stop-level routing.
 */
function getNearestStopForLocation(
	routes: readonly TransitRoute[],
	locationState: TransitBoardViewStateParams["locationState"]
) {
	if (locationState?.precision !== "fine") return null;
	return getNearestTransitStop(routes, locationState.latitude, locationState.longitude);
}

/**
 * Prioritizes nearest-stop routes for the initial mobile active-route view.
 */
function getOrderedActiveRoutes(
	activeRoutes: readonly TransitRoute[],
	nearestStopRouteIds: ReadonlySet<string>,
	isMobileDevice: boolean,
	selectedRouteId: string | null
) {
	if (isMobileDevice && !selectedRouteId && nearestStopRouteIds.size > 0)
		return getPrioritizedRoutes(activeRoutes, nearestStopRouteIds);

	return activeRoutes;
}

/**
 * Applies the collapsed active-route filter unless the user has expanded the group.
 */
function getVisibleActiveRoutes(
	orderedActiveRoutes: readonly TransitRoute[],
	collapsedActiveRouteIds: ReadonlySet<string>,
	showAllActiveRoutes: boolean
) {
	if (showAllActiveRoutes) return orderedActiveRoutes;
	return orderedActiveRoutes.filter(route => collapsedActiveRouteIds.has(route.id));
}

/**
 * Keeps a closing or selected route visible even when it is outside the collapsed active set.
 */
function getPinnedDisplayedRoute(displayedRoute: TransitRoute | null, visibleActiveRoutes: readonly TransitRoute[]) {
	return displayedRoute && !visibleActiveRoutes.some(route => route.id === displayedRoute.id) ? displayedRoute : null;
}

/**
 * Prepends a pinned route to a route button list when needed.
 */
function getRouteButtons(pinnedDisplayedRoute: TransitRoute | null, routes: readonly TransitRoute[]) {
	if (!pinnedDisplayedRoute) return routes;
	return [pinnedDisplayedRoute, ...routes];
}

/**
 * Converts the active-route expanded flag into a named display mode.
 */
function getActiveRouteDisplayMode(showAllActiveRoutes: boolean): ActiveRouteDisplayMode {
	return showAllActiveRoutes ? "expanded" : "collapsed";
}

/**
 * Determines whether mobile should show contextual active route buttons.
 */
function getHasCollapsedActiveRoutePeek({
	isAutoCollapsingActiveRoutes,
	showAllActiveRoutes,
	hideSuggestedActiveRoutes,
	peekRouteCount
}: Pick<
	ActiveRoutePeekParams,
	"isAutoCollapsingActiveRoutes" | "showAllActiveRoutes" | "hideSuggestedActiveRoutes" | "peekRouteCount"
>) {
	return !isAutoCollapsingActiveRoutes && !showAllActiveRoutes && !hideSuggestedActiveRoutes && peekRouteCount > 0;
}

/**
 * Determines whether the active-route peek should explain that location is still resolving.
 */
function shouldShowLocatingActiveRoutePeekNote({
	isMobileDevice,
	selectedRouteId,
	isAutoCollapsingActiveRoutes,
	showAllActiveRoutes,
	hideSuggestedActiveRoutes,
	isResolvingLocation,
	peekRouteCount
}: ActiveRoutePeekParams) {
	return (
		isMobileDevice &&
		!selectedRouteId &&
		!isAutoCollapsingActiveRoutes &&
		!showAllActiveRoutes &&
		!hideSuggestedActiveRoutes &&
		isResolvingLocation &&
		peekRouteCount === 0
	);
}

/**
 * Determines whether the active-route peek should explain that location is unavailable.
 */
function shouldShowLocationUnavailableActiveRoutePeekNote({
	isMobileDevice,
	selectedRouteId,
	isAutoCollapsingActiveRoutes,
	showAllActiveRoutes,
	hideSuggestedActiveRoutes,
	isResolvingLocation,
	locationState,
	peekRouteCount
}: ActiveRoutePeekParams) {
	return (
		isMobileDevice &&
		!selectedRouteId &&
		!isAutoCollapsingActiveRoutes &&
		!showAllActiveRoutes &&
		!hideSuggestedActiveRoutes &&
		!isResolvingLocation &&
		locationState === null &&
		peekRouteCount === 0
	);
}

/**
 * Derives all layout, route-list, and panel state needed by the transit page.
 */
export default function getTransitBoardViewState({
	snapshot,
	selectedRouteId,
	closingRouteId,
	locationState,
	isResolvingLocation,
	isMobileDevice,
	isWideDesktop,
	showAllActiveRoutes,
	hideSuggestedActiveRoutes,
	isAutoCollapsingActiveRoutes
}: TransitBoardViewStateParams): TransitBoardViewState {
	const routes = snapshot?.routes ?? [];
	const activeRoutes = snapshot?.activeRoutes ?? [];
	const inactiveRoutes = snapshot?.inactiveRoutes ?? [];
	const selectedRoute = routes.find(route => route.id === selectedRouteId) ?? null;
	const displayedRouteId = selectedRouteId ?? closingRouteId;
	const displayedRoute = routes.find(route => route.id === displayedRouteId) ?? null;
	const userCampus = locationState ? inferTransitCampus(locationState.latitude, locationState.longitude) : null;
	const nearestStop = getNearestStopForLocation(routes, locationState);
	const nearestStopRouteIds = getRouteIdsForStop(activeRoutes, nearestStop);
	const campusRouteIds = getRouteIdsForCampus(activeRoutes, userCampus);
	const contextualRouteIds = getContextualRouteIds(locationState, nearestStopRouteIds, campusRouteIds);

	const orderedActiveRoutes = getOrderedActiveRoutes(
		activeRoutes,
		nearestStopRouteIds,
		isMobileDevice,
		selectedRouteId
	);
	const activeRouteIds = new Set(activeRoutes.map(route => route.id));
	const collapsedActiveRouteIds = getCollapsedActiveRouteIds(
		displayedRoute,
		activeRouteIds,
		contextualRouteIds,
		isMobileDevice,
		selectedRouteId,
		hideSuggestedActiveRoutes
	);

	const visibleActiveRoutes = getVisibleActiveRoutes(
		orderedActiveRoutes,
		collapsedActiveRouteIds,
		showAllActiveRoutes
	);
	const pinnedDisplayedRoute = getPinnedDisplayedRoute(displayedRoute, visibleActiveRoutes);
	const peekRouteButtons = getRouteButtons(pinnedDisplayedRoute, visibleActiveRoutes);
	const expandedRouteButtons = getRouteButtons(pinnedDisplayedRoute, orderedActiveRoutes);
	const activeRoutesHaveVisibleContent = showAllActiveRoutes;
	const activeRoutePeekParams = {
		hideSuggestedActiveRoutes,
		isAutoCollapsingActiveRoutes,
		isMobileDevice,
		isResolvingLocation,
		locationState,
		peekRouteCount: peekRouteButtons.length,
		selectedRouteId,
		showAllActiveRoutes
	} as const;
	const hasCollapsedActiveRoutePeek = getHasCollapsedActiveRoutePeek(activeRoutePeekParams);
	const showLocatingActiveRoutePeekNote = shouldShowLocatingActiveRoutePeekNote(activeRoutePeekParams);
	const showLocationUnavailableActiveRoutePeekNote =
		shouldShowLocationUnavailableActiveRoutePeekNote(activeRoutePeekParams);
	const hasSelectedRoute = selectedRoute !== null;
	const isClosingRoutePanel = !hasSelectedRoute && closingRouteId !== null;

	return {
		routes,
		activeRoutes,
		inactiveRoutes,
		selectedRoute,
		displayedRoute,
		peekRouteButtons,
		expandedRouteButtons,
		activeRoutesHaveVisibleContent,
		hasCollapsedActiveRoutePeek,
		showLocatingActiveRoutePeekNote,
		showLocationUnavailableActiveRoutePeekNote,
		hasSelectedRoute,
		isClosingRoutePanel,
		shouldRenderRoutePanel: isWideDesktop || displayedRoute !== null,
		activeRouteMetaLabel: getActiveRouteMetaLabel(
			activeRoutes.length,
			peekRouteButtons.length,
			getActiveRouteDisplayMode(showAllActiveRoutes)
		),
		layoutClassName: getLayoutClassName(isWideDesktop, hasSelectedRoute),
		boardShellClassName: getBoardShellClassName(isWideDesktop, hasSelectedRoute, isClosingRoutePanel)
	};
}
