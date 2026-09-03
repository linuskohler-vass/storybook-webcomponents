# Storybook + Tailwind CSS + Web Components

A demo setup with Storybook, Tailwind CSS, and Web Components using the latest compatible versions as of **May 30, 2026**.
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

## Building
Use the Node.js version declared in `.nvmrc` and generate the production bundle:
```bash
nvm use
npm run build
```

This places the complete browser distribution in `/dist`:
- `index.js` registers all components
- Individual component entry points such as `likocard.js`
- The required Tailwind styles in a minified `styles.css`
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

Import all components and the stylesheet:
```javascript
import 'liko-webcomponents';
import 'liko-webcomponents/styles.css';
```

Alternatively, import a single component entry point:
```javascript
import 'liko-webcomponents/components/likocard';
import 'liko-webcomponents/styles.css';
```

## Static Hosting / CDN
The same `/dist` directory can be served from any static host or CDN. To verify it locally:
```bash
npm run build
python3 -m http.server 8080
```

Open `http://localhost:8080/integration-test.html`. A production deployment can publish the contents under an immutable version path such as `/components/1.0.0/`.

## Instructions for Creating New Components

### 1. Create the Component File
Create a new component file in `/src/components/` (e.g., `MyComponent.js`):

```javascript
class MyComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="p-4 bg-blue-500 text-white">
        My Component
      </div>
    `;
  }
}

if (!customElements.get('my-component')) {
  customElements.define('my-component', MyComponent);
}

export const MyComponentExport = (props) => {
  const element = document.createElement('my-component');
  // Set properties or attributes as needed
  return element;
};
```

### 2. Create a Story
Create a corresponding story file in `/stories/` (e.g., `MyComponent.stories.js`):

```javascript
import { MyComponentExport } from '../src/components/MyComponent';

export default {
  title: 'Example/MyComponent',
  render: (args) => MyComponentExport(args),
};

export const Default = {};
```

### 3. Build Process
The Vite build configuration automatically discovers all `.js` files in `/src/components/` and creates individual bundles for each component. No additional configuration is needed.

### 4. Using Built Components
After building, use the components in your HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="./dist/main.css">
</head>
<body>
  <my-component></my-component>
  <script type="module" src="./dist/mycomponent.js"></script>
</body>
</html>
```

## Project Rules
- **Use Tailwind utility classes** for styling whenever possible, only write custom CSS in exceptional cases
- **Web Components** are defined using native Custom Elements API
- **Component naming**: Use PascalCase for class names (e.g., `LikoButton`) and kebab-case for custom element tags (e.g., `liko-button`)
- **Styling**: Apply Tailwind utility classes directly in the component's render method or template
