import type { ReactNode } from "react";
import "@/styles/PanelCard.css";

type PanelCardProps = Readonly<{
	title: string;
	titleLevel?: 2 | 3;
	className?: string;
	as?: "article" | "div";
	children: ReactNode;
}>;

export function PanelCard({ title, titleLevel = 3, className, as = "article", children }: PanelCardProps) {
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
