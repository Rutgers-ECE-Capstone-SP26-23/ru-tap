/**
 * Scrolls the current document to the top using smooth motion when permitted.
 */
export default function scrollPageToTop() {
	const prefersReducedMotion = globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;

	globalThis.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
}
