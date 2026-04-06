import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'framer-motion': ['framer-motion'],
          'lucide-react': ['lucide-react'],
          'react-icons': ['react-icons', 'react-icons/fa', 'react-icons/si'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  }
})
