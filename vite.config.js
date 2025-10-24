import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    }),
  ],
  define: {
    global: "globalThis", // 👈 required for SockJS
  },
  server: {
    port: 5174,
    proxy: {
      "/student-api": {
        target: "http://localhost:8083",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
