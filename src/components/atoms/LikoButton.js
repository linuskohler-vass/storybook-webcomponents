import { tw } from "../../utils/tw.js";

class LikoButton extends HTMLElement {
    static get observedAttributes() {
        return ["primary", "size", "label", "background-color", "href", "target"];
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
        const primary = this.hasAttribute("primary");
        const backgroundColor = this.getAttribute("background-color");
        const size = this.getAttribute("size") || "medium";
        const label = this.getAttribute("label");
        const href = this.getAttribute("href");
        const target = this.getAttribute("target");

        const baseClasses = tw`inline-block cursor-pointer rounded-3xl border-0 leading-none font-bold no-underline`;

        let sizeClasses = "";
        switch (size) {
            case "small":
                sizeClasses = tw`px-4 py-2.5 text-xs`;
                break;
            case "large":
                sizeClasses = tw`px-6 py-3 text-base`;
                break;
            default: // medium
                sizeClasses = tw`px-5 py-[11px] text-sm`;
        }

        const modeClasses = primary ? tw`bg-foreground-80 text-white` : tw`bg-background-80 text-text`;

        const hoverBg = primary ? "var(--color-foreground-100)" : "var(--color-background-60)";

        this.innerHTML = "";

        const element = href ? document.createElement("a") : document.createElement("button");

        if (href) {
            element.href = href;
            if (target) {
                element.target = target;
                if (target === "_blank") {
                    element.rel = "noopener noreferrer";
                }
            }
        } else {
            element.type = "button";
        }

        element.className = tw`${baseClasses} ${sizeClasses} ${modeClasses} slide-hover`;
        element.style.setProperty("--slide-hover-bg", hoverBg);
        if (backgroundColor) {
            element.style.backgroundColor = backgroundColor;
        }

        element.textContent = label;

        this.appendChild(element);
    }
}

if (!customElements.get("liko-button")) {
    customElements.define("liko-button", LikoButton);
}

export const LikoButtonExport = ({ primary, backgroundColor = null, size, label, onClick, href, target }) => {
    const btn = document.createElement("liko-button");
    if (primary) btn.setAttribute("primary", "");
    if (backgroundColor) btn.setAttribute("background-color", backgroundColor);
    if (size) btn.setAttribute("size", size);
    if (label) btn.setAttribute("label", label);
    if (href) btn.setAttribute("href", href);
    if (target) btn.setAttribute("target", target);
    if (onClick) {
        btn.addEventListener("click", onClick);
    }
    return btn;
};
