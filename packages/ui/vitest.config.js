import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    exclude: ["scripts"],
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest-setup.ts",
    coverage: {
      include: ["src"],
    },
  },
});
