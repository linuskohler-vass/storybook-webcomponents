import { tw } from "../../utils/tw.js";
import { ElementBase } from "../../utils/element-base.js";
import { escapeHtml } from "../../utils/html.js";

/**
 * Pure render function — no browser globals, safe to run on the server.
 */
export const renderLikoStackCard = ({ imageSrc, imageAlt = "", caption, orientation, text, textTitle }) => {
    const isTextOnly = text && !imageSrc;
    const effectiveOrientation = isTextOnly ? "landscape" : orientation || "portrait";
    const aspectRatio = effectiveOrientation === "landscape" ? "4 / 3" : "3 / 4";

    let inner;
    if (isTextOnly) {
        const title = textTitle
            ? `<p class="${tw`text-center text-xl leading-snug font-bold text-text`}">${escapeHtml(textTitle)}</p>`
            : "";
        inner = `<div class="${tw`flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-lg bg-background-80 px-8`}">${title}<p class="${tw`text-center text-lg leading-relaxed text-text`}">${escapeHtml(text)}</p></div>`;
    } else {
        const img = imageSrc
            ? `<img src="${escapeHtml(imageSrc)}" alt="${escapeHtml(imageAlt)}" class="${tw`absolute inset-0 h-full w-full object-cover`}" draggable="false">`
            : "";
        const overlay = caption
            ? `<div class="${tw`absolute right-0 bottom-0 left-0 bg-white/60 px-4 py-3 backdrop-blur-sm`}"><p class="${tw`text-sm leading-snug text-text`}">${escapeHtml(caption)}</p></div>`
            : "";
        inner = `<div class="${tw`relative h-full w-full overflow-hidden rounded-lg`}">${img}${overlay}</div>`;
    }

    return `<div class="${tw`rounded-xl border border-border bg-background-100 p-2 shadow-lg`}" style="aspect-ratio: ${aspectRatio};">${inner}</div>`;
};

export class LikoStackCard extends ElementBase {
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
        this.innerHTML = renderLikoStackCard({
            imageSrc: this.getAttribute("image-src"),
            imageAlt: this.getAttribute("image-alt") || "",
            caption: this.getAttribute("caption"),
            orientation: this.getAttribute("orientation"),
            text: this.getAttribute("text"),
            textTitle: this.getAttribute("text-title"),
        });
    }
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
