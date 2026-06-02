import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),
    VitePWA({
      manifest: {
        short_name: 'Daily App',
        name: 'Daily App',
        icons: [
          {
            src: './assets/logo512x512.png',
            type: 'image/png',
            sizes: '512x512',
          },
          {
            src: './assets/logo192x192.png',
            type: 'image/png',
            sizes: '192x192',
          },
        ],
        start_url: '.',
        display: 'standalone',
        theme_color: '#000000',
        background_color: '#ffffff',
      },
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: {
        enabled: true,
      },
    }),
  ],
  css: {
    modules: {
      localsConvention: 'dashes',
    },
  },
});
