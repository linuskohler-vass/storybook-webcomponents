/**
 * HTML helpers for pure render functions. No browser globals.
 */

export const escapeHtml = (value) =>
    String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

/** Emits ` name="value"` when value is truthy, otherwise an empty string. */
export const attr = (name, value) => (value ? ` ${name}="${escapeHtml(value)}"` : "");

/** Emits ` name` when condition is truthy, otherwise an empty string. */
export const boolAttr = (name, condition) => (condition ? ` ${name}` : "");
