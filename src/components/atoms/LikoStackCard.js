import { tw } from "../../utils/tw.js";

class LikoStackCard extends HTMLElement {
    static get observedAttributes() {
        return ["image-src", "image-alt", "caption"];
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
        const imageSrc = this.getAttribute("image-src");
        const imageAlt = this.getAttribute("image-alt") || "";
        const caption = this.getAttribute("caption");

        this.innerHTML = "";

        const card = document.createElement("div");
        card.className = tw`relative overflow-hidden rounded-xl bg-background-100 shadow-lg`;
        card.style.aspectRatio = "3 / 4";

        if (imageSrc) {
            const img = document.createElement("img");
            img.src = imageSrc;
            img.alt = imageAlt;
            img.className = tw`absolute inset-0 h-full w-full object-cover`;
            img.draggable = false;
            card.appendChild(img);
        }

        if (caption) {
            const overlay = document.createElement("div");
            overlay.className = tw`absolute right-0 bottom-0 left-0 bg-white/60 px-4 py-3 backdrop-blur-sm`;

            const text = document.createElement("p");
            text.className = tw`font-nunito-sans text-sm leading-snug text-text`;
            text.textContent = caption;
            overlay.appendChild(text);

            card.appendChild(overlay);
        }

        this.appendChild(card);
    }
}

if (!customElements.get("liko-stack-card")) {
    customElements.define("liko-stack-card", LikoStackCard);
}

export const LikoStackCardExport = ({ imageSrc, imageAlt, caption }) => {
    const el = document.createElement("liko-stack-card");
    if (imageSrc) el.setAttribute("image-src", imageSrc);
    if (imageAlt) el.setAttribute("image-alt", imageAlt);
    if (caption) el.setAttribute("caption", caption);
    return el;
};
