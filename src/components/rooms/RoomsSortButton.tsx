import type RoomsSortButtonProps from "@/types/rooms/props/roomsSortButtonProps.ts";

function getSortIndicatorClassName({
	buttonSortKey,
	currentSortDirection,
	currentSortKey
}: Pick<RoomsSortButtonProps, "buttonSortKey" | "currentSortDirection" | "currentSortKey">) {
	return currentSortKey === buttonSortKey ? `rooms-sort-indicator ${currentSortDirection}` : "rooms-sort-indicator";
}

export default function RoomsSortButton({
	label,
	buttonSortKey,
	currentSortKey,
	currentSortDirection,
	onSort
}: RoomsSortButtonProps) {
	const className = currentSortKey === buttonSortKey ? "rooms-sort-button selected" : "rooms-sort-button";

	return (
		<button type="button" className={className} onClick={() => onSort(buttonSortKey)}>
			<span className="rooms-sort-button-label">{label}</span>
			<span
				className={getSortIndicatorClassName({
					buttonSortKey,
					currentSortDirection,
					currentSortKey
				})}
				aria-hidden="true"
			/>
		</button>
	);
}
