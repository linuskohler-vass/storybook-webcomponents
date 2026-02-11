import { fn } from "storybook/test";

import { LikoHeaderExport } from "@/components/LikoHeader";

export default {
    title: "Liko/LikoHeader",
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/web-components/vue/writing-docs/autodocs
    tags: ["autodocs"],
    render: (args) => LikoHeaderExport(args),
    args: {
        onLogin: fn(),
        onLogout: fn(),
        onCreateAccount: fn(),
    },
};
export const LoggedIn = {
    args: {
        user: {
            name: "Jane Doe",
        },
    },
};

export const LoggedOut = {};
