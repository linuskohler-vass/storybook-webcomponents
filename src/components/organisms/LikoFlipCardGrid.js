import { tw } from "../../utils/tw.js";
import { ElementBase } from "../../utils/element-base.js";
import { attr, escapeHtml } from "../../utils/html.js";

/**
 * Pure render function — no browser globals, safe to run on the server.
 */
export const renderLikoFlipCardGrid = ({ heading, cards = [] }) => {
    if (cards.length === 0) return "";

    const headingHtml = heading
        ? `<span class="${tw`block text-center text-2xl font-semibold text-text`}">${escapeHtml(heading)}</span>`
        : "";

    const items = cards
        .map(
            (card) =>
                `<liko-flip-card${attr("heading", card.heading)}${attr("text", card.text)} class="${tw`h-60 md:h-80`}"></liko-flip-card>`,
        )
        .join("");

    return `<div class="${tw`flex flex-col gap-6`}">${headingHtml}<div class="${tw`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4`}">${items}</div></div>`;
};

export class LikoFlipCardGrid extends ElementBase {
    static get observedAttributes() {
        return ["heading"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this.isConnected) {
            this.render();
        }
    }

    get cards() {
        return this._cards || [];
    }

    set cards(value) {
        this._cards = value;
        if (this.isConnected) this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = renderLikoFlipCardGrid({
            heading: this.getAttribute("heading"),
            cards: this.cards,
        });
    }
}

export const LikoFlipCardGridExport = ({ heading, cards = [] }) => {
    const el = document.createElement("liko-flip-card-grid");
    if (heading) el.setAttribute("heading", heading);
    el.cards = cards;
    return el;
};
