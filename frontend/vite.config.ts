import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      manifest: {
        name: 'BeanButton',
        short_name: 'BeanButton',
        description: 'Office coffee tracker',
        theme_color: '#0d0d0d',
        background_color: '#0d0d0d',
        display: 'standalone',
        icons: [
          { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }
        ]
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://backend:5000',
        changeOrigin: true,
      },
      '/hubs': {
        target: 'http://backend:5000',
        changeOrigin: true,
        ws: true,
      },
    },
  },
})
