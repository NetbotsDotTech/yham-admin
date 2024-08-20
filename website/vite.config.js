import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import postcssSafeParser from 'postcss-safe-parser';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      devSourcemap: false,  // Disable CSS source maps in development
      parser: postcssSafeParser,
    },
  },
})
