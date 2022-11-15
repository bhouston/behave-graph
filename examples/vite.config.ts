import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: ['es2020'],
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
});
