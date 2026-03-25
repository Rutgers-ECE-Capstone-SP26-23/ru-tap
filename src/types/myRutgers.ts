export type MyRutgersEmbedMode = "iframe" | "placeholder";
export type MyRutgersServiceStatus = "ready" | "planned";

export type MyRutgersService = {
	id: string;
	title: string;
	summary: string;
	status: MyRutgersServiceStatus;
	embedMode: MyRutgersEmbedMode;
	embedUrl?: string;
	notes?: string;
};
