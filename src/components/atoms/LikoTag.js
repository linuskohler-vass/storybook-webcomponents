import { tw } from "../../utils/tw.js";

class LikoTag extends HTMLElement {
    static get observedAttributes() {
        return ["label", "primary"];
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
        const primary = this.hasAttribute("primary");

        const baseClasses = tw`inline-block rounded-lg font-nunito-sans text-xs font-semibold leading-none`;

        const modeClasses = primary
            ? tw`bg-foreground-80 text-white`
            : tw`bg-background-60 text-text`;

        this.innerHTML = "";

        const span = document.createElement("span");
        span.className = tw`${baseClasses} ${modeClasses} px-3 py-1.5`;
        span.textContent = label;

        this.appendChild(span);
    }
}

if (!customElements.get("liko-tag")) {
    customElements.define("liko-tag", LikoTag);
}

export const LikoTagExport = ({ label, primary }) => {
    const tag = document.createElement("liko-tag");
    if (label) tag.setAttribute("label", label);
    if (primary) tag.setAttribute("primary", "");
    return tag;
};
