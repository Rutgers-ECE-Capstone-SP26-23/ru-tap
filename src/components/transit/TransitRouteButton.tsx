import type TransitRouteButtonProps from "@/types/transit/props/transitRouteButtonProps.ts";
import { getRouteBadgeStyle, getRouteButtonStyle } from "@/utils/transit/display.ts";

export default function TransitRouteButton({ route, isSelected, onSelect }: TransitRouteButtonProps) {
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
