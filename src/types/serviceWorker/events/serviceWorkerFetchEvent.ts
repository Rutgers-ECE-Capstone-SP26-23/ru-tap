type ServiceWorkerFetchEvent = Event & {
	request: Request;
	respondWith: (response: Response | Promise<Response>) => void;
};

export type { ServiceWorkerFetchEvent as default };
