import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/index.css";
import App from "@/App.tsx";
import { withBasePath } from "@/utils/basePath.ts";

if (import.meta.env.PROD && "serviceWorker" in navigator) {
	globalThis.addEventListener("load", () => {
		void navigator.serviceWorker.register(withBasePath("/sw.js"), { type: "module" });
	});
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
