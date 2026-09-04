/** @type { import('@storybook/web-components-vite').Preview } */
import '@/tailwind.css';

const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    a11y: {
      test: 'error',
      config: {
        rules: [
          {
            id: "color-contrast",
            selector: '*:not(.slide-hover)',
          },
        ],
      },
    },
  },
};

export default preview;
