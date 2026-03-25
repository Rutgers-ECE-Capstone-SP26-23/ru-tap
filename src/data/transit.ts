import type {
	PassioFeed,
	PassioLine,
	PassioTrain,
	TransitAlert,
	TransitBus,
	TransitPrediction,
	TransitRoute,
	TransitSnapshot
} from "@/types/transit.ts";

const TRANSIT_FEED_URL = "https://store.piemadd.com/passio_go/rutgers";

export const TRANSIT_REFRESH_INTERVAL_MS = 30_000;
export const SELECTED_TRANSIT_REFRESH_INTERVAL_MS = 5_000;

export const excludedTransitRouteNames = [
	"Camden",
	"Campus Connect",
	"Campus Connect Express",
	"Newark Hotel Route",
	"Penn Station Local",
	"Penn Station Express"
] as const;

const transitRouteOrder = [
	"A Route",
	"B Route",
	"B/L Loop",
	"C Route",
	"EE Route",
	"F Route",
	"H Route",
	"LX Route",
	"REXB Route",
	"REXL Route",
	"All Campus",
	"Weekend 1",
	"Weekend 2",
	"Overnight 1",
	"Overnight 2"
] as const;

const transitRouteOrderIndex = new Map<string, number>(transitRouteOrder.map((routeName, index) => [routeName, index]));

type MutableTransitRoute = {
	id: string;
	name: string;
	shortName: string;
	color: string;
	textColor: string;
	hasScheduledService: boolean;
	buses: TransitBus[];
	updatedAt: string;
};

function normalizeHexColor(color: string) {
	return `#${color.padStart(6, "0")}`.toUpperCase();
}

function getTransitRouteShortName(line: PassioLine) {
	return line.lineNameShort.trim() || line.lineNameLong;
}

function getTransitPrediction(prediction: PassioTrain["predictions"][number]): TransitPrediction {
	return {
		stationId: prediction.stationID,
		stationName: prediction.stationName,
		etaMs: prediction.actualETA,
		noEta: prediction.noETA,
		realTime: prediction.realTime
	};
}

function sortBusesByNextEta(leftBus: TransitBus, rightBus: TransitBus) {
	const leftEta = leftBus.nextStops[0]?.etaMs ?? Number.MAX_SAFE_INTEGER;
	const rightEta = rightBus.nextStops[0]?.etaMs ?? Number.MAX_SAFE_INTEGER;

	return leftEta - rightEta;
}

function sortRoutes(leftRoute: TransitRoute, rightRoute: TransitRoute) {
	const leftIndex = transitRouteOrderIndex.get(leftRoute.name) ?? Number.MAX_SAFE_INTEGER;
	const rightIndex = transitRouteOrderIndex.get(rightRoute.name) ?? Number.MAX_SAFE_INTEGER;

	return leftIndex === rightIndex ? leftRoute.name.localeCompare(rightRoute.name) : leftIndex - rightIndex;
}

function sanitizeAlertMessage(message: string) {
	return message.replaceAll(/\s*BR\s*/g, "\n").trim();
}

function buildTransitSnapshotFromParts(
	updatedAt: string,
	routes: readonly TransitRoute[],
	alerts: readonly TransitAlert[],
	systemStatus: TransitSnapshot["systemStatus"]
): TransitSnapshot {
	const activeRoutes = routes.filter(route => route.buses.length > 0).sort(sortRoutes);
	const inactiveRoutes = routes.filter(route => route.buses.length === 0).sort(sortRoutes);
	const totalBusCount = routes.reduce((total, route) => total + route.buses.length, 0);
	const liveBusCount = routes.reduce(
		(totalLiveBuses, route) => totalLiveBuses + route.buses.filter(bus => bus.realTime).length,
		0
	);

	return {
		updatedAt,
		routes: [...activeRoutes, ...inactiveRoutes],
		activeRoutes,
		inactiveRoutes,
		alerts,
		totalBusCount,
		liveBusCount,
		systemStatus
	};
}

