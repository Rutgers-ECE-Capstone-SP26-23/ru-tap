type TransitPrediction = Readonly<{
	stationId: string;
	stationName: string;
	etaMs: number;
	noEta: boolean;
	realTime: boolean;
}>;

export type { TransitPrediction as default };
