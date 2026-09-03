/**
 * Shared icon factory using Lucide icon SVG paths.
 * @see https://lucide.dev/icons
 */

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
    "chevron-up": ["M18 15l-6-6-6 6"],
    "chevron-down": ["M6 9l6 6 6-6"],
    ticket: [
        "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
        "M13 5v2",
        "M13 17v2",
        "M13 11v2",
    ],
    "rotate-cw": ["M21 2v6h-6", "M21 13a9 9 0 1 1-2.636-6.364L21 9"],
    "rotate-ccw": ["M3 2v6h6", "M3 13a9 9 0 1 0 2.636-6.364L3 9"],
};

/**
 * Creates an SVG element for the given Lucide icon name.
 * @param {string} name - One of the keys in ICONS.
 * @param {object} [overrides] - Optional attribute overrides (e.g. { width: "24" }).
 * @returns {SVGSVGElement}
 */
export const createIcon = (name, overrides = {}) => {
    const paths = ICONS[name];
    if (!paths) throw new Error(`Unknown icon: ${name}`);

    const opts = { ...ICON_DEFAULTS, ...overrides };

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", opts.width);
    svg.setAttribute("height", opts.height);
    svg.setAttribute("viewBox", opts.viewBox);
    svg.setAttribute("fill", opts.fill);
    svg.setAttribute("stroke", opts.stroke);
    svg.setAttribute("stroke-width", opts.strokeWidth);
    svg.setAttribute("stroke-linecap", opts.strokeLinecap);
    svg.setAttribute("stroke-linejoin", opts.strokeLinejoin);

    for (const d of paths) {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", d);
        svg.appendChild(path);
    }

    return svg;
};
