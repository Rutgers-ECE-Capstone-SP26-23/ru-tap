import { academicCalendarSourceUrl } from "@/data/academicCalendar.ts";
import type MyRutgersService from "@/types/myRutgers/models/myRutgersService.ts";

export const myRutgersServices: readonly MyRutgersService[] = [
	{
		id: "course-search",
		title: "Course Search",
		summary: "Look up sections, instructors, meeting times, and rooms.",
		embedMode: "module",
		module: "course-search"
	},
	{
		id: "academic-calendar",
		title: "Academic Calendar",
		summary: "Check semester starts, breaks, reading days, exams, and commencement.",
		embedMode: "module",
		module: "academic-calendar",
		sourceUrl: academicCalendarSourceUrl
	},
	{
		id: "course-schedule-planner",
		title: "Course Schedule Planner",
		summary: "Open Rutgers CSP to compare sections and build a schedule.",
		embedMode: "iframe",
		embedUrl: "https://sims.rutgers.edu/csp/"
	},
	{
		id: "webreg",
		title: "WebReg",
		summary: "Open Rutgers WebReg to register, adjust, or review your schedule.",
		embedMode: "iframe",
		embedUrl: "https://sims.rutgers.edu/webreg/"
	}
];
