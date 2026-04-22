import type AcademicCatalogSource from "@/types/academics/models/academicCatalogSource.ts";

type AcademicCatalogManifest = Readonly<{
	generatedAt: string;
	source: AcademicCatalogSource;
	version: number;
}>;

export type { AcademicCatalogManifest as default };
