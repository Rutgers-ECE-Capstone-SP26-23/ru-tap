import type TransitMetricCardProps from "@/types/transit/props/transitMetricCardProps.ts";

export default function TransitMetricCard({ label, value }: TransitMetricCardProps) {
	return (
		<div className="transit-metric-card">
			<p className="transit-metric-label">{label}</p>
			<p className="transit-metric-value">{value}</p>
		</div>
	);
}
