import type RoomsDirectoryRowProps from "@/types/rooms/props/roomsDirectoryRowProps.ts";

export default function RoomsDirectoryRow({ room, isSelected, onSelectRoom }: RoomsDirectoryRowProps) {
	const className = isSelected ? "rooms-row selected" : "rooms-row";

	return (
		<button type="button" className={className} onClick={() => onSelectRoom(room.roomCode)}>
			<div className="rooms-row-code">
				<strong>{room.roomCode}</strong>
				<span>{room.type}</span>
			</div>
			<div className="rooms-row-building">
				<strong>{room.building}</strong>
				<span>{room.seating}</span>
			</div>
			<div className="rooms-row-campus" title={room.campus}>
				{room.campus}
			</div>
			<div className="rooms-row-capacity">{room.capacity}</div>
		</button>
	);
}
