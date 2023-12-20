import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    watch:{
      useFsEvents: true,
    },
    host: true,
    strictPort: true,
    port: 5173,
  },
  preview: {
    port: 3000,
    host: true
  },
})
