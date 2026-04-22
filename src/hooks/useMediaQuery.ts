import { useSyncExternalStore } from "react";

export function matchesMediaQuery(query: string) {
	return "matchMedia" in globalThis && globalThis.matchMedia(query).matches;
}

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
