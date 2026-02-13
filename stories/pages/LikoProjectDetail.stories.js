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
        buttons: { control: "object" },
        metaItems: { control: "object" },
        cards: { control: "object" },
    },
};

export const Default = {
    args: {
        title: "Alpine Retreat Resort",
        subtitle: "A luxury mountain getaway",
        description:
            "Nestled in the heart of the Swiss Alps, this resort offers an unparalleled experience of nature and comfort. Every detail has been carefully crafted to provide guests with a serene escape from the everyday hustle.",
        buttons: [
            { label: "Visit Project", primary: true, onClick: fn() },
            { label: "Contact Us", onClick: fn() },
        ],
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
                imageSrc: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&h=530&fit=crop",
                imageAlt: "Resort lobby",
                caption: "The grand lobby with panoramic mountain views",
            },
            {
                imageSrc: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=700&h=530&fit=crop",
                imageAlt: "Luxury suite",
                caption: "Spacious suites with floor-to-ceiling windows",
            },
            {
                imageSrc: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=700&h=530&fit=crop",
                imageAlt: "Spa area",
                caption: "A world-class spa and wellness center",
            },
            {
                imageSrc: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&h=530&fit=crop",
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
                imageSrc: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=700&h=530&fit=crop",
                imageAlt: "Street scene",
                caption: "Morning rush in the old town",
            },
            {
                imageSrc: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=700&h=530&fit=crop",
                imageAlt: "Architecture",
                caption: "Reflections on glass facades",
            },
            {
                imageSrc: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=700&h=530&fit=crop",
                imageAlt: "Night scene",
            },
        ],
    },
};
