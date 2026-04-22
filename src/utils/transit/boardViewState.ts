import { inferTransitCampus } from "@/data/transit.ts";
import type TransitBoardViewState from "@/types/transit/pages/transitBoardViewState.ts";
import type TransitBoardViewStateParams from "@/types/transit/pages/transitBoardViewStateParams.ts";
import type TransitRoute from "@/types/transit/models/transitRoute.ts";
import type TransitStop from "@/types/transit/models/transitStop.ts";

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

function getRouteCountLabel(routeCount: number) {
	return `${routeCount} route${routeCount === 1 ? "" : "s"}`;
}

function getActiveRouteMetaLabel(totalRouteCount: number, visibleRouteCount: number, isExpanded: boolean) {
	return isExpanded || visibleRouteCount === 0 || visibleRouteCount === totalRouteCount
		? getRouteCountLabel(totalRouteCount)
		: `${visibleRouteCount} shown · ${getRouteCountLabel(totalRouteCount)}`;
}

function getLayoutClassName(isWideDesktop: boolean, hasSelectedRoute: boolean) {
	if (!isWideDesktop) {
		return "transit-layout stacked";
	}

	return hasSelectedRoute ? "transit-layout wide has-selection" : "transit-layout wide no-selection";
}

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
	const nearestStop =
		locationState?.precision === "fine"
			? getNearestTransitStop(routes, locationState.latitude, locationState.longitude)
			: null;
	const nearestStopRouteIds = new Set<string>();
	const campusRouteIds = new Set<string>();

	if (nearestStop)
		for (const route of activeRoutes)
			if (route.stops.some(stop => stop.id === nearestStop.id)) nearestStopRouteIds.add(route.id);

	if (userCampus)
		for (const route of activeRoutes) if (route.campuses.includes(userCampus)) campusRouteIds.add(route.id);

	const orderedActiveRoutes =
		isMobileDevice && !selectedRouteId && nearestStopRouteIds.size > 0
			? getPrioritizedRoutes(activeRoutes, nearestStopRouteIds)
			: activeRoutes;
	const collapsedActiveRouteIds = new Set<string>();
	const activeRouteIds = new Set(activeRoutes.map(route => route.id));

	if (displayedRoute && activeRouteIds.has(displayedRoute.id)) collapsedActiveRouteIds.add(displayedRoute.id);

	if (isMobileDevice && !selectedRouteId && !hideSuggestedActiveRoutes) {
		const contextualRouteIds =
			locationState?.precision === "fine" && nearestStopRouteIds.size > 0 ? nearestStopRouteIds : campusRouteIds;

		for (const routeId of contextualRouteIds) collapsedActiveRouteIds.add(routeId);
	}

	const visibleActiveRoutes = showAllActiveRoutes
		? orderedActiveRoutes
		: orderedActiveRoutes.filter(route => collapsedActiveRouteIds.has(route.id));
	const pinnedDisplayedRoute =
		displayedRoute && !visibleActiveRoutes.some(route => route.id === displayedRoute.id) ? displayedRoute : null;
	const peekRouteButtons = pinnedDisplayedRoute
		? [pinnedDisplayedRoute, ...visibleActiveRoutes]
		: visibleActiveRoutes;
	const expandedRouteButtons = pinnedDisplayedRoute
		? [pinnedDisplayedRoute, ...orderedActiveRoutes]
		: orderedActiveRoutes;
	const activeRoutesHaveVisibleContent = showAllActiveRoutes;
	const hasCollapsedActiveRoutePeek =
		!isAutoCollapsingActiveRoutes &&
		!showAllActiveRoutes &&
		!hideSuggestedActiveRoutes &&
		peekRouteButtons.length > 0;
	const showLocatingActiveRoutePeekNote =
		isMobileDevice &&
		!selectedRouteId &&
		!isAutoCollapsingActiveRoutes &&
		!showAllActiveRoutes &&
		!hideSuggestedActiveRoutes &&
		isResolvingLocation &&
		peekRouteButtons.length === 0;
	const showLocationUnavailableActiveRoutePeekNote =
		isMobileDevice &&
		!selectedRouteId &&
		!isAutoCollapsingActiveRoutes &&
		!showAllActiveRoutes &&
		!hideSuggestedActiveRoutes &&
		!isResolvingLocation &&
		locationState === null &&
		peekRouteButtons.length === 0;
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
			showAllActiveRoutes
		),
		layoutClassName: getLayoutClassName(isWideDesktop, hasSelectedRoute),
		boardShellClassName: getBoardShellClassName(isWideDesktop, hasSelectedRoute, isClosingRoutePanel)
	};
}
