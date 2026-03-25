import "@/styles/components/ActionLinks.css";
import type ActionLinksProps from "@/types/components/props/actionLinksProps.ts";

export default function ActionLinks({ links }: ActionLinksProps) {
	return (
		<div className="hero-actions">
			{links.map(link => (
				<a key={link.href} href={link.href} className={`btn btn-${link.variant}`}>
					{link.label}
				</a>
			))}
		</div>
	);
}
