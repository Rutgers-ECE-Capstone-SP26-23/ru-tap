import type { Ref } from "react";
import type RoomListing from "@/types/rooms/models/roomListing.ts";

type RoomsDetailsPanelProps = Readonly<{
	detailsRef?: Ref<HTMLDivElement>;
	selectedRoom: RoomListing | null;
	filteredRoomCount: number;
	visibleBuildings: number;
	isMapChooserOpen: boolean;
	onToggleMapChooser: () => void;
	onCloseMapChooser: () => void;
}>;

export type { RoomsDetailsPanelProps as default };
