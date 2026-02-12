import { tw } from "../../utils/tw.js";
import "../atoms/LikoTag";

class LikoFilterBar extends HTMLElement {
    static get observedAttributes() {
        return ["label"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    get tags() {
        return this._tags || [];
    }

    set tags(value) {
        this._tags = value;
        if (this.isConnected) this.render();
    }

    get activeTags() {
        return this._activeTags || [];
    }

    set activeTags(value) {
        this._activeTags = value;
        if (this.isConnected) this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = "";

        const label = this.getAttribute("label");

        const wrapper = document.createElement("div");
        wrapper.className = tw`flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4`;

        if (label) {
            const labelEl = document.createElement("span");
            labelEl.className = tw`font-nunito-sans text-sm font-semibold text-foreground-80`;
            labelEl.textContent = label;
            wrapper.appendChild(labelEl);
        }

        const tagsWrapper = document.createElement("div");
        tagsWrapper.className = tw`flex flex-wrap gap-2`;

        for (const tag of this.tags) {
            const el = document.createElement("liko-tag");
            el.setAttribute("label", tag);
            el.setAttribute("toggleable", "");
            if (this.activeTags.includes(tag)) {
                el.setAttribute("active", "");
            }
            el.addEventListener("toggle", (e) => {
                const { label, active } = e.detail;
                if (active) {
                    this._activeTags = [...this.activeTags, label];
                } else {
                    this._activeTags = this.activeTags.filter((t) => t !== label);
                }
                this.dispatchEvent(new CustomEvent("filter-change", {
                    bubbles: true,
                    detail: { activeTags: this._activeTags },
                }));
            });
            tagsWrapper.appendChild(el);
        }

        wrapper.appendChild(tagsWrapper);
        this.appendChild(wrapper);
    }
}

if (!customElements.get("liko-filter-bar")) {
    customElements.define("liko-filter-bar", LikoFilterBar);
}

export const LikoFilterBarExport = ({ label, tags = [], activeTags = [], onFilterChange }) => {
    const bar = document.createElement("liko-filter-bar");
    if (label) bar.setAttribute("label", label);
    bar.tags = tags;
    bar.activeTags = activeTags;
    if (onFilterChange) bar.addEventListener("filter-change", onFilterChange);
    return bar;
};
