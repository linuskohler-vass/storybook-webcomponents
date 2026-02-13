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
                imageSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
                imageAlt: "Mountain landscape",
                buttonLabel: "Book Now",
                tags: [{ label: "Nature" }, { label: "Popular" }],
            },
            {
                heading: "Ocean Breeze",
                text: "Relax by the coast with the soothing sound of waves and golden sunsets.",
                imageSrc: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
                imageAlt: "Ocean view",
                buttonLabel: "Explore",
                tags: [{ label: "Beach" }, { label: "Relaxation" }],
            },
            {
                heading: "Forest Walk",
                text: "Discover hidden trails through ancient forests and reconnect with nature.",
                imageSrc: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&h=400&fit=crop",
                imageAlt: "Forest path",
                buttonLabel: "Enjoy",
                tags: [{ label: "Adventure" }, { label: "Nature" }],
            },
            {
                heading: "City Lights",
                text: "Experience the vibrant nightlife and cultural richness of the city.",
                imageSrc: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&h=400&fit=crop",
                imageAlt: "City skyline",
                buttonLabel: "Discover",
                tags: [{ label: "Urban" }],
            },
            {
                heading: "Desert Dunes",
                text: "Witness the vast golden dunes stretching endlessly under a clear sky.",
                imageSrc: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&h=400&fit=crop",
                imageAlt: "Desert landscape",
                tags: [{ label: "Adventure" }, { label: "Exotic" }],
            },
            {
                heading: "Lake Serenity",
                text: "Find peace by the still waters of a pristine mountain lake.",
                imageSrc: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&h=400&fit=crop",
                imageAlt: "Lake view",
                buttonLabel: "Visit",
                tags: [{ label: "Relaxation" }, { label: "Nature" }],
            },
        ],
    },
};
