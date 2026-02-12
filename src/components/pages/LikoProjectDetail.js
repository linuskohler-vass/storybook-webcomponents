import { tw } from "../../utils/tw.js";
import "../molecules/LikoMetaList";
import "../organisms/LikoCardStack";
import { LikoButtonExport } from "../atoms/LikoButton";

class LikoProjectDetail extends HTMLElement {
    static get observedAttributes() {
        return ["title", "subtitle", "description", "button-label"];
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
        const title = this.getAttribute("title") || "";
        const subtitle = this.getAttribute("subtitle") || "";
        const description = this.getAttribute("description") || "";
        const buttonLabel = this.getAttribute("button-label") || "";

        this.innerHTML = "";

        const wrapper = document.createElement("div");
        wrapper.className = tw`mx-auto max-w-6xl px-6 py-12`;

        const layout = document.createElement("div");
        layout.className = tw`flex flex-col gap-10 lg:flex-row lg:gap-16`;

        // --- Left side: Meta list ---
        const aside = document.createElement("aside");
        aside.className = tw`shrink-0 lg:w-64`;

        const metaList = document.createElement("liko-meta-list");
        metaList.items = this.metaItems;
        aside.appendChild(metaList);

        layout.appendChild(aside);

        // --- Right side: Content + Card stack ---
        const main = document.createElement("div");
        main.className = tw`flex min-w-0 flex-1 flex-col`;

        if (title) {
            const h1 = document.createElement("h1");
            h1.textContent = title;
            main.appendChild(h1);
        }

        if (subtitle) {
            const h2 = document.createElement("h2");
            h2.textContent = subtitle;
            main.appendChild(h2);
        }

        if (description) {
            const p = document.createElement("p");
            p.className = tw`text-foreground-60`;
            p.textContent = description;
            main.appendChild(p);
        }

        if (buttonLabel) {
            const btnWrapper = document.createElement("div");
            btnWrapper.className = tw`mb-10`;
            const btn = LikoButtonExport({
                label: buttonLabel,
                primary: true,
                size: "large",
                onClick: () => this.dispatchEvent(new CustomEvent("button-click", { bubbles: true })),
            });
            btnWrapper.appendChild(btn);
            main.appendChild(btnWrapper);
        }

        if (this.cards.length > 0) {
            const stack = document.createElement("liko-card-stack");
            stack.setAttribute("orientation", "landscape");
            stack.cards = this.cards;
            main.appendChild(stack);
        }

        layout.appendChild(main);
        wrapper.appendChild(layout);
        this.appendChild(wrapper);
    }
}

if (!customElements.get("liko-project-detail")) {
    customElements.define("liko-project-detail", LikoProjectDetail);
}

export const LikoProjectDetailExport = ({
    title,
    subtitle,
    description,
    buttonLabel,
    metaItems = [],
    cards = [],
    onButtonClick,
}) => {
    const el = document.createElement("liko-project-detail");
    if (title) el.setAttribute("title", title);
    if (subtitle) el.setAttribute("subtitle", subtitle);
    if (description) el.setAttribute("description", description);
    if (buttonLabel) el.setAttribute("button-label", buttonLabel);
    if (onButtonClick) el.addEventListener("button-click", onButtonClick);
    el.metaItems = metaItems;
    el.cards = cards;
    return el;
};
