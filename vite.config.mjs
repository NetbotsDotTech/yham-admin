/* eslint-disable prettier/prettier */
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';
import { version } from './package.json'; // Import version from package.json

// ----------------------------------------------------------------------

export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  // Base URL for the app
  base: '/',
  define: {
    global: 'window',
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(version), // Expose the version as an environment variable
  },
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
    ],
  },
  server: {
    // This ensures that the browser opens upon server start
    open: true,
    // This sets a default port to 3000
    port: 3000,
  },
  preview: {
    // This ensures that the browser opens upon preview start
    open: true,
    // This sets a default port to 3000
    port: 3000,
  },
});
