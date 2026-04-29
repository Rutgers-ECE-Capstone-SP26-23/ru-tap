import type CampusRoomRecord from "@/types/rooms/models/campusRoomRecord.ts";
import type RoomCampus from "@/types/rooms/models/roomCampus.ts";

/**
 * Room catalog record once a campus grouping has been attached.
 */
type RoomRecord = Readonly<CampusRoomRecord & { campus: RoomCampus }>;

export type { RoomRecord as default };
