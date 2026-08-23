import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	build: {
		rollupOptions: {
			// The bridge exercise is a second, plain HTML page next to the
			// app. Listing it here makes `pnpm build` include it.
			input: {
				main: fileURLToPath(new URL("./index.html", import.meta.url)),
				bridge: fileURLToPath(new URL("./bridge/index.html", import.meta.url)),
			},
		},
	},
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	plugins: [tanstackRouter(), tailwindcss(), react()],
});
