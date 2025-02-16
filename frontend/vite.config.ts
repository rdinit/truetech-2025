import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import { defineConfig, HttpProxy } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

const target = "https://dino.123581321.ru/";

function disableHsts(proxy: HttpProxy.Server) {
  proxy.on("proxyRes", (res) => {
    res.headers["strict-transport-security"] = "max-age=0";
  });
  proxy.on("proxyReqWs", (req) => {
    req.once("upgrade", (r) => {
      r.headers["strict-transport-security"] = "max-age=0";
    });
  });
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    svgr(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "ЖК Комплекс Эталон",
        short_name: "ЖК Эталон",
        start_url: "./",
        display: "fullscreen",
        description: "Доступное приложение умного дома ЖК Эталон",
        theme_color: "#1E3A8A",
        icons: [
          {
            src: "/vite.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
          {
            src: `/icons/android-chrome-192x192.png`,
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: `/icons/android-chrome-512x512.png`,
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: `/icons/android-chrome-144x144.png`,
            sizes: "144x144",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        screenshots: [
          {
            src: "/image.png",
            sizes: "890x1270",
            type: "image/png",
            form_factor: "wide",
            label: "Application",
          },
          {
            src: "/image.png",
            sizes: "890x1270",
            type: "image/png",
            form_factor: "narrow",
            label: "Application",
          },
        ],
        background_color: "#FFFFFF",
      },
    }),
  ],
  build: {
    target: "esnext",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      api: path.resolve(__dirname, "./src/api"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target,
        changeOrigin: true,
        configure: disableHsts,
      },
    },
  },
});
