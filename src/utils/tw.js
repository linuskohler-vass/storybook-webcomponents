/**
 * Simple template literal tag for Tailwind classes.
 * Allows prettier-plugin-tailwindcss to sort classes automatically.
 */
export const tw = (strings, ...values) => {
    return strings.reduce((acc, str, i) => acc + str + (values[i] || ""), "");
};
