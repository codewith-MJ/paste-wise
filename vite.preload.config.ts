import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
  build: {
    target: "node22",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
