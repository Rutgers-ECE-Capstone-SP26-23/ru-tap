type PassioAlert = Readonly<{
	id: string;
	lineCode: string | null;
	runNumber: string | null;
	stationID: string | null;
	additionalRunNumbers: readonly string[];
	additionalStationIDs: readonly string[];
	title: string;
	message: string;
}>;

export type { PassioAlert as default };
