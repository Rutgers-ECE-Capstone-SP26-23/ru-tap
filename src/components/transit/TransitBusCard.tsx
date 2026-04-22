import type TransitBusCardProps from "@/types/transit/props/transitBusCardProps.ts";
import { formatBusNumber, formatEta, formatHeading, formatShortTime } from "@/utils/transit/display.ts";

export default function TransitBusCard({ bus }: TransitBusCardProps) {
	const busNumber = formatBusNumber(bus.runNumber);

	return (
		<article className="transit-bus-card">
			<div className="transit-bus-card-head">
				<div>
					<p className="transit-card-label">Bus {busNumber}</p>
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
