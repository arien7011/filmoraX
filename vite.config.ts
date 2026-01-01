import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react-dom")) {
              return "react-dom";
            }
            if (id.includes("react-router")) {
              return "react-router";
            }
            if (id.includes("@tanstack/react-query")) {
              return "react-query";
            }
            if (id.includes("lucide-react")) {
              return "lucide-icons";
            }
            if (id.includes("react")) {
              return "react";
            }
            return "vendor";
          }
        },
      },
    },
  },
});
