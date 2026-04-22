import CourseSearchModule from "@/components/myRutgers/CourseSearchModule.tsx";
import WidgetPlaceholder from "@/components/myRutgers/WidgetPlaceholder.tsx";
import "@/styles/components/ServiceWidgetPanel.css";
import type ServiceWidgetPanelProps from "@/types/components/props/serviceWidgetPanelProps.ts";
import { useLayoutEffect, useRef } from "react";

export default function ServiceWidgetPanel({ service }: ServiceWidgetPanelProps) {
	const widgetPanelRef = useRef<HTMLElement | null>(null);

	useLayoutEffect(() => {
		const widgetPanel = widgetPanelRef.current;

		if (widgetPanel === null) {
			return;
		}

		const desktopMediaQuery = globalThis.matchMedia("(min-width: 980px)");

		const updateViewportAlignedMinHeight = () => {
			if (!desktopMediaQuery.matches) {
				widgetPanel.style.removeProperty("--widget-panel-min-height");
				return;
			}

			const viewportAlignedMinHeight = Math.max(
				360,
				Math.round(globalThis.innerHeight - widgetPanel.getBoundingClientRect().top)
			);

			widgetPanel.style.setProperty("--widget-panel-min-height", `${viewportAlignedMinHeight}px`);
		};

		const scheduleMinHeightUpdate = () => {
			globalThis.requestAnimationFrame(() => {
				updateViewportAlignedMinHeight();
			});
		};

		scheduleMinHeightUpdate();
		globalThis.addEventListener("resize", scheduleMinHeightUpdate);
		desktopMediaQuery.addEventListener("change", scheduleMinHeightUpdate);

		return () => {
			globalThis.removeEventListener("resize", scheduleMinHeightUpdate);
			desktopMediaQuery.removeEventListener("change", scheduleMinHeightUpdate);
		};
	}, []);

	if (!service)
		return (
			<section ref={widgetPanelRef} className="widget-panel" aria-label="Selected widget panel">
				<div className="widget-panel-empty">
					<p className="widget-panel-empty-label">Workspace</p>
					<h2>Choose a tool to get started.</h2>
					<p>The selected tool will open here.</p>
				</div>
			</section>
		);

	const widgetPanelBodyClassName =
		service.embedMode === "module" ? "widget-panel-body widget-panel-body-module" : "widget-panel-body";
	const isIframeService = service.embedMode === "iframe" && service.embedUrl !== undefined;

	return (
		<section ref={widgetPanelRef} className="widget-panel" aria-label="Selected widget panel">
			<header className="widget-panel-header">
				<div className="widget-panel-header-copy">
					<h2>{service.title}</h2>
					<p>{service.summary}</p>
				</div>
				{isIframeService ? (
					<a
						className="widget-panel-external-link"
						href={service.embedUrl}
						target="_blank"
						rel="noreferrer noopener">
						Open full page
					</a>
				) : null}
			</header>

			<div className={widgetPanelBodyClassName}>
				{service.embedMode === "iframe" && service.embedUrl ? (
					<iframe
						className="service-frame"
						title={`${service.title} Rutgers surface`}
						src={service.embedUrl}
						loading="lazy"
						referrerPolicy="no-referrer"
						sandbox="allow-forms allow-modals allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
					/>
				) : service.embedMode === "module" && service.module === "course-search" ? (
					<CourseSearchModule />
				) : (
					<WidgetPlaceholder service={service} />
				)}
			</div>
		</section>
	);
}
