import type AcademicCalendarYear from "@/types/academics/models/academicCalendarYear.ts";

type AcademicCalendarEvent = Readonly<{
	datesByYear: Readonly<Record<AcademicCalendarYear, readonly string[]>>;
	event: string;
	note?: string;
	section: "fall" | "winter" | "spring" | "summer";
}>;

export type { AcademicCalendarEvent as default };
