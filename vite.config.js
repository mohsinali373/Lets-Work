import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { seoPlugin } from './scripts/vite-seo-plugin.js';

export default defineConfig({
  plugins: [react(), tailwindcss(), seoPlugin()],
  // "@/..." points at src/ — the alias shadcn / React Bits components import from (see components.json)
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  // host: true also listens on the LAN, so phones and other PCs on the same Wi-Fi can open the dev site
  server: { port: 5173, host: true },
});
