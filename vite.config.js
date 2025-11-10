import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/beanbutton/", // <-- samma som repo-namnet på GitHub Pages
  plugins: [react()],
});
