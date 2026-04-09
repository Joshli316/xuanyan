import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

// Generate a build hash for SW cache busting
const buildHash = Date.now().toString(36);

export default defineConfig({
  plugins: [
    tailwindcss(),
    {
      name: 'sw-cache-bust',
      closeBundle() {
        // Inject build hash into service worker after build
        const swPath = resolve(__dirname, 'dist/sw.js');
        try {
          const content = require('fs').readFileSync(swPath, 'utf-8');
          require('fs').writeFileSync(swPath, content.replace('xuanyan-v1', `xuanyan-${buildHash}`));
        } catch { /* sw.js may not exist in dev */ }
      },
    },
  ],
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});
