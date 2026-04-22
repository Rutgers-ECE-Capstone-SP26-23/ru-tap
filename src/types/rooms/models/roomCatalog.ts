import type CampusRoomRecord from "@/types/rooms/models/campusRoomRecord.ts";
import type RoomCampus from "@/types/rooms/models/roomCampus.ts";

type RoomCatalog = Readonly<Record<RoomCampus, Readonly<Record<string, CampusRoomRecord>>>>;

export type { RoomCatalog as default };
