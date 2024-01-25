import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import basicSsl from "@vitejs/plugin-basic-ssl";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    basicSsl(),
    vuetify({
      autoImport: true,
      styles: { configFile: "src/app/styles/variables.scss" }
    })
  ],
  server: {
    host: "0.0.0.0",
    port: 5155
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/scss/index.scss" as *;`,
      },
    },
  },
  optimizeDeps: {
    exclude: ["vuetify"],
    entries: ["./src/**/*.vue"]
  },

  build: {
    minify: true,
    chunkSizeWarningLimit: 5000
  }
});
