import { defineConfig } from "vitest/config";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@core": fileURLToPath(new URL("./src/core", import.meta.url)),
      "@domain": fileURLToPath(new URL("./src/domain", import.meta.url)),
      "@infra": fileURLToPath(new URL("./src/infra", import.meta.url)),
    },
  },
  test: {
    globals: true,
  },
});
