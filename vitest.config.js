import { defineConfig, mergeConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const testBrowsers = (process.env.TEST_BROWSERS || 'chromium').split(',');

import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      projects: [
        {
          extends: true,
          test: {
            name: 'unit',
            include: ['src/**/*.test.js'],
            browser: {
              enabled: true,
              provider: playwright({}),
              headless: true,
              instances: testBrowsers.map((browser) => ({ browser })),
            },
          },
        },
        {
          extends: true,
          plugins: [
            storybookTest({
              configDir: path.join(dirname, '.storybook'),
              storybookScript: 'npm run storybook -- --no-open',
            }),
          ],
          test: {
            name: 'storybook',
            browser: {
              enabled: true,
              provider: playwright({}),
              headless: true,
              instances: testBrowsers.map((browser) => ({ browser })),
            },
            setupFiles: ['./.storybook/vitest.setup.js'],
          },
        },
      ],
    },
  }),
);
