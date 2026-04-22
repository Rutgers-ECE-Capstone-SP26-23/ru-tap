type PassioLine = Readonly<{
	lineCode: string;
	lineNameShort: string;
	lineNameLong: string;
	routeColor: string;
	routeTextColor: string;
	stations: readonly string[];
	hasActiveTrains: boolean;
}>;

export type { PassioLine as default };
