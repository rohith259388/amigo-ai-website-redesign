import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  // One self-contained HTML file is the right shape for a client handover, but not
  // for the web: it cannot be prerendered per route and the bundle is re-downloaded
  // on every page. `npm run build:singlefile` opts into it.
  plugins: [react(), tailwindcss(), ...(process.env.SINGLE_FILE === "true" ? [viteSingleFile()] : [])],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
