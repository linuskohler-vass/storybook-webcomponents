import { tw } from "../../utils/tw.js";
import "../molecules/LikoFilterBar";
import "../organisms/LikoCardGrid";

class LikoCardFilter extends HTMLElement {
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
        this.innerHTML = "";

        const allTags = [
            ...new Set(this.cards.flatMap((card) => (card.tags || []).map((t) => t.label))),
        ].sort();

        const wrapper = document.createElement("div");
        wrapper.className = tw`font-nunito-sans`;

        const filterLabel = this.getAttribute("filter-label");

        const filterBar = document.createElement("liko-filter-bar");
        if (filterLabel) filterBar.setAttribute("label", filterLabel);
        filterBar.tags = allTags;
        filterBar.activeTags = this._activeTags || [];
        filterBar.addEventListener("filter-change", (e) => {
            this._activeTags = e.detail.activeTags;
            this.updateGrid();
        });
        wrapper.appendChild(filterBar);

        const grid = document.createElement("liko-card-grid");
        grid.className = tw`mt-6`;
        grid.cards = this.getFilteredCards();
        this._gridEl = grid;
        wrapper.appendChild(grid);

        this.appendChild(wrapper);
    }

    getFilteredCards() {
        const active = this._activeTags || [];
        if (active.length === 0) return this.cards;
        return this.cards.filter((card) =>
            (card.tags || []).some((t) => active.includes(t.label)),
        );
    }

    updateGrid() {
        if (this._gridEl) {
            this._gridEl.cards = this.getFilteredCards();
        }
    }
}

if (!customElements.get("liko-card-filter")) {
    customElements.define("liko-card-filter", LikoCardFilter);
}

export const LikoCardFilterExport = ({ filterLabel, cards = [] }) => {
    const filter = document.createElement("liko-card-filter");
    if (filterLabel) filter.setAttribute("filter-label", filterLabel);
    filter.cards = cards;
    return filter;
};
