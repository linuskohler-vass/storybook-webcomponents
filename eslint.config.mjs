import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import storybookPlugin from "eslint-plugin-storybook";
import globals from "globals";

export default defineConfig([
    {
        ignores: ["**/*.template.js", "!.storybook"],
    },
    {
        files: ["src/components/**/*.{js,mjs,cjs}", "src/helpers/**/*.{js,mjs,cjs}", "src/pages/**/*.{js,mjs,cjs}"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser,
            },
        },
        plugins: { js, storybook: storybookPlugin },
        rules: {
            ...js.configs.recommended.rules,
            "no-console": ["warn", { allow: ["warn", "error"] }],
            quotes: ["warn", "double"],
            semi: ["warn", "always"],
        },
    },
]);
