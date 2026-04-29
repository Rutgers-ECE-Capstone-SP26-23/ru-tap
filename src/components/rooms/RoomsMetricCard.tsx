import type RoomsMetricCardProps from "@/types/rooms/props/roomsMetricCardProps.ts";

/**
 * Compact metric tile for the rooms page overview.
 */
export default function RoomsMetricCard({ label, value }: RoomsMetricCardProps) {
	return (
		<article className="rooms-metric-card">
			<p className="rooms-metric-label">{label}</p>
			<p className="rooms-metric-value">{value}</p>
		</article>
	);
}
