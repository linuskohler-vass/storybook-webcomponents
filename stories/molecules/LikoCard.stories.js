import { fn } from "storybook/test";

import { LikoCardExport } from "@/components/molecules/LikoCard";

export default {
    title: "Molecules/LikoCard",
    tags: ["autodocs"],
    render: (args) => LikoCardExport(args),
    argTypes: {
        heading: { control: "text" },
        text: { control: "text" },
        imageSrc: { control: "text" },
        imageAlt: { control: "text" },
        buttonLabel: { control: "text" },
        tags: { control: "object" },
    },
    args: { onButtonClick: fn() },
};

export const Default = {
    args: {
        heading: "Card Heading",
        text: "This is some descriptive text that goes below the heading to provide more details about the card content.",
        imageSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
        imageAlt: "Placeholder image",
    },
};

export const WithoutImage = {
    args: {
        heading: "Card Heading",
        text: "This is a card without an image, showing only the heading and text content.",
    },
};

export const HeadingOnly = {
    args: {
        heading: "Card Heading",
        imageSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
        imageAlt: "Placeholder image",
    },
};

export const WithButton = {
    args: {
        heading: "Card Heading",
        text: "This card has an action button at the bottom.",
        imageSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
        imageAlt: "Placeholder image",
        buttonLabel: "Learn More",
    },
};

export const WithTags = {
    args: {
        heading: "Card Heading",
        text: "This card displays tags between the image and the content.",
        imageSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
        imageAlt: "Placeholder image",
        tags: [{ label: "Nature" }, { label: "Adventure" }],
    },
};

export const WithTagsAndButton = {
    args: {
        heading: "Card Heading",
        text: "A fully featured card with image, tags, and a button.",
        imageSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
        imageAlt: "Placeholder image",
        buttonLabel: "Learn More",
        tags: [{ label: "Featured" }, { label: "New" }, { label: "Popular" }],
    },
};
