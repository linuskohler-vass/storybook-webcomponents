/**
 * Shared icon factory using Lucide icon SVG paths.
 * @see https://lucide.dev/icons
 */

import { escapeHtml } from "./html.js";

const ICON_DEFAULTS = {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
};

const ICONS = {
    "chevron-left": ["M15 18l-6-6 6-6"],
    "chevron-right": ["M9 18l6-6-6-6"],
    "rotate-cw": ["M21 2v6h-6", "M21 13a9 9 0 1 1-2.636-6.364L21 9"],
    "rotate-ccw": ["M3 2v6h6", "M3 13a9 9 0 1 0 2.636-6.364L3 9"],
};

/**
 * Returns the SVG markup for the given Lucide icon name.
 * @param {string} name - One of the keys in ICONS.
 * @param {object} [overrides] - Optional attribute overrides (e.g. { width: "24" }).
 * @returns {string} SVG markup
 */
export const iconSvg = (name, overrides = {}) => {
    const paths = ICONS[name];
    if (!paths) throw new Error(`Unknown icon: ${name}`);

    const opts = { ...ICON_DEFAULTS, ...overrides };

    const attrs = [
        ["width", opts.width],
        ["height", opts.height],
        ["viewBox", opts.viewBox],
        ["fill", opts.fill],
        ["stroke", opts.stroke],
        ["stroke-width", opts.strokeWidth],
        ["stroke-linecap", opts.strokeLinecap],
        ["stroke-linejoin", opts.strokeLinejoin],
    ]
        .map(([key, value]) => `${key}="${escapeHtml(value)}"`)
        .join(" ");

    const body = paths.map((d) => `<path d="${d}"/>`).join("");
    return `<svg ${attrs}>${body}</svg>`;
};
