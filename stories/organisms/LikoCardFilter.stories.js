import { LikoCardFilterExport } from "@/components/organisms/LikoCardFilter";

export default {
    title: "Organisms/LikoCardFilter",
    tags: ["autodocs"],
    render: (args) => LikoCardFilterExport(args),
    argTypes: {
        filterLabel: { control: "text" },
    },
};

export const Default = {
    args: {
        filterLabel: "Filter by:",
        cards: [
            {
                heading: "Mountain Retreat",
                text: "Escape to the serene mountains and enjoy breathtaking views with fresh alpine air.",
                imageSrc: "https://placehold.co/600x400/4a564b/ffffff?text=Mountains",
                imageAlt: "Mountain landscape",
                buttonLabel: "Book Now",
                tags: [{ label: "Nature" }, { label: "Popular" }],
            },
            {
                heading: "Ocean Breeze",
                text: "Relax by the coast with the soothing sound of waves and golden sunsets.",
                imageSrc: "https://placehold.co/600x400/627663/ffffff?text=Ocean",
                imageAlt: "Ocean view",
                buttonLabel: "Explore",
                tags: [{ label: "Beach" }, { label: "Relaxation" }],
            },
            {
                heading: "Forest Walk",
                text: "Discover hidden trails through ancient forests and reconnect with nature.",
                imageSrc: "https://placehold.co/600x400/7d937e/ffffff?text=Forest",
                imageAlt: "Forest path",
                buttonLabel: "Enjoy",
                tags: [{ label: "Adventure" }, { label: "Nature" }],
            },
            {
                heading: "City Lights",
                text: "Experience the vibrant nightlife and cultural richness of the city.",
                imageSrc: "https://placehold.co/600x400/322f2f/ffffff?text=City",
                imageAlt: "City skyline",
                buttonLabel: "Discover",
                tags: [{ label: "Urban" }],
            },
            {
                heading: "Desert Dunes",
                text: "Witness the vast golden dunes stretching endlessly under a clear sky.",
                imageSrc: "https://placehold.co/600x400/7c7272/ffffff?text=Desert",
                imageAlt: "Desert landscape",
                tags: [{ label: "Adventure" }, { label: "Exotic" }],
            },
            {
                heading: "Lake Serenity",
                text: "Find peace by the still waters of a pristine mountain lake.",
                imageSrc: "https://placehold.co/600x400/95b196/ffffff?text=Lake",
                imageAlt: "Lake view",
                buttonLabel: "Visit",
                tags: [{ label: "Relaxation" }, { label: "Nature" }],
            },
        ],
    },
};
