type PassioSystemStatus = Readonly<{
	// The API is opaque regarding this field's purpose, but for parity's sake, the name has been copied over verbatim.
	shitIsFucked: boolean;
	message: string;
}>;

export type { PassioSystemStatus as default };
