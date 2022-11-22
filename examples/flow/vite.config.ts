import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: ['es2020']
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020'
    }
  }
});
