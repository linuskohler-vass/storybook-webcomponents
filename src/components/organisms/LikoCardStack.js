import { tw } from "../../utils/tw.js";
import "../atoms/LikoStackCard";

class LikoCardStack extends HTMLElement {
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
        this.innerHTML = "";
        this._cleanupSwipe();

        if (this.cards.length === 0) return;

        const wrapper = document.createElement("div");
        wrapper.className = tw`flex flex-col items-center gap-6`;

        // --- Stack area ---
        const stackContainer = document.createElement("div");
        stackContainer.className = tw`relative w-full`;
        const orientation = this.getAttribute("orientation") || "portrait";
        const isLandscape = orientation === "landscape";
        stackContainer.style.maxWidth = isLandscape ? "min(100%, 800px)" : "min(100%, 600px)";
        stackContainer.style.aspectRatio = isLandscape ? "4 / 3" : "3 / 4";

        this._stackContainer = stackContainer;

        // Create card elements
        this._cardEls = [];
        for (let i = 0; i < this.cards.length; i++) {
            const card = this.cards[i];
            const el = document.createElement("liko-stack-card");
            if (card.imageSrc) el.setAttribute("image-src", card.imageSrc);
            if (card.imageAlt) el.setAttribute("image-alt", card.imageAlt);
            if (card.caption) el.setAttribute("caption", card.caption);
            el.setAttribute("orientation", orientation);

            el.style.position = "absolute";
            el.style.inset = "0";
            el.style.transition = "transform 0.4s ease, opacity 0.4s ease";
            el.style.transformOrigin = "center bottom";
            el.style.willChange = "transform, opacity";

            stackContainer.appendChild(el);
            this._cardEls.push(el);
        }

        wrapper.appendChild(stackContainer);

        // --- Navigation ---
        const nav = document.createElement("div");
        nav.className = tw`flex items-center gap-4`;

        this._prevBtn = this._createNavButton("prev");
        this._nextBtn = this._createNavButton("next");

        // Dot indicators
        const dots = document.createElement("div");
        dots.className = tw`flex items-center gap-1.5`;
        this._dots = [];
        for (let i = 0; i < this.cards.length; i++) {
            const dot = document.createElement("button");
            dot.className = tw`h-2 w-2 rounded-full border-0 p-0 transition-colors`;
            dot.style.cursor = "pointer";
            dot.setAttribute("aria-label", `Go to card ${i + 1}`);
            dot.addEventListener("click", () => this.goTo(i));
            dots.appendChild(dot);
            this._dots.push(dot);
        }

        nav.appendChild(this._prevBtn);
        nav.appendChild(dots);
        nav.appendChild(this._nextBtn);
        wrapper.appendChild(nav);

        this.appendChild(wrapper);

        this._setupSwipe(stackContainer);
        this._updateStack();
    }

    _createNavButton(direction) {
        const btn = document.createElement("button");
        btn.className = tw`slide-hover flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-border bg-background-100 p-0 text-foreground-80 shadow-sm`;
        btn.style.setProperty("--slide-hover-bg", "var(--color-background-60)");
        btn.setAttribute("aria-label", direction === "prev" ? "Previous card" : "Next card");

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "18");
        svg.setAttribute("height", "18");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("stroke-width", "2.5");
        svg.setAttribute("stroke-linecap", "round");
        svg.setAttribute("stroke-linejoin", "round");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        if (direction === "prev") {
            path.setAttribute("d", "M15 18l-6-6 6-6");
        } else {
            path.setAttribute("d", "M9 18l6-6-6-6");
        }
        svg.appendChild(path);
        btn.appendChild(svg);

        btn.addEventListener("click", () => {
            if (direction === "prev") this.goPrev();
            else this.goNext();
        });

        return btn;
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

if (!customElements.get("liko-card-stack")) {
    customElements.define("liko-card-stack", LikoCardStack);
}

export const LikoCardStackExport = ({ cards = [], orientation, onCardChange }) => {
    const el = document.createElement("liko-card-stack");
    if (orientation) el.setAttribute("orientation", orientation);
    el.cards = cards;
    if (onCardChange) el.addEventListener("card-change", onCardChange);
    return el;
};
