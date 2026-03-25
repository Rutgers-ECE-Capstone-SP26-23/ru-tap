type PassioStation = Readonly<{
	stationID: string;
	stationName: string;
	lat: number;
	lon: number;
	destinations?: Readonly<Record<string, unknown>>;
}>;

export type { PassioStation as default };
