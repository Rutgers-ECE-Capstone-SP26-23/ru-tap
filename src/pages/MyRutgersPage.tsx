import ServiceButtonGrid from "@/components/myRutgers/ServiceButtonGrid.tsx";
import ServiceWidgetPanel from "@/components/myRutgers/ServiceWidgetPanel.tsx";
import { myRutgersServices } from "@/data/myRutgersServices.ts";
import { withBasePath } from "@/utils/basePath.ts";
import { useState } from "react";
import "@/styles/pages/myRutgersPage.css";

export default function MyRutgersPage() {
	const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
	const selectedService = myRutgersServices.find(service => service.id === selectedServiceId) ?? null;

	return (
		<div className="myrutgers-page">
			<div className="myrutgers-shell">
				<header className="myrutgers-header">
					<a className="myrutgers-home-link" href={withBasePath("/")}>
						RU Tap
					</a>
					<h1>RU Tap</h1>
					<p className="myrutgers-kicker">myRutgers academic preview</p>
					<p className="myrutgers-lead">
						Schedules, grades, holds, registration, and announcements in one calmer Rutgers flow.
					</p>
				</header>

				<main className="myrutgers-layout">
					<section className="service-grid-panel" aria-label="myRutgers service selector">
						<div className="service-grid-panel-head">
							<div>
								<h2>Services</h2>
								<p>Select the part of academics you need next.</p>
							</div>
							<p className="service-grid-panel-count">{myRutgersServices.length} services</p>
						</div>

						<ServiceButtonGrid
							services={myRutgersServices}
							selectedServiceId={selectedServiceId}
							onSelectService={setSelectedServiceId}
						/>
					</section>

					<ServiceWidgetPanel service={selectedService} />
				</main>
			</div>
		</div>
	);
}
