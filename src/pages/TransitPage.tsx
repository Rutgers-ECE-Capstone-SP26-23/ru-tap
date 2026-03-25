import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import {
	SELECTED_TRANSIT_REFRESH_INTERVAL_MS,
	TRANSIT_REFRESH_INTERVAL_MS,
	fetchTransitSnapshot,
	mergeTransitSnapshots
} from "@/data/transit.ts";
import type { TransitBus, TransitRoute, TransitSnapshot } from "@/types/transit.ts";
import { withBasePath } from "@/utils/basePath.ts";
import "@/styles/transitPage.css";

const timeFormatter = new Intl.DateTimeFormat("en-US", {
	hour: "numeric",
	minute: "2-digit"
});

function formatShortTime(value: string | number) {
	return timeFormatter.format(new Date(value));
}

function formatEta(etaMs: number) {
	const minutesUntilArrival = Math.max(0, Math.round((etaMs - Date.now()) / 60_000));

	return minutesUntilArrival <= 0 ? "Due" : minutesUntilArrival === 1 ? "1 min" : `${minutesUntilArrival} min`;
}

function formatHeading(heading: number) {
	const compassDirections = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
	const directionIndex = Math.round((((heading % 360) + 360) % 360) / 45) % compassDirections.length;

	return `${compassDirections[directionIndex]} · ${Math.round(heading)}°`;
}

function withAlpha(color: string, alphaHex: string) {
	return `${color}${alphaHex}`;
}

function getRouteButtonStyle(route: TransitRoute, isSelected: boolean): CSSProperties {
	return {
		background: isSelected ? withAlpha(route.color, "1C") : withAlpha(route.color, "0F"),
		borderColor: isSelected ? route.color : withAlpha(route.color, "52")
	};
}

function getRouteBadgeStyle(route: TransitRoute): CSSProperties {
	return {
		background: route.color,
		color: route.textColor
	};
}

type TransitMetricCardProps = Readonly<{
	label: string;
	value: string | number;
}>;

function TransitMetricCard({ label, value }: TransitMetricCardProps) {
	return (
		<div className="transit-metric-card">
			<p className="transit-metric-label">{label}</p>
			<p className="transit-metric-value">{value}</p>
		</div>
	);
}

type TransitRouteButtonProps = Readonly<{
	route: TransitRoute;
	isSelected: boolean;
	onSelect: (routeId: string) => void;
}>;

function TransitRouteButton({ route, isSelected, onSelect }: TransitRouteButtonProps) {
	const liveLabel = route.buses.length > 0 ? `${route.buses.length} live` : "Quiet now";

	return (
		<button
			type="button"
			className={isSelected ? "transit-route-button selected" : "transit-route-button"}
			style={getRouteButtonStyle(route, isSelected)}
			onClick={() => onSelect(route.id)}>
			<span className="transit-route-badge" style={getRouteBadgeStyle(route)}>
				{route.shortName}
			</span>
			<span className="transit-route-copy">
				<strong>{route.name}</strong>
				<span>{liveLabel}</span>
			</span>
		</button>
	);
}

type TransitBusCardProps = Readonly<{
	bus: TransitBus;
}>;

function TransitBusCard({ bus }: TransitBusCardProps) {
	return (
		<article className="transit-bus-card">
			<div className="transit-bus-card-head">
				<div>
					<p className="transit-card-label">Run {bus.runNumber}</p>
					<h3>{bus.destination}</h3>
				</div>
				<p className={bus.realTime ? "transit-bus-status live" : "transit-bus-status scheduled"}>
					{bus.realTime ? "Live" : "Scheduled"}
				</p>
			</div>

			<div className="transit-bus-meta">
				<p>Heading {formatHeading(bus.heading)}</p>
				<p>
					{bus.nextStops.length} upcoming stop{bus.nextStops.length === 1 ? "" : "s"}
				</p>
			</div>

			{bus.nextStops.length > 0 ? (
				<ol className="transit-stop-list">
					{bus.nextStops.map((stop, stopIndex) => (
						<li key={`${bus.runNumber}-${stop.stationId}-${stop.etaMs}-${stopIndex}`}>
							<div>
								<strong>{stop.stationName}</strong>
								<span>{stop.noEta ? "Time pending" : formatShortTime(stop.etaMs)}</span>
							</div>
							<span className="transit-stop-eta">{stop.noEta ? "No ETA" : formatEta(stop.etaMs)}</span>
						</li>
					))}
				</ol>
			) : (
				<p className="transit-empty-copy">No stop predictions are reporting for this bus yet.</p>
			)}
		</article>
	);
}

