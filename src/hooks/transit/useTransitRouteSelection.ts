import { useEffect, useRef, useState } from "react";
import { matchesMediaQuery } from "@/hooks/useMediaQuery.ts";
import type TransitRoute from "@/types/transit/models/transitRoute.ts";
import type TransitRouteSelectionParams from "@/types/transit/hooks/transitRouteSelectionParams.ts";

const MOBILE_DEVICE_QUERY = "(max-width: 759px)";
const PANEL_CLOSE_DURATION_MS = 360;
const ACTIVE_ROUTE_AUTO_COLLAPSE_DURATION_MS = 360;
const MOBILE_ROUTE_DETAILS_SCROLL_DELAY_MS = 180;

function resolveSelectedRouteId(currentRouteId: string | null, routes: readonly TransitRoute[]) {
	return currentRouteId && routes.some(route => route.id === currentRouteId) ? currentRouteId : null;
}

export default function useTransitRouteSelection({
	selectedRouteId,
	setSelectedRouteId,
	availableRoutes,
	hasSnapshot,
	isMobileDevice
}: TransitRouteSelectionParams) {
	const [closingRouteId, setClosingRouteId] = useState<string | null>(null);
	const [showAllActiveRoutes, setShowAllActiveRoutes] = useState(() => !matchesMediaQuery(MOBILE_DEVICE_QUERY));
	const [isAutoCollapsingActiveRoutes, setIsAutoCollapsingActiveRoutes] = useState(false);
	const [hideSuggestedActiveRoutes, setHideSuggestedActiveRoutes] = useState(false);
	const [showInactiveRoutes, setShowInactiveRoutes] = useState(false);
	const closePanelTimerRef = useRef<ReturnType<typeof globalThis.setTimeout> | null>(null);
	const activeRouteCollapseTimerRef = useRef<ReturnType<typeof globalThis.setTimeout> | null>(null);
	const routeDetailsScrollDelayRef = useRef(MOBILE_ROUTE_DETAILS_SCROLL_DELAY_MS);
	const routeDetailsRef = useRef<HTMLElement | null>(null);
	const previousSelectedRouteIdRef = useRef<string | null>(null);

	const clearClosePanelTimer = () => {
		if (closePanelTimerRef.current !== null) {
			globalThis.clearTimeout(closePanelTimerRef.current);
			closePanelTimerRef.current = null;
		}
	};

	const clearActiveRouteCollapseTimer = () => {
		if (activeRouteCollapseTimerRef.current !== null) {
			globalThis.clearTimeout(activeRouteCollapseTimerRef.current);
			activeRouteCollapseTimerRef.current = null;
		}
	};

	useEffect(
		() => () => {
			clearClosePanelTimer();
			clearActiveRouteCollapseTimer();
		},
		[]
	);

	useEffect(() => {
		clearActiveRouteCollapseTimer();

		const animationFrameId = globalThis.requestAnimationFrame(() => {
			setIsAutoCollapsingActiveRoutes(false);
			setShowAllActiveRoutes(!isMobileDevice);
			setHideSuggestedActiveRoutes(false);
		});

		return () => globalThis.cancelAnimationFrame(animationFrameId);
	}, [isMobileDevice]);

	useEffect(() => {
		if (!hasSnapshot) return;

		if (!closingRouteId || availableRoutes.some(route => route.id === closingRouteId)) return;

		const animationFrameId = globalThis.requestAnimationFrame(() => setClosingRouteId(null));

		return () => globalThis.cancelAnimationFrame(animationFrameId);
	}, [availableRoutes, closingRouteId, hasSnapshot]);

	useEffect(() => {
		if (!hasSnapshot) return;

		const animationFrameId = globalThis.requestAnimationFrame(() =>
			setSelectedRouteId(currentSelectedRouteId =>
				resolveSelectedRouteId(currentSelectedRouteId, availableRoutes)
			)
		);

		return () => globalThis.cancelAnimationFrame(animationFrameId);
	}, [availableRoutes, hasSnapshot, setSelectedRouteId]);

	const handleRouteSelection = (routeId: string) => {
		clearClosePanelTimer();
		clearActiveRouteCollapseTimer();
		routeDetailsScrollDelayRef.current = showAllActiveRoutes
			? ACTIVE_ROUTE_AUTO_COLLAPSE_DURATION_MS + MOBILE_ROUTE_DETAILS_SCROLL_DELAY_MS
			: MOBILE_ROUTE_DETAILS_SCROLL_DELAY_MS;

		if (showAllActiveRoutes) {
			setIsAutoCollapsingActiveRoutes(true);
			setShowAllActiveRoutes(false);
			activeRouteCollapseTimerRef.current = globalThis.setTimeout(() => {
				setIsAutoCollapsingActiveRoutes(false);
				activeRouteCollapseTimerRef.current = null;
			}, ACTIVE_ROUTE_AUTO_COLLAPSE_DURATION_MS);
		} else setIsAutoCollapsingActiveRoutes(false);

		setClosingRouteId(null);
		setSelectedRouteId(routeId);
	};

	const handleMinimizeRoute = () => {
		if (!selectedRouteId) return;

		clearClosePanelTimer();
		clearActiveRouteCollapseTimer();
		setIsAutoCollapsingActiveRoutes(false);
		setClosingRouteId(selectedRouteId);
		setSelectedRouteId(null);
		closePanelTimerRef.current = globalThis.setTimeout(() => {
			setClosingRouteId(null);
			closePanelTimerRef.current = null;
		}, PANEL_CLOSE_DURATION_MS);
	};

	const handleToggleActiveRoutes = (hasCollapsedActiveRoutePeek: boolean) => {
		clearActiveRouteCollapseTimer();
		setIsAutoCollapsingActiveRoutes(false);

		if (showAllActiveRoutes) {
			setShowAllActiveRoutes(false);
			if (isMobileDevice && !selectedRouteId) setHideSuggestedActiveRoutes(true);
			return;
		}

		if (isMobileDevice && !selectedRouteId && hasCollapsedActiveRoutePeek) {
			setHideSuggestedActiveRoutes(true);
			return;
		}

		setShowAllActiveRoutes(true);
		setHideSuggestedActiveRoutes(false);
	};

	useEffect(() => {
		const previousSelectedRouteId = previousSelectedRouteIdRef.current;
		previousSelectedRouteIdRef.current = selectedRouteId;

		if (!isMobileDevice || !selectedRouteId || previousSelectedRouteId === selectedRouteId) return;

		const prefersReducedMotion = globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const scrollDelayMs = prefersReducedMotion ? 0 : routeDetailsScrollDelayRef.current;
		routeDetailsScrollDelayRef.current = MOBILE_ROUTE_DETAILS_SCROLL_DELAY_MS;
		const scrollToRouteDetails = () => {
			const routeDetailsTop = routeDetailsRef.current?.getBoundingClientRect().top;

			if (routeDetailsTop === undefined) return;

			globalThis.scrollTo({
				top: Math.max(0, globalThis.scrollY + routeDetailsTop - 16),
				behavior: prefersReducedMotion ? "auto" : "smooth"
			});
		};

		let scrollTimeoutId: ReturnType<typeof globalThis.setTimeout> | null = null;
		const animationFrameId = globalThis.requestAnimationFrame(() => {
			if (scrollDelayMs === 0) {
				scrollToRouteDetails();
				return;
			}

			scrollTimeoutId = globalThis.setTimeout(scrollToRouteDetails, scrollDelayMs);
		});

		return () => {
			globalThis.cancelAnimationFrame(animationFrameId);
			if (scrollTimeoutId !== null) globalThis.clearTimeout(scrollTimeoutId);
		};
	}, [isMobileDevice, selectedRouteId]);

	return {
		closingRouteId,
		showAllActiveRoutes,
		isAutoCollapsingActiveRoutes,
		hideSuggestedActiveRoutes,
		showInactiveRoutes,
		setShowInactiveRoutes,
		handleRouteSelection,
		handleMinimizeRoute,
		handleToggleActiveRoutes,
		routeDetailsRef
	};
}
