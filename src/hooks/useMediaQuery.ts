import { useSyncExternalStore } from "react";

/**
 * Safely checks a media query in browser contexts and returns false where matchMedia is unavailable.
 */
export function matchesMediaQuery(query: string) {
	return "matchMedia" in globalThis && globalThis.matchMedia(query).matches;
}

/**
 * Subscribes React state to a CSS media query using the external-store contract.
 */
export default function useMediaQuery(query: string) {
	return useSyncExternalStore(
		onStoreChange => {
			if (!("matchMedia" in globalThis)) return () => undefined;

			const mediaQuery = globalThis.matchMedia(query);
			const handleChange = () => onStoreChange();

			mediaQuery.addEventListener("change", handleChange);

			return () => mediaQuery.removeEventListener("change", handleChange);
		},
		() => matchesMediaQuery(query),
		() => false
	);
}
