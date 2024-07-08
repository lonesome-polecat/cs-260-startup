import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './service/public',
    emptyOutDir: true
  },
  plugins: [react(),
  viteStaticCopy({
    targets: [
      {
        src: "./src/img/*",
        dest: "./img/"
      }
    ]
  })],
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
      '/auth': 'http://localhost:4000',
      '/ws': {
        target: 'ws://localhost:4000',
        ws: true,
      },
      '/wss': {
        target: 'wss://localhost:4000',
        ws: true,
      }
    },
  }
})
