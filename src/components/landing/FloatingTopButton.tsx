import type { CSSProperties } from "react";
import "@/styles/components/FloatingTopButton.css";
import type FloatingTopButtonProps from "@/types/components/props/floatingTopButtonProps.ts";
import { withBasePath } from "@/utils/basePath.ts";

export default function FloatingTopButton({ onClick }: FloatingTopButtonProps) {
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
