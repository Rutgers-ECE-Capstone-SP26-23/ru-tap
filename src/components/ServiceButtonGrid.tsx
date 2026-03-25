import { ServiceButtonCard } from "@/components/ServiceButtonCard.tsx";
import type { MyRutgersService } from "@/types/myRutgers.ts";
import "@/styles/ServiceButtonGrid.css";

type ServiceButtonGridProps = Readonly<{
	services: readonly MyRutgersService[];
	selectedServiceId: string | null;
	onSelectService: (serviceId: string) => void;
}>;

export function ServiceButtonGrid({ services, selectedServiceId, onSelectService }: ServiceButtonGridProps) {
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
