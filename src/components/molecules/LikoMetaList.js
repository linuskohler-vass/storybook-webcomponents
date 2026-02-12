import { tw } from "../../utils/tw.js";

class LikoMetaList extends HTMLElement {
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
        this.innerHTML = "";

        const list = document.createElement("dl");
        list.className = tw`flex flex-col gap-4 font-nunito-sans`;

        for (const item of this.items) {
            const group = document.createElement("div");
            group.className = tw`border-b border-border pb-4 last:border-b-0`;

            const dt = document.createElement("dt");
            dt.className = tw`text-xs font-semibold tracking-wide text-foreground-40 uppercase`;
            dt.textContent = item.label;
            group.appendChild(dt);

            const dd = document.createElement("dd");
            dd.className = tw`mt-1 text-sm leading-snug text-text`;
            dd.textContent = item.value;
            group.appendChild(dd);

            list.appendChild(group);
        }

        this.appendChild(list);
    }
}

if (!customElements.get("liko-meta-list")) {
    customElements.define("liko-meta-list", LikoMetaList);
}

export const LikoMetaListExport = ({ items = [] }) => {
    const el = document.createElement("liko-meta-list");
    el.items = items;
    return el;
};
