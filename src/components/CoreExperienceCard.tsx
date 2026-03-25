import { PanelCard } from "@/components/PanelCard.tsx";
import "@/styles/CoreExperienceCard.css";

type CoreExperienceCardProps = Readonly<{
	title: string;
	description: string;
	highlight: string;
}>;

export function CoreExperienceCard({ title, description, highlight }: CoreExperienceCardProps) {
	return (
		<PanelCard title={title} className="domain-card" as="article">
			<p>{description}</p>
			<p className="domain-highlight">{highlight}</p>
		</PanelCard>
	);
}
