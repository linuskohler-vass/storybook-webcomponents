import { LikoHomePageExport } from "@/components/pages/LikoHomePage";

export default {
    title: "Pages/LikoHomePage",
    tags: ["autodocs"],
    render: (args) => LikoHomePageExport(args),
    argTypes: {
        title: { control: "text" },
        subtitle: { control: "text" },
        description: { control: "text" },
        description2: { control: "text" },
        filterLabel: { control: "text" },
        filterHeading: { control: "text" },
        bottomHeading: { control: "text" },
        bottomDescription: { control: "text" },
        stackCards: { control: "object" },
        filterCards: { control: "object" },
        textCards: { control: "object" },
        flipCards: { control: "object" },
    },
};

export const Default = {
    args: {
        title: "Welcome to Liko",
        subtitle: "Discover curated experiences",
        description:
            "At Liko, we believe that every journey begins with a single moment of inspiration. Our platform brings together the finest destinations, activities, and stories from around the world — each one handpicked for those who seek something truly extraordinary. Whether you are drawn to the quiet majesty of snow-capped mountain peaks, the rhythmic calm of ocean waves at sunset, or the vibrant energy of a bustling city at night, we have something waiting for you.",
        description2:
            "Our team of passionate travelers and local experts works tirelessly to uncover hidden gems and craft experiences that go beyond the ordinary. From immersive cultural encounters to adrenaline-fueled adventures, every recommendation is rooted in authenticity and a deep respect for the places and people that make travel meaningful. We invite you to explore, dream, and plan your next unforgettable chapter with us. The world is vast, and the possibilities are endless — let Liko be your guide to discovering it all.",
        filterHeading: "Explore Our Destinations",
        filterLabel: "Filter by category",
        bottomHeading: "A Glimpse Into the Future",
        bottomDescription:
            "We are constantly evolving and expanding our horizons. Here are some hints about what is coming next — new destinations, innovative features, and experiences that will redefine the way you travel.",
        stackCards: [
            {
                imageSrc: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=530&fit=crop",
                imageAlt: "Mountain landscape",
                caption: "Escape to the serene mountains",
            },
            {
                imageSrc: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=530&fit=crop",
                imageAlt: "Ocean view",
                caption: "Relax by the coast",
            },
            {
                imageSrc: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=530&fit=crop",
                imageAlt: "Forest path",
                caption: "Discover hidden trails",
            },
            {
                imageSrc: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&h=530&fit=crop",
                imageAlt: "City skyline",
            },
        ],
        filterCards: [
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
                tags: [{ label: "Nature" }, { label: "Adventure" }],
            },
            {
                heading: "City Lights",
                text: "Experience the vibrant nightlife and cultural richness of modern cities.",
                imageSrc: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&h=400&fit=crop",
                imageAlt: "City skyline",
                buttonLabel: "Discover",
                tags: [{ label: "Urban" }, { label: "Popular" }],
            },
            {
                heading: "Desert Dunes",
                text: "Venture into the vast golden desert for an unforgettable adventure.",
                imageSrc: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&h=400&fit=crop",
                imageAlt: "Desert landscape",
                buttonLabel: "Explore",
                tags: [{ label: "Adventure" }],
            },
        ],
        flipCards: [
            {
                heading: "AI Itineraries",
                text: " Do not just generate fast output. Review it carefully and ensure consistency across the system. Build in safeguards: testing, validation, and alignment with architecture. What we build today should still be reliable tomorrow.",
            },
            {
                heading: "Live Guides",
                text: "Live local guides connecting you with authentic experiences in real time.",
            },
            {
                heading: "Eco Scores",
                text: "Sustainable travel scores helping you make eco-conscious choices effortlessly.",
            },
            {
                heading: "AR Previews",
                text: "Augmented reality previews — explore destinations before you even pack your bags.",
            },
        ],
    },
};
