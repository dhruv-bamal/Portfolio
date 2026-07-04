import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // honor the port assigned by the preview harness; fall back to vite default
    port: Number(process.env.PORT) || 5173,
  },
})
