import "@/styles/components/PanelCard.css";
import type PanelCardProps from "@/types/components/props/panelCardProps.ts";

/**
 * Shared titled panel wrapper used by landing-page content sections.
 */
export default function PanelCard({ title, titleLevel = 3, className, as = "article", children }: PanelCardProps) {
	const Tag = as;
	const HeadingTag = titleLevel === 2 ? "h2" : "h3";
	const panelClassName = ["panel", className].filter(Boolean).join(" ");

	return (
		<Tag className={panelClassName}>
			<HeadingTag>{title}</HeadingTag>
			{children}
		</Tag>
	);
}
