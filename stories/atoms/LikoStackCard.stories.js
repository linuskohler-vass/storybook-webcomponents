import { LikoStackCardExport } from "@/components/atoms/LikoStackCard";

export default {
    title: "Atoms/LikoStackCard",
    tags: ["autodocs"],
    render: (args) => LikoStackCardExport(args),
    argTypes: {
        imageSrc: { control: "text" },
        imageAlt: { control: "text" },
        caption: { control: "text" },
        orientation: { control: "select", options: ["portrait", "landscape"] },
        text: { control: "text" },
        textTitle: { control: "text" },
    },
};

export const ImageOnly = {
    args: {
        imageSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=530&fit=crop",
        imageAlt: "Mountain landscape",
    },
};

export const WithCaption = {
    args: {
        imageSrc: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=530&fit=crop",
        imageAlt: "Ocean view",
        caption: "A beautiful sunset over the calm ocean waves",
    },
};

export const Landscape = {
    args: {
        imageSrc: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=700&h=530&fit=crop",
        imageAlt: "Panoramic view",
        caption: "A wide panoramic landscape view",
        orientation: "landscape",
    },
};

export const TextOnly = {
    args: {
        textTitle: "Dream Big",
        text: "The future belongs to those who believe in the beauty of their dreams.",
    },
};
