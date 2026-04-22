import "@/styles/components/ServiceButtonCard.css";
import type ServiceButtonCardProps from "@/types/components/props/serviceButtonCardProps.ts";

export default function ServiceButtonCard({ service, isSelected, onSelect }: ServiceButtonCardProps) {
	const buttonClassName = isSelected ? "service-button selected" : "service-button";

	const handleClick = () => onSelect(service.id);

	return (
		<button type="button" className={buttonClassName} onClick={handleClick} aria-pressed={isSelected}>
			<span className="service-title">{service.title}</span>
			<span className="service-summary">{service.summary}</span>
		</button>
	);
}
