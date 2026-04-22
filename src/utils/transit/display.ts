import type { CSSProperties } from "react";
import type TransitRoute from "@/types/transit/models/transitRoute.ts";

const timeFormatter = new Intl.DateTimeFormat("en-US", {
	hour: "numeric",
	minute: "2-digit"
});

function withAlpha(color: string, alphaHex: string) {
	return `${color}${alphaHex}`;
}

export function formatShortTime(value: string | number) {
	return timeFormatter.format(new Date(value));
}

export function formatEta(etaMs: number) {
	const minutesUntilArrival = Math.max(0, Math.round((etaMs - Date.now()) / 60_000));
	if (minutesUntilArrival <= 0) return "Due";
	if (minutesUntilArrival === 1) return "1 min";
	return `${minutesUntilArrival} min`;
}

export function formatHeading(heading: number) {
	const compassDirections = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
	const directionIndex = Math.round((((heading % 360) + 360) % 360) / 45) % compassDirections.length;

	return `${compassDirections[directionIndex]} · ${Math.round(heading)}°`;
}

export function formatBusNumber(runNumber: string) {
	return runNumber.replaceAll(/\d+/g, digits => `${Number.parseInt(digits, 10)}`);
}

export function formatRouteDisplayName(routeName: string) {
	return routeName.replace(/\s+Route$/, "");
}

export function getRouteButtonStyle(route: TransitRoute, isSelected: boolean): CSSProperties {
	return {
		background: isSelected ? withAlpha(route.color, "1C") : withAlpha(route.color, "0F"),
		borderColor: isSelected ? route.color : withAlpha(route.color, "52")
	};
}

export function getRouteBadgeStyle(route: TransitRoute): CSSProperties {
	return {
		background: route.color,
		color: route.textColor
	};
}

export function getRoutePanelStyle(route: TransitRoute): CSSProperties {
	return {
		background: `linear-gradient(180deg, ${withAlpha(route.color, "1F")} 0%, rgba(255, 255, 255, 0.04) 220px)`,
		borderColor: withAlpha(route.color, "5C")
	};
}
