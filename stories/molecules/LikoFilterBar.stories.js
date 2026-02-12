import { fn } from "storybook/test";

import { LikoFilterBarExport } from "@/components/molecules/LikoFilterBar";

export default {
    title: "Molecules/LikoFilterBar",
    tags: ["autodocs"],
    render: (args) => LikoFilterBarExport(args),
    argTypes: {
        label: { control: "text" },
        tags: { control: "object" },
        activeTags: { control: "object" },
    },
    args: { onFilterChange: fn() },
};

export const Default = {
    args: {
        label: "Filter by:",
        tags: ["Nature", "Beach", "Adventure", "Urban", "Relaxation"],
    },
};

export const WithActiveTags = {
    args: {
        label: "Filter by:",
        tags: ["Nature", "Beach", "Adventure", "Urban", "Relaxation"],
        activeTags: ["Nature", "Adventure"],
    },
};

export const WithoutLabel = {
    args: {
        tags: ["Nature", "Beach", "Adventure", "Urban", "Relaxation"],
    },
};
