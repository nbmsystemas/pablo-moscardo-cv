import { defineConfig } from "vitest/config";
import path from "node:path";

/**
 * Vitest gets its own config so the dev/build path in `vite.config.ts` stays
 * untouched. The `@` alias must match the one there — if either moves, move both.
 *
 * Environment is `node`, not `jsdom`: everything covered here is the data layer
 * (pure modules, no React, no DOM). Layout, motion and visual regressions have no
 * runnable deterministic RED in this project and are verified by measuring the
 * rendered page instead — see odd/tasks/mission-control-cv.md §9.
 */
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
