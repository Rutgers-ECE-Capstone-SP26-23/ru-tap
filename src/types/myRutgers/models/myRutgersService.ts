import type MyRutgersEmbedMode from "@/types/myRutgers/models/myRutgersEmbedMode.ts";
import type MyRutgersModule from "@/types/myRutgers/models/myRutgersModule.ts";

type MyRutgersService = {
	id: string;
	title: string;
	summary: string;
	embedMode: MyRutgersEmbedMode;
	embedUrl?: string;
	module?: MyRutgersModule;
	notes?: string;
};

export type { MyRutgersService as default };
