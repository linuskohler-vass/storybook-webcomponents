import { LikoTagExport } from "@/components/atoms/LikoTag";

export default {
    title: "Atoms/LikoTag",
    tags: ["autodocs"],
    render: (args) => LikoTagExport(args),
    argTypes: {
        label: { control: "text" },
        toggleable: { control: "boolean" },
        active: { control: "boolean" },
    },
};

export const Default = {
    args: {
        label: "Tag",
    },
};

export const Toggleable = {
    args: {
        label: "Clickable Tag",
        toggleable: true,
    },
};

export const ToggleableActive = {
    args: {
        label: "Active Tag",
        toggleable: true,
        active: true,
    },
};
