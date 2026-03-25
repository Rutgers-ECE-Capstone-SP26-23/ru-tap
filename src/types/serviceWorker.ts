export type ServiceWorkerLifecycleEvent = Event & {
	waitUntil: (promise: Promise<unknown>) => void;
};

export type ServiceWorkerFetchEvent = Event & {
	request: Request;
	respondWith: (response: Response | Promise<Response>) => void;
};

export type ServiceWorkerGlobalScopeLike = typeof globalThis & {
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
