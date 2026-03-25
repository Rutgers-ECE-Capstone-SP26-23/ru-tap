import type { MyRutgersService } from "@/types/myRutgers.ts";

export const myRutgersServices: readonly MyRutgersService[] = [
	{
		id: "course-schedule",
		title: "Course Schedule",
		summary: "Class blocks, instructors, and meeting locations.",
		status: "planned",
		embedMode: "placeholder",
		notes: "Planned to surface upcoming classes, instructors, and locations in one quick view."
	},
	{
		id: "grades",
		title: "Grades",
		summary: "Current term grade summary and course outcomes.",
		status: "planned",
		embedMode: "placeholder",
		notes: "Planned to show term summaries with course-level grade detail."
	},
	{
		id: "holds",
		title: "Holds",
		summary: "Registration-affecting alerts and next actions.",
		status: "planned",
		embedMode: "placeholder",
		notes: "Planned to make alerts and next steps easier to spot."
	},
	{
		id: "registration",
		title: "Registration",
		summary: "Registration windows, status, and enrollment tools.",
		status: "planned",
		embedMode: "placeholder",
		notes: "Planned to keep dates, status, and enrollment shortcuts close at hand."
	},
	{
		id: "announcements",
		title: "Announcements",
		summary: "myRutgers notices and institutional updates.",
		status: "planned",
		embedMode: "placeholder",
		notes: "Planned to bring important updates into one clearer feed."
	}
];
