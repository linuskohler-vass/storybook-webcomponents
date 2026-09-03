import { tw } from "../../utils/tw.js";
import { createIcon } from "../../utils/icons.js";

let eticketCardId = 0;

const createElement = (tagName, className, text) => {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
};

class ZvvETicketCard extends HTMLElement {
    static get observedAttributes() {
        return [
            "heading",
            "subtitle",
            "passenger-name",
            "provider",
            "product",
            "zones",
            "travel-class",
            "validity",
            "receipt-label",
            "receipt-number",
            "refund-label",
            "download-label",
            "qr-code-src",
            "qr-code-alt",
            "collapsed",
        ];
    }

    constructor() {
        super();
        eticketCardId += 1;
        this._contentId = `zvv-eticket-card-content-${eticketCardId}`;
    }

    connectedCallback() {
        if (!this.style.display) this.style.display = "block";
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue || !this.isConnected) return;
        if (name === "collapsed") this.updateExpandedState();
        else this.render();
    }

    get expanded() {
        return !this.hasAttribute("collapsed");
    }

    set expanded(value) {
        this.toggleAttribute("collapsed", !value);
    }

    get zones() {
        return (this.getAttribute("zones") || "")
            .split(",")
            .map((zone) => zone.trim())
            .filter(Boolean);
    }

    set zones(value) {
        this.setAttribute("zones", Array.isArray(value) ? value.join(",") : value || "");
    }

    emit(name, detail = { receiptNumber: this.getAttribute("receipt-number") || "" }) {
        this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true, detail }));
    }

    updateExpandedState() {
        if (!this._header || !this._contentContainer || !this._content || !this._chevron) return;

        const expanded = this.expanded;
        this._header.setAttribute("aria-expanded", String(expanded));
        this._contentContainer.classList.toggle("grid-rows-[1fr]", expanded);
        this._contentContainer.classList.toggle("grid-rows-[0fr]", !expanded);
        this._content.setAttribute("aria-hidden", String(!expanded));
        this._content.toggleAttribute("inert", !expanded);

        const chevron = createIcon(expanded ? "chevron-up" : "chevron-down", {
            width: "20",
            height: "20",
            stroke: "#8b98aa",
        });
        chevron.classList.add("shrink-0");
        chevron.setAttribute("aria-hidden", "true");
        this._chevron.replaceWith(chevron);
        this._chevron = chevron;
    }

    render() {
        const heading = this.getAttribute("heading") || "";
        const subtitle = this.getAttribute("subtitle") || "";
        const passengerName = this.getAttribute("passenger-name") || "";
        const provider = this.getAttribute("provider") || "";
        const product = this.getAttribute("product") || "";
        const travelClass = this.getAttribute("travel-class") || "";
        const validity = this.getAttribute("validity") || "";
        const receiptLabel = this.getAttribute("receipt-label") || "";
        const receiptNumber = this.getAttribute("receipt-number") || "";
        const refundLabel = this.getAttribute("refund-label") || "";
        const downloadLabel = this.getAttribute("download-label") || "";
        const qrCodeSrc = this.getAttribute("qr-code-src");
        const qrCodeAlt = this.getAttribute("qr-code-alt") || "Ticket QR-Code";

        this.innerHTML = "";

        const card = createElement(
            "section",
            tw`w-full overflow-hidden border border-[#d5dde6] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.14)]`,
        );
        const header = createElement(
            "button",
            tw`flex w-full cursor-pointer items-center gap-6 border-0 bg-white px-8 py-7 text-left`,
        );
        header.type = "button";
        header.setAttribute("aria-expanded", String(this.expanded));
        header.setAttribute("aria-controls", this._contentId);

        const ticketIcon = createIcon("ticket", { width: "24", height: "24" });
        ticketIcon.classList.add("lucide", "lucide-ticket", "size-6", "shrink-0", "text-[#0088d4]");
        ticketIcon.setAttribute("aria-hidden", "true");
        header.appendChild(ticketIcon);

        const headerText = createElement("span", tw`min-w-0 grow`);
        headerText.appendChild(
            createElement("span", tw`block font-sans text-base font-semibold text-[#172133]`, heading),
        );
        headerText.appendChild(createElement("span", tw`mt-0.5 block text-sm font-semibold text-[#46536a]`, subtitle));
        header.appendChild(headerText);

        const chevron = createIcon(this.expanded ? "chevron-up" : "chevron-down", {
            width: "20",
            height: "20",
            stroke: "#8b98aa",
        });
        chevron.classList.add("shrink-0");
        chevron.setAttribute("aria-hidden", "true");
        header.appendChild(chevron);
        header.addEventListener("click", () => {
            this.expanded = !this.expanded;
            this.emit("expanded-change", { expanded: this.expanded });
        });
        card.appendChild(header);

        const contentContainer = createElement(
            "div",
            tw`grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none`,
        );
        const contentClip = createElement("div", tw`min-h-0 overflow-hidden`);
        const content = createElement("div", tw`border-t border-[#d5dde6] px-6 py-6`);
        content.id = this._contentId;
        const ticket = createElement("article", tw`border border-[#d5dde6] px-6 py-7`);
        const details = createElement("div", tw`grid grid-cols-1 gap-6 sm:grid-cols-[minmax(0,1fr)_7rem] sm:gap-10`);
        const text = createElement("div", tw`min-w-0 text-sm text-[#46536a]`);

        text.appendChild(createElement("h3", tw`mb-1 font-sans text-base font-semibold text-[#172133]`, passengerName));
        text.appendChild(createElement("p", tw`mb-3 text-sm leading-5 font-semibold`, provider));
        text.appendChild(createElement("p", tw`mb-2 text-sm leading-5 font-semibold text-[#172133]`, product));

        if (this.zones.length) {
            const zones = createElement("div", tw`mb-2 flex flex-wrap gap-2`);
            for (const zone of this.zones)
                zones.appendChild(
                    createElement("span", tw`rounded-sm bg-[#edf2ff] px-2 py-1 text-xs font-bold text-[#0046d5]`, zone),
                );
            text.appendChild(zones);
        }

        text.appendChild(createElement("p", tw`mb-4 text-sm leading-5 font-semibold`, travelClass));
        text.appendChild(createElement("p", tw`mb-1 text-sm leading-5 font-bold text-[#f4511e]`, validity));
        text.appendChild(
            createElement(
                "p",
                tw`mb-0 text-sm leading-5 font-bold text-[#f4511e]`,
                receiptNumber ? [receiptLabel, receiptNumber].filter(Boolean).join(": ") : "",
            ),
        );
        details.appendChild(text);

        if (qrCodeSrc) {
            const qrCode = document.createElement("img");
            qrCode.src = qrCodeSrc;
            qrCode.alt = qrCodeAlt;
            qrCode.width = 112;
            qrCode.height = 112;
            qrCode.className = tw`h-28 w-28 justify-self-start object-contain sm:justify-self-end`;
            details.appendChild(qrCode);
        }

        ticket.appendChild(details);

        const actions = createElement("div", tw`mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2`);
        const buttonClasses = tw`min-h-10 cursor-pointer rounded-md border-0 bg-[#0785d1] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#006fb3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006fb3]`;

        if (refundLabel) {
            const refund = createElement("button", buttonClasses, refundLabel);
            refund.type = "button";
            refund.addEventListener("click", () => this.emit("refund-request"));
            actions.appendChild(refund);
        }

        if (downloadLabel) {
            const download = createElement("button", buttonClasses, downloadLabel);
            download.type = "button";
            download.addEventListener("click", () => this.emit("download-request"));
            actions.appendChild(download);
        }

        ticket.appendChild(actions);
        content.appendChild(ticket);
        contentClip.appendChild(content);
        contentContainer.appendChild(contentClip);
        card.appendChild(contentContainer);
        this.appendChild(card);

        this._header = header;
        this._contentContainer = contentContainer;
        this._content = content;
        this._chevron = chevron;
        this.updateExpandedState();
    }
}