function buildTransitSnapshot(feed: PassioFeed): TransitSnapshot {
	const excludedRouteNames = new Set<string>(excludedTransitRouteNames);
	const allLines = Object.values(feed.lines);
	const excludedLineCodes = new Set(
		allLines.filter(line => excludedRouteNames.has(line.lineNameLong)).map(line => line.lineCode)
	);

	const routeMap = new Map<string, MutableTransitRoute>();

	for (const line of allLines) {
		if (excludedLineCodes.has(line.lineCode)) {
			continue;
		}

		routeMap.set(line.lineCode, {
			id: line.lineCode,
			name: line.lineNameLong,
			shortName: getTransitRouteShortName(line),
			color: normalizeHexColor(line.routeColor),
			textColor: normalizeHexColor(line.routeTextColor),
			hasScheduledService: line.hasActiveTrains,
			buses: [],
			updatedAt: feed.lastUpdated
		});
	}

	for (const [runNumber, train] of Object.entries(feed.trains)) {
		if (excludedLineCodes.has(train.lineCode)) {
			continue;
		}

		const existingRoute = routeMap.get(train.lineCode);
		const bus: TransitBus = {
			runNumber,
			routeId: train.lineCode,
			routeName: existingRoute?.name ?? train.line,
			routeShortName: existingRoute?.shortName ?? train.line,
			routeColor: existingRoute?.color ?? normalizeHexColor(train.lineColor),
			routeTextColor: existingRoute?.textColor ?? normalizeHexColor(train.lineTextColor),
			destination: train.dest,
			latitude: train.lat,
			longitude: train.lon,
			heading: train.heading,
			realTime: train.realTime,
			nextStops: [...train.predictions]
				.sort((leftPrediction, rightPrediction) => leftPrediction.actualETA - rightPrediction.actualETA)
				.slice(0, 3)
				.map(getTransitPrediction)
		};

		if (existingRoute) {
			existingRoute.buses.push(bus);
			continue;
		}

		routeMap.set(train.lineCode, {
			id: train.lineCode,
			name: train.line,
			shortName: train.line,
			color: normalizeHexColor(train.lineColor),
			textColor: normalizeHexColor(train.lineTextColor),
			hasScheduledService: true,
			buses: [bus],
			updatedAt: feed.lastUpdated
		});
	}

	const routes = [...routeMap.values()].map<TransitRoute>(route => ({
		...route,
		buses: [...route.buses].sort(sortBusesByNextEta)
	}));
	const alerts = feed.alerts
		.filter(alert => !alert.lineCode || !excludedLineCodes.has(alert.lineCode))
		.map<TransitAlert>(alert => ({
			id: alert.id,
			routeId: alert.lineCode,
			routeName: alert.lineCode ? (routeMap.get(alert.lineCode)?.name ?? null) : null,
			title: alert.title,
			message: sanitizeAlertMessage(alert.message)
		}));

	return buildTransitSnapshotFromParts(feed.lastUpdated, routes, alerts, {
		isDisrupted: feed.shitsFucked.shitIsFucked,
		message: feed.shitsFucked.message
	});
}

export function mergeTransitSnapshots(
	currentSnapshot: TransitSnapshot,
	nextSnapshot: TransitSnapshot,
	routeIdsToUpdate: ReadonlySet<string>,
	options?: Readonly<{
		updatedAt?: string;
		alerts?: readonly TransitAlert[];
		systemStatus?: TransitSnapshot["systemStatus"];
	}>
): TransitSnapshot {
	const currentRouteMap = new Map(currentSnapshot.routes.map(route => [route.id, route]));
	const nextRouteMap = new Map(nextSnapshot.routes.map(route => [route.id, route]));
	const mergedRoutes: TransitRoute[] = [];
	const allRouteIds = new Set<string>([...currentRouteMap.keys(), ...nextRouteMap.keys()]);

	for (const routeId of allRouteIds) {
		const currentRoute = currentRouteMap.get(routeId);
		const nextRoute = nextRouteMap.get(routeId);

		if (routeIdsToUpdate.has(routeId) && nextRoute) {
			if (currentRoute && nextRoute.updatedAt < currentRoute.updatedAt) {
				mergedRoutes.push(currentRoute);
				continue;
			}

			mergedRoutes.push(nextRoute);
			continue;
		}

		if (currentRoute) {
			mergedRoutes.push(currentRoute);
			continue;
		}

		if (nextRoute) {
			mergedRoutes.push(nextRoute);
		}
	}

	return buildTransitSnapshotFromParts(
		options?.updatedAt ?? currentSnapshot.updatedAt,
		mergedRoutes,
		options?.alerts ?? currentSnapshot.alerts,
		options?.systemStatus ?? currentSnapshot.systemStatus
	);
}

export async function fetchTransitSnapshot(signal?: AbortSignal): Promise<TransitSnapshot> {
	const response = await fetch(`${TRANSIT_FEED_URL}?t=${Date.now()}`, {
		headers: {
			Accept: "application/json"
		},
		signal
	});

	if (!response.ok) {
		throw new Error(`Rutgers transit feed returned ${response.status}.`);
	}

	return buildTransitSnapshot((await response.json()) as PassioFeed);
}
