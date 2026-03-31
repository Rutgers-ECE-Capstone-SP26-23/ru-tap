import { useState } from "react";
import RoomsDetailsPanel from "@/components/rooms/RoomsDetailsPanel.tsx";
import RoomsDirectoryTable from "@/components/rooms/RoomsDirectoryTable.tsx";
import RoomsMetricCard from "@/components/rooms/RoomsMetricCard.tsx";
import { roomsByCampus } from "@/data/rooms.ts";
import "@/styles/pages/roomsPage.css";
import type RoomCampus from "@/types/rooms/models/roomCampus.ts";
import type RoomListing from "@/types/rooms/models/roomListing.ts";
import type RoomSortDirection from "@/types/rooms/pages/roomSortDirection.ts";
import type RoomSortKey from "@/types/rooms/pages/roomSortKey.ts";
import { withBasePath } from "@/utils/basePath.ts";

const campusOrder = Object.keys(roomsByCampus) as RoomCampus[];

const roomListings: readonly RoomListing[] = campusOrder.flatMap(campus => {
	const campusRooms = roomsByCampus[campus];
	return Object.entries(campusRooms).map(([roomCode, room]) => ({
		roomCode,
		campus,
		...room
	}));
});

const totalBuildings = new Set(roomListings.map(room => room.building)).size;
const largestRoom = roomListings.reduce<RoomListing | null>(
	(largestRoomSoFar, currentRoom) =>
		largestRoomSoFar === null || currentRoom.capacity > largestRoomSoFar.capacity ? currentRoom : largestRoomSoFar,
	null
);
const stringCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

function matchesRoomQuery(room: RoomListing, normalizedQuery: string) {
	return (
		normalizedQuery === "" ||
		[
			room.roomCode,
			room.building,
			room.type,
			room.seating,
			room.address.street,
			room.address.city,
			room.address.zip,
			room.campus
		]
			.join(" ")
			.toLowerCase()
			.includes(normalizedQuery)
	);
}

function formatCampusButtonLabel(campus: RoomCampus) {
	return `${campus} · ${Object.keys(roomsByCampus[campus]).length}`;
}

