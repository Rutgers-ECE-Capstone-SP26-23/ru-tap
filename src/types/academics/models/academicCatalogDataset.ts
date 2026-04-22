import type AcademicCatalogSource from "@/types/academics/models/academicCatalogSource.ts";
import type AcademicCourse from "@/types/academics/models/academicCourse.ts";

type AcademicCatalogDataset = Readonly<{
	courses: readonly AcademicCourse[];
	generatedAt: string;
	source: AcademicCatalogSource;
	version: number;
}>;

export type { AcademicCatalogDataset as default };
