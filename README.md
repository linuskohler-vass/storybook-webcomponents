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
To generate the production bundle:
```bash
npm run build
```

This will place all resources in `/dist`:
- Individual component JS files
- The required Tailwind styles in a minified `main.css` (only with the styles in use)

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
