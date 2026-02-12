import { tw } from "../../utils/tw.js";
import { LikoButtonExport } from "../atoms/LikoButton";
import { LikoTagExport } from "../atoms/LikoTag";

class LikoCard extends HTMLElement {
    static get observedAttributes() {
        return ["heading", "text", "image-src", "image-alt", "button-label"];
    }

    get tags() {
        return this._tags || [];
    }

    set tags(value) {
        this._tags = value;
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
        const heading = this.getAttribute("heading");
        const text = this.getAttribute("text");
        const imageSrc = this.getAttribute("image-src");
        const imageAlt = this.getAttribute("image-alt") || "";
        const buttonLabel = this.getAttribute("button-label");

        this.innerHTML = "";

        const card = document.createElement("div");
        card.className = tw`overflow-hidden rounded-lg border border-border bg-background-100 shadow-sm`;

        if (imageSrc) {
            const img = document.createElement("img");
            img.src = imageSrc;
            img.alt = imageAlt;
            img.className = tw`h-48 w-full object-cover`;
            card.appendChild(img);
        }

        if (this.tags.length > 0) {
            const tagsWrapper = document.createElement("div");
            tagsWrapper.className = tw`flex flex-wrap gap-2 px-5 pt-4`;
            for (const tag of this.tags) {
                tagsWrapper.appendChild(LikoTagExport({ label: tag.label, primary: tag.primary }));
            }
            card.appendChild(tagsWrapper);
        }

        const body = document.createElement("div");
        body.className = tw`p-5`;

        if (heading) {
            const h3 = document.createElement("h3");
            h3.textContent = heading;
            body.appendChild(h3);
        }

        if (text) {
            const p = document.createElement("p");
            p.className = tw`text-sm leading-relaxed text-foreground-60`;
            p.textContent = text;
            body.appendChild(p);
        }

        if (buttonLabel) {
            const buttonWrapper = document.createElement("div");
            buttonWrapper.className = tw`mt-4`;
            const btn = LikoButtonExport({
                label: buttonLabel,
                size: "medium",
                primary: true,
                onClick: () => this.dispatchEvent(new CustomEvent("button-click", { bubbles: true })),
            });
            buttonWrapper.appendChild(btn);
            body.appendChild(buttonWrapper);
        }

        card.appendChild(body);
        this.appendChild(card);
    }
}

if (!customElements.get("liko-card")) {
    customElements.define("liko-card", LikoCard);
}

export const LikoCardExport = ({ heading, text, imageSrc, imageAlt, buttonLabel, tags, onButtonClick }) => {
    const card = document.createElement("liko-card");
    if (heading) card.setAttribute("heading", heading);
    if (text) card.setAttribute("text", text);
    if (imageSrc) card.setAttribute("image-src", imageSrc);
    if (imageAlt) card.setAttribute("image-alt", imageAlt);
    if (buttonLabel) card.setAttribute("button-label", buttonLabel);
    if (tags) card.tags = tags;
    if (onButtonClick) card.addEventListener("button-click", onButtonClick);
    return card;
};
