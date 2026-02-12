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
