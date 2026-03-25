import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === "true" && repositoryName !== "";
const isUserOrOrgSite = repositoryName.endsWith(".github.io");
const pagesBase = isGitHubPagesBuild && !isUserOrOrgSite ? `/${repositoryName}/` : "/";

// https://vite.dev/config/
export default defineConfig({
	base: pagesBase,
	build: {
		rollupOptions: {
			input: {
				main: fileURLToPath(new URL("./index.html", import.meta.url)),
				sw: fileURLToPath(new URL("./src/sw.ts", import.meta.url))
			},
			output: {
				entryFileNames: chunkInfo => (chunkInfo.name === "sw" ? "sw.js" : "assets/[name]-[hash].js"),
				chunkFileNames: "assets/[name]-[hash].js",
				assetFileNames: "assets/[name]-[hash][extname]"
			}
		}
	},
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url))
		}
	},
	plugins: [react()]
});
