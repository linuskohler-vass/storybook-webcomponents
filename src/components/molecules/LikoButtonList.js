import { tw } from "../../utils/tw.js";
import { LikoButtonExport } from "../atoms/LikoButton";

class LikoButtonList extends HTMLElement {
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
        this.innerHTML = "";

        if (this.buttons.length === 0) return;

        const wrapper = document.createElement("div");
        wrapper.className = tw`flex flex-wrap items-center gap-3`;

        for (const btnConfig of this.buttons) {
            const btn = LikoButtonExport({
                label: btnConfig.label,
                primary: btnConfig.primary || false,
                size: btnConfig.size || "medium",
                backgroundColor: btnConfig.backgroundColor || null,
                onClick: btnConfig.onClick || null,
                href: btnConfig.href || null,
                target: btnConfig.target || null,
            });
            wrapper.appendChild(btn);
        }

        this.appendChild(wrapper);
    }
}

if (!customElements.get("liko-button-list")) {
    customElements.define("liko-button-list", LikoButtonList);
}

export const LikoButtonListExport = ({ buttons = [] }) => {
    const el = document.createElement("liko-button-list");
    el.buttons = buttons;
    return el;
};
