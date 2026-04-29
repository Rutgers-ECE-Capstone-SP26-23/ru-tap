import type TransitBus from "@/types/transit/models/transitBus.ts";

/**
 * Props for a single vehicle card in a transit route detail panel.
 */
type TransitBusCardProps = Readonly<{
	bus: TransitBus;
}>;

export type { TransitBusCardProps as default };
