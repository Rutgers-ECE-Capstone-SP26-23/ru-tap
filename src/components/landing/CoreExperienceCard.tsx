import PanelCard from "@/components/layout/PanelCard.tsx";
import "@/styles/components/CoreExperienceCard.css";
import type CoreExperienceCardProps from "@/types/components/props/coreExperienceCardProps.ts";

export default function CoreExperienceCard({ title, description, highlight }: CoreExperienceCardProps) {
	return (
		<PanelCard title={title} className="domain-card" as="article">
			<p>{description}</p>
			<p className="domain-highlight">{highlight}</p>
		</PanelCard>
	);
}
