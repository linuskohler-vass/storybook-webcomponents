import { tw } from "../../utils/tw.js";
import { ElementBase } from "../../utils/element-base.js";
import { attr } from "../../utils/html.js";

/** Pure helper — derives the sorted, de-duplicated tag list from cards. */
export const getLikoCardFilterTags = (cards = []) =>
    [...new Set(cards.flatMap((card) => (card.tags || []).map((t) => t.label)))].sort();

/**
 * Pure render function — no browser globals, safe to run on the server.
 */
export const renderLikoCardFilter = ({ filterLabel }) =>
    `<div><liko-filter-bar${attr("label", filterLabel)}></liko-filter-bar><liko-card-grid class="${tw`mt-6`}"></liko-card-grid></div>`;

export class LikoCardFilter extends ElementBase {
    static get observedAttributes() {
        return ["filter-label"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
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
        this.innerHTML = renderLikoCardFilter({
            filterLabel: this.getAttribute("filter-label"),
        });

        const filterBar = this.querySelector("liko-filter-bar");
        filterBar.tags = getLikoCardFilterTags(this.cards);
        filterBar.activeTags = this._activeTags || [];
        filterBar.addEventListener("filter-change", (e) => {
            this._activeTags = e.detail.activeTags;
            this.updateGrid();
        });

        this._gridEl = this.querySelector("liko-card-grid");
        this._gridEl.cards = this.getFilteredCards();
    }

    getFilteredCards() {
        const active = this._activeTags || [];
        if (active.length === 0) return this.cards;
        return this.cards.filter((card) => (card.tags || []).some((t) => active.includes(t.label)));
    }

    updateGrid() {
        if (this._gridEl) {
            this._gridEl.cards = this.getFilteredCards();
        }
    }
}

export const LikoCardFilterExport = ({ filterLabel, cards = [] }) => {
    const filter = document.createElement("liko-card-filter");
    if (filterLabel) filter.setAttribute("filter-label", filterLabel);
    filter.cards = cards;
    return filter;
};
