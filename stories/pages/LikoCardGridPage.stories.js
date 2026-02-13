import { fn } from "storybook/test";

import { LikoCardGridPageExport } from "@/components/pages/LikoCardGridPage";

export default {
    title: "Pages/LikoCardGridPage",
    tags: ["autodocs"],
    render: (args) => LikoCardGridPageExport(args),
    argTypes: {
        title: { control: "text" },
        subtitle: { control: "text" },
        description: { control: "text" },
        buttonLabel: { control: "text" },
    },
    args: { onButtonClick: fn() },
};

export const Default = {
    args: {
        title: "Our Destinations",
        subtitle: "Handpicked experiences for you",
        description:
            "Browse our curated collection of unique travel destinations. Each one has been carefully selected to offer you an unforgettable experience.",
        buttonLabel: "Get Started",
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
                tags: [{ label: "Adventure" }],
            },
        ],
    },
};
