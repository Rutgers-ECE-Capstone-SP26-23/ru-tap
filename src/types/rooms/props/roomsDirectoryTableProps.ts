import type RoomListing from "@/types/rooms/models/roomListing.ts";
import type RoomSortDirection from "@/types/rooms/pages/roomSortDirection.ts";
import type RoomSortKey from "@/types/rooms/pages/roomSortKey.ts";

type RoomsDirectoryTableProps = Readonly<{
	rooms: readonly RoomListing[];
	selectedRoomCode: RoomListing["roomCode"] | null;
	sortKey: RoomSortKey;
	sortDirection: RoomSortDirection;
	searchQuery: string;
	campusLabel: string;
	onSort: (sortKey: RoomSortKey) => void;
	onSelectRoom: (roomCode: RoomListing["roomCode"]) => void;
	onClearFilters: () => void;
}>;

export type { RoomsDirectoryTableProps as default };
