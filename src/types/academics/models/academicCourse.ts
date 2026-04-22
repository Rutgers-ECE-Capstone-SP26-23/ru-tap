import type AcademicCourseSection from "@/types/academics/models/academicCourseSection.ts";

type AcademicCourse = Readonly<{
	code: string;
	dept: string;
	name: string;
	number: string;
	prereqs?: string;
	school: string;
	sections: readonly AcademicCourseSection[];
}>;

export type { AcademicCourse as default };
