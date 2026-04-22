import type AcademicCatalogKey from "@/types/academics/models/academicCatalogKey.ts";

type AcademicCatalogSource = Readonly<
	AcademicCatalogKey & {
		courseCount: number;
		includesPrereqs: boolean;
		originalBytes: number;
		sectionCount: number;
		url: string;
	}
>;

export type { AcademicCatalogSource as default };
