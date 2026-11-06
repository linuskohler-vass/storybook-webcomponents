import { tw } from "../../utils/tw.js";
import { ElementBase } from "../../utils/element-base.js";
import { escapeHtml } from "../../utils/html.js";
import { iconSvg } from "../../utils/icons.js";

const renderFlipButton = (iconName, ariaLabel) =>
    `<button type="button" data-flip aria-label="${ariaLabel}" class="${tw`slide-hover flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-border bg-background-100 p-0 text-foreground-80 shadow-sm`}" style="--slide-hover-bg: var(--color-background-60);">${iconSvg(iconName)}</button>`;

/**
 * Pure render function — no browser globals, safe to run on the server.
 */
export const renderLikoFlipCard = ({ heading = "", text = "", flipped }) => {
    const transform = flipped ? "rotateY(180deg)" : "rotateY(0deg)";

    const front = `<div class="${tw`absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-lg border border-border bg-background-100 px-5 py-6 shadow-sm`}" style="backface-visibility: hidden;"><h3 class="${tw`text-center text-xl font-semibold text-text`}">${escapeHtml(heading)}</h3>${renderFlipButton("rotate-cw", "Show details")}</div>`;

    const back = `<div class="${tw`absolute inset-0 flex flex-col items-center justify-between rounded-lg border border-border bg-background-80 px-4 py-4 shadow-sm md:py-5`}" style="backface-visibility: hidden; transform: rotateY(180deg);"><div class="${tw`flex flex-1 items-center overflow-y-auto`}"><p class="${tw`m-0 text-center text-sm leading-relaxed text-text md:text-base`}">${escapeHtml(text)}</p></div>${renderFlipButton("rotate-ccw", "Go back")}</div>`;

    return `<div class="${tw`h-full`}" style="perspective: 800px;"><div data-flip-inner class="${tw`relative h-full transition-transform duration-500 ease-in-out`}" style="transform-style: preserve-3d; transform: ${transform};">${front}${back}</div></div>`;
};

export class LikoFlipCard extends ElementBase {
    static get observedAttributes() {
        return ["heading", "text", "flipped"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        if (!this.isConnected) return;

        if (name === "flipped") {
            this._updateFlip();
        } else {
            this.render();
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = renderLikoFlipCard({
            heading: this.getAttribute("heading") || "",
            text: this.getAttribute("text") || "",
            flipped: this.hasAttribute("flipped"),
        });

        this._inner = this.querySelector("[data-flip-inner]");
        for (const btn of this.querySelectorAll("[data-flip]")) {
            btn.addEventListener("click", () => this._flip());
        }
    }

    _flip() {
        if (this.hasAttribute("flipped")) {
            this.removeAttribute("flipped");
        } else {
            this.setAttribute("flipped", "");
        }
        this.dispatchEvent(
            new CustomEvent("flip", {
                bubbles: true,
                detail: { flipped: this.hasAttribute("flipped") },
            }),
        );
    }

    _updateFlip() {
        if (!this._inner) return;
        const flipped = this.hasAttribute("flipped");
        this._inner.style.transform = flipped ? "rotateY(180deg)" : "rotateY(0deg)";
    }
}

export const LikoFlipCardExport = ({ heading, text, flipped, onFlip }) => {
    const el = document.createElement("liko-flip-card");
    if (heading) el.setAttribute("heading", heading);
    if (text) el.setAttribute("text", text);
    if (flipped) el.setAttribute("flipped", "");
    if (onFlip) el.addEventListener("flip", onFlip);
    return el;
};
