type TransitAlert = Readonly<{
	id: string;
	routeId: string | null;
	routeName: string | null;
	title: string;
	message: string;
}>;

export type { TransitAlert as default };
