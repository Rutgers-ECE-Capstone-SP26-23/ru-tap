type PassioPrediction = Readonly<{
	stationID: string;
	stationName: string;
	actualETA: number;
	noETA: boolean;
	realTime: boolean;
}>;

export type { PassioPrediction as default };
