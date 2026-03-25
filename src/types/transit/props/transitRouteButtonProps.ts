import type TransitRoute from "@/types/transit/models/transitRoute.ts";

type TransitRouteButtonProps = Readonly<{
	route: TransitRoute;
	isSelected: boolean;
	onSelect: (routeId: string) => void;
}>;

export type { TransitRouteButtonProps as default };
