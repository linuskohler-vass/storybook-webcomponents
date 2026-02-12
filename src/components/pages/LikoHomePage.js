import { tw } from "../../utils/tw.js";
import "../organisms/LikoCardStack";
import "../organisms/LikoCardFilter";

class LikoHomePage extends HTMLElement {
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
        const description2 = this.getAttribute("description2") || "";
        const filterLabel = this.getAttribute("filter-label") || "";
        const filterHeading = this.getAttribute("filter-heading") || "";
        const bottomHeading = this.getAttribute("bottom-heading") || "";
        const bottomDescription = this.getAttribute("bottom-description") || "";

        this.innerHTML = "";

        const wrapper = document.createElement("div");
        wrapper.className = tw`mx-auto max-w-6xl px-6 py-12`;

        // --- Hero row: text left, card stack right ---
        const hero = document.createElement("div");
        hero.className = tw`flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16`;

        const textCol = document.createElement("div");
        textCol.className = tw`flex-1`;

        if (title) {
            const h1 = document.createElement("h1");
            h1.textContent = title;
            textCol.appendChild(h1);
        }

        if (subtitle) {
            const h2 = document.createElement("h2");
            h2.textContent = subtitle;
            textCol.appendChild(h2);
        }

        if (description) {
            const p = document.createElement("p");
            p.textContent = description;
            textCol.appendChild(p);
        }

        if (description2) {
            const p = document.createElement("p");
            p.textContent = description2;
            textCol.appendChild(p);
        }

        hero.appendChild(textCol);

        if (this.stackCards.length > 0) {
            const stackCol = document.createElement("div");
            stackCol.className = tw`w-full flex-1`;

            const stack = document.createElement("liko-card-stack");
            stack.cards = this.stackCards;
            stackCol.appendChild(stack);

            hero.appendChild(stackCol);
        }

        wrapper.appendChild(hero);

        // --- Filter row ---
        if (this.filterCards.length > 0) {
            const filterSection = document.createElement("section");
            filterSection.className = tw`mt-16`;

            if (filterHeading) {
                const h2 = document.createElement("h2");
                h2.textContent = filterHeading;
                filterSection.appendChild(h2);
            }

            const filter = document.createElement("liko-card-filter");
            if (filterLabel) filter.setAttribute("filter-label", filterLabel);
            filter.cards = this.filterCards;
            filterSection.appendChild(filter);

            wrapper.appendChild(filterSection);
        }

        // --- Bottom section: heading, text, text card stack ---
        if (bottomHeading || this.textCards.length > 0) {
            const bottomSection = document.createElement("section");
            bottomSection.className = tw`mt-16`;

            if (bottomHeading) {
                const h2 = document.createElement("h2");
                h2.textContent = bottomHeading;
                bottomSection.appendChild(h2);
            }

            if (bottomDescription) {
                const p = document.createElement("p");
                p.textContent = bottomDescription;
                bottomSection.appendChild(p);
            }

            if (this.textCards.length > 0) {
                const stackWrapper = document.createElement("div");
                stackWrapper.className = tw`mx-auto w-full max-w-[600px]`;

                const stack = document.createElement("liko-card-stack");
                stack.setAttribute("orientation", "landscape");
                stack.cards = this.textCards;
                stackWrapper.appendChild(stack);

                bottomSection.appendChild(stackWrapper);
            }

            wrapper.appendChild(bottomSection);
        }

        this.appendChild(wrapper);
    }
}

if (!customElements.get("liko-home-page")) {
    customElements.define("liko-home-page", LikoHomePage);
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
    return el;
};
