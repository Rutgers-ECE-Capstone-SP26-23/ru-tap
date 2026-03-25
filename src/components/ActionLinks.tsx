import "@/styles/ActionLinks.css";

type ActionLink = {
	href: string;
	label: string;
	variant: "primary" | "secondary";
};

type ActionLinksProps = Readonly<{
	links: readonly ActionLink[];
}>;

export function ActionLinks({ links }: ActionLinksProps) {
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
