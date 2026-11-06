import { tw } from "../../utils/tw.js";
import { ElementBase } from "../../utils/element-base.js";
import { attr, escapeHtml } from "../../utils/html.js";
import { likoButtonTag } from "../atoms/LikoButton";

/**
 * Pure render function — no browser globals, safe to run on the server.
 */
export const renderLikoCard = ({
    heading,
    text,
    imageSrc,
    imageAlt = "",
    buttonLabel,
    buttonUrl,
    buttonTarget,
    tags = [],
}) => {
    const img = imageSrc
        ? `<img src="${escapeHtml(imageSrc)}" alt="${escapeHtml(imageAlt)}" class="${tw`h-48 w-full object-cover`}">`
        : "";

    const tagsHtml =
        tags.length > 0
            ? `<div class="${tw`flex flex-wrap gap-2 px-5 pt-4`}">${tags
                  .map((tag) => `<liko-tag${attr("label", tag.label)}></liko-tag>`)
                  .join("")}</div>`
            : "";

    const headingHtml = heading ? `<h3>${escapeHtml(heading)}</h3>` : "";
    const textHtml = text
        ? `<p class="${tw`text-sm leading-relaxed text-foreground-60`}">${escapeHtml(text)}</p>`
        : "";

    const buttonHtml = buttonLabel
        ? `<div class="${tw`mt-auto pt-4`}">${likoButtonTag({
              label: buttonLabel,
              size: "medium",
              primary: true,
              href: buttonUrl,
              target: buttonTarget,
              extra: " data-card-button",
          })}</div>`
        : "";

    return `<div class="${tw`flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background-100 shadow-sm`}">${img}${tagsHtml}<div class="${tw`flex grow flex-col p-5`}">${headingHtml}${textHtml}${buttonHtml}</div></div>`;
};

export class LikoCard extends ElementBase {
    static get observedAttributes() {
        return ["heading", "text", "image-src", "image-alt", "button-label", "button-url", "button-target"];
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
        const buttonUrl = this.getAttribute("button-url");

        this.innerHTML = renderLikoCard({
            heading: this.getAttribute("heading"),
            text: this.getAttribute("text"),
            imageSrc: this.getAttribute("image-src"),
            imageAlt: this.getAttribute("image-alt") || "",
            buttonLabel: this.getAttribute("button-label"),
            buttonUrl,
            buttonTarget: this.getAttribute("button-target"),
            tags: this.tags,
        });

        if (!buttonUrl) {
            this.querySelector("[data-card-button]")?.addEventListener("click", () =>
                this.dispatchEvent(new CustomEvent("button-click", { bubbles: true })),
            );
        }
    }
}

export const LikoCardExport = ({
    heading,
    text,
    imageSrc,
    imageAlt,
    buttonLabel,
    buttonUrl,
    buttonTarget,
    tags,
    onButtonClick,
}) => {
    const card = document.createElement("liko-card");
    if (heading) card.setAttribute("heading", heading);
    if (text) card.setAttribute("text", text);
    if (imageSrc) card.setAttribute("image-src", imageSrc);
    if (imageAlt) card.setAttribute("image-alt", imageAlt);
    if (buttonLabel) card.setAttribute("button-label", buttonLabel);
    if (buttonUrl) card.setAttribute("button-url", buttonUrl);
    if (buttonTarget) card.setAttribute("button-target", buttonTarget);
    if (tags) card.tags = tags;
    if (onButtonClick) card.addEventListener("button-click", onButtonClick);
    return card;
};
