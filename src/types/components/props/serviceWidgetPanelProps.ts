import type MyRutgersService from "@/types/myRutgers/models/myRutgersService.ts";

type ServiceWidgetPanelProps = Readonly<{
	service: MyRutgersService | null;
}>;

export type { ServiceWidgetPanelProps as default };
