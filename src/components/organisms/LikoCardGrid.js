import { tw } from "../../utils/tw.js";
import { ElementBase } from "../../utils/element-base.js";
import { attr } from "../../utils/html.js";

const likoCardTag = (card, i) =>
    `<liko-card${attr("heading", card.heading)}${attr("text", card.text)}${attr("image-src", card.imageSrc)}${attr("image-alt", card.imageAlt)}${attr("button-label", card.buttonLabel)}${attr("button-url", card.buttonUrl)}${attr("button-target", card.buttonTarget)} data-index="${i}"></liko-card>`;

/**
 * Pure render function — no browser globals, safe to run on the server.
 */
export const renderLikoCardGrid = ({ cards = [] }) => {
    const items = cards.map((card, i) => likoCardTag(card, i)).join("");
    return `<div class="${tw`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3`}">${items}</div>`;
};

export class LikoCardGrid extends ElementBase {
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
        this.innerHTML = renderLikoCardGrid({ cards: this.cards });

        for (const el of this.querySelectorAll("liko-card")) {
            const tags = this.cards[Number(el.dataset.index)]?.tags;
            if (tags) el.tags = tags;
        }
    }
}

export const LikoCardGridExport = ({ cards = [] }) => {
    const grid = document.createElement("liko-card-grid");
    grid.cards = cards;
    return grid;
};
