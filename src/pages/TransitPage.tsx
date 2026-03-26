import { useState } from "react";
import TransitBusCard from "@/components/transit/TransitBusCard.tsx";
import TransitMetricCard from "@/components/transit/TransitMetricCard.tsx";
import TransitRouteButton from "@/components/transit/TransitRouteButton.tsx";
import TransitRouteGroup from "@/components/transit/TransitRouteGroup.tsx";
import useMediaQuery from "@/hooks/useMediaQuery.ts";
import useTransitLocation from "@/hooks/transit/useTransitLocation.ts";
import useTransitRouteSelection from "@/hooks/transit/useTransitRouteSelection.ts";
import useTransitSnapshot from "@/hooks/transit/useTransitSnapshot.ts";
import { withBasePath } from "@/utils/basePath.ts";
import getTransitBoardViewState from "@/utils/transit/boardViewState.ts";
import { formatRouteDisplayName, formatShortTime, getRoutePanelStyle } from "@/utils/transit/display.ts";
import "@/styles/pages/transitPage.css";

const DESKTOP_LAYOUT_QUERY = "(min-width: 1040px)";

export default function TransitPage() {
	const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
	const isWideDesktop = useMediaQuery(DESKTOP_LAYOUT_QUERY);
	const isMobileDevice = useMediaQuery("(max-width: 759px)");
	const { locationState, isResolvingLocation } = useTransitLocation(isMobileDevice);
	const { snapshot, isLoading, isManualRefreshing, error, refreshNow } = useTransitSnapshot(selectedRouteId);
	const {
		closingRouteId,
		showAllActiveRoutes,
		isAutoCollapsingActiveRoutes,
		hideSuggestedActiveRoutes,
		showInactiveRoutes,
		setShowInactiveRoutes,
		handleRouteSelection,
		handleMinimizeRoute,
		handleToggleActiveRoutes,
		routeDetailsRef
	} = useTransitRouteSelection({
		selectedRouteId,
		setSelectedRouteId,
		availableRoutes: snapshot?.routes ?? [],
		hasSnapshot: snapshot != null,
		isMobileDevice
	});

	const {
		activeRouteMetaLabel,
		activeRoutesHaveVisibleContent,
		boardShellClassName,
		displayedRoute,
		expandedRouteButtons,
		hasCollapsedActiveRoutePeek,
		inactiveRoutes,
		layoutClassName,
		peekRouteButtons,
		shouldRenderRoutePanel,
		showLocatingActiveRoutePeekNote,
		showLocationUnavailableActiveRoutePeekNote
	} = getTransitBoardViewState({
		snapshot,
		selectedRouteId,
		closingRouteId,
		locationState,
		isResolvingLocation,
		isMobileDevice,
		isWideDesktop,
		showAllActiveRoutes,
		hideSuggestedActiveRoutes,
		isAutoCollapsingActiveRoutes
	});
	const inactiveRouteMetaLabel = `${inactiveRoutes.length} route${inactiveRoutes.length === 1 ? "" : "s"}`;
	let activeRoutePeekContent = null;

	if (hasCollapsedActiveRoutePeek) {
		activeRoutePeekContent = (
			<div className="transit-route-list">
				{peekRouteButtons.map(route => (
					<TransitRouteButton
						key={route.id}
						route={route}
						isSelected={route.id === selectedRouteId}
						onSelect={handleRouteSelection}
					/>
				))}
			</div>
		);
	} else if (showLocatingActiveRoutePeekNote) {
		activeRoutePeekContent = <p className="transit-route-group-note">Finding nearby routes...</p>;
	} else if (showLocationUnavailableActiveRoutePeekNote) {
		activeRoutePeekContent = (
			<p className="transit-route-group-note">Location unavailable. Expand to browse all routes.</p>
		);
	}

	const handleManualRefresh = async () => await refreshNow();

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

				{snapshot ? (
					<main className={layoutClassName}>
						<section className="transit-route-panel" aria-label="Route selector">
							<div className="transit-panel-head">
								<div>
									<p className="transit-card-label">Campus route board</p>
									<h2>Pick a route</h2>
								</div>
								<div className="transit-panel-actions">
									<p className="transit-panel-note">Selected route 15s · board 30s.</p>
									<button
										type="button"
										className="transit-refresh-button"
										onClick={handleManualRefresh}
										disabled={isManualRefreshing}>
										{isManualRefreshing ? "Refreshing..." : "Refresh Now"}
									</button>
								</div>
							</div>

							<TransitRouteGroup
								label="Active right now"
								metaLabel={activeRouteMetaLabel}
								isExpanded={showAllActiveRoutes}
								hasVisibleContent={activeRoutesHaveVisibleContent}
								hasPeekContent={
									hasCollapsedActiveRoutePeek ||
									showLocatingActiveRoutePeekNote ||
									showLocationUnavailableActiveRoutePeekNote
								}
								peekChildren={activeRoutePeekContent}
								onToggle={() => handleToggleActiveRoutes(hasCollapsedActiveRoutePeek)}>
								<div className="transit-route-list">
									{expandedRouteButtons.map(route => (
										<TransitRouteButton
											key={route.id}
											route={route}
											isSelected={route.id === selectedRouteId}
											onSelect={handleRouteSelection}
										/>
									))}
								</div>
							</TransitRouteGroup>

							{inactiveRoutes.length > 0 ? (
								<TransitRouteGroup
									label="Inactive right now"
									metaLabel={inactiveRouteMetaLabel}
									isExpanded={showInactiveRoutes}
									hasVisibleContent={showInactiveRoutes}
									onToggle={() => setShowInactiveRoutes(currentValue => !currentValue)}>
									<div className="transit-idle-route-list">
										{inactiveRoutes.map(route => (
											<span key={route.id} className="transit-idle-route-chip">
												{route.name}
											</span>
										))}
									</div>
								</TransitRouteGroup>
							) : null}
						</section>

						{shouldRenderRoutePanel ? (
							<div className={boardShellClassName}>
								{displayedRoute ? (
									<section
										ref={routeDetailsRef}
										className="transit-board"
										style={getRoutePanelStyle(displayedRoute)}
										aria-label="Selected route details">
										<header className="transit-board-head">
											<div className="transit-board-heading">
												<div>
													<p className="transit-card-label">Selected route</p>
													<h2>{formatRouteDisplayName(displayedRoute.name)}</h2>
													<p>
														{displayedRoute.buses.length} live bus
														{displayedRoute.buses.length === 1 ? "" : "es"} reporting on
														this route.
													</p>
												</div>
											</div>

											<div className="transit-board-actions">
												<div className="transit-board-meta">
													<p>
														Route refreshed at {formatShortTime(displayedRoute.updatedAt)}
													</p>
												</div>
												<button
													type="button"
													className="transit-minimize-button"
													onClick={handleMinimizeRoute}>
													Minimize
												</button>
											</div>
										</header>

										{displayedRoute.buses.length > 0 ? (
											<div className="transit-bus-grid">
												{displayedRoute.buses.map(bus => (
													<TransitBusCard key={bus.runNumber} bus={bus} />
												))}
											</div>
										) : (
											<div className="transit-empty-route">
												<p className="transit-card-label">No live buses</p>
												<h3>
													{formatRouteDisplayName(displayedRoute.name)} is quiet right now.
												</h3>
												<p>
													This route is still part of the Rutgers board, but there are no
													active buses reporting on it in the current snapshot.
												</p>
											</div>
										)}
									</section>
								) : null}
							</div>
						) : null}
					</main>
				) : null}
			</div>
		</div>
	);
}
