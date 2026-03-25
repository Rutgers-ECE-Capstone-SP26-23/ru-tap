import type TransitBus from "@/types/transit/models/transitBus.ts";
import type TransitCampus from "@/types/transit/models/transitCampus.ts";
import type TransitStop from "@/types/transit/models/transitStop.ts";

type MutableTransitRoute = {
	id: string;
	name: string;
	shortName: string;
	color: string;
	textColor: string;
	hasScheduledService: boolean;
	stops: TransitStop[];
	campuses: TransitCampus[];
	buses: TransitBus[];
	updatedAt: string;
};

export type { MutableTransitRoute as default };
