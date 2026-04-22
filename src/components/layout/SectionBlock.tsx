import type { ReactNode } from "react";
import "@/styles/components/SectionBlock.css";
import type SectionBlockProps from "@/types/components/props/sectionBlockProps.ts";

export default function SectionBlock({
	as = "section",
	id,
	className,
	contentClassName,
	title,
	intro,
	headerClassName,
	children
}: SectionBlockProps) {
	const Tag = as;
	const sectionClassName = ["section", className].filter(Boolean).join(" ");
	const innerClassName = ["content-wrap", contentClassName].filter(Boolean).join(" ");
	let headerContent: ReactNode = null;

	if (title || intro)
		headerContent = (
			<>
				{title ? <h2>{title}</h2> : null}
				{intro ? <p>{intro}</p> : null}
			</>
		);

	if (headerContent && headerClassName) headerContent = <div className={headerClassName}>{headerContent}</div>;

	return (
		<Tag id={id} className={sectionClassName}>
			<div className={innerClassName}>
				{headerContent}
				{children}
			</div>
		</Tag>
	);
}