function sortRooms(rooms: readonly RoomListing[], sortKey: RoomSortKey, sortDirection: RoomSortDirection) {
	const directionMultiplier = sortDirection === "asc" ? 1 : -1;

	return [...rooms].sort((leftRoom, rightRoom) => {
		let comparison = 0;

		switch (sortKey) {
			case "building":
				comparison = stringCollator.compare(leftRoom.building, rightRoom.building);
				break;
			case "campus":
				comparison = stringCollator.compare(leftRoom.campus, rightRoom.campus);
				break;
			case "capacity":
				comparison = leftRoom.capacity - rightRoom.capacity;
				break;
			case "roomCode":
			default:
				comparison = stringCollator.compare(leftRoom.roomCode, rightRoom.roomCode);
				break;
		}

		return (comparison || stringCollator.compare(leftRoom.roomCode, rightRoom.roomCode)) * directionMultiplier;
	});
}
export default function RoomsPage() {
	const [selectedCampus, setSelectedCampus] = useState<RoomCampus | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [sortKey, setSortKey] = useState<RoomSortKey>("roomCode");
	const [sortDirection, setSortDirection] = useState<RoomSortDirection>("asc");
	const [selectedRoomCode, setSelectedRoomCode] = useState<RoomListing["roomCode"] | null>(
		roomListings[0]?.roomCode ?? null
	);
	const [mapChooserRoomCode, setMapChooserRoomCode] = useState<RoomListing["roomCode"] | null>(null);
	const normalizedQuery = searchQuery.trim().toLowerCase();
	const filteredRooms = roomListings.filter(
		room => (selectedCampus === null || room.campus === selectedCampus) && matchesRoomQuery(room, normalizedQuery)
	);
	const sortedRooms = sortRooms(filteredRooms, sortKey, sortDirection);
	const selectedRoom = sortedRooms.find(room => room.roomCode === selectedRoomCode) ?? sortedRooms[0] ?? null;
	const visibleBuildings = new Set(filteredRooms.map(room => room.building)).size;
	const campusLabel = selectedCampus ?? "All campuses";

	const clearFilters = () => {
		setSearchQuery("");
		setSelectedCampus(null);
		setMapChooserRoomCode(null);
	};
	const handleSort = (nextSortKey: RoomSortKey) => {
		if (sortKey === nextSortKey) {
			setSortDirection(currentDirection => (currentDirection === "asc" ? "desc" : "asc"));
			return;
		}

		setSortKey(nextSortKey);
		setSortDirection("asc");
	};

	return (
		<div className="rooms-page">
			<div className="rooms-shell">
				<header className="rooms-hero">
					<div className="rooms-hero-copy">
						<a className="rooms-home-link" href={withBasePath("/")}>
							RU Tap
						</a>
						<p className="rooms-eyebrow">Maps and rooms preview</p>
						<h1>Find a classroom faster.</h1>
						<p className="rooms-lead">
							Search Rutgers New Brunswick teaching spaces by campus, building, or room code.
						</p>
						<p className="rooms-supporting-copy">
							This first room finder pass keeps the classroom directory in one cleaner flow, with room
							details and a quick jump out to maps when you need it.
						</p>
					</div>

					<div className="rooms-metric-grid" aria-label="Room finder overview">
						<RoomsMetricCard label="Rooms in scope" value={roomListings.length} />
						<RoomsMetricCard label="Buildings" value={totalBuildings} />
						<RoomsMetricCard label="Campuses" value={campusOrder.length} />
						<RoomsMetricCard label="Largest room" value={largestRoom?.capacity ?? "—"} />
					</div>
				</header>

				<main className="rooms-layout">
					<section className="rooms-directory" aria-label="Classroom finder">
						<div className="rooms-panel-head">
							<div>
								<p className="rooms-card-label">Classroom finder</p>
								<h2>Browse the directory</h2>
							</div>
							<div className="rooms-results-meta">
								<strong>{filteredRooms.length}</strong>
								<span>showing</span>
							</div>
						</div>

						<div className="rooms-search-bar">
							<label className="rooms-search-label" htmlFor="rooms-search">
								Search rooms
							</label>
							<input
								id="rooms-search"
								className="rooms-search-input"
								type="search"
								placeholder="Try ARC-103, Murray Hall, Busch, lecture hall..."
								value={searchQuery}
								onChange={event => setSearchQuery(event.target.value)}
							/>
						</div>

						<div className="rooms-campus-filter" aria-label="Campus filter">
							<button
								type="button"
								className={selectedCampus === null ? "rooms-campus-chip selected" : "rooms-campus-chip"}
								onClick={() => setSelectedCampus(null)}>
								All campuses · {roomListings.length}
							</button>
							{campusOrder.map(campus => (
								<button
									key={campus}
									type="button"
									className={
										selectedCampus === campus ? "rooms-campus-chip selected" : "rooms-campus-chip"
									}
									onClick={() => setSelectedCampus(campus)}>
									{formatCampusButtonLabel(campus)}
								</button>
							))}
						</div>

						<RoomsDirectoryTable
							rooms={sortedRooms}
							selectedRoomCode={selectedRoom?.roomCode ?? null}
							sortKey={sortKey}
							sortDirection={sortDirection}
							searchQuery={searchQuery}
							campusLabel={campusLabel}
							onSort={handleSort}
							onSelectRoom={roomCode => {
								setSelectedRoomCode(roomCode);
								setMapChooserRoomCode(null);
							}}
							onClearFilters={clearFilters}
						/>
					</section>

					<RoomsDetailsPanel
						selectedRoom={selectedRoom}
						filteredRoomCount={filteredRooms.length}
						visibleBuildings={visibleBuildings}
						isMapChooserOpen={mapChooserRoomCode === selectedRoom?.roomCode}
						onToggleMapChooser={() =>
							setMapChooserRoomCode(currentValue =>
								currentValue === selectedRoom?.roomCode ? null : (selectedRoom?.roomCode ?? null)
							)
						}
						onCloseMapChooser={() => setMapChooserRoomCode(null)}
					/>
				</main>
			</div>
		</div>
	);
}
