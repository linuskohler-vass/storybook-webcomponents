import { tw } from "../../utils/tw.js";
import { ElementBase } from "../../utils/element-base.js";
import { attr } from "../../utils/html.js";
import { iconSvg } from "../../utils/icons.js";

const renderStackNavButton = (direction) => {
    const iconName = direction === "prev" ? "chevron-left" : "chevron-right";
    const ariaLabel = direction === "prev" ? "Previous card" : "Next card";
    return `<button data-nav="${direction}" aria-label="${ariaLabel}" class="${tw`slide-hover flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-border bg-background-100 p-0 text-foreground-80 shadow-sm`}" style="--slide-hover-bg: var(--color-background-60);">${iconSvg(iconName)}</button>`;
};

/**
 * Pure render function — no browser globals, safe to run on the server.
 */
export const renderLikoCardStack = ({ cards = [], orientation = "portrait" }) => {
    if (cards.length === 0) return "";

    const isLandscape = orientation === "landscape";
    const maxWidth = isLandscape ? "min(100%, 800px)" : "min(100%, 360px)";
    const aspectRatio = isLandscape ? "4 / 3" : "3 / 4";

    const cardEls = cards
        .map((card) => {
            const cardAttrs = `${attr("image-src", card.imageSrc)}${attr("image-alt", card.imageAlt)}${attr("caption", card.caption)}${attr("text", card.text)}${attr("text-title", card.textTitle)}${attr("orientation", orientation)}`;
            const style =
                "position: absolute; inset: 0; transition: transform 0.4s ease, opacity 0.4s ease; transform-origin: center bottom; will-change: transform, opacity;";
            return `<liko-stack-card${cardAttrs} style="${style}"></liko-stack-card>`;
        })
        .join("");

    const dots = cards
        .map(
            (_, i) =>
                `<button data-dot="${i}" aria-label="Go to card ${i + 1}" class="${tw`h-2 w-2 rounded-full border-0 p-0 transition-colors`}" style="cursor: pointer;"></button>`,
        )
        .join("");

    return `<div class="${tw`flex flex-col items-center gap-6`}"><div data-stack-container class="${tw`relative w-full`}" style="max-width: ${maxWidth}; aspect-ratio: ${aspectRatio};">${cardEls}</div><div class="${tw`flex items-center gap-4`}">${renderStackNavButton("prev")}<div class="${tw`flex items-center gap-1.5`}">${dots}</div>${renderStackNavButton("next")}</div></div>`;
};

export class LikoCardStack extends ElementBase {
    static get observedAttributes() {
        return ["orientation"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && this.isConnected) {
            this.render();
        }
    }

    get cards() {
        return this._cards || [];
    }

    set cards(value) {
        this._cards = value;
        this._currentIndex = 0;
        if (this.isConnected) this.render();
    }

    connectedCallback() {
        this._currentIndex = 0;
        this.render();
    }

    disconnectedCallback() {
        this._cleanupSwipe();
    }

    goTo(index) {
        if (index < 0 || index >= this.cards.length) return;
        this._currentIndex = index;
        this._updateStack();
    }

    goNext() {
        this.goTo(this._currentIndex + 1);
    }

    goPrev() {
        this.goTo(this._currentIndex - 1);
    }

    render() {
        this.innerHTML = renderLikoCardStack({
            cards: this.cards,
            orientation: this.getAttribute("orientation") || "portrait",
        });

        this._cleanupSwipe();

        if (this.cards.length === 0) return;

        this._stackContainer = this.querySelector("[data-stack-container]");
        this._cardEls = [...this.querySelectorAll("liko-stack-card")];
        this._dots = [...this.querySelectorAll("[data-dot]")];
        this._prevBtn = this.querySelector("[data-nav=\"prev\"]");
        this._nextBtn = this.querySelector("[data-nav=\"next\"]");

        this._prevBtn.addEventListener("click", () => this.goPrev());
        this._nextBtn.addEventListener("click", () => this.goNext());
        for (const dot of this._dots) {
            dot.addEventListener("click", () => this.goTo(Number(dot.dataset.dot)));
        }

        this._setupSwipe(this._stackContainer);
        this._updateStack();
    }

