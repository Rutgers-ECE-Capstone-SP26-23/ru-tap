import type AcademicCalendarEvent from "@/types/academics/models/academicCalendarEvent.ts";

export const academicCalendarSourceUrl = "https://scheduling.rutgers.edu/academic-calendar/";

export const academicCalendarYears = ["2025-2026", "2026-2027", "2027-2028"] as const;

export const academicCalendarEvents: readonly AcademicCalendarEvent[] = [
	{
		event: "Fall Semester Begins",
		section: "fall",
		datesByYear: {
			"2025-2026": ["Tue, September 2, 2025"],
			"2026-2027": ["Tue, September 1, 2026"],
			"2027-2028": ["Wed, September 1, 2027"]
		}
	},
	{
		event: "Fall Minicourse Dates First 7 Weeks",
		section: "fall",
		datesByYear: {
			"2025-2026": ["Tue, September 2, 2025 to", "Mon, October 20, 2025"],
			"2026-2027": ["Tue, September 1, 2026 to", "Tue, October 20, 2026"],
			"2027-2028": []
		}
	},
	{
		event: "Fall Minicourse Dates Second 7 Weeks",
		section: "fall",
		datesByYear: {
			"2025-2026": ["Tue, October 21, 2025 to", "Wed, December 10, 2025"],
			"2026-2027": ["Wed, October 21, 2026 to", "Thu, December 10, 2026"],
			"2027-2028": []
		}
	},
	{
		event: "Changes in Designation of Class Days",
		note: "No classes on Labor Day",
		section: "fall",
		datesByYear: {
			"2025-2026": ["Tue, November 25, 2025 (Thursday Classes)", "Wed, November 26, 2025 (Friday Classes)"],
			"2026-2027": ["Tue, September 8, 2026 (Monday Classes)", "Wed, November 25, 2026 (Friday Classes)"],
			"2027-2028": ["Wed, September 8, 2027 (Monday Classes)", "Mon, November 9, 2027 (Wednesday Classes)"]
		}
	},
	{
		event: "Thanksgiving Recess",
		note: "No classes",
		section: "fall",
		datesByYear: {
			"2025-2026": ["Thu, November 27, 2025 to", "Sun, November 30, 2025"],
			"2026-2027": ["Thu, November 26, 2026 to", "Sun, November 29, 2026"],
			"2027-2028": ["Wed, November 24, 2027 to", "Sun, November 28, 2027"]
		}
	},
	{
		event: "Regular Classes End",
		section: "fall",
		datesByYear: {
			"2025-2026": ["Wed, December 10, 2025"],
			"2026-2027": ["Thu, December 10, 2026"],
			"2027-2028": ["Mon, December 13, 2027"]
		}
	},
	{
		event: "Reading Days",
		note: "No classes",
		section: "fall",
		datesByYear: {
			"2025-2026": ["Thu, December 11, 2025", "Fri, December 12, 2025"],
			"2026-2027": ["Fri, December 11, 2026", "Mon, December 14, 2026"],
			"2027-2028": ["Tue, December 14, 2027", "Wed, December 15, 2027"]
		}
	},
	{
		event: "Fall Exams",
		section: "fall",
		datesByYear: {
			"2025-2026": ["Mon, December 15, 2025 to", "Mon, December 22, 2025"],
			"2026-2027": ["Tue, December 15, 2026 to", "Tue, December 22, 2026"],
			"2027-2028": ["Thu, December 16, 2027 to", "Thu, December 23, 2027"]
		}
	},
	{
		event: "Winter Session",
		section: "winter",
		datesByYear: {
			"2025-2026": ["Mon, December 22, 2025 to", "Fri, January 16, 2026"],
			"2026-2027": ["Wed, December 23, 2026 to", "Fri, January 15, 2027"],
			"2027-2028": ["Thu, December 23, 2027 to", "Fri, January 14, 2028"]
		}
	},
	{
		event: "January Intersession",
		note: "Early January, after the New Year and before spring semester",
		section: "winter",
		datesByYear: {
			"2025-2026": ["Mon, January 5, 2026 to", "Mon, January 19, 2026"],
			"2026-2027": ["Mon, January 4, 2027 to", "Mon, January 18, 2027"],
			"2027-2028": ["Mon, January 3, 2028 to", "Mon, January 17, 2028"]
		}
	},
	{
		event: "Spring Semester Begins",
		section: "spring",
		datesByYear: {
			"2025-2026": ["Tue, January 20, 2026"],
			"2026-2027": ["Tue, January 19, 2027"],
			"2027-2028": ["Tue, January 18, 2028"]
		}
	},
	{
		event: "Spring Minicourse Dates First 7 Weeks",
		section: "spring",
		datesByYear: {
			"2025-2026": ["Tue, January 20, 2026 to", "Mon, March 9, 2026"],
			"2026-2027": [],
			"2027-2028": []
		}
	},
	{
		event: "Spring Minicourse Dates Second 7 Weeks",
		section: "spring",
		datesByYear: {
			"2025-2026": ["Tue, March 10, 2026 to", "Mon, May 4, 2026"],
			"2026-2027": [],
			"2027-2028": []
		}
	},
	{
		event: "Spring Recess",
		note: "No classes",
		section: "spring",
		datesByYear: {
			"2025-2026": ["Sat, March 14, 2026 to", "Sun, March 22, 2026"],
			"2026-2027": ["Sat, March 13, 2027 to", "Sun, March 21, 2027"],
			"2027-2028": ["Sat, March 11, 2028 to", "Sun, March 19, 2028"]
		}
	},
	{
		event: "Regular Classes End",
		section: "spring",
		datesByYear: {
			"2025-2026": ["Mon, May 4, 2026"],
			"2026-2027": ["Mon, May 3, 2027"],
			"2027-2028": ["Mon, May 1, 2028"]
		}
	},
	{
		event: "Reading Days",
		note: "No classes",
		section: "spring",
		datesByYear: {
			"2025-2026": ["Tue, May 5, 2026", "Wed, May 6, 2026"],
			"2026-2027": ["Tue, May 4, 2027", "Wed, May 5, 2027"],
			"2027-2028": ["Tue, May 2, 2028", "Wed, May 3, 2028"]
		}
	},
	{
		event: "Spring Exams",
		section: "spring",
		datesByYear: {
			"2025-2026": ["Thu, May 7, 2026 to", "Wed, May 13, 2026"],
			"2026-2027": ["Thu, May 6, 2027 to", "Wed, May 12, 2027"],
			"2027-2028": ["Thu, May 4, 2028 to", "Wed, May 10, 2028"]
		}
	},
	{
		event: "Rutgers-New Brunswick & Rutgers Health Commencement",
		section: "spring",
		datesByYear: {
			"2025-2026": ["Sun, May 17, 2026"],
			"2026-2027": ["Sun, May 16, 2027"],
			"2027-2028": ["Sun, May 14, 2028"]
		}
	},
	{
		event: "May Intersession",
		note: "No classes; late May, after spring final exams and before summer session",
		section: "spring",
		datesByYear: {
			"2025-2026": ["Thu, May 14, 2026 to", "Mon, May 25, 2026"],
			"2026-2027": ["Thu, May 13, 2027 to", "Mon, May 31, 2027"],
			"2027-2028": []
		}
	},
	{
		event: "Summer Session",
		section: "summer",
		datesByYear: {
			"2025-2026": ["Tue, May 26, 2026 to", "Wed, August 12, 2026"],
			"2026-2027": ["Tue, June 1, 2027 to", "Wed, August 18, 2027"],
			"2027-2028": []
		}
	},
	{
		event: "August Intersession",
		note: "No classes; late August, after summer session and before the fall semester",
		section: "summer",
		datesByYear: {
			"2025-2026": ["Thu, August 13, 2026 to", "Mon, August 31, 2026"],
			"2026-2027": ["Thu, August 19, 2027 to", "Tue, August 31, 2027"],
			"2027-2028": []
		}
	}
];
