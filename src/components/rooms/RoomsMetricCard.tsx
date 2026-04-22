import type RoomsMetricCardProps from "@/types/rooms/props/roomsMetricCardProps.ts";

export default function RoomsMetricCard({ label, value }: RoomsMetricCardProps) {
	return (
		<article className="rooms-metric-card">
			<p className="rooms-metric-label">{label}</p>
			<p className="rooms-metric-value">{value}</p>
		</article>
	);
}
