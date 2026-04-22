import type PassioPrediction from "@/types/transit/feed/passioPrediction.ts";

type PassioTrain = Readonly<{
	lat: number;
	lon: number;
	heading: number;
	realTime: boolean;
	deadMileage: boolean;
	line: string;
	lineCode: string;
	lineColor: string;
	lineTextColor: string;
	dest: string;
	predictions: readonly PassioPrediction[];
	type: string;
	extra: Readonly<{
		load: number | null;
		cap: number | null;
		info: string | null;
	}>;
}>;

export type { PassioTrain as default };
