import type MyRutgersModule from "@/types/myRutgers/models/myRutgersModule.ts";

/**
 * Shared display metadata for a myRutgers workspace service.
 */
type MyRutgersServiceBase = Readonly<{
	id: string;
	title: string;
	summary: string;
}>;

/**
 * Service rendered as a sandboxed external Rutgers page.
 */
type MyRutgersIframeService = MyRutgersServiceBase &
	Readonly<{
		embedMode: "iframe";
		embedUrl: string;
	}>;

/**
 * Service rendered by an in-app module with an optional official source URL.
 */
type MyRutgersModuleService = MyRutgersServiceBase &
	Readonly<{
		embedMode: "module";
		module: MyRutgersModule;
		sourceUrl?: string;
	}>;

/**
 * Configured service that can appear in the myRutgers workspace.
 */
type MyRutgersService = MyRutgersIframeService | MyRutgersModuleService;

export type { MyRutgersService as default };
