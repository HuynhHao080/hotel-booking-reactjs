import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactRouter } from "@react-router/dev/vite"; // ✅ đúng cú pháp
import tailwindcss from "@tailwindcss/vite";          // nếu dùng Tailwind

export default defineConfig({
  plugins: [
    react(),
    reactRouter(),   // ✅ thay vì router()
    tailwindcss(),   // optional
  ],
});
