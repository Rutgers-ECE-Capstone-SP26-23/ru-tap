import type { ReactNode } from "react";

type PanelCardProps = Readonly<{
	title: string;
	titleLevel?: 2 | 3;
	className?: string;
	as?: "article" | "div";
	children: ReactNode;
}>;

export type { PanelCardProps as default };
