import type RoomListing from "@/types/rooms/models/roomListing.ts";
import type RoomsDetailsPanelProps from "@/types/rooms/props/roomsDetailsPanelProps.ts";

function buildRoomMapHref(room: RoomListing) {
	return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
		`${room.building} ${room.roomCode}, ${room.address.street}, ${room.address.city}, ${room.address.state} ${room.address.zip}`
	)}`;
}

function buildAppleMapsHref(room: RoomListing) {
	return `https://maps.apple.com/?q=${encodeURIComponent(
		`${room.building} ${room.roomCode}, ${room.address.street}, ${room.address.city}, ${room.address.state} ${room.address.zip}`
	)}`;
}

export default function RoomsDetailsPanel({
	detailsRef,
	selectedRoom,
	filteredRoomCount,
	visibleBuildings,
	isMapChooserOpen,
	onToggleMapChooser,
	onCloseMapChooser
}: RoomsDetailsPanelProps) {
	return (
		<div ref={detailsRef} className="rooms-details-stack">
			<aside className="rooms-details-panel" aria-label="Selected classroom">
				{selectedRoom ? (
					<>
						<header className="rooms-details-head">
							<div>
								<p className="rooms-card-label">Classroom details</p>
								<h2>{selectedRoom.roomCode}</h2>
								<p className="rooms-details-building">{selectedRoom.building}</p>
							</div>
							<div className="rooms-details-badge">{selectedRoom.campus}</div>
						</header>

						<div className="rooms-detail-grid">
							<article className="rooms-detail-card">
								<p className="rooms-card-label">Room snapshot</p>
								<dl className="rooms-detail-list">
									<div>
										<dt>Campus</dt>
										<dd>{selectedRoom.campus}</dd>
									</div>
									<div>
										<dt>Room style</dt>
										<dd>{selectedRoom.type}</dd>
									</div>
									<div>
										<dt>Seating</dt>
										<dd>{selectedRoom.seating}</dd>
									</div>
									<div>
										<dt>Capacity</dt>
										<dd>{selectedRoom.capacity} seats</dd>
									</div>
								</dl>
							</article>

							<article className="rooms-detail-card rooms-location-card">
								<p className="rooms-card-label">Location</p>
								<h3>{selectedRoom.address.street}</h3>
								<p className="rooms-address-line">
									{selectedRoom.address.city}, {selectedRoom.address.state} {selectedRoom.address.zip}
								</p>
								<button type="button" className="rooms-map-link" onClick={onToggleMapChooser}>
									Open in Maps
								</button>
								{isMapChooserOpen ? (
									<dialog className="rooms-map-chooser" open aria-label="Choose a maps app">
										<p className="rooms-map-chooser-label">Open with</p>
										<div className="rooms-map-chooser-actions">
											<a
												className="rooms-map-choice"
												href={buildRoomMapHref(selectedRoom)}
												target="_blank"
												rel="noreferrer"
												onClick={onCloseMapChooser}>
												Google Maps
											</a>
											<a
												className="rooms-map-choice"
												href={buildAppleMapsHref(selectedRoom)}
												target="_blank"
												rel="noreferrer"
												onClick={onCloseMapChooser}>
												Apple Maps
											</a>
										</div>
									</dialog>
								) : null}
							</article>
						</div>
					</>
				) : (
					<div className="rooms-empty-state">
						<p className="rooms-card-label">No room selected</p>
						<h3>Pick a classroom to see the details.</h3>
						<p>Search or switch campuses to narrow the directory, then open a room from the list.</p>
					</div>
				)}
			</aside>

			<section className="rooms-directory-summary-panel" aria-label="Directory summary">
				<p className="rooms-card-label">Directory</p>
				<p>
					{filteredRoomCount} room{filteredRoomCount === 1 ? "" : "s"} in {visibleBuildings} building
					{visibleBuildings === 1 ? "" : "s"} match the current filters.
				</p>
				<p className="rooms-detail-note">
					Source:
					<br />
					Rutgers Digital Classroom Services
				</p>
			</section>
		</div>
	);
}
