import WidgetPlaceholder from "@/components/myRutgers/WidgetPlaceholder.tsx";
import "@/styles/components/ServiceWidgetPanel.css";
import type ServiceWidgetPanelProps from "@/types/components/props/serviceWidgetPanelProps.ts";

export default function ServiceWidgetPanel({ service }: ServiceWidgetPanelProps) {
	if (!service)
		return (
			<section className="widget-panel" aria-label="Selected widget panel">
				<div className="widget-panel-empty">
					<p className="widget-panel-empty-label">Preview Panel</p>
					<h2>Select a service to open it here.</h2>
					<p>The selected myRutgers view will appear in this panel.</p>
				</div>
			</section>
		);

	const widgetStatusClassName = service.status === "ready" ? "widget-status ready" : "widget-status planned";

	return (
		<section className="widget-panel" aria-label="Selected widget panel">
			<header className="widget-panel-header">
				<div>
					<h2>{service.title}</h2>
					<p>{service.summary}</p>
				</div>
				<span className={widgetStatusClassName}>{service.status}</span>
			</header>

			<div className="widget-panel-body">
				{service.embedMode === "iframe" && service.embedUrl ? (
					<iframe
						className="service-frame"
						title={`${service.title} widget`}
						src={service.embedUrl}
						loading="lazy"
					/>
				) : (
					<WidgetPlaceholder service={service} />
				)}
			</div>
		</section>
	);
}
