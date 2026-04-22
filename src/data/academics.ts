import type AcademicCatalogDataset from "@/types/academics/models/academicCatalogDataset.ts";
import type AcademicCatalogKey from "@/types/academics/models/academicCatalogKey.ts";
import type AcademicCatalogManifest from "@/types/academics/models/academicCatalogManifest.ts";
import { withBasePath } from "@/utils/basePath.ts";

type AcademicCatalogCacheRecord = Readonly<{
	dataset: AcademicCatalogDataset;
	id: string;
	manifest: AcademicCatalogManifest;
}>;

const academicCatalogCacheDatabaseName = "ru-tap-academics";
const academicCatalogCacheDatabaseVersion = 2;
const academicCatalogCacheStoreName = "catalogDatasets";
const defaultAcademicCatalogKey = {
	campus: "NB",
	term: "9",
	year: "2026"
} as const satisfies AcademicCatalogKey;
const inFlightAcademicCatalogLoads = new Map<string, Promise<AcademicCatalogDataset>>();

function normalizeAcademicCatalogKey(catalogKey: AcademicCatalogKey): AcademicCatalogKey {
	return {
		campus: catalogKey.campus.trim().toUpperCase(),
		term: catalogKey.term.trim(),
		year: catalogKey.year.trim()
	};
}

function getAcademicCatalogCacheRecordId(catalogKey: AcademicCatalogKey) {
	return `${catalogKey.year}:${catalogKey.term}:${catalogKey.campus}`;
}

function supportsAcademicCatalogCache() {
	return typeof indexedDB !== "undefined";
}

function getAcademicCatalogManifest(dataset: AcademicCatalogDataset): AcademicCatalogManifest {
	return {
		generatedAt: dataset.generatedAt,
		source: dataset.source,
		version: dataset.version
	};
}

function getAcademicCatalogManifestSignature(manifest: AcademicCatalogManifest) {
	return JSON.stringify(manifest);
}

function academicCatalogManifestsMatch(leftManifest: AcademicCatalogManifest, rightManifest: AcademicCatalogManifest) {
	return getAcademicCatalogManifestSignature(leftManifest) === getAcademicCatalogManifestSignature(rightManifest);
}

function openAcademicCatalogCacheDatabase(): Promise<IDBDatabase> {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(academicCatalogCacheDatabaseName, academicCatalogCacheDatabaseVersion);

		request.onupgradeneeded = () => {
			const database = request.result;

			if (database.objectStoreNames.contains(academicCatalogCacheStoreName)) {
				database.deleteObjectStore(academicCatalogCacheStoreName);
			}

			database.createObjectStore(academicCatalogCacheStoreName, { keyPath: "id" });
		};

		request.onsuccess = () => {
			resolve(request.result);
		};

		request.onerror = () => {
			reject(request.error ?? new Error("Failed to open the academic catalog cache database."));
		};
	});
}

async function readAcademicCatalogCacheRecord(recordId: string): Promise<AcademicCatalogCacheRecord | null> {
	const database = await openAcademicCatalogCacheDatabase();

	return new Promise((resolve, reject) => {
		let record: AcademicCatalogCacheRecord | null = null;
		const transaction = database.transaction(academicCatalogCacheStoreName, "readonly");
		const objectStore = transaction.objectStore(academicCatalogCacheStoreName);
		const request = objectStore.get(recordId);

		request.onsuccess = () => {
			record = (request.result as AcademicCatalogCacheRecord | undefined) ?? null;
		};

		request.onerror = () => {
			reject(request.error ?? new Error("Failed to read from the academic catalog cache database."));
		};

		transaction.oncomplete = () => {
			database.close();
			resolve(record);
		};

		transaction.onabort = () => {
			database.close();
			reject(transaction.error ?? new Error("The academic catalog cache read transaction was aborted."));
		};

		transaction.onerror = () => {
			database.close();
			reject(transaction.error ?? new Error("The academic catalog cache read transaction failed."));
		};
	});
}

async function writeAcademicCatalogCacheRecord(record: AcademicCatalogCacheRecord): Promise<void> {
	const database = await openAcademicCatalogCacheDatabase();

	return new Promise((resolve, reject) => {
		const transaction = database.transaction(academicCatalogCacheStoreName, "readwrite");
		const objectStore = transaction.objectStore(academicCatalogCacheStoreName);

		objectStore.put(record);

		transaction.oncomplete = () => {
			database.close();
			resolve();
		};

		transaction.onabort = () => {
			database.close();
			reject(transaction.error ?? new Error("The academic catalog cache write transaction was aborted."));
		};

		transaction.onerror = () => {
			database.close();
			reject(transaction.error ?? new Error("The academic catalog cache write transaction failed."));
		};
	});
}

