import type RoomSortDirection from "@/types/rooms/pages/roomSortDirection.ts";
import type RoomSortKey from "@/types/rooms/pages/roomSortKey.ts";

type RoomsSortButtonProps = Readonly<{
	label: string;
	buttonSortKey: RoomSortKey;
	currentSortKey: RoomSortKey;
	currentSortDirection: RoomSortDirection;
	onSort: (sortKey: RoomSortKey) => void;
}>;

export type { RoomsSortButtonProps as default };
