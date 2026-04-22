import type CampusRoomRecord from "@/types/rooms/models/campusRoomRecord.ts";
import type RoomCampus from "@/types/rooms/models/roomCampus.ts";

type RoomRecord = Readonly<CampusRoomRecord & { campus: RoomCampus }>;

export type { RoomRecord as default };
