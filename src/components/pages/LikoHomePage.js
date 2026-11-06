import { tw } from "../../utils/tw.js";
import { ElementBase } from "../../utils/element-base.js";
import { attr, escapeHtml } from "../../utils/html.js";

/**
 * Pure render function — no browser globals, safe to run on the server.
 */
export const renderLikoHomePage = ({
    title = "",
    subtitle = "",
    description = "",
    description2 = "",
    filterLabel = "",
    filterHeading = "",
    bottomHeading = "",
    bottomDescription = "",
    stackCards = [],
    filterCards = [],
    flipCards = [],
}) => {
    const textCol = `<div class="${tw`flex-1`}">${title ? `<h1>${escapeHtml(title)}</h1>` : ""}${subtitle ? `<h2>${escapeHtml(subtitle)}</h2>` : ""}${description ? `<p>${escapeHtml(description)}</p>` : ""}${description2 ? `<p>${escapeHtml(description2)}</p>` : ""}</div>`;

    const stackCol =
        stackCards.length > 0
            ? `<div class="${tw`w-full flex-1`}"><liko-card-stack data-stack></liko-card-stack></div>`
            : "";

    const hero = `<div class="${tw`flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16`}">${textCol}${stackCol}</div>`;

    const filterSection =
        filterCards.length > 0
            ? `<section class="${tw`mt-16 xl:mt-24`}">${filterHeading ? `<h2>${escapeHtml(filterHeading)}</h2>` : ""}<liko-card-filter${attr("filter-label", filterLabel)} data-filter></liko-card-filter></section>`
            : "";

    let bottomSection = "";
    if (bottomHeading || flipCards.length > 0) {
        const headingHtml = bottomHeading ? `<h2>${escapeHtml(bottomHeading)}</h2>` : "";
        const descriptionHtml = bottomDescription ? `<p>${escapeHtml(bottomDescription)}</p>` : "";
        const gridHtml = flipCards.length > 0 ? "<liko-flip-card-grid data-flip-grid></liko-flip-card-grid>" : "";
        bottomSection = `<section class="${tw`mt-16 xl:mt-24`}">${headingHtml}${descriptionHtml}${gridHtml}</section>`;
    }

    return `<div class="${tw`mx-auto max-w-6xl px-6 py-12`}">${hero}${filterSection}${bottomSection}</div>`;
};

export class LikoHomePage extends ElementBase {
    static get observedAttributes() {
        return [
            "title",
            "subtitle",
            "description",
            "filter-label",
            "filter-heading",
            "bottom-heading",
            "bottom-description",
        ];
    }

    get stackCards() {
        return this._stackCards || [];
    }

    set stackCards(value) {
        this._stackCards = value;
        if (this.isConnected) this.render();
    }

    get filterCards() {
        return this._filterCards || [];
    }

    set filterCards(value) {
        this._filterCards = value;
        if (this.isConnected) this.render();
    }

    get textCards() {
        return this._textCards || [];
    }

    set textCards(value) {
        this._textCards = value;
        if (this.isConnected) this.render();
    }

    get flipCards() {
        return this._flipCards || [];
    }

    set flipCards(value) {
        this._flipCards = value;
        if (this.isConnected) this.render();
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        this.innerHTML = renderLikoHomePage({
            title: this.getAttribute("title") || "",
            subtitle: this.getAttribute("subtitle") || "",
            description: this.getAttribute("description") || "",
            description2: this.getAttribute("description2") || "",
            filterLabel: this.getAttribute("filter-label") || "",
            filterHeading: this.getAttribute("filter-heading") || "",
            bottomHeading: this.getAttribute("bottom-heading") || "",
            bottomDescription: this.getAttribute("bottom-description") || "",
            stackCards: this.stackCards,
            filterCards: this.filterCards,
            flipCards: this.flipCards,
        });

        const stack = this.querySelector("[data-stack]");
        if (stack) stack.cards = this.stackCards;

        const filter = this.querySelector("[data-filter]");
        if (filter) filter.cards = this.filterCards;

        const flipGrid = this.querySelector("[data-flip-grid]");
        if (flipGrid) flipGrid.cards = this.flipCards;
    }
}

export const LikoHomePageExport = ({
    title,
    subtitle,
    description,
    description2,
    filterLabel,
    filterHeading,
    bottomHeading,
    bottomDescription,
    stackCards = [],
    filterCards = [],
    textCards = [],
    flipCards = [],
}) => {
    const el = document.createElement("liko-home-page");
    if (title) el.setAttribute("title", title);
    if (subtitle) el.setAttribute("subtitle", subtitle);
    if (description) el.setAttribute("description", description);
    if (description2) el.setAttribute("description2", description2);
    if (filterLabel) el.setAttribute("filter-label", filterLabel);
    if (filterHeading) el.setAttribute("filter-heading", filterHeading);
    if (bottomHeading) el.setAttribute("bottom-heading", bottomHeading);
    if (bottomDescription) el.setAttribute("bottom-description", bottomDescription);
    el.stackCards = stackCards;
    el.filterCards = filterCards;
    el.textCards = textCards;
    el.flipCards = flipCards;
    return el;
};