async function fetchAcademicCatalogManifest(
	catalogKey: AcademicCatalogKey = defaultAcademicCatalogKey
): Promise<AcademicCatalogManifest> {
	const response = await fetch(getAcademicCatalogManifestUrl(catalogKey), { cache: "no-store" });

	if (!response.ok) {
		throw new Error(
			`Failed to load condensed academic catalog manifest: ${response.status} ${response.statusText}`
		);
	}

	return (await response.json()) as AcademicCatalogManifest;
}

async function fetchAcademicCatalogDataset(
	catalogKey: AcademicCatalogKey = defaultAcademicCatalogKey
): Promise<AcademicCatalogDataset> {
	const response = await fetch(getAcademicCatalogDataUrl(catalogKey), { cache: "no-cache" });

	if (!response.ok) {
		throw new Error(`Failed to load condensed academic catalog: ${response.status} ${response.statusText}`);
	}

	return (await response.json()) as AcademicCatalogDataset;
}

async function persistAcademicCatalogDataset(
	catalogKey: AcademicCatalogKey,
	dataset: AcademicCatalogDataset
): Promise<void> {
	if (!supportsAcademicCatalogCache()) {
		return;
	}

	await writeAcademicCatalogCacheRecord({
		dataset,
		id: getAcademicCatalogCacheRecordId(catalogKey),
		manifest: getAcademicCatalogManifest(dataset)
	});
}

async function loadAcademicCatalogInternal(
	catalogKey: AcademicCatalogKey = defaultAcademicCatalogKey
): Promise<AcademicCatalogDataset> {
	if (!supportsAcademicCatalogCache()) {
		return fetchAcademicCatalogDataset(catalogKey);
	}

	const recordId = getAcademicCatalogCacheRecordId(catalogKey);
	let cachedRecord: AcademicCatalogCacheRecord | null = null;

	try {
		cachedRecord = await readAcademicCatalogCacheRecord(recordId);
	} catch {
		cachedRecord = null;
	}

	if (cachedRecord === null) {
		const dataset = await fetchAcademicCatalogDataset(catalogKey);

		try {
			await persistAcademicCatalogDataset(catalogKey, dataset);
		} catch {
			// Cache writes should not block the runtime loader.
		}

		return dataset;
	}

	let latestManifest: AcademicCatalogManifest | null = null;

	try {
		latestManifest = await fetchAcademicCatalogManifest(catalogKey);
	} catch {
		try {
			const freshDataset = await fetchAcademicCatalogDataset(catalogKey);

			try {
				await persistAcademicCatalogDataset(catalogKey, freshDataset);
			} catch {
				// Cache writes should not block the runtime loader.
			}

			return freshDataset;
		} catch {
			return cachedRecord.dataset;
		}
	}

	if (academicCatalogManifestsMatch(cachedRecord.manifest, latestManifest)) {
		return cachedRecord.dataset;
	}

	try {
		const freshDataset = await fetchAcademicCatalogDataset(catalogKey);

		try {
			await persistAcademicCatalogDataset(catalogKey, freshDataset);
		} catch {
			// Cache writes should not block the runtime loader.
		}

		return freshDataset;
	} catch {
		return cachedRecord.dataset;
	}
}

export function getAcademicCatalogDataUrl(catalogKey: AcademicCatalogKey = defaultAcademicCatalogKey) {
	const normalizedCatalogKey = normalizeAcademicCatalogKey(catalogKey);

	return withBasePath(
		`/data/academics/${normalizedCatalogKey.year}/${normalizedCatalogKey.term}/${normalizedCatalogKey.campus}/courses.condensed.min.json`
	);
}

export function getAcademicCatalogManifestUrl(catalogKey: AcademicCatalogKey = defaultAcademicCatalogKey) {
	const normalizedCatalogKey = normalizeAcademicCatalogKey(catalogKey);

	return withBasePath(
		`/data/academics/${normalizedCatalogKey.year}/${normalizedCatalogKey.term}/${normalizedCatalogKey.campus}/courses.condensed.min.meta.json`
	);
}

export async function prefetchAcademicCatalog(
	catalogKey: AcademicCatalogKey = defaultAcademicCatalogKey
): Promise<void> {
	await loadAcademicCatalog(catalogKey);
}

export async function loadAcademicCatalog(
	catalogKey: AcademicCatalogKey = defaultAcademicCatalogKey
): Promise<AcademicCatalogDataset> {
	const normalizedCatalogKey = normalizeAcademicCatalogKey(catalogKey);
	const requestKey = getAcademicCatalogCacheRecordId(normalizedCatalogKey);
	const existingRequest = inFlightAcademicCatalogLoads.get(requestKey);

	if (existingRequest !== undefined) {
		return existingRequest;
	}

	const request = loadAcademicCatalogInternal(normalizedCatalogKey).finally(() => {
		inFlightAcademicCatalogLoads.delete(requestKey);
	});

	inFlightAcademicCatalogLoads.set(requestKey, request);

	return request;
}

export { defaultAcademicCatalogKey };
