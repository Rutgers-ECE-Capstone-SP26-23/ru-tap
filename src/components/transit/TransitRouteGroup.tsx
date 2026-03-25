import type TransitRouteGroupProps from "@/types/transit/props/transitRouteGroupProps.ts";

export default function TransitRouteGroup({
	label,
	metaLabel,
	isExpanded,
	hasVisibleContent,
	onToggle,
	hasPeekContent = false,
	peekChildren,
	children
}: TransitRouteGroupProps) {
	let panelClassName = "transit-route-group-panel";

	if (hasVisibleContent) {
		panelClassName = isExpanded ? "transit-route-group-panel expanded" : "transit-route-group-panel visible";
	}

	const chevronClassName = isExpanded ? "transit-route-group-chevron expanded" : "transit-route-group-chevron";

	return (
		<div className="transit-route-group">
			<button type="button" className="transit-route-group-toggle" onClick={onToggle}>
				<span className="transit-card-label">{label}</span>
				<span className="transit-route-group-meta">
					<span className="transit-route-group-count">{metaLabel}</span>
					<span className={chevronClassName} aria-hidden="true">
						▾
					</span>
				</span>
			</button>
			{hasPeekContent ? <div className="transit-route-group-peek">{peekChildren}</div> : null}
			<div className={panelClassName}>{children}</div>
		</div>
	);
}
