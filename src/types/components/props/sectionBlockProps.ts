import type { ReactNode } from "react";

type SectionBlockProps = Readonly<{
	as?: "section" | "footer";
	id?: string;
	className?: string;
	contentClassName?: string;
	title?: string;
	intro?: string;
	headerClassName?: string;
	children: ReactNode;
}>;

export type { SectionBlockProps as default };
