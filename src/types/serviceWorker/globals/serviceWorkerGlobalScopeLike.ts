import type ServiceWorkerFetchEvent from "@/types/serviceWorker/events/serviceWorkerFetchEvent.ts";
import type ServiceWorkerLifecycleEvent from "@/types/serviceWorker/events/serviceWorkerLifecycleEvent.ts";

type ServiceWorkerGlobalScopeLike = typeof globalThis & {
	addEventListener: {
		(type: "install", listener: (event: ServiceWorkerLifecycleEvent) => void): void;
		(type: "activate", listener: (event: ServiceWorkerLifecycleEvent) => void): void;
		(type: "fetch", listener: (event: ServiceWorkerFetchEvent) => void): void;
	};
	clients: {
		claim: () => Promise<void>;
	};
	location: Location;
	skipWaiting: () => Promise<void>;
};

export type { ServiceWorkerGlobalScopeLike as default };
