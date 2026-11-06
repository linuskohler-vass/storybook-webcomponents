import { tw } from "../../utils/tw.js";
import { ElementBase } from "../../utils/element-base.js";
import { attr, boolAttr, escapeHtml } from "../../utils/html.js";

/**
 * Pure render function — no browser globals, safe to run on the server.
 */
export const renderLikoButton = ({ primary, backgroundColor = null, size, label, href, target }) => {
    const baseClasses = tw`inline-block cursor-pointer rounded-3xl border-0 leading-none font-bold no-underline`;

    let sizeClasses;
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
    const bgStyle = backgroundColor ? ` background-color: ${escapeHtml(backgroundColor)};` : "";
    const common = `class="${baseClasses} ${sizeClasses} ${modeClasses} slide-hover" style="--slide-hover-bg: ${hoverBg};${bgStyle}"`;

    if (href) {
        const rel = target === "_blank" ? " rel=\"noopener noreferrer\"" : "";
        return `<a href="${escapeHtml(href)}"${attr("target", target)}${rel} ${common}>${escapeHtml(label)}</a>`;
    }
    return `<button type="button" ${common}>${escapeHtml(label)}</button>`;
};

export class LikoButton extends ElementBase {
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
        this.innerHTML = renderLikoButton({
            primary: this.hasAttribute("primary"),
            backgroundColor: this.getAttribute("background-color"),
            size: this.getAttribute("size") || "medium",
            label: this.getAttribute("label"),
            href: this.getAttribute("href"),
            target: this.getAttribute("target"),
        });
    }
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

/**
 * Emits a <liko-button> custom-element tag from props (for composite components).
 * Pure — safe to run on the server.
 */
export const likoButtonTag = ({ label, primary, size, backgroundColor, href, target, extra = "" }) =>
    `<liko-button${attr("label", label)}${boolAttr("primary", primary)}${attr("size", size)}${attr("background-color", backgroundColor)}${attr("href", href)}${attr("target", target)}${extra}></liko-button>`;
