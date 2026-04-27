import FloatingTopButton from "@/components/landing/FloatingTopButton.tsx";
import ServiceButtonGrid from "@/components/myRutgers/ServiceButtonGrid.tsx";
import ServiceWidgetPanel from "@/components/myRutgers/ServiceWidgetPanel.tsx";
import { prefetchAcademicCatalog } from "@/data/academics.ts";
import { myRutgersServices } from "@/data/myRutgersServices.ts";
import { withBasePath } from "@/utils/basePath.ts";
import scrollPageToTop from "@/utils/scrollToTop.ts";
import { useEffect, useRef, useState } from "react";
import "@/styles/pages/myRutgersPage.css";

const TOOL_PANEL_TRANSITION_MS = 420;

export default function MyRutgersPage() {
	const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
	const selectedService = myRutgersServices.find(service => service.id === selectedServiceId) ?? null;
	const [renderedServiceId, setRenderedServiceId] = useState<string | null>(null);
	const closeTimeoutRef = useRef<number | null>(null);
	const renderedService = myRutgersServices.find(service => service.id === renderedServiceId) ?? null;
	const hasSelectedService = selectedService !== null;
	const layoutClassName = hasSelectedService ? "myrutgers-layout has-selection" : "myrutgers-layout";
	const serviceGridPanelClassName = hasSelectedService
		? "service-grid-panel service-grid-panel-vertical"
		: "service-grid-panel service-grid-panel-horizontal";
	const widgetShellClassName = hasSelectedService
		? "myrutgers-widget-shell visible"
		: renderedService === null
			? "myrutgers-widget-shell"
			: "myrutgers-widget-shell closing";

	useEffect(() => {
		void prefetchAcademicCatalog();
	}, []);

	useEffect(() => {
		return () => {
			if (closeTimeoutRef.current !== null) {
				globalThis.clearTimeout(closeTimeoutRef.current);
			}
		};
	}, []);

	const clearCloseTimeout = () => {
		if (closeTimeoutRef.current === null) {
			return;
		}

		globalThis.clearTimeout(closeTimeoutRef.current);
		closeTimeoutRef.current = null;
	};

	const handleSelectService = (serviceId: string) => {
		clearCloseTimeout();
		setSelectedServiceId(serviceId);
		setRenderedServiceId(serviceId);
	};

	const handleResetSelection = () => {
		clearCloseTimeout();
		setSelectedServiceId(null);
		closeTimeoutRef.current = globalThis.setTimeout(() => {
			setRenderedServiceId(null);
			closeTimeoutRef.current = null;
		}, TOOL_PANEL_TRANSITION_MS);
	};

	return (
		<div className="myrutgers-page">
			<div className="myrutgers-shell">
				<header className="myrutgers-header">
					<div className="myrutgers-header-meta">
						<a className="myrutgers-home-link" href={withBasePath("/")}>
							RU Tap
						</a>
						<p className="myrutgers-kicker">Academics preview</p>
					</div>
					<h1>Plan classes faster.</h1>
					<p className="myrutgers-lead">
						Search the catalog, check academic dates, compare schedules, and move into WebReg without
						stitching together separate Rutgers tabs.
					</p>
					<p className="myrutgers-supporting-copy">
						Course search and academic calendar views live directly in RU Tap, while Course Schedule Planner
						and WebReg stay close by when you need the official Rutgers tools.
					</p>
				</header>

				<main className={layoutClassName}>
					<section className={serviceGridPanelClassName} aria-label="myRutgers service selector">
						<div className="service-grid-panel-head">
							<div>
								<h2>Tools</h2>
								<p>
									{hasSelectedService
										? "Switch tools or return to the full workspace list."
										: "Choose what you want to work on."}
								</p>
							</div>
							{hasSelectedService ? (
								<button
									type="button"
									className="service-grid-panel-reset"
									onClick={handleResetSelection}>
									All tools
								</button>
							) : (
								<p className="service-grid-panel-count">{myRutgersServices.length} tools</p>
							)}
						</div>

						<ServiceButtonGrid
							layout={hasSelectedService ? "vertical" : "horizontal"}
							services={myRutgersServices}
							selectedServiceId={selectedServiceId}
							onSelectService={handleSelectService}
						/>
					</section>

					<div className={widgetShellClassName}>
						<ServiceWidgetPanel service={renderedService} />
					</div>
				</main>
			</div>

			<FloatingTopButton onClick={scrollPageToTop} />
		</div>
	);
}
