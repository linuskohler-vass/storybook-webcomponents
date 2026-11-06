import { tw } from "../../utils/tw.js";
import { ElementBase } from "../../utils/element-base.js";
import { attr, escapeHtml } from "../../utils/html.js";

/**
 * Pure render function — no browser globals, safe to run on the server.
 */
export const renderLikoCardGridPage = ({ title = "", subtitle = "", description = "", buttonLabel }) => {
    const button = `<div class="${tw`mb-10`}"><liko-button${attr("label", buttonLabel || "Get Started")} primary size="large" data-page-button></liko-button></div>`;

    return `<div class="${tw`mx-auto max-w-6xl px-6 py-12`}"><h1>${escapeHtml(title)}</h1><h2>${escapeHtml(subtitle)}</h2><p>${escapeHtml(description)}</p>${button}<liko-card-grid></liko-card-grid></div>`;
};

export class LikoCardGridPage extends ElementBase {
    get cards() {
        return this._cards || [];
    }

    set cards(value) {
        this._cards = value;
        if (this.isConnected) this.render();
    }

    static get observedAttributes() {
        return ["title", "subtitle", "description"];
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
        this.innerHTML = renderLikoCardGridPage({
            title: this.getAttribute("title") || "",
            subtitle: this.getAttribute("subtitle") || "",
            description: this.getAttribute("description") || "",
            buttonLabel: this.getAttribute("button-label"),
        });

        this.querySelector("[data-page-button]")?.addEventListener("click", () =>
            this.dispatchEvent(new CustomEvent("button-click", { bubbles: true })),
        );

        this.querySelector("liko-card-grid").cards = this.cards;
    }
}

export const LikoCardGridPageExport = ({ title, subtitle, description, buttonLabel, cards = [], onButtonClick }) => {
    const page = document.createElement("liko-card-grid-page");
    if (title) page.setAttribute("title", title);
    if (subtitle) page.setAttribute("subtitle", subtitle);
    if (description) page.setAttribute("description", description);
    if (buttonLabel) page.setAttribute("button-label", buttonLabel);
    if (onButtonClick) page.addEventListener("button-click", onButtonClick);
    page.cards = cards;
    return page;
};
