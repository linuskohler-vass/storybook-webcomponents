import { fn } from "storybook/test";

import { LikoProjectDetailExport } from "@/components/pages/LikoProjectDetail";

export default {
    title: "Pages/LikoProjectDetail",
    tags: ["autodocs"],
    render: (args) => LikoProjectDetailExport(args),
    argTypes: {
        title: { control: "text" },
        subtitle: { control: "text" },
        description: { control: "text" },
        buttonLabel: { control: "text" },
        metaItems: { control: "object" },
        cards: { control: "object" },
    },
    args: { onButtonClick: fn() },
};

export const Default = {
    args: {
        title: "Alpine Retreat Resort",
        subtitle: "A luxury mountain getaway",
        description:
            "Nestled in the heart of the Swiss Alps, this resort offers an unparalleled experience of nature and comfort. Every detail has been carefully crafted to provide guests with a serene escape from the everyday hustle.",
        buttonLabel: "Visit Project",
        metaItems: [
            { label: "Client", value: "Alpine Hospitality Group" },
            { label: "Year", value: "2025" },
            { label: "Category", value: "Hospitality & Tourism" },
            { label: "Role", value: "Lead Design & Development" },
            { label: "Location", value: "Grindelwald, Switzerland" },
            { label: "Duration", value: "8 months" },
        ],
        cards: [
            {
                imageSrc: "https://placehold.co/700x530/4a564b/ffffff?text=Lobby",
                imageAlt: "Resort lobby",
                caption: "The grand lobby with panoramic mountain views",
            },
            {
                imageSrc: "https://placehold.co/700x530/627663/ffffff?text=Suite",
                imageAlt: "Luxury suite",
                caption: "Spacious suites with floor-to-ceiling windows",
            },
            {
                imageSrc: "https://placehold.co/700x530/7d937e/ffffff?text=Spa",
                imageAlt: "Spa area",
                caption: "A world-class spa and wellness center",
            },
            {
                imageSrc: "https://placehold.co/700x530/322f2f/ffffff?text=Restaurant",
                imageAlt: "Restaurant",
                caption: "Fine dining with locally sourced ingredients",
            },
        ],
    },
};

export const WithoutButton = {
    args: {
        title: "Urban Photography Series",
        subtitle: "Capturing city life",
        description:
            "A curated collection of street photography exploring the rhythm and energy of modern urban environments across Europe.",
        metaItems: [
            { label: "Artist", value: "Linus Kohler" },
            { label: "Year", value: "2024" },
            { label: "Medium", value: "Digital Photography" },
            { label: "Exhibited", value: "Zurich Art Week" },
        ],
        cards: [
            {
                imageSrc: "https://placehold.co/700x530/322f2f/ffffff?text=Street+1",
                imageAlt: "Street scene",
                caption: "Morning rush in the old town",
            },
            {
                imageSrc: "https://placehold.co/700x530/7c7272/ffffff?text=Street+2",
                imageAlt: "Architecture",
                caption: "Reflections on glass facades",
            },
            {
                imageSrc: "https://placehold.co/700x530/655757/ffffff?text=Street+3",
                imageAlt: "Night scene",
            },
        ],
    },
};
