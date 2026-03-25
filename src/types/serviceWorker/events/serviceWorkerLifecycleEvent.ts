type ServiceWorkerLifecycleEvent = Event & {
	waitUntil: (promise: Promise<unknown>) => void;
};

export type { ServiceWorkerLifecycleEvent as default };
