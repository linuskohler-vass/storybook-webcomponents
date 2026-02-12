import { LikoStackCardExport } from "@/components/atoms/LikoStackCard";

export default {
    title: "Atoms/LikoStackCard",
    tags: ["autodocs"],
    render: (args) => LikoStackCardExport(args),
    argTypes: {
        imageSrc: { control: "text" },
        imageAlt: { control: "text" },
        caption: { control: "text" },
    },
};

export const ImageOnly = {
    args: {
        imageSrc: "https://placehold.co/400x530/4a564b/ffffff?text=Mountain",
        imageAlt: "Mountain landscape",
    },
};

export const WithCaption = {
    args: {
        imageSrc: "https://placehold.co/400x530/627663/ffffff?text=Ocean",
        imageAlt: "Ocean view",
        caption: "A beautiful sunset over the calm ocean waves",
    },
};
