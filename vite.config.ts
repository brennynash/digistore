import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: []
      }
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom', 'react-router-dom']
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': [
            '@react-spring/web',
            'lucide-react'
          ],
          'analytics': ['./src/context/AnalyticsContext', './src/context/MetricsContext'],
          'cart': ['./src/context/CartContext', './src/context/PaymentContext'],
          'admin': ['./src/context/AdminContext']
        }
      }
    },
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
    modulePreload: {
      polyfill: true
    }
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    },
    compression: true
  }
});