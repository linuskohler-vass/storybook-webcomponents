import { tw } from "../../utils/tw.js";
import { ElementBase } from "../../utils/element-base.js";
import { likoButtonTag } from "../atoms/LikoButton";

/**
 * Pure render function — no browser globals, safe to run on the server.
 */
export const renderLikoButtonList = ({ buttons = [] }) => {
    if (buttons.length === 0) return "";

    const items = buttons
        .map((btn, i) =>
            likoButtonTag({
                label: btn.label,
                primary: btn.primary || false,
                size: btn.size || "medium",
                backgroundColor: btn.backgroundColor || null,
                href: btn.href || null,
                target: btn.target || null,
                extra: ` data-index="${i}"`,
            }),
        )
        .join("");

    return `<div class="${tw`flex flex-wrap items-center gap-3`}">${items}</div>`;
};

export class LikoButtonList extends ElementBase {
    get buttons() {
        return this._buttons || [];
    }

    set buttons(value) {
        this._buttons = value;
        if (this.isConnected) this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = renderLikoButtonList({ buttons: this.buttons });

        for (const el of this.querySelectorAll("liko-button")) {
            const onClick = this.buttons[Number(el.dataset.index)]?.onClick;
            if (onClick) el.addEventListener("click", onClick);
        }
    }
}

export const LikoButtonListExport = ({ buttons = [] }) => {
    const el = document.createElement("liko-button-list");
    el.buttons = buttons;
    return el;
};
