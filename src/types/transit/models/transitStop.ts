import type TransitCampus from "@/types/transit/models/transitCampus.ts";

type TransitStop = Readonly<{
	id: string;
	name: string;
	latitude: number;
	longitude: number;
	campus: TransitCampus;
}>;

export type { TransitStop as default };
