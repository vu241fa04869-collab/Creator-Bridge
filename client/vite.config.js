import { defineConfig } from "vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const clientRoot = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: clientRoot,
  build: { outDir: resolve(clientRoot, "..", "public"), emptyOutDir: true },
  plugins: [{
    name: "creatorbridge-api-base",
    transformIndexHtml(html) {
      const apiUrl = String(process.env.VITE_API_URL || "").replace(/&/g, "&amp;").replace(/\"/g, "&quot;");
      return html.replace('content="__VITE_API_URL__"', `content="${apiUrl}"`);
    }
  }],
  server: {
    port: 5173,
    proxy: { "/api": "http://localhost:8787" }
  }
});
