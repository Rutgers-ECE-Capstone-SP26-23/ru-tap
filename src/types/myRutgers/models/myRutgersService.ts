import type MyRutgersModule from "@/types/myRutgers/models/myRutgersModule.ts";

type MyRutgersServiceBase = Readonly<{
	id: string;
	title: string;
	summary: string;
}>;

type MyRutgersIframeService = MyRutgersServiceBase &
	Readonly<{
		embedMode: "iframe";
		embedUrl: string;
	}>;

type MyRutgersModuleService = MyRutgersServiceBase &
	Readonly<{
		embedMode: "module";
		module: MyRutgersModule;
		sourceUrl?: string;
	}>;

type MyRutgersService = MyRutgersIframeService | MyRutgersModuleService;

export type { MyRutgersService as default };
