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
                imageSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=530&fit=crop",
                imageAlt: "Mountain landscape",
                caption: "Escape to the serene mountains",
            },
            {
                imageSrc: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=530&fit=crop",
                imageAlt: "Ocean view",
                caption: "Relax by the coast with golden sunsets",
            },
            {
                imageSrc: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=530&fit=crop",
                imageAlt: "Forest path",
                caption: "Discover hidden trails through ancient forests",
            },
            {
                imageSrc: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=530&fit=crop",
                imageAlt: "City skyline",
                caption: "Experience the vibrant nightlife",
            },
            {
                imageSrc: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=530&fit=crop",
                imageAlt: "Desert landscape",
            },
        ],
    },
};

export const ImageOnly = {
    args: {
        cards: [
            {
                imageSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=530&fit=crop",
                imageAlt: "Card one",
            },
            {
                imageSrc: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=530&fit=crop",
                imageAlt: "Card two",
            },
            {
                imageSrc: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=530&fit=crop",
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
                imageSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&h=530&fit=crop",
                imageAlt: "Mountain landscape",
                caption: "Escape to the serene mountains",
            },
            {
                imageSrc: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&h=530&fit=crop",
                imageAlt: "Ocean view",
                caption: "Relax by the coast with golden sunsets",
            },
            {
                imageSrc: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=700&h=530&fit=crop",
                imageAlt: "Forest path",
                caption: "Discover hidden trails through ancient forests",
            },
            {
                imageSrc: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=700&h=530&fit=crop",
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
                imageSrc: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=530&fit=crop",
                imageAlt: "Front card",
                caption: "This is the front card",
            },
            {
                imageSrc: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=530&fit=crop",
                imageAlt: "Back card",
                caption: "This is the back card",
            },
        ],
    },
};
