import { fn } from "storybook/test";

import { LikoButtonExport } from "@/components/atoms/LikoButton";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
    title: "Atoms/LikoButton",
    tags: ["autodocs"],
    render: (args) => LikoButtonExport(args),
    argTypes: {
        backgroundColor: { control: "color" },
        size: {
            control: { type: "select" },
            options: ["small", "medium", "large"],
        },
    },
    args: { onClick: fn() },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
    args: {
        primary: true,
        label: "Button",
    },
};

export const Secondary = {
    args: {
        label: "Button",
    },
};

export const Large = {
    args: {
        size: "large",
        label: "Button",
    },
};

export const Small = {
    args: {
        size: "small",
        label: "Button",
    },
};
