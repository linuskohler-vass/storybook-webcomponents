import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readdirSync, statSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Auto-discover component files from src/components/ subfolders (atoms, molecules, pages)
const componentsDir = resolve(__dirname, 'src/components');
const componentFiles = readdirSync(componentsDir)
  .filter(sub => statSync(resolve(componentsDir, sub)).isDirectory())
  .flatMap(sub =>
    readdirSync(resolve(componentsDir, sub))
      .filter(file => file.endsWith('.js'))
      .map(file => [file.replace('.js', '').toLowerCase(), resolve(componentsDir, sub, file)])
  )
  .reduce((entries, [name, path]) => {
    entries[name] = path;
    return entries;
  }, {});

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        ...componentFiles,
        styles: resolve(__dirname, 'src/tailwind.css'),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'styles' ? 'js/[name]-[hash].js' : '[name]-[hash].js';
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'main-[hash].css';
          }
          if (assetInfo.name && /\.(ttf|otf|eot|woff2?)$/.test(assetInfo.name)) {
            return 'assets/fonts/[name][extname]';
          }
          if (assetInfo.name && /\.(svg|png|jpe?g)$/.test(assetInfo.name)) {
            return 'assets/images/[name][extname]';
          }
          return 'assets/[name][extname]';
        },
      },
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
