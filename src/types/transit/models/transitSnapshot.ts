import type TransitAlert from "@/types/transit/models/transitAlert.ts";
import type TransitRoute from "@/types/transit/models/transitRoute.ts";

/**
 * Fully normalized Rutgers transit board state for one fetch cycle.
 */
type TransitSnapshot = Readonly<{
	updatedAt: string;
	routes: readonly TransitRoute[];
	activeRoutes: readonly TransitRoute[];
	inactiveRoutes: readonly TransitRoute[];
	alerts: readonly TransitAlert[];
	totalBusCount: number;
	liveBusCount: number;
	systemStatus: Readonly<{
		isDisrupted: boolean;
		message: string;
	}>;
}>;

export type { TransitSnapshot as default };
