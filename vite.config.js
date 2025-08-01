import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  extend: {
  animation: {
    borderShimmer: "shimmer 3s linear infinite",
  },
  keyframes: {
    shimmer: {
      "0%": { backgroundPosition: "0% 50%" },
      "100%": { backgroundPosition: "100% 50%" },
    },
  },
},
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
  },
  server: {
    // Dev fallback
    historyApiFallback: true,
    open: true,
  },
  // Most importantly:
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
