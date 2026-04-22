import type RoomCatalog from "@/types/rooms/models/roomCatalog.ts";

type RoomCode<TRoomCatalog extends RoomCatalog = RoomCatalog> = {
	[Campus in keyof TRoomCatalog]: keyof TRoomCatalog[Campus];
}[keyof TRoomCatalog];

export type { RoomCode as default };
