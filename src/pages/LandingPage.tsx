import FloatingTopButton from "@/components/landing/FloatingTopButton.tsx";
import PanelCard from "@/components/layout/PanelCard.tsx";
import SectionBlock from "@/components/layout/SectionBlock.tsx";
import "@/styles/pages/landingPage.css";
import type Pillar from "@/types/content/pillar.ts";
import { withBasePath } from "@/utils/basePath.ts";
import scrollPageToTop from "@/utils/scrollToTop.ts";

type CoreExperienceCard = Readonly<{
	cta: string;
	description: string;
	href: string;
	highlight: string;
	title: string;
}>;

const pillars: readonly Pillar[] = [
	{
		title: "See what matters next",
		description: "Move from classes to commuting to room details without losing context between tools."
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

const coreExperienceCards: readonly CoreExperienceCard[] = [
	{
		title: "Academics",
		description:
			"Search courses, compare planning tools, and keep the next Rutgers registration step close at hand.",
		href: withBasePath("/myrutgers"),
		highlight: "Know what matters before your next class or deadline.",
		cta: "Open myRutgers"
	},
	{
		title: "Transit and rideshare",
		description: "See which Rutgers buses are moving, pick a route, and check the next stop before you head out.",
		href: withBasePath("/transit"),
		highlight: "Get moving without guessing what the trip looks like.",
		cta: "Open Transit Board"
	},
	{
		title: "Maps and rooms",
		description:
			"Look up classrooms by campus, building, or room code and pull up the details you need before class.",
		href: withBasePath("/rooms"),
		highlight: "Spend less time orienting yourself and more time getting there.",
		cta: "Open Room Finder"
	}
] as const;

export default function LandingPage() {
	const currentYear = new Date().getFullYear();

	return (
		<div className="landing-page">
			<header className="hero" id="top">
				<div className="content-wrap">
					<p className="wordmark">RU Tap · Rutgers New Brunswick</p>
					<h1>One place for your Rutgers day.</h1>
					<p className="hero-subtext">RU Tap brings academics, transit, and maps into one cleaner flow.</p>
					<p className="hero-detail">
						Check what matters next, move faster between commitments, and spend less time stitching together
						disconnected Rutgers tools.
					</p>
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
				id="start"
				title="Core experiences"
				intro="Academics, transit, and room search are ready whenever you need them."
				headerClassName="section-head">
				<div className="pillar-grid">
					{coreExperienceCards.map(card => (
						<a key={card.title} className="landing-core-card-link" href={card.href}>
							<PanelCard title={card.title} className="landing-core-card">
								<p>
									{card.description}
									<br />
									<br />
									{card.highlight}
									<br />
									<br />
									<span className="landing-core-card-accent">{card.cta}</span>
								</p>
							</PanelCard>
						</a>
					))}
				</div>
			</SectionBlock>

			<SectionBlock as="footer" className="footer-cta" title="RU Tap is in active development.">
				<p>Built for Rutgers New Brunswick.</p>
				<p className="footer-copyright">
					© {currentYear} Chirag Baviskar, Ibrahim Abbasi, Kainath Haq, and Suraj Panicker.
				</p>
			</SectionBlock>

			<FloatingTopButton onClick={scrollPageToTop} />
		</div>
	);
}
