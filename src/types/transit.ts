export type PassioPrediction = Readonly<{
	stationID: string;
	stationName: string;
	actualETA: number;
	noETA: boolean;
	realTime: boolean;
}>;

export type PassioTrain = Readonly<{
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

export type PassioLine = Readonly<{
	lineCode: string;
	lineNameShort: string;
	lineNameLong: string;
	routeColor: string;
	routeTextColor: string;
	stations: readonly string[];
	hasActiveTrains: boolean;
}>;

export type PassioAlert = Readonly<{
	id: string;
	lineCode: string | null;
	runNumber: string | null;
	stationID: string | null;
	additionalRunNumbers: readonly string[];
	additionalStationIDs: readonly string[];
	title: string;
	message: string;
}>;

export type PassioSystemStatus = Readonly<{
	shitIsFucked: boolean;
	message: string;
}>;

export type PassioFeed = Readonly<{
	trains: Readonly<Record<string, PassioTrain>>;
	stations: Readonly<Record<string, unknown>>;
	lines: Readonly<Record<string, PassioLine>>;
	alerts: readonly PassioAlert[];
	lastUpdated: string;
	shitsFucked: PassioSystemStatus;
}>;

export type TransitPrediction = Readonly<{
	stationId: string;
	stationName: string;
	etaMs: number;
	noEta: boolean;
	realTime: boolean;
}>;

export type TransitBus = Readonly<{
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

export type TransitRoute = Readonly<{
	id: string;
	name: string;
	shortName: string;
	color: string;
	textColor: string;
	hasScheduledService: boolean;
	buses: readonly TransitBus[];
	updatedAt: string;
}>;

export type TransitAlert = Readonly<{
	id: string;
	routeId: string | null;
	routeName: string | null;
	title: string;
	message: string;
}>;

export type TransitSnapshot = Readonly<{
	updatedAt: string;
	routes: readonly TransitRoute[];
	activeRoutes: readonly TransitRoute[];
	inactiveRoutes: readonly TransitRoute[];
	alerts: readonly TransitAlert[];
	totalBusCount: number;
	liveBusCount: number;
	systemStatus: Readonly<{
		isDisrupted: boolean;
		message: string;
	}>;
}>;

export type TransitMetricCardProps = Readonly<{
	label: string;
	value: string | number;
}>;

export type TransitRouteButtonProps = Readonly<{
	route: TransitRoute;
	isSelected: boolean;
	onSelect: (routeId: string) => void;
}>;

export type TransitBusCardProps = Readonly<{
	bus: TransitBus;
}>;
