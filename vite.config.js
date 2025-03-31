import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: true, // Allows access via your IP
    proxy: {
      "/api": {
        target: "https://api.mangadex.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/uploads": {
        target: "https://uploads.mangadex.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/uploads/, ""),
      },
    },
  },
});
