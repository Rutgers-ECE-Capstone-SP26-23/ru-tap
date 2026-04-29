import type TransitRoute from "@/types/transit/models/transitRoute.ts";

/**
 * Derived transit page state consumed directly by the route selector and detail panel.
 */
type TransitBoardViewState = Readonly<{
	routes: readonly TransitRoute[];
	activeRoutes: readonly TransitRoute[];
	inactiveRoutes: readonly TransitRoute[];
	selectedRoute: TransitRoute | null;
	displayedRoute: TransitRoute | null;
	peekRouteButtons: readonly TransitRoute[];
	expandedRouteButtons: readonly TransitRoute[];
	activeRoutesHaveVisibleContent: boolean;
	hasCollapsedActiveRoutePeek: boolean;
	showLocatingActiveRoutePeekNote: boolean;
	showLocationUnavailableActiveRoutePeekNote: boolean;
	hasSelectedRoute: boolean;
	isClosingRoutePanel: boolean;
	shouldRenderRoutePanel: boolean;
	activeRouteMetaLabel: string;
	layoutClassName: string;
	boardShellClassName: string;
}>;

export type { TransitBoardViewState as default };
