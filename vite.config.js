import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
        manifest: {
          name: 'Serenity Link',
          short_name: 'App Name',
          theme_color: '#ffffff',
          background_color: '#ffffff',
          display: 'standalone',
        },
        workbox: {
          runtimeCaching: [
            {
              urlPattern: new RegExp('^https://.{0,3}tile.openstreetmap.org'),
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'openstreetmap-tiles',
              },
            },
            {
              urlPattern: /^http:\/\/localhost:5500/,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'localhost-cache',
              },
            },
            {
              urlPattern: /^http:\/\/serenitylink.live:5500/,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'serenitylink-cache',
              },
            },
          ],
        },
      }),
    ],
    build: {
      outDir: 'dist',
      sourcemap: true,
      chunkSizeWarningLimit: 150,
    },
    server: {
      port: env.VITE_PORT,
    },
  };
});
