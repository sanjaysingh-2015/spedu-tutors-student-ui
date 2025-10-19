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
    global: "globalThis", // 👈 critical line for sockjs-client
  },server: {
        port: 5174, // ✅ your React dev port (can be 5173/5174)
        proxy: {
          // ✅ any request starting with /gateway-api will be forwarded to backend
          "/student-api": {
            target: "http://localhost:8083", // your Spring Boot backend
            changeOrigin: true,
            secure: false,
          },
        },
      },
    });
