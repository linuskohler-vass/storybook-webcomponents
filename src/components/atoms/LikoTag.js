import { tw } from "../../utils/tw.js";
import { ElementBase } from "../../utils/element-base.js";
import { escapeHtml } from "../../utils/html.js";

/**
 * Pure render function — no browser globals, safe to run on the server.
 */
export const renderLikoTag = ({ label, toggleable, active }) => {
    const baseClasses = tw`inline-block rounded-lg text-xs leading-none font-semibold`;
    const modeClasses = active ? tw`bg-foreground-60 text-white` : tw`bg-background-80 text-text`;
    const interactiveClasses = toggleable ? tw`slide-hover cursor-pointer select-none` : "";
    const hoverBg = active ? "var(--color-foreground-80)" : "var(--color-background-60)";
    const style = toggleable ? ` style="--slide-hover-bg: ${hoverBg};"` : "";

    return `<span class="${baseClasses} ${modeClasses} ${interactiveClasses} px-3 py-1.5"${style}>${escapeHtml(label)}</span>`;
};

export class LikoTag extends ElementBase {
    static get observedAttributes() {
        return ["label", "toggleable", "active"];
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
        const label = this.getAttribute("label");
        const toggleable = this.hasAttribute("toggleable");

        this.innerHTML = renderLikoTag({
            label,
            toggleable,
            active: this.hasAttribute("active"),
        });

        if (toggleable) {
            this.querySelector("span").addEventListener("click", () => {
                if (this.hasAttribute("active")) {
                    this.removeAttribute("active");
                } else {
                    this.setAttribute("active", "");
                }
                this.dispatchEvent(
                    new CustomEvent("toggle", {
                        bubbles: true,
                        detail: { label, active: this.hasAttribute("active") },
                    }),
                );
            });
        }
    }
}

export const LikoTagExport = ({ label, toggleable, active, onToggle }) => {
    const tag = document.createElement("liko-tag");
    if (label) tag.setAttribute("label", label);
    if (toggleable) tag.setAttribute("toggleable", "");
    if (active) tag.setAttribute("active", "");
    if (onToggle) tag.addEventListener("toggle", onToggle);
    return tag;
};
