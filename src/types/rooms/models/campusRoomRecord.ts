import type RoomAddress from "@/types/rooms/models/roomAddress.ts";
import type RoomSeating from "@/types/rooms/models/roomSeating.ts";
import type RoomType from "@/types/rooms/models/roomType.ts";

type CampusRoomRecord = Readonly<{
	building: string;
	type: RoomType;
	capacity: number;
	address: RoomAddress;
	seating: RoomSeating;
}>;

export type { CampusRoomRecord as default };
