import type { Dispatch, SetStateAction } from "react";
import type TransitRoute from "@/types/transit/models/transitRoute.ts";

type TransitRouteSelectionParams = Readonly<{
	selectedRouteId: string | null;
	setSelectedRouteId: Dispatch<SetStateAction<string | null>>;
	availableRoutes: readonly TransitRoute[];
	hasSnapshot: boolean;
	isMobileDevice: boolean;
}>;

export type { TransitRouteSelectionParams as default };
