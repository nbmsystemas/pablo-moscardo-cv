import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

/**
 * Dev server on 8080, `@` aliased to `src`, and nothing else.
 *
 * `lovable-tagger` used to be here: it injected `data-lov-id` attributes into
 * every JSX element so the Lovable editor could map DOM nodes back to source.
 * This repository is presented as a portfolio, the site is no longer edited
 * through that tool, and the plugin was writing attributes into production
 * markup. Removing it is the reason `vite.config.ts` no longer branches on
 * `mode`.
 *
 * Vitest deliberately does NOT live here. It has its own `vitest.config.ts` so
 * this file — the dev and build path — stays a single, auditable concern. If the
 * `@` alias moves, it must move in both.
 */
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
