import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    maxConcurrency: 16,
    setupFiles: "src/setupTests.ts",
  },
});
