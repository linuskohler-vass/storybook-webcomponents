# Storybook + Tailwind CSS + Web Components

A demo setup with Storybook, Tailwind CSS, and Web Components using the latest compatible versions as of **Nov 6, 2026**.
Components are built using pure native Web Components (Custom Elements API).

## Features
- 📖 **Storybook** – UI component explorer
- 🔧 **Vite** – Fast build tool and dev server
- 🎨 **Tailwind CSS** – Utility-first CSS framework
- 🧩 **Web Components** – Native custom elements

## Getting Started
Install dependencies:
```bash
npm install
```

Run the Storybook project:
```bash
npm start
```

## Pull Request Checks

Every pull request runs formatting and ESLint checks, the package and Storybook builds, Storybook accessibility and interaction tests, browser tests in Chromium, Firefox, and WebKit, Chromatic visual regression tests, and Lighthouse performance audits.

Run the checks locally with:

```bash
npm run lint
npm run build
npm run test:browsers
npm run test:a11y
npm run test:lighthouse
```

Install the required Playwright browsers once before running browser-based tests:

```bash
npx playwright install chromium firefox webkit
```

## Building
Use the Node.js version declared in `.nvmrc` and generate the production bundle:
```bash
nvm use
npm run build
```

This places the complete browser distribution in `/dist`:
- `register.js` registers all custom elements (browser entrypoint)
- `index.js` exports the pure render functions, element classes, and DOM factories — no browser globals are evaluated on import, so it is safe to import in SSR environments (e.g. Next.js)
- Individual component entry points such as `likocard.js` (export the element class, render function, and factory — they do not self-register)
- The required Tailwind styles in a minified `styles.css` (only with the styles in use)
- Shared JavaScript chunks, fonts, and other assets

The output uses standard ES modules and can be consumed by applications bundled with Vite, Webpack, Next.js, or Angular.

## NPM Package
Inspect the package contents without creating an archive:
```bash
npm run package:check
```

Create the installable NPM package archive:
```bash
npm run package
```

The command creates the `artifacts/` directory, runs the Vite production build, and writes `artifacts/liko-webcomponents-1.0.0.tgz`. A consumer can install the local package with:
```bash
npm install /path/to/artifacts/liko-webcomponents-1.0.0.tgz
```

Register all components and import the stylesheet:
```javascript
import 'liko-webcomponents/register';
import 'liko-webcomponents/styles.css';
```

The main entry point is SSR-safe — it can be imported in server-side code (e.g. a Next.js app) without a DOM. It exports the pure `renderLiko*` functions, which return the component markup as an HTML string, plus the element classes and browser DOM factories:
```javascript
import { renderLikoCard } from 'liko-webcomponents';

const html = `<liko-card heading="Hello">${renderLikoCard({ heading: 'Hello' })}</liko-card>`;
```

Alternatively, import a single component entry point (exports its class, render function, and factory — registration still happens via `liko-webcomponents/register`):
```javascript
import { LikoCardExport } from 'liko-webcomponents/components/likocard';
```

## Static Hosting / CDN
For direct inclusion on a page (without npm), generate a versioned bundle:
```bash
npm run build:cdn
```

This runs the same Vite build as `npm run build` and copies `dist/` to `/cdn/<version>/`, where `<version>` always matches the `version` field in `package.json` — the same version `npm pack` and `npm publish` would use. CDN consumers and npm consumers therefore get identical files; only the URL layout differs. Publish each release to an immutable version path such as `/components/1.0.0/` and serve it with long-lived cache headers:

```html
<link rel="stylesheet" href="/components/1.0.0/styles.css">
<script type="module" src="/components/1.0.0/register.js"></script>
```

Never overwrite an already published version path; consumers upgrade by bumping the version in the URL.

To verify the versioned bundle in a browser exactly as a consumer would load it:
```bash
npm run build:cdn
python3 -m http.server 8080
```

Open `http://localhost:8080/integration-test.html` — it reads the version from `package.json` and loads the assets from `./cdn/<version>/`, the same versioned URLs a consumer would use.

## Instructions for Creating New Components

### 1. Create the Component File
Create a new component file in `/src/components/` (e.g., `MyComponent.js`). Each component file contains three parts: a **pure render function**, the **element class**, and a **DOM factory**:

```javascript
import { ElementBase } from '../utils/element-base.js';
import { escapeHtml } from '../utils/html.js';

// Pure render function — no browser globals, safe to run on the server.
export const renderMyComponent = ({ label }) => `
  <div class="p-4 bg-blue-500 text-white">
    ${escapeHtml(label)}
  </div>
`;

// The element class extends ElementBase so the module stays importable
// without a DOM (ElementBase falls back to a no-op class during SSR).
export class MyComponent extends ElementBase {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = renderMyComponent({ label: this.getAttribute('label') });
    // Attach event listeners here, after the markup is mounted.
  }
}

export const MyComponentExport = (props) => {
  const element = document.createElement('my-component');
  // Set properties or attributes as needed
  return element;
};
```

Do **not** call `customElements.define` in the component file.

### 2. Register the Component
Add the element to `src/register.js` (import the class and add it to the `ELEMENTS` map). Registration lives only in this browser entrypoint.

### 3. Create a Story
Create a corresponding story file in `/stories/` (e.g., `MyComponent.stories.js`):

```javascript
import { MyComponentExport } from '../src/components/MyComponent';

export default {
  title: 'Example/MyComponent',
  render: (args) => MyComponentExport(args),
};

export const Default = {};
```

### 4. Build Process
The Vite build configuration automatically discovers all `.js` files in `/src/components/` and creates individual bundles for each component. No additional configuration is needed.

### 5. Using Built Components
After building, register and use the components in your HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="./dist/styles.css">
</head>
<body>
  <my-component></my-component>
  <script type="module" src="./dist/register.js"></script>
</body>
</html>
```

## Project Rules
- **Use Tailwind utility classes** for styling whenever possible, only write custom CSS in exceptional cases
- **Web Components** are defined using native Custom Elements API
- **Component naming**: Use PascalCase for class names (e.g., `LikoButton`) and kebab-case for custom element tags (e.g., `liko-button`)
- **Styling**: Apply Tailwind utility classes directly in the component's render method or template
- **SSR readiness**: Every component must expose a pure `renderLiko*` function that returns its markup as an HTML string and uses **no browser globals** (`document`, `window`, `customElements`, …). The element class calls it and only wires up events/properties afterwards.
- **No browser globals at module top level**: element classes must extend `ElementBase` (falls back to a no-op class without a DOM) so every module stays importable in SSR environments.
- **No self-registration**: never call `customElements.define` in a component file. New elements are registered exclusively in `src/register.js`.
- **Escape interpolated content**: use `escapeHtml`/`attr`/`boolAttr` from `src/utils/html.js` when interpolating values into markup.
