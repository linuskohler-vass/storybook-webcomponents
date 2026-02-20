import { tw } from "../../utils/tw.js";
import { createIcon } from "../../utils/icons.js";

class LikoFlipCard extends HTMLElement {
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
        const heading = this.getAttribute("heading") || "";
        const text = this.getAttribute("text") || "";
        const flipped = this.hasAttribute("flipped");

        this.innerHTML = "";

        // Perspective wrapper
        const wrapper = document.createElement("div");
        wrapper.className = tw`h-full`;
        wrapper.style.perspective = "800px";

        // Inner container that rotates
        const inner = document.createElement("div");
        inner.className = tw`relative h-full transition-transform duration-500 ease-in-out`;
        inner.style.transformStyle = "preserve-3d";
        inner.style.transform = flipped ? "rotateY(180deg)" : "rotateY(0deg)";
        this._inner = inner;

        // --- Front face ---
        const front = document.createElement("div");
        front.className = tw`absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-lg border border-border bg-background-100 px-5 py-6 shadow-sm`;
        front.style.backfaceVisibility = "hidden";

        const frontHeading = document.createElement("h3");
        frontHeading.className = tw`text-center text-xl font-semibold text-text`;
        frontHeading.textContent = heading;
        front.appendChild(frontHeading);

        const flipBtn = this._createFlipButton("rotate-cw");
        flipBtn.setAttribute("aria-label", "Show details");
        flipBtn.addEventListener("click", () => this._flip());
        front.appendChild(flipBtn);

        inner.appendChild(front);

        // --- Back face ---
        const back = document.createElement("div");
        back.className = tw`absolute inset-0 flex flex-col items-center justify-between rounded-lg border border-border bg-background-80 px-4 py-4 shadow-sm md:py-5`;
        back.style.backfaceVisibility = "hidden";
        back.style.transform = "rotateY(180deg)";

        const textWrapper = document.createElement("div");
        textWrapper.className = tw`flex flex-1 items-center overflow-y-auto`;

        const backText = document.createElement("p");
        backText.className = tw`m-0 text-center text-sm leading-relaxed text-text md:text-base`;
        backText.textContent = text;
        textWrapper.appendChild(backText);
        back.appendChild(textWrapper);

        const flipBackBtn = this._createFlipButton("rotate-ccw");
        flipBackBtn.setAttribute("aria-label", "Go back");
        flipBackBtn.addEventListener("click", () => this._flip());
        back.appendChild(flipBackBtn);

        inner.appendChild(back);

        wrapper.appendChild(inner);
        this.appendChild(wrapper);
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

    _createFlipButton(iconName) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = tw`slide-hover flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-border bg-background-100 p-0 text-foreground-80 shadow-sm`;
        btn.style.setProperty("--slide-hover-bg", "var(--color-background-60)");
        btn.appendChild(createIcon(iconName));
        return btn;
    }
}

if (!customElements.get("liko-flip-card")) {
    customElements.define("liko-flip-card", LikoFlipCard);
}

export const LikoFlipCardExport = ({ heading, text, flipped, onFlip }) => {
    const el = document.createElement("liko-flip-card");
    if (heading) el.setAttribute("heading", heading);
    if (text) el.setAttribute("text", text);
    if (flipped) el.setAttribute("flipped", "");
    if (onFlip) el.addEventListener("flip", onFlip);
    return el;
};
