import { tw } from "../../utils/tw.js";
import { ElementBase } from "../../utils/element-base.js";
import { escapeHtml } from "../../utils/html.js";

/**
 * Pure render function — no browser globals, safe to run on the server.
 */
export const renderLikoProjectDetail = ({
    title = "",
    subtitle = "",
    description = "",
    buttons = [],
    cards = [],
}) => {
    const titleHtml = title ? `<h1>${escapeHtml(title)}</h1>` : "";
    const subtitleHtml = subtitle ? `<h2>${escapeHtml(subtitle)}</h2>` : "";
    const descriptionHtml = description ? `<p>${escapeHtml(description)}</p>` : "";

    const buttonListHtml =
        buttons.length > 0 ? `<liko-button-list class="${tw`mb-10`}" data-button-list></liko-button-list>` : "";
    const stackHtml =
        cards.length > 0 ? "<liko-card-stack orientation=\"landscape\" data-stack></liko-card-stack>" : "";

    const aside = `<aside class="${tw`shrink-0 lg:w-64`}"><liko-meta-list data-meta-list></liko-meta-list></aside>`;
    const main = `<div class="${tw`flex min-w-0 flex-1 flex-col`}">${titleHtml}${subtitleHtml}${descriptionHtml}${buttonListHtml}${stackHtml}</div>`;

    return `<div class="${tw`mx-auto max-w-6xl px-6 py-12`}"><div class="${tw`flex flex-col gap-10 lg:flex-row lg:gap-16`}">${aside}${main}</div></div>`;
};

export class LikoProjectDetail extends ElementBase {
    static get observedAttributes() {
        return ["title", "subtitle", "description"];
    }

    get buttons() {
        return this._buttons || [];
    }

    set buttons(value) {
        this._buttons = value;
        if (this.isConnected) this.render();
    }

    get metaItems() {
        return this._metaItems || [];
    }

    set metaItems(value) {
        this._metaItems = value;
        if (this.isConnected) this.render();
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

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        this.innerHTML = renderLikoProjectDetail({
            title: this.getAttribute("title") || "",
            subtitle: this.getAttribute("subtitle") || "",
            description: this.getAttribute("description") || "",
            buttons: this.buttons,
            cards: this.cards,
        });

        this.querySelector("[data-meta-list]").items = this.metaItems;

        const btnList = this.querySelector("[data-button-list]");
        if (btnList) btnList.buttons = this.buttons;

        const stack = this.querySelector("[data-stack]");
        if (stack) stack.cards = this.cards;
    }
}

export const LikoProjectDetailExport = ({ title, subtitle, description, buttons = [], metaItems = [], cards = [] }) => {
    const el = document.createElement("liko-project-detail");
    if (title) el.setAttribute("title", title);
    if (subtitle) el.setAttribute("subtitle", subtitle);
    if (description) el.setAttribute("description", description);
    el.buttons = buttons;
    el.metaItems = metaItems;
    el.cards = cards;
    return el;
};
