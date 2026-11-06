/**
 * Base class for all custom elements.
 * Falls back to a no-op class when `HTMLElement` is unavailable (SSR / Node.js),
 * so component modules can be imported without a DOM.
 */
export const ElementBase = globalThis.HTMLElement ?? class {};