if (!customElements.get("zvv-eticket-card")) {
    customElements.define("zvv-eticket-card", ZvvETicketCard);
}

export const ZvvETicketCardExport = ({
    heading,
    subtitle,
    passengerName,
    provider,
    product,
    zones,
    travelClass,
    validity,
    receiptLabel,
    receiptNumber,
    refundLabel,
    downloadLabel,
    qrCodeSrc,
    qrCodeAlt,
    expanded = true,
    onRefundRequest,
    onDownloadRequest,
    onExpandedChange,
}) => {
    const card = document.createElement("zvv-eticket-card");
    const attributes = {
        heading,
        subtitle,
        "passenger-name": passengerName,
        provider,
        product,
        zones: Array.isArray(zones) ? zones.join(",") : zones,
        "travel-class": travelClass,
        validity,
        "receipt-label": receiptLabel,
        "receipt-number": receiptNumber,
        "refund-label": refundLabel,
        "download-label": downloadLabel,
        "qr-code-src": qrCodeSrc,
        "qr-code-alt": qrCodeAlt,
    };

    for (const [name, value] of Object.entries(attributes)) {
        if (value !== undefined && value !== null && value !== "") card.setAttribute(name, value);
    }

    if (!expanded) card.setAttribute("collapsed", "");
    if (onRefundRequest) card.addEventListener("refund-request", onRefundRequest);
    if (onDownloadRequest) card.addEventListener("download-request", onDownloadRequest);
    if (onExpandedChange) card.addEventListener("expanded-change", onExpandedChange);
    return card;
};
