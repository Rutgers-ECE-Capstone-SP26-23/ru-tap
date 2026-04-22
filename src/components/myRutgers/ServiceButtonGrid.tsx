import ServiceButtonCard from "@/components/myRutgers/ServiceButtonCard.tsx";
import "@/styles/components/ServiceButtonGrid.css";
import type ServiceButtonGridProps from "@/types/components/props/serviceButtonGridProps.ts";

export default function ServiceButtonGrid({
	layout,
	services,
	selectedServiceId,
	onSelectService
}: ServiceButtonGridProps) {
	const gridClassName =
		layout === "horizontal" ? "service-grid service-grid-horizontal" : "service-grid service-grid-vertical";

	return (
		<div className={gridClassName}>
			{services.map(service => (
				<ServiceButtonCard
					key={service.id}
					service={service}
					isSelected={service.id === selectedServiceId}
					onSelect={onSelectService}
				/>
			))}
		</div>
	);
}