export default function TransitPage() {
	const [snapshot, setSnapshot] = useState<TransitSnapshot | null>(null);
	const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
	const [showInactiveRoutes, setShowInactiveRoutes] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isManualRefreshing, setIsManualRefreshing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const hasLoadedSnapshotRef = useRef(false);
	const hasStartedBoardClockRef = useRef(false);
	const selectedRouteIdRef = useRef<string | null>(null);
	const boardRefreshVersionRef = useRef(0);
	const selectedRefreshVersionRef = useRef(0);
	const [boardClockAnchorMs, setBoardClockAnchorMs] = useState<number | null>(null);

	selectedRouteIdRef.current = selectedRouteId;

	useEffect(() => {
		let isDisposed = false;
		const abortController = new AbortController();

		const loadSnapshot = async () => {
			try {
				const nextSnapshot = await fetchTransitSnapshot(abortController.signal);

				if (isDisposed) {
					return;
				}

				hasLoadedSnapshotRef.current = true;
				setSnapshot(nextSnapshot);
				setError(null);
				setSelectedRouteId(currentRouteId =>
					currentRouteId && nextSnapshot.routes.some(route => route.id === currentRouteId)
						? currentRouteId
						: (nextSnapshot.routes[0]?.id ?? null)
				);
				if (!hasStartedBoardClockRef.current) {
					hasStartedBoardClockRef.current = true;
					setBoardClockAnchorMs(Date.now());
				}
			} catch (caughtError) {
				if (isDisposed || abortController.signal.aborted) {
					return;
				}

				setError(caughtError instanceof Error ? caughtError.message : "Couldn't load Rutgers transit data.");
			} finally {
				if (!isDisposed) {
					setIsLoading(false);
				}
			}
		};

		void loadSnapshot();

		return () => {
			isDisposed = true;
			abortController.abort();
		};
	}, []);

	useEffect(() => {
		if (boardClockAnchorMs === null) {
			return;
		}

		const refreshTimer = globalThis.setInterval(() => {
			const requestVersion = boardRefreshVersionRef.current + 1;
			boardRefreshVersionRef.current = requestVersion;

			void fetchTransitSnapshot()
				.then(nextSnapshot => {
					if (boardRefreshVersionRef.current !== requestVersion) {
						return;
					}

					setSnapshot(currentSnapshot => {
						if (!currentSnapshot) {
							return nextSnapshot;
						}

						const activeSelectedRouteId = selectedRouteIdRef.current;
						const routeIdsToUpdate = new Set(
							nextSnapshot.routes
								.filter(route => route.id !== activeSelectedRouteId)
								.map(route => route.id)
						);

						return mergeTransitSnapshots(currentSnapshot, nextSnapshot, routeIdsToUpdate, {
							updatedAt: nextSnapshot.updatedAt,
							alerts: nextSnapshot.alerts,
							systemStatus: nextSnapshot.systemStatus
						});
					});
					setError(null);
				})
				.catch(caughtError => {
					setError(caughtError instanceof Error ? caughtError.message : "Couldn't load Rutgers transit data.");
				});
		}, TRANSIT_REFRESH_INTERVAL_MS);

		return () => {
			globalThis.clearInterval(refreshTimer);
		};
	}, [boardClockAnchorMs]);

	useEffect(() => {
		if (boardClockAnchorMs === null || !selectedRouteId) {
			return;
		}

		const refreshTimer = globalThis.setInterval(() => {
			const activeSelectedRouteId = selectedRouteIdRef.current;

			if (!activeSelectedRouteId) {
				return;
			}

			const requestVersion = selectedRefreshVersionRef.current + 1;
			selectedRefreshVersionRef.current = requestVersion;

			void fetchTransitSnapshot()
				.then(nextSnapshot => {
					if (
						selectedRefreshVersionRef.current !== requestVersion ||
						selectedRouteIdRef.current !== activeSelectedRouteId
					) {
						return;
					}

					setSnapshot(currentSnapshot => {
						if (!currentSnapshot) {
							return nextSnapshot;
						}

						return mergeTransitSnapshots(currentSnapshot, nextSnapshot, new Set([activeSelectedRouteId]));
					});
					setError(null);
				})
				.catch(caughtError => {
					setError(caughtError instanceof Error ? caughtError.message : "Couldn't load Rutgers transit data.");
				});
		}, SELECTED_TRANSIT_REFRESH_INTERVAL_MS);

		return () => {
			selectedRefreshVersionRef.current += 1;
			globalThis.clearInterval(refreshTimer);
		};
	}, [boardClockAnchorMs, selectedRouteId]);

	const routes = snapshot?.routes ?? [];
	const selectedRoute = routes.find(route => route.id === selectedRouteId) ?? routes[0] ?? null;
	const routeOptions = selectedRoute && !snapshot?.activeRoutes.some(route => route.id === selectedRoute.id)
		? [selectedRoute, ...(snapshot?.activeRoutes ?? [])]
		: (snapshot?.activeRoutes ?? []);

	const handleManualRefresh = () => {
		const requestVersion = boardRefreshVersionRef.current + 1;
		boardRefreshVersionRef.current = requestVersion;
		setIsManualRefreshing(true);

		void fetchTransitSnapshot()
			.then(nextSnapshot => {
				if (boardRefreshVersionRef.current !== requestVersion) {
					return;
				}

				setSnapshot(nextSnapshot);
				setError(null);
				setSelectedRouteId(currentRouteId =>
					currentRouteId && nextSnapshot.routes.some(route => route.id === currentRouteId)
						? currentRouteId
						: (nextSnapshot.routes[0]?.id ?? null)
				);
			})
			.catch(caughtError => {
				setError(caughtError instanceof Error ? caughtError.message : "Couldn't load Rutgers transit data.");
			})
			.finally(() => {
				setIsManualRefreshing(false);
			});
	};

	return (
		<div className="transit-page">
			<div className="transit-shell">
				<header className="transit-hero">
					<div className="transit-hero-copy">
						<a className="transit-home-link" href={withBasePath("/")}>
							RU Tap
						</a>
						<p className="transit-eyebrow">Transit preview</p>
						<h1>Rutgers buses, in one clear board.</h1>
						<p className="transit-lead">
							Track Rutgers New Brunswick routes and see the next stop for each live bus.
						</p>
						<p className="transit-supporting-copy">
							Live arrivals, route status, and bus-by-bus detail in one place.
						</p>
					</div>

					<div className="transit-metric-grid" aria-label="Transit overview">
						<TransitMetricCard label="Routes in board" value={snapshot?.routes.length ?? "…"} />
						<TransitMetricCard label="Live buses" value={snapshot?.liveBusCount ?? "…"} />
						<TransitMetricCard label="Campus alerts" value={snapshot?.alerts.length ?? "…"} />
						<TransitMetricCard
							label="Board updated"
							value={snapshot ? formatShortTime(snapshot.updatedAt) : "Loading"}
						/>
					</div>
				</header>

				{snapshot?.systemStatus.isDisrupted ? (
					<section className="transit-banner transit-banner-warning" aria-label="Transit system status">
						<strong>Transit feed disruption.</strong>
						<p>{snapshot.systemStatus.message}</p>
					</section>
				) : null}

				{error ? (
					<section className="transit-banner transit-banner-error" aria-label="Transit loading issue">
						<strong>Transit feed issue.</strong>
						<p>{error}</p>
					</section>
				) : null}

				{snapshot?.alerts.length ? (
					<section className="transit-alerts" aria-label="Transit alerts">
						{snapshot.alerts.map(alert => (
							<article key={alert.id} className="transit-alert-card">
								<p className="transit-card-label">{alert.routeName ?? "Transit alert"}</p>
								<h2>{alert.title}</h2>
								<p>{alert.message}</p>
							</article>
						))}
					</section>
				) : null}

				{isLoading && !snapshot ? (
					<section className="transit-loading-panel" aria-label="Loading transit data">
						<p className="transit-card-label">Loading live Rutgers transit data</p>
						<h2>Building the route board.</h2>
						<p>The Rutgers feed is responding, and the first snapshot is on the way in.</p>
					</section>
				) : null}

				{snapshot && selectedRoute ? (
					<main className="transit-layout">
						<section className="transit-route-panel" aria-label="Route selector">
							<div className="transit-panel-head">
								<div>
									<p className="transit-card-label">Campus route board</p>
									<h2>Pick a route</h2>
								</div>
								<div className="transit-panel-actions">
									<p className="transit-panel-note">Selected route 5s · board 30s.</p>
									<button
										type="button"
										className="transit-refresh-button"
										onClick={handleManualRefresh}
										disabled={isManualRefreshing}>
										{isManualRefreshing ? "Refreshing..." : "Refresh Now"}
									</button>
								</div>
							</div>

							<div className="transit-route-list">
								{routeOptions.map(route => (
									<TransitRouteButton
										key={route.id}
										route={route}
										isSelected={route.id === selectedRoute.id}
										onSelect={setSelectedRouteId}
									/>
								))}
							</div>

							{snapshot.inactiveRoutes.length > 0 ? (
								<div className="transit-idle-route-block">
									<button
										type="button"
										className="transit-idle-route-toggle"
										aria-expanded={showInactiveRoutes}
										aria-controls="inactive-routes-panel"
										onClick={() => setShowInactiveRoutes(currentValue => !currentValue)}>
										<span className="transit-card-label">Inactive right now</span>
										<span className="transit-idle-route-meta">
											<span className="transit-idle-route-count">
												{snapshot.inactiveRoutes.length} route
												{snapshot.inactiveRoutes.length === 1 ? "" : "s"}
											</span>
											<span
												className={
													showInactiveRoutes
														? "transit-idle-route-chevron expanded"
														: "transit-idle-route-chevron"
												}
												aria-hidden="true">
												▾
											</span>
										</span>
									</button>
									<div
										id="inactive-routes-panel"
										className={
											showInactiveRoutes
												? "transit-idle-route-panel expanded"
												: "transit-idle-route-panel"
										}>
										<div className="transit-idle-route-list">
											{snapshot.inactiveRoutes.map(route => (
												<span key={route.id} className="transit-idle-route-chip">
													{route.name}
												</span>
											))}
										</div>
									</div>
								</div>
							) : null}
						</section>

						<section className="transit-board" aria-label="Selected route details">
							<header className="transit-board-head">
								<div className="transit-board-heading">
									<span
										className="transit-route-badge large"
										style={getRouteBadgeStyle(selectedRoute)}>
										{selectedRoute.shortName}
									</span>
									<div>
										<p className="transit-card-label">Selected route</p>
										<h2>{selectedRoute.name}</h2>
										<p>
											{selectedRoute.buses.length} live bus
											{selectedRoute.buses.length === 1 ? "" : "es"} reporting on this route.
										</p>
									</div>
								</div>

								<div className="transit-board-meta">
									<p>
										{selectedRoute.hasScheduledService
											? "Service is active in the feed."
											: "No scheduled service right now."}
									</p>
									<p>Route refreshed at {formatShortTime(selectedRoute.updatedAt)}</p>
								</div>
							</header>

							{selectedRoute.buses.length > 0 ? (
								<div className="transit-bus-grid">
									{selectedRoute.buses.map(bus => (
										<TransitBusCard key={bus.runNumber} bus={bus} />
									))}
								</div>
							) : (
								<div className="transit-empty-route">
									<p className="transit-card-label">No live buses</p>
									<h3>{selectedRoute.name} is quiet right now.</h3>
									<p>
										This route is still part of the Rutgers board, but there are no active buses
										reporting on it in the current snapshot.
									</p>
								</div>
							)}
						</section>
					</main>
				) : null}
			</div>
		</div>
	);
}
