import { defineConfig } from "vite";
import commonjs from "@rollup/plugin-commonjs";
import { builtinModules } from "module";
import path from "node:path";

export default defineConfig({
  plugins: [
    commonjs({
      ignoreDynamicRequires: true,
      dynamicRequireTargets: ["node_modules/better-sqlite3/**"],
    }),
  ],
  build: {
    target: "node22",
    rollupOptions: {
      external: ["better-sqlite3", ...builtinModules],
      output: { format: "cjs" },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  optimizeDeps: { exclude: ["better-sqlite3"] },
});
