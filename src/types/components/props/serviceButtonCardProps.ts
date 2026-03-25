import type MyRutgersService from "@/types/myRutgers/models/myRutgersService.ts";

type ServiceButtonCardProps = Readonly<{
	service: MyRutgersService;
	isSelected: boolean;
	onSelect: (serviceId: string) => void;
}>;

export type { ServiceButtonCardProps as default };
