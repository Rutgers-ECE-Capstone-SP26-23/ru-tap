import type TransitBus from "@/types/transit/models/transitBus.ts";
import type TransitCampus from "@/types/transit/models/transitCampus.ts";
import type TransitStop from "@/types/transit/models/transitStop.ts";

type TransitRoute = Readonly<{
	id: string;
	name: string;
	shortName: string;
	color: string;
	textColor: string;
	hasScheduledService: boolean;
	stops: readonly TransitStop[];
	campuses: readonly TransitCampus[];
	buses: readonly TransitBus[];
	updatedAt: string;
}>;

export type { TransitRoute as default };
