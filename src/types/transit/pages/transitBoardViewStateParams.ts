import type TransitLocationState from "@/types/transit/pages/transitLocationState.ts";
import type TransitSnapshot from "@/types/transit/models/transitSnapshot.ts";

type TransitBoardViewStateParams = Readonly<{
	snapshot: TransitSnapshot | null;
	selectedRouteId: string | null;
	closingRouteId: string | null;
	locationState: TransitLocationState | null;
	isResolvingLocation: boolean;
	isMobileDevice: boolean;
	isWideDesktop: boolean;
	showAllActiveRoutes: boolean;
	hideSuggestedActiveRoutes: boolean;
	isAutoCollapsingActiveRoutes: boolean;
}>;

export type { TransitBoardViewStateParams as default };
