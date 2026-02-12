import { tw } from "../../utils/tw.js";

class LikoStackCard extends HTMLElement {
    static get observedAttributes() {
        return ["image-src", "image-alt", "caption", "orientation", "text", "text-title"];
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
        const text = this.getAttribute("text");

        this.innerHTML = "";

        const card = document.createElement("div");
        card.className = tw`rounded-xl border border-border bg-background-100 p-2 shadow-lg`;
        const isTextOnly = text && !imageSrc;
        const orientation = isTextOnly ? "landscape" : this.getAttribute("orientation") || "portrait";
        card.style.aspectRatio = orientation === "landscape" ? "4 / 3" : "3 / 4";

        const inner = document.createElement("div");
        inner.className = tw`relative h-full w-full overflow-hidden rounded-lg`;

        if (isTextOnly) {
            inner.className = tw`flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-lg bg-background-80 px-8`;

            const textTitle = this.getAttribute("text-title");
            if (textTitle) {
                const h = document.createElement("p");
                h.className = tw`text-center font-nunito-sans text-xl leading-snug font-bold text-text`;
                h.textContent = textTitle;
                inner.appendChild(h);
            }

            const p = document.createElement("p");
            p.className = tw`text-center font-nunito-sans text-lg leading-relaxed text-text`;
            p.textContent = text;
            inner.appendChild(p);
        } else {
            if (imageSrc) {
                const img = document.createElement("img");
                img.src = imageSrc;
                img.alt = imageAlt;
                img.className = tw`absolute inset-0 h-full w-full object-cover`;
                img.draggable = false;
                inner.appendChild(img);
            }

            if (caption) {
                const overlay = document.createElement("div");
                overlay.className = tw`absolute right-0 bottom-0 left-0 bg-white/60 px-4 py-3 backdrop-blur-sm`;

                const p = document.createElement("p");
                p.className = tw`font-nunito-sans text-sm leading-snug text-text`;
                p.textContent = caption;
                overlay.appendChild(p);

                inner.appendChild(overlay);
            }
        }

        card.appendChild(inner);
        this.appendChild(card);
    }
}

if (!customElements.get("liko-stack-card")) {
    customElements.define("liko-stack-card", LikoStackCard);
}

export const LikoStackCardExport = ({ imageSrc, imageAlt, caption, orientation, text, textTitle }) => {
    const el = document.createElement("liko-stack-card");
    if (imageSrc) el.setAttribute("image-src", imageSrc);
    if (imageAlt) el.setAttribute("image-alt", imageAlt);
    if (caption) el.setAttribute("caption", caption);
    if (orientation) el.setAttribute("orientation", orientation);
    if (text) el.setAttribute("text", text);
    if (textTitle) el.setAttribute("text-title", textTitle);
    return el;
};
