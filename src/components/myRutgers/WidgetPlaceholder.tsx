import "@/styles/components/WidgetPlaceholder.css";
import type WidgetPlaceholderProps from "@/types/components/props/widgetPlaceholderProps.ts";

export default function WidgetPlaceholder({ service }: WidgetPlaceholderProps) {
	return (
		<div className="widget-placeholder" role="status" aria-live="polite">
			<p className="placeholder-title">{service.title} will open here.</p>
			<p className="placeholder-body">This panel is reserved for the next pass on the myRutgers workspace.</p>
			{service.notes ? <p className="placeholder-notes">{service.notes}</p> : null}
		</div>
	);
}
