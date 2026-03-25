import type { MyRutgersService } from "@/types/myRutgers.ts";
import "@/styles/WidgetPlaceholder.css";

type WidgetPlaceholderProps = Readonly<{
	service: MyRutgersService;
}>;

export function WidgetPlaceholder({ service }: WidgetPlaceholderProps) {
	return (
		<div className="widget-placeholder" role="status" aria-live="polite">
			<p className="placeholder-title">{service.title} is available here in the current RU Tap preview.</p>
			<p className="placeholder-body">
				This panel is where the full experience will continue to take shape as the myRutgers flow expands.
			</p>
			{service.notes ? <p className="placeholder-notes">{service.notes}</p> : null}
		</div>
	);
}
