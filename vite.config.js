import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig({
  plugins: [
    react(),
    VitePWA({ 
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      includeAssets: ['bg.svg', 'error.svg', 'icon-192x192.png', 'icon-512x512.png'],
      manifest: {
        name: 'Baca Quran',
        short_name: 'Baca Quran',
        theme_color: "#fafafa",
        background_color:"#fafafa",
        display:"standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
