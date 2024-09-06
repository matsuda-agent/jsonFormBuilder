import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';
import dotenv from 'dotenv';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const envFile = mode === 'development' ? '..env.development' : '..env.production';
  dotenv.config({ path: envFile });
  return {
  server : {
    port : 5000,
    watch: {
      // Watch for changes in the symlinked package
      followSymlinks: true,
      ignored: ['!**/node_modules/json-styled-form-builder/**'],
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      'json-styled-form-builder': path.resolve('../src'),
    },
  },

}})
