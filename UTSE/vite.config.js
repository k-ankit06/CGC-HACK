import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.config.js/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    
    // NAYA CHANGE: Backend ke liye proxy setup
    proxy: {
      // Jab bhi frontend mein koi request '/api' se shuru hogi...
      '/api': {
        // ... us request ko is address par bhej do
        target: 'http://localhost:8000',
        changeOrigin: true, // Server ko batane ke liye ki origin badal gaya hai
        secure: false, // HTTPS ke liye zaroori
      },
    },
  },
})