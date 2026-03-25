import ServiceButtonCard from "@/components/myRutgers/ServiceButtonCard.tsx";
import "@/styles/components/ServiceButtonGrid.css";
import type ServiceButtonGridProps from "@/types/components/props/serviceButtonGridProps.ts";

export default function ServiceButtonGrid({ services, selectedServiceId, onSelectService }: ServiceButtonGridProps) {
	return (
		<div className="service-grid">
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
