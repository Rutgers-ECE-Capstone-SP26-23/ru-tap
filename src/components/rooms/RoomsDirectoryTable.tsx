import RoomsDirectoryRow from "@/components/rooms/RoomsDirectoryRow.tsx";
import RoomsSortButton from "@/components/rooms/RoomsSortButton.tsx";
import type RoomSortKey from "@/types/rooms/pages/roomSortKey.ts";
import type RoomsDirectoryTableProps from "@/types/rooms/props/roomsDirectoryTableProps.ts";

const roomSortOrder = ["roomCode", "building", "campus", "capacity"] as const satisfies readonly RoomSortKey[];
const roomSortLabels = {
	roomCode: "Room",
	building: "Building",
	campus: "Campus",
	capacity: "Seats"
} as const satisfies Readonly<Record<RoomSortKey, string>>;

export default function RoomsDirectoryTable({
	rooms,
	selectedRoomCode,
	sortKey,
	sortDirection,
	searchQuery,
	campusLabel,
	onSort,
	onSelectRoom,
	onClearFilters
}: RoomsDirectoryTableProps) {
	return (
		<div className="rooms-table-panel">
			<div className="rooms-table-head">
				{roomSortOrder.map(currentSortKey => (
					<RoomsSortButton
						key={currentSortKey}
						label={roomSortLabels[currentSortKey]}
						buttonSortKey={currentSortKey}
						currentSortKey={sortKey}
						currentSortDirection={sortDirection}
						onSort={onSort}
					/>
				))}
			</div>

			{rooms.length > 0 ? (
				<div className="rooms-table-list">
					{rooms.map(room => (
						<RoomsDirectoryRow
							key={room.roomCode}
							room={room}
							isSelected={room.roomCode === selectedRoomCode}
							onSelectRoom={onSelectRoom}
						/>
					))}
				</div>
			) : (
				<div className="rooms-empty-state">
					<p className="rooms-card-label">No rooms found</p>
					<h3>Try a different search.</h3>
					<p>
						Nothing in the current classroom directory matches <code>{searchQuery}</code> on {campusLabel}.
					</p>
					<button type="button" className="rooms-reset-button" onClick={onClearFilters}>
						Clear filters
					</button>
				</div>
			)}
		</div>
	);
}
