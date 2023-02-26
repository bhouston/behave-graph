import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  build: {
    target: ['es2020'],
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020'
    }
  },
  resolve: {
    alias: {
      '@behave-graph/core': '@oveddan-behave-graph/core'
    }
  }
});
