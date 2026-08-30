import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The Econverse endpoint sends no Access-Control-Allow-Origin header, so a
// browser refuses to read it from another origin. Routing the request through
// the Vite server makes it same-origin from the page's point of view.
const proxy = {
  '/api': {
    target: 'https://app.econverse.com.br',
    changeOrigin: true,
    rewrite: (path: string) =>
      path.replace(/^\/api/, '/teste-front-end/junior/tecnologia'),
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { proxy },
  preview: { proxy },
})
