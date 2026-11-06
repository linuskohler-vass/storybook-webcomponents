import { tw } from "../../utils/tw.js";
import { ElementBase } from "../../utils/element-base.js";
import { escapeHtml } from "../../utils/html.js";

/**
 * Pure render function — no browser globals, safe to run on the server.
 */
export const renderLikoMetaList = ({ items = [] }) => {
    const groups = items
        .map(
            (item) =>
                `<div class="${tw`border-b border-border pb-4 last:border-b-0`}"><dt class="${tw`text-xs font-semibold tracking-wide text-foreground-40 uppercase`}">${escapeHtml(item.label)}</dt><dd class="${tw`mt-1 text-sm leading-snug text-text`}">${escapeHtml(item.value)}</dd></div>`,
        )
        .join("");

    return `<dl class="${tw`flex flex-col gap-4`}">${groups}</dl>`;
};

export class LikoMetaList extends ElementBase {
    get items() {
        return this._items || [];
    }

    set items(value) {
        this._items = value;
        if (this.isConnected) this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = renderLikoMetaList({ items: this.items });
    }
}

export const LikoMetaListExport = ({ items = [] }) => {
    const el = document.createElement("liko-meta-list");
    el.items = items;
    return el;
};
