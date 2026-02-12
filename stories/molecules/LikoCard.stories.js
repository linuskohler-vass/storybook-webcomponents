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
    },
    args: { onButtonClick: fn() },
};

export const Default = {
    args: {
        heading: "Card Heading",
        text: "This is some descriptive text that goes below the heading to provide more details about the card content.",
        imageSrc: "https://placehold.co/600x400",
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
        imageSrc: "https://placehold.co/600x400",
        imageAlt: "Placeholder image",
    },
};

export const WithButton = {
    args: {
        heading: "Card Heading",
        text: "This card has an action button at the bottom.",
        imageSrc: "https://placehold.co/600x400",
        imageAlt: "Placeholder image",
        buttonLabel: "Learn More",
    },
};