    _updateStack() {
        const current = this._currentIndex;
        const total = this.cards.length;

        // Predefined subtle rotation angles for the stacked look
        const stackAngles = [-3, 2.5, -1.5, 3, -2];

        for (let i = 0; i < this._cardEls.length; i++) {
            const el = this._cardEls[i];
            const offset = i - current;

            if (offset < 0) {
                // Cards already passed — hidden to the left
                el.style.transform = "translateX(-120%) rotate(-8deg)";
                el.style.opacity = "0";
                el.style.zIndex = "0";
                el.style.pointerEvents = "none";
            } else if (offset === 0) {
                // Active card — on top, no rotation
                el.style.transform = "rotate(0deg) scale(1)";
                el.style.opacity = "1";
                el.style.zIndex = String(total);
                el.style.pointerEvents = "auto";
            } else if (offset <= 3) {
                // Stacked behind — slightly rotated and scaled down
                const angle = stackAngles[(i - 1 + stackAngles.length) % stackAngles.length];
                const scale = 1 - offset * 0.03;
                const translateY = offset * 6;
                el.style.transform = `rotate(${angle}deg) scale(${scale}) translateY(${translateY}px)`;
                el.style.opacity = String(1 - offset * 0.15);
                el.style.zIndex = String(total - offset);
                el.style.pointerEvents = "none";
            } else {
                // Far away cards — hidden
                el.style.transform = "scale(0.85)";
                el.style.opacity = "0";
                el.style.zIndex = "0";
                el.style.pointerEvents = "none";
            }
        }

        // Update nav button states
        if (this._prevBtn) {
            this._prevBtn.disabled = current === 0;
            this._prevBtn.style.opacity = current === 0 ? "0.35" : "1";
            this._prevBtn.style.cursor = current === 0 ? "default" : "pointer";
        }
        if (this._nextBtn) {
            this._nextBtn.disabled = current === total - 1;
            this._nextBtn.style.opacity = current === total - 1 ? "0.35" : "1";
            this._nextBtn.style.cursor = current === total - 1 ? "default" : "pointer";
        }

        // Update dots
        for (let i = 0; i < this._dots.length; i++) {
            if (i === current) {
                this._dots[i].style.backgroundColor = "var(--color-foreground-80, #333)";
                this._dots[i].style.width = "10px";
                this._dots[i].style.height = "10px";
            } else {
                this._dots[i].style.backgroundColor = "var(--color-border, #ccc)";
                this._dots[i].style.width = "8px";
                this._dots[i].style.height = "8px";
            }
        }

        this.dispatchEvent(
            new CustomEvent("card-change", {
                bubbles: true,
                detail: { index: current, total },
            }),
        );
    }

    _setupSwipe(container) {
        let startX = 0;
        let startY = 0;
        let isDragging = false;

        this._onTouchStart = (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
        };

        this._onTouchEnd = (e) => {
            if (!isDragging) return;
            isDragging = false;
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = endX - startX;
            const diffY = endY - startY;

            // Only trigger if horizontal swipe is dominant and exceeds threshold
            if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX < 0) this.goNext();
                else this.goPrev();
            }
        };

        // Mouse drag support for desktop
        this._onMouseDown = (e) => {
            startX = e.clientX;
            startY = e.clientY;
            isDragging = true;
            e.preventDefault();
        };

        this._onMouseUp = (e) => {
            if (!isDragging) return;
            isDragging = false;
            const diffX = e.clientX - startX;
            const diffY = e.clientY - startY;

            if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX < 0) this.goNext();
                else this.goPrev();
            }
        };

        container.addEventListener("touchstart", this._onTouchStart, { passive: true });
        container.addEventListener("touchend", this._onTouchEnd, { passive: true });
        container.addEventListener("mousedown", this._onMouseDown);
        container.addEventListener("mouseup", this._onMouseUp);
    }

    _cleanupSwipe() {
        if (this._stackContainer) {
            this._stackContainer.removeEventListener("touchstart", this._onTouchStart);
            this._stackContainer.removeEventListener("touchend", this._onTouchEnd);
            this._stackContainer.removeEventListener("mousedown", this._onMouseDown);
            this._stackContainer.removeEventListener("mouseup", this._onMouseUp);
        }
    }
}

export const LikoCardStackExport = ({ cards = [], orientation, onCardChange }) => {
    const el = document.createElement("liko-card-stack");
    if (orientation) el.setAttribute("orientation", orientation);
    el.cards = cards;
    if (onCardChange) el.addEventListener("card-change", onCardChange);
    return el;
};
