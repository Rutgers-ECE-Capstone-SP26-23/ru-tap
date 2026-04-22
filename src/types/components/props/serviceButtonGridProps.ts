import type MyRutgersService from "@/types/myRutgers/models/myRutgersService.ts";

type ServiceButtonGridProps = Readonly<{
	layout: "horizontal" | "vertical";
	services: readonly MyRutgersService[];
	selectedServiceId: string | null;
	onSelectService: (serviceId: string) => void;
}>;

export type { ServiceButtonGridProps as default };
