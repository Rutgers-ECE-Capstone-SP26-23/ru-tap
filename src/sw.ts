import type ServiceWorkerGlobalScopeLike from "@/types/serviceWorker/globals/serviceWorkerGlobalScopeLike.ts";
import { withBasePath } from "@/utils/basePath.ts";

const serviceWorkerScope = globalThis as ServiceWorkerGlobalScopeLike;

const SHELL_CACHE = "ru-tap-shell-v2";
const RUNTIME_CACHE = "ru-tap-runtime-v2";
const APP_SHELL = [
	withBasePath("/"),
	withBasePath("/manifest.webmanifest"),
	withBasePath("/favicon.svg"),
	withBasePath("/up-arrow.svg")
] as const;

serviceWorkerScope.addEventListener("install", event =>
	event.waitUntil(
		caches
			.open(SHELL_CACHE)
			.then(cache => cache.addAll(APP_SHELL))
			.then(() => serviceWorkerScope.skipWaiting())
	)
);

serviceWorkerScope.addEventListener("activate", event =>
	event.waitUntil(
		caches
			.keys()
			.then(cacheNames =>
				Promise.all(
					cacheNames
						.filter(cacheName => cacheName !== SHELL_CACHE && cacheName !== RUNTIME_CACHE)
						.map(cacheName => caches.delete(cacheName))
				)
			)
			.then(() => serviceWorkerScope.clients.claim())
	)
);

serviceWorkerScope.addEventListener("fetch", event => {
	const { request } = event;
	if (request.method !== "GET") return;
	if (request.mode === "navigate") {
		event.respondWith(handleNavigationRequest(request));
		return;
	}
	const requestUrl = new URL(request.url);
	if (requestUrl.origin !== serviceWorkerScope.location.origin || !isCacheableAsset(request)) return;
	event.respondWith(staleWhileRevalidate(request));
});

async function handleNavigationRequest(request: Request) {
	try {
		const networkResponse = await fetch(request);
		const shellCache = await caches.open(SHELL_CACHE);
		await shellCache.put(withBasePath("/"), networkResponse.clone());
		return networkResponse;
	} catch {
		const shellCache = await caches.open(SHELL_CACHE);
		return (await shellCache.match(withBasePath("/"))) ?? Response.error();
	}
}

function isCacheableAsset(request: Request) {
	return ["script", "style", "image", "font"].includes(request.destination) || request.url.endsWith(".webmanifest");
}

async function staleWhileRevalidate(request: Request): Promise<Response> {
	const runtimeCache = await caches.open(RUNTIME_CACHE);
	const cachedResponse = await runtimeCache.match(request);
	const networkResponsePromise: Promise<Response> = fetch(request)
		.then(networkResponse => {
			if (networkResponse.ok) void runtimeCache.put(request, networkResponse.clone());
			return networkResponse;
		})
		.catch(() => cachedResponse ?? Response.error());
	return cachedResponse ?? networkResponsePromise;
}
