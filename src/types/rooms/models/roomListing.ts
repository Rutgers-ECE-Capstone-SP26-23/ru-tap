import type RoomCode from "@/types/rooms/models/roomCode.ts";
import type RoomRecord from "@/types/rooms/models/roomRecord.ts";

/**
 * Flattened room directory row with its room code attached.
 */
type RoomListing = Readonly<{ roomCode: RoomCode } & RoomRecord>;

export type { RoomListing as default };
