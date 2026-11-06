import { tw } from "../../utils/tw.js";
import { ElementBase } from "../../utils/element-base.js";
import { attr, boolAttr, escapeHtml } from "../../utils/html.js";

/**
 * Pure render function — no browser globals, safe to run on the server.
 */
export const renderLikoFilterBar = ({ label, tags = [], activeTags = [] }) => {
    const labelHtml = label
        ? `<span class="${tw`text-base font-semibold`}">${escapeHtml(label)}</span>`
        : "";

    const tagsHtml = tags
        .map(
            (tag, i) =>
                `<liko-tag class="${tw`flex`}"${attr("label", tag)} toggleable${boolAttr("active", activeTags.includes(tag))} data-index="${i}"></liko-tag>`,
        )
        .join("");

    return `<div class="${tw`mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4`}">${labelHtml}<div class="${tw`flex flex-wrap items-center gap-2`}">${tagsHtml}</div></div>`;
};

export class LikoFilterBar extends ElementBase {
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
        this.innerHTML = renderLikoFilterBar({
            label: this.getAttribute("label"),
            tags: this.tags,
            activeTags: this.activeTags,
        });

        for (const el of this.querySelectorAll("liko-tag")) {
            el.addEventListener("toggle", (e) => {
                const { label, active } = e.detail;
                if (active) {
                    this._activeTags = [...this.activeTags, label];
                } else {
                    this._activeTags = this.activeTags.filter((t) => t !== label);
                }
                this.dispatchEvent(
                    new CustomEvent("filter-change", {
                        bubbles: true,
                        detail: { activeTags: this._activeTags },
                    }),
                );
            });
        }
    }
}

export const LikoFilterBarExport = ({ label, tags = [], activeTags = [], onFilterChange }) => {
    const bar = document.createElement("liko-filter-bar");
    if (label) bar.setAttribute("label", label);
    bar.tags = tags;
    bar.activeTags = activeTags;
    if (onFilterChange) bar.addEventListener("filter-change", onFilterChange);
    return bar;
};
