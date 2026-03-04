import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // Remove console statements and debugger calls in production
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Split large vendor libraries into separate chunks for better caching
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'gsap-vendor': ['gsap'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'motion-vendor': ['framer-motion'],
        },
      },
    },
    // Raise the chunk size warning limit slightly for this media-heavy app
    chunkSizeWarningLimit: 1000,
  },
  esbuild: {
    // Strip console.log and debugger in production builds
    drop: ['console', 'debugger'],
  },
})
