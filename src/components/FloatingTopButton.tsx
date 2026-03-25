import type { CSSProperties } from "react";
import "@/styles/FloatingTopButton.css";
import { withBasePath } from "@/utils/basePath.ts";

type FloatingTopButtonProps = Readonly<{
	onClick: () => void;
}>;

export function FloatingTopButton({ onClick }: FloatingTopButtonProps) {
	return (
		<button
			type="button"
			className="floating-to-top"
			style={{ "--up-arrow-mask-url": `url("${withBasePath("/up-arrow.svg")}")` } as CSSProperties}
			aria-label="Back to top"
			onClick={onClick}>
			<span className="arrow-icon" aria-hidden="true"></span>
		</button>
	);
}
