import type TransitPrediction from "@/types/transit/models/transitPrediction.ts";

type TransitBus = Readonly<{
	runNumber: string;
	routeId: string;
	routeName: string;
	routeShortName: string;
	routeColor: string;
	routeTextColor: string;
	destination: string;
	latitude: number;
	longitude: number;
	heading: number;
	realTime: boolean;
	nextStops: readonly TransitPrediction[];
}>;

export type { TransitBus as default };
