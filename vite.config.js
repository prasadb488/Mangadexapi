import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: true,
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
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
      "/covers": {
        target: "https://uploads.mangadex.org",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/covers/, "/covers"),
      },
    },
  },
});
