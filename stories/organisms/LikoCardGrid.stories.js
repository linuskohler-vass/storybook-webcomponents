import { LikoCardGridExport } from "@/components/organisms/LikoCardGrid";

export default {
    title: "Organisms/LikoCardGrid",
    tags: ["autodocs"],
    render: (args) => LikoCardGridExport(args),
};

export const Default = {
    args: {
        cards: [
            {
                heading: "Mountain Retreat",
                text: "Escape to the serene mountains and enjoy breathtaking views with fresh alpine air.",
                imageSrc: "https://placehold.co/600x400/4a564b/ffffff?text=Mountains",
                imageAlt: "Mountain landscape",
                buttonLabel: "Book Now",
                tags: [{ label: "Nature", primary: true }, { label: "Popular" }],
            },
            {
                heading: "Ocean Breeze",
                text: "Relax by the coast with the soothing sound of waves and golden sunsets.",
                imageSrc: "https://placehold.co/600x400/627663/ffffff?text=Ocean",
                imageAlt: "Ocean view",
                buttonLabel: "Explore",
                tags: [{ label: "Beach" }, { label: "Relaxation", primary: true }],
            },
            {
                heading: "Forest Walk",
                text: "Discover hidden trails through ancient forests and reconnect with nature.",
                imageSrc: "https://placehold.co/600x400/7d937e/ffffff?text=Forest",
                imageAlt: "Forest path",
                buttonLabel: "Enjoy",
                tags: [{ label: "Adventure" }],
            },
        ],
    },
};

export const TwoCards = {
    args: {
        cards: [
            {
                heading: "City Lights",
                text: "Experience the vibrant nightlife and cultural richness of the city.",
                imageSrc: "https://placehold.co/600x400/322f2f/ffffff?text=City",
                imageAlt: "City skyline",
                buttonLabel: "Discover",
                tags: [{ label: "Urban", primary: true }],
            },
            {
                heading: "Desert Dunes",
                text: "Witness the vast golden dunes stretching endlessly under a clear sky.",
                imageSrc: "https://placehold.co/600x400/7c7272/ffffff?text=Desert",
                imageAlt: "Desert landscape",
                tags: [{ label: "Exotic" }, { label: "Adventure" }],
            },
        ],
    },
};

export const SixCards = {
    args: {
        cards: [
            {
                heading: "Mountain Retreat",
                text: "Escape to the serene mountains.",
                imageSrc: "https://placehold.co/600x400/4a564b/ffffff?text=Mountains",
                imageAlt: "Mountains",
                buttonLabel: "Book Now",
                tags: [{ label: "Nature", primary: true }],
            },
            {
                heading: "Ocean Breeze",
                text: "Relax by the coast.",
                imageSrc: "https://placehold.co/600x400/627663/ffffff?text=Ocean",
                imageAlt: "Ocean",
                buttonLabel: "Explore",
                tags: [{ label: "Beach" }],
            },
            {
                heading: "Forest Walk",
                text: "Discover hidden trails.",
                imageSrc: "https://placehold.co/600x400/7d937e/ffffff?text=Forest",
                imageAlt: "Forest",
                tags: [{ label: "Adventure" }, { label: "Nature" }],
            },
            {
                heading: "City Lights",
                text: "Experience the vibrant nightlife.",
                imageSrc: "https://placehold.co/600x400/322f2f/ffffff?text=City",
                imageAlt: "City",
                buttonLabel: "Discover",
                tags: [{ label: "Urban", primary: true }],
            },
            {
                heading: "Desert Dunes",
                text: "Witness the vast golden dunes.",
                imageSrc: "https://placehold.co/600x400/7c7272/ffffff?text=Desert",
                imageAlt: "Desert",
            },
            {
                heading: "Lake Serenity",
                text: "Find peace by the still waters.",
                imageSrc: "https://placehold.co/600x400/95b196/ffffff?text=Lake",
                imageAlt: "Lake",
                buttonLabel: "Visit",
                tags: [{ label: "Relaxation", primary: true }, { label: "Nature" }],
            },
        ],
    },
};
