import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext', // <- Enable latest JS features
    modulePreload: false, // <- ESM compatibility
  },
  server: {
    headers: {
      // Required for WebContainer sandboxing
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
});
