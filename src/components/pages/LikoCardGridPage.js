import { tw } from "../../utils/tw.js";
import "../organisms/LikoCardGrid";
import { LikoButtonExport } from "../atoms/LikoButton";

class LikoCardGridPage extends HTMLElement {
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
        const title = this.getAttribute("title") || "";
        const subtitle = this.getAttribute("subtitle") || "";
        const description = this.getAttribute("description") || "";

        this.innerHTML = "";

        const wrapper = document.createElement("div");
        wrapper.className = tw`mx-auto max-w-6xl px-6 py-12 font-nunito-sans`;

        const h1 = document.createElement("h1");
        h1.textContent = title;
        wrapper.appendChild(h1);

        const h2 = document.createElement("h2");
        h2.textContent = subtitle;
        wrapper.appendChild(h2);

        const p = document.createElement("p");
        p.className = tw`max-w-2xl`;
        p.textContent = description;
        wrapper.appendChild(p);

        const btnWrapper = document.createElement("div");
        btnWrapper.className = tw`mb-10`;
        const btn = LikoButtonExport({
            label: this.getAttribute("button-label") || "Get Started",
            primary: true,
            size: "large",
            onClick: () => this.dispatchEvent(new CustomEvent("button-click", { bubbles: true })),
        });
        btnWrapper.appendChild(btn);
        wrapper.appendChild(btnWrapper);

        const grid = document.createElement("liko-card-grid");
        grid.cards = this.cards;
        wrapper.appendChild(grid);

        this.appendChild(wrapper);
    }
}

if (!customElements.get("liko-card-grid-page")) {
    customElements.define("liko-card-grid-page", LikoCardGridPage);
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
