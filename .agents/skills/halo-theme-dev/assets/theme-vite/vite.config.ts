import { defineConfig } from "vite";
import { haloThemePlugin } from "@halo-dev/vite-plugin-halo-theme";

export default defineConfig({
  plugins: [haloThemePlugin()],
});
