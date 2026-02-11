import { tw } from "../utils/tw.js";

class LikoButton extends HTMLElement {
    static get observedAttributes() {
        return ["primary", "size", "label", "background-color"];
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

        const baseClasses = tw`inline-block cursor-pointer rounded-3xl border-0 font-nunito-sans leading-none font-bold`;

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

        const modeClasses = primary
            ? tw`bg-[#555ab9] text-white`
            : tw`bg-transparent text-[#333] shadow-[rgba(0,0,0,0.15)_0px_0px_0px_1px_inset]`;

        this.innerHTML = "";

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = tw`${baseClasses} ${sizeClasses} ${modeClasses}`;
        btn.innerText = label;
        if (backgroundColor) {
            btn.style.backgroundColor = backgroundColor;
        }

        this.appendChild(btn);
    }
}

if (!customElements.get("liko-button")) {
    customElements.define("liko-button", LikoButton);
}

export const LikoButtonExport = ({ primary, backgroundColor = null, size, label, onClick }) => {
    const btn = document.createElement("liko-button");
    if (primary) btn.setAttribute("primary", "");
    if (backgroundColor) btn.setAttribute("background-color", backgroundColor);
    if (size) btn.setAttribute("size", size);
    if (label) btn.setAttribute("label", label);
    if (onClick) {
        btn.addEventListener("click", onClick);
    }
    return btn;
};
