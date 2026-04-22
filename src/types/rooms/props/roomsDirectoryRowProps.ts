import type RoomListing from "@/types/rooms/models/roomListing.ts";

type RoomsDirectoryRowProps = Readonly<{
	room: RoomListing;
	isSelected: boolean;
	onSelectRoom: (roomCode: RoomListing["roomCode"]) => void;
}>;

export type { RoomsDirectoryRowProps as default };
