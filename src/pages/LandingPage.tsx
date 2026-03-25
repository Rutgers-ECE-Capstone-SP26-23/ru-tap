import { ActionLinks } from "@/components/ActionLinks.tsx";
import { CoreExperienceCard } from "@/components/CoreExperienceCard.tsx";
import { FloatingTopButton } from "@/components/FloatingTopButton.tsx";
import { PanelCard } from "@/components/PanelCard.tsx";
import { SectionBlock } from "@/components/SectionBlock.tsx";
import "@/styles/App.css";
import type { DomainCard } from "@/types/DomainCard.ts";
import type { Pillar } from "@/types/Pillar.ts";
import { withBasePath } from "@/utils/basePath.ts";

const pillars: readonly Pillar[] = [
	{
		title: "See what matters next",
		description: "Move from classes to commuting to career steps without losing context between tools."
	},
	{
		title: "Move faster through the day",
		description: "Get the next piece of Rutgers information you need without bouncing through separate portals."
	},
	{
		title: "Built around real routines",
		description: "RU Tap is shaped around the moments when timing, location, and deadlines all hit at once."
	}
];

const domains: readonly DomainCard[] = [
	{
		title: "Academics",
		description: "Keep schedules, grades, holds, and registration details close at hand.",
		highlight: "Know what matters before your next class or deadline."
	},
	{
		title: "Transit and Rideshare",
		description: "Check buses, route options, and alternatives before you head out.",
		highlight: "Get moving without guessing what the trip looks like."
	},
	{
		title: "Maps and Rooms",
		description: "Find buildings, rooms, and nearby spaces faster across campus.",
		highlight: "Spend less time orienting yourself and more time getting there."
	},
	{
		title: "Careers",
		description: "Keep internships, jobs, and events visible alongside the rest of your Rutgers day.",
		highlight: "Make opportunities easier to act on while everything else is happening."
	}
];

const heroLinks = [
	{ href: withBasePath("/myrutgers"), label: "Open myRutgers", variant: "primary" },
	{ href: "#domains", label: "Explore Features", variant: "secondary" }
] as const;

const launchLinks = [
	{ href: withBasePath("/transit"), label: "Open Transit", variant: "primary" },
	{ href: withBasePath("/myrutgers"), label: "Open myRutgers", variant: "secondary" }
] as const;

export default function LandingPage() {
	const currentYear = new Date().getFullYear();

	const handleScrollToTop = () => {
		const prefersReducedMotion = globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
		globalThis.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
	};

	return (
		<div className="landing-page">
			<header className="hero" id="top">
				<div className="content-wrap">
					<p className="wordmark">RU Tap · Rutgers New Brunswick</p>
					<h1>One place for your Rutgers day.</h1>
					<p className="hero-subtext">
						RU Tap brings academics, transit, maps, and careers into one cleaner flow.
					</p>
					<p className="hero-detail">
						Check what matters next, move faster between commitments, and spend less time stitching together
						disconnected Rutgers tools.
					</p>
					<ActionLinks links={heroLinks} />
				</div>
			</header>

			<SectionBlock id="pillars" title="Why RU Tap">
				<div className="pillar-grid">
					{pillars.map(pillar => (
						<PanelCard key={pillar.title} title={pillar.title}>
							<p>{pillar.description}</p>
						</PanelCard>
					))}
				</div>
			</SectionBlock>

			<SectionBlock
				id="domains"
				title="Core Experiences"
				intro="RU Tap is designed to keep the most common Rutgers workflows in one consistent product experience."
				headerClassName="section-head">
				<div className="domain-grid">
					{domains.map(domain => (
						<CoreExperienceCard key={domain.title} {...domain} />
					))}
				</div>
			</SectionBlock>

			<SectionBlock
				id="start"
				title="Open the previews"
				intro="Transit and academics are the first two live surfaces in the current RU Tap prototype."
				headerClassName="section-head">
				<div className="launch-grid">
					<PanelCard title="Transit preview" className="accent-panel" as="div">
						<p>
							Open the Rutgers bus board to see live New Brunswick routes, next-stop predictions, and a
							cleaner filtered route list.
						</p>
					</PanelCard>
					<PanelCard title="myRutgers preview" as="div">
						<p>
							Open the academic preview to browse schedules, grades, holds, registration, and
							announcements in the same RU Tap flow.
						</p>
					</PanelCard>
				</div>
				<ActionLinks links={launchLinks} />
			</SectionBlock>

			<SectionBlock as="footer" className="footer-cta" title="RU Tap is in active development.">
				<p>Built for Rutgers New Brunswick.</p>
				<p className="footer-copyright">
					© {currentYear} Chirag Baviskar, Ibrahim Abbasi, Kainath Haq, and Suraj Panicker.
				</p>
			</SectionBlock>

			<FloatingTopButton onClick={handleScrollToTop} />
		</div>
	);
}
