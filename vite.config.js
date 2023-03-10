// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

import postcssNesting from "postcss-nesting";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [postcssNesting],
    },
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
      public: path.join(__dirname, "public"),
    },
  },
  plugins: [vue()],
});
