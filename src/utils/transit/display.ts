import type { CSSProperties } from "react";
import type TransitRoute from "@/types/transit/models/transitRoute.ts";

const timeFormatter = new Intl.DateTimeFormat("en-US", {
	hour: "numeric",
	minute: "2-digit"
});

function withAlpha(color: string, alphaHex: string) {
	return `${color}${alphaHex}`;
}

/**
 * Formats a timestamp for compact schedule and refresh labels.
 */
export function formatShortTime(value: string | number) {
	return timeFormatter.format(new Date(value));
}

/**
 * Converts a Passio ETA timestamp into a user-facing minutes-until-arrival label.
 */
export function formatEta(etaMs: number) {
	const minutesUntilArrival = Math.max(0, Math.round((etaMs - Date.now()) / 60_000));
	if (minutesUntilArrival <= 0) return "Due";
	if (minutesUntilArrival === 1) return "1 min";
	return `${minutesUntilArrival} min`;
}

/**
 * Converts a numeric vehicle heading into a compass direction label.
 */
export function formatHeading(heading: number) {
	const compassDirections = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
	const directionIndex = Math.round((((heading % 360) + 360) % 360) / 45) % compassDirections.length;

	return `${compassDirections[directionIndex]} · ${Math.round(heading)}°`;
}

/**
 * Normalizes Passio run numbers by removing leading zeroes from numeric spans.
 */
export function formatBusNumber(runNumber: string) {
	return runNumber.replaceAll(/\d+/g, digits => `${Number.parseInt(digits, 10)}`);
}

/**
 * Removes the redundant "Route" suffix from route titles in compact UI labels.
 */
export function formatRouteDisplayName(routeName: string) {
	return routeName.replace(/\s+Route$/, "");
}

/**
 * Builds route-colored CSS custom styles for a selectable route button.
 */
export function getRouteButtonStyle(route: TransitRoute, isSelected: boolean): CSSProperties {
	return {
		background: isSelected ? withAlpha(route.color, "1C") : withAlpha(route.color, "0F"),
		borderColor: isSelected ? route.color : withAlpha(route.color, "52")
	};
}

/**
 * Builds the solid route-color treatment used for small route badges.
 */
export function getRouteBadgeStyle(route: TransitRoute): CSSProperties {
	return {
		background: route.color,
		color: route.textColor
	};
}

/**
 * Builds the route-colored panel accent for the selected-route details view.
 */
export function getRoutePanelStyle(route: TransitRoute): CSSProperties {
	return {
		background: `linear-gradient(180deg, ${withAlpha(route.color, "1F")} 0%, rgba(255, 255, 255, 0.04) 220px)`,
		borderColor: withAlpha(route.color, "5C")
	};
}
