import { fn } from "storybook/test";

import { LikoCardStackExport } from "@/components/organisms/LikoCardStack";

export default {
    title: "Organisms/LikoCardStack",
    tags: ["autodocs"],
    render: (args) => LikoCardStackExport(args),
    argTypes: {
        cards: { control: "object" },
        orientation: { control: "select", options: ["portrait", "landscape"] },
    },
    args: { onCardChange: fn() },
};

export const Default = {
    args: {
        cards: [
            {
                imageSrc: "https://placehold.co/400x530/4a564b/ffffff?text=Mountains",
                imageAlt: "Mountain landscape",
                caption: "Escape to the serene mountains",
            },
            {
                imageSrc: "https://placehold.co/400x530/627663/ffffff?text=Ocean",
                imageAlt: "Ocean view",
                caption: "Relax by the coast with golden sunsets",
            },
            {
                imageSrc: "https://placehold.co/400x530/7d937e/ffffff?text=Forest",
                imageAlt: "Forest path",
                caption: "Discover hidden trails through ancient forests",
            },
            {
                imageSrc: "https://placehold.co/400x530/322f2f/ffffff?text=City",
                imageAlt: "City skyline",
                caption: "Experience the vibrant nightlife",
            },
            {
                imageSrc: "https://placehold.co/400x530/7c7272/ffffff?text=Desert",
                imageAlt: "Desert landscape",
            },
        ],
    },
};

export const ImageOnly = {
    args: {
        cards: [
            {
                imageSrc: "https://placehold.co/400x530/4a564b/ffffff?text=1",
                imageAlt: "Card one",
            },
            {
                imageSrc: "https://placehold.co/400x530/627663/ffffff?text=2",
                imageAlt: "Card two",
            },
            {
                imageSrc: "https://placehold.co/400x530/7d937e/ffffff?text=3",
                imageAlt: "Card three",
            },
        ],
    },
};

export const Landscape = {
    args: {
        orientation: "landscape",
        cards: [
            {
                imageSrc: "https://placehold.co/700x530/4a564b/ffffff?text=Mountains",
                imageAlt: "Mountain landscape",
                caption: "Escape to the serene mountains",
            },
            {
                imageSrc: "https://placehold.co/700x530/627663/ffffff?text=Ocean",
                imageAlt: "Ocean view",
                caption: "Relax by the coast with golden sunsets",
            },
            {
                imageSrc: "https://placehold.co/700x530/7d937e/ffffff?text=Forest",
                imageAlt: "Forest path",
                caption: "Discover hidden trails through ancient forests",
            },
            {
                imageSrc: "https://placehold.co/700x530/322f2f/ffffff?text=City",
                imageAlt: "City skyline",
            },
        ],
    },
};

export const TextOnly = {
    args: {
        orientation: "landscape",
        cards: [
            {
                textTitle: "AI Itineraries",
                text: "Personalised itineraries powered by AI — your perfect trip, planned in seconds.",
            },
            {
                textTitle: "Live Guides",
                text: "Live local guides connecting you with authentic experiences in real time.",
            },
            {
                textTitle: "Eco Scores",
                text: "Sustainable travel scores helping you make eco-conscious choices effortlessly.",
            },
            {
                textTitle: "AR Previews",
                text: "Augmented reality previews — explore destinations before you even pack your bags.",
            },
        ],
    },
};

export const TwoCards = {
    args: {
        cards: [
            {
                imageSrc: "https://placehold.co/400x530/95b196/ffffff?text=Front",
                imageAlt: "Front card",
                caption: "This is the front card",
            },
            {
                imageSrc: "https://placehold.co/400x530/322f2f/ffffff?text=Back",
                imageAlt: "Back card",
                caption: "This is the back card",
            },
        ],
    },
};
