import type { MyRutgersService } from "@/types/myRutgers.ts";
import "@/styles/ServiceButtonCard.css";

type ServiceButtonCardProps = Readonly<{
	service: MyRutgersService;
	isSelected: boolean;
	onSelect: (serviceId: string) => void;
}>;

export function ServiceButtonCard({ service, isSelected, onSelect }: ServiceButtonCardProps) {
	const buttonClassName = isSelected ? "service-button selected" : "service-button";
	const serviceStatusClassName = service.status === "ready" ? "service-status ready" : "service-status planned";

	const handleClick = () => {
		onSelect(service.id);
	};

	return (
		<button type="button" className={buttonClassName} onClick={handleClick} aria-pressed={isSelected}>
			<span className="service-title">{service.title}</span>
			<span className="service-summary">{service.summary}</span>
			<span className={serviceStatusClassName}>{service.status}</span>
		</button>
	);
}
