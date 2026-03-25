import type PassioAlert from "@/types/transit/feed/passioAlert.ts";
import type PassioLine from "@/types/transit/feed/passioLine.ts";
import type PassioStation from "@/types/transit/feed/passioStation.ts";
import type PassioSystemStatus from "@/types/transit/feed/passioSystemStatus.ts";
import type PassioTrain from "@/types/transit/feed/passioTrain.ts";

type PassioFeed = Readonly<{
	trains: Readonly<Record<string, PassioTrain>>;
	stations: Readonly<Record<string, PassioStation>>;
	lines: Readonly<Record<string, PassioLine>>;
	alerts: readonly PassioAlert[];
	lastUpdated: string;
	shitsFucked: PassioSystemStatus;
}>;

export type { PassioFeed as default };
