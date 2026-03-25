type TransitLocationState = Readonly<{
	latitude: number;
	longitude: number;
	accuracy: number;
	precision: "fine" | "coarse";
}>;

export type { TransitLocationState as default };
