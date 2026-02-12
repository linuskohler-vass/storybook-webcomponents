import { tw } from "../../utils/tw.js";

class LikoTag extends HTMLElement {
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
        const active = this.hasAttribute("active");

        const baseClasses = tw`inline-block rounded-lg font-nunito-sans text-xs font-semibold leading-none`;

        const modeClasses = active
            ? tw`bg-foreground-80 text-white`
            : tw`bg-background-60 text-text`;

        const interactiveClasses = toggleable
            ? tw`cursor-pointer select-none transition-colors`
            : ``;

        this.innerHTML = "";

        const span = document.createElement("span");
        span.className = tw`${baseClasses} ${modeClasses} ${interactiveClasses} px-3 py-1.5`;
        span.textContent = label;

        if (toggleable) {
            span.addEventListener("click", () => {
                if (this.hasAttribute("active")) {
                    this.removeAttribute("active");
                } else {
                    this.setAttribute("active", "");
                }
                this.dispatchEvent(new CustomEvent("toggle", {
                    bubbles: true,
                    detail: { label, active: this.hasAttribute("active") },
                }));
            });
        }

        this.appendChild(span);
    }
}

if (!customElements.get("liko-tag")) {
    customElements.define("liko-tag", LikoTag);
}

export const LikoTagExport = ({ label, toggleable, active, onToggle }) => {
    const tag = document.createElement("liko-tag");
    if (label) tag.setAttribute("label", label);
    if (toggleable) tag.setAttribute("toggleable", "");
    if (active) tag.setAttribute("active", "");
    if (onToggle) tag.addEventListener("toggle", onToggle);
    return tag;
};
