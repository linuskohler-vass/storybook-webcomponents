import { tw } from "../../utils/tw.js";
import "../molecules/LikoCard";

class LikoCardGrid extends HTMLElement {
    get cards() {
        return this._cards || [];
    }

    set cards(value) {
        this._cards = value;
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = "";

        const grid = document.createElement("div");
        grid.className = tw`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3`;

        for (const card of this.cards) {
            const el = document.createElement("liko-card");
            if (card.heading) el.setAttribute("heading", card.heading);
            if (card.text) el.setAttribute("text", card.text);
            if (card.imageSrc) el.setAttribute("image-src", card.imageSrc);
            if (card.imageAlt) el.setAttribute("image-alt", card.imageAlt);
            if (card.buttonLabel) el.setAttribute("button-label", card.buttonLabel);
            if (card.buttonUrl) el.setAttribute("button-url", card.buttonUrl);
            if (card.buttonTarget) el.setAttribute("button-target", card.buttonTarget);
            if (card.tags) el.tags = card.tags;
            grid.appendChild(el);
        }

        this.appendChild(grid);
    }
}

if (!customElements.get("liko-card-grid")) {
    customElements.define("liko-card-grid", LikoCardGrid);
}

export const LikoCardGridExport = ({ cards = [] }) => {
    const grid = document.createElement("liko-card-grid");
    grid.cards = cards;
    return grid;
};
