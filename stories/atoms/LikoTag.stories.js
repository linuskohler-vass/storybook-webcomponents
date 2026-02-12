import { LikoTagExport } from "@/components/atoms/LikoTag";

export default {
    title: "Atoms/LikoTag",
    tags: ["autodocs"],
    render: (args) => LikoTagExport(args),
    argTypes: {
        primary: { control: "boolean" },
        label: { control: "text" },
    },
};

export const Primary = {
    args: {
        primary: true,
        label: "Tag",
    },
};

export const Secondary = {
    args: {
        label: "Tag",
    },
};
