import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import storybookPlugin from "eslint-plugin-storybook";
import globals from "globals";

export default defineConfig([
    {
        ignores: ["**/*.template.js", "!.storybook"],
    },
    // ESLint recommended rules for all files
    js.configs.recommended,
    // Custom rules for src and stories files
    {
        files: ["src/**/*.{js,mjs,cjs}", "stories/**/*.{js,mjs,cjs}"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser,
            },
        },
        rules: {
            "no-console": ["warn", { allow: ["warn", "error"] }],
            quotes: ["warn", "double"],
            semi: ["warn", "always"],
        },
    },
    // Storybook-specific rules for story files
    ...storybookPlugin.configs['flat/recommended'],
]);
