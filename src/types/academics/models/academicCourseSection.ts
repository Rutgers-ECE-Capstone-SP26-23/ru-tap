import type AcademicCourseCrossListing from "@/types/academics/models/academicCourseCrossListing.ts";
import type AcademicCourseMeeting from "@/types/academics/models/academicCourseMeeting.ts";

type AcademicCourseSection = Readonly<{
	comments?: string;
	crossListings?: readonly AcademicCourseCrossListing[];
	eligibility?: string;
	id: string;
	index: string;
	meetings: readonly AcademicCourseMeeting[];
	notes?: string;
	openTo?: string;
	professors: readonly string[];
}>;

export type { AcademicCourseSection as default };
