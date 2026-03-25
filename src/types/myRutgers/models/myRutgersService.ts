import type MyRutgersEmbedMode from "@/types/myRutgers/models/myRutgersEmbedMode.ts";
import type MyRutgersServiceStatus from "@/types/myRutgers/models/myRutgersServiceStatus.ts";

type MyRutgersService = {
	id: string;
	title: string;
	summary: string;
	status: MyRutgersServiceStatus;
	embedMode: MyRutgersEmbedMode;
	embedUrl?: string;
	notes?: string;
};

export type { MyRutgersService as default };
