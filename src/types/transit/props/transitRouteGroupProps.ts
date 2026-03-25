import type { ReactNode } from "react";

type TransitRouteGroupProps = Readonly<{
	label: string;
	metaLabel: string;
	isExpanded: boolean;
	hasVisibleContent: boolean;
	onToggle: () => void;
	hasPeekContent?: boolean;
	peekChildren?: ReactNode;
	children: ReactNode;
}>;

export type { TransitRouteGroupProps as default };
