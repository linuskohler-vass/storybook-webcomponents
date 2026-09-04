import { tw } from "../../utils/tw.js";
import { createIcon } from "../../utils/icons.js";

let eticketCardId = 0;

const HTMLElementBase = globalThis.HTMLElement || class {};

const createElement = (tagName, className, text) => {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text !== undefined && text !== null) element.textContent = text;
    return element;
};

const normalizeTicket = (value) => {
    if (value === undefined || value === null) return null;
    if (typeof value !== "object" || Array.isArray(value)) {
        throw new TypeError("ZvvETicketCard.ticket must be an object.");
    }

    const receipt = value.receipt || {};
    const actions = value.actions || {};
    const qrCode = value.qrCode || {};
    return {
        passengerName: value.passengerName || "",
        provider: value.provider || "",
        product: value.product || "",
        zones: Array.isArray(value.zones) ? value.zones.map((zone) => String(zone).trim()).filter(Boolean) : [],
        travelClass: value.travelClass || "",
        validity: value.validity || "",
        receipt: {
            label: receipt.label || "",
            number: receipt.number || "",
        },
        actions: {
            refundLabel: actions.refundLabel || "",
            downloadLabel: actions.downloadLabel || "",
        },
        qrCode: {
            src: qrCode.src || null,
            alt: qrCode.alt || "Ticket QR-Code",
        },
    };
};

class ZvvETicketCard extends HTMLElementBase {
    static get observedAttributes() {
        return ["heading", "subtitle", "ticket-data", "collapsed"];
    }

    constructor() {
        super();
        eticketCardId += 1;
        this._contentId = `zvv-eticket-card-content-${eticketCardId}`;
        this._ticket = null;
    }

    connectedCallback() {
        if (!this.style.display) this.style.display = "block";
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        if (name === "ticket-data") this.updateTicketFromAttribute(newValue);
        else if (name === "collapsed" && this.isConnected) this.updateExpandedState();
        else if (this.isConnected) this.render();
    }

    get expanded() {
        return !this.hasAttribute("collapsed");
    }

    set expanded(value) {
        this.toggleAttribute("collapsed", !value);
    }

    get ticket() {
        return this._ticket;
    }

    set ticket(value) {
        this._ticket = normalizeTicket(value);
        if (this.isConnected) this.render();
    }

    updateTicketFromAttribute(value) {
        if (!value) {
            this._ticket = null;
        } else {
            try {
                this._ticket = normalizeTicket(JSON.parse(value));
            } catch (error) {
                this._ticket = null;
                this.dispatchEvent(
                    new CustomEvent("ticket-data-error", {
                        bubbles: true,
                        composed: true,
                        detail: { error },
                    }),
                );
            }
        }
        if (this.isConnected) this.render();
    }

    emit(name, detail = { receiptNumber: this.ticket?.receipt.number || "" }) {
        this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true, detail }));
    }

    createChevron() {
        const chevron = createIcon(this.expanded ? "chevron-up" : "chevron-down", {
            width: "20",
            height: "20",
            stroke: "#8b98aa",
        });
        chevron.classList.add("shrink-0");
        chevron.setAttribute("aria-hidden", "true");
        return chevron;
    }

    createHeader() {
        const header = createElement(
            "button",
            tw`flex w-full cursor-pointer items-center gap-4 border-0 bg-white p-6 text-left transition-colors hover:bg-[var(--color-gray-50)]`,
        );
        header.type = "button";
        header.setAttribute("aria-expanded", String(this.expanded));
        header.setAttribute("aria-controls", this._contentId);

        const ticketIcon = createIcon("ticket", { width: "24", height: "24" });
        ticketIcon.classList.add("lucide", "lucide-ticket", "size-6", "text-[#0088d4]");
        ticketIcon.setAttribute("aria-hidden", "true");
        const ticketIconWrapper = createElement("div", tw`flex size-10 shrink-0 items-center justify-center`);
        ticketIconWrapper.appendChild(ticketIcon);

        const headerText = createElement("span", tw`min-w-0 grow`);
        headerText.append(
            createElement(
                "span",
                tw`block font-sans text-base font-semibold text-[#172133]`,
                this.getAttribute("heading") || "",
            ),
            createElement(
                "span",
                tw`mt-0.5 block text-sm font-semibold text-[#46536a]`,
                this.getAttribute("subtitle") || "",
            ),
        );

        this._chevron = this.createChevron();
        header.append(ticketIconWrapper, headerText, this._chevron);
        header.addEventListener("click", () => {
            this.expanded = !this.expanded;
            this.emit("expanded-change", { expanded: this.expanded });
        });
        this._header = header;
        return header;
    }

    createTicketText(ticket) {
        const text = createElement("div", tw`min-w-0 text-sm text-[#46536a]`);
        text.append(
            createElement("h3", tw`mb-1 font-sans text-base font-semibold text-[#172133]`, ticket.passengerName),
            createElement("p", tw`mb-3 text-sm leading-5 font-semibold`, ticket.provider),
            createElement("p", tw`mb-2 text-sm leading-5 font-semibold text-[#172133]`, ticket.product),
        );

        if (ticket.zones.length) {
            const zones = createElement("div", tw`mb-2 flex flex-wrap gap-2`);
            for (const zone of ticket.zones) {
                zones.appendChild(
                    createElement("span", tw`rounded-sm bg-[#edf2ff] px-2 py-1 text-xs font-bold text-[#004de5]`, zone),
                );
            }
            text.appendChild(zones);
        }

        text.append(
            createElement("p", tw`mb-4 text-sm leading-5 font-semibold`, ticket.travelClass),
            createElement("p", tw`mb-1 text-sm leading-5 font-bold text-[#ff6800]`, ticket.validity),
            createElement(
                "p",
                tw`mb-0 text-sm leading-5 font-bold text-[#ff6800]`,
                ticket.receipt.number ? [ticket.receipt.label, ticket.receipt.number].filter(Boolean).join(": ") : "",
            ),
        );
        return text;
    }

    createTicketDetails(ticket) {
        const details = createElement("div", tw`grid grid-cols-1 gap-6 sm:grid-cols-[minmax(0,1fr)_7rem] sm:gap-10`);
        details.appendChild(this.createTicketText(ticket));

        if (ticket.qrCode.src) {
            const qrCode = createElement("img", tw`h-28 w-28 justify-self-start object-contain sm:justify-self-end`);
            qrCode.src = ticket.qrCode.src;
            qrCode.alt = ticket.qrCode.alt;
            qrCode.width = 112;
            qrCode.height = 112;
            details.appendChild(qrCode);
        }
        return details;
    }

    createActionButton(label, eventName) {
        const button = createElement(
            "button",
            tw`min-h-10 cursor-pointer rounded-md border-0 bg-[#0479cc] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#006fb3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006fb3]`,
            label,
        );
        button.type = "button";
        button.addEventListener("click", () => this.emit(eventName));
        return button;
    }

    createActions(actions) {
        if (!actions.refundLabel && !actions.downloadLabel) return null;

        const container = createElement("div", tw`mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2`);
        if (actions.refundLabel) {
            container.appendChild(this.createActionButton(actions.refundLabel, "refund-request"));
        }
        if (actions.downloadLabel) {
            container.appendChild(this.createActionButton(actions.downloadLabel, "download-request"));
        }
        return container;
    }

    createContent(ticketData) {
        const contentContainer = createElement(
            "div",
            tw`grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none`,
        );
        const contentClip = createElement("div", tw`min-h-0 overflow-hidden`);
        const content = createElement("div", tw`border-t border-[#d5dde6] p-6`);
        const ticket = createElement("article", tw`border border-[#d5dde6] p-6`);
        content.id = this._contentId;

        ticket.appendChild(this.createTicketDetails(ticketData));
        const actions = this.createActions(ticketData.actions);
        if (actions) ticket.appendChild(actions);

        content.appendChild(ticket);
        contentClip.appendChild(content);
        contentContainer.appendChild(contentClip);
        this._contentContainer = contentContainer;
        this._content = content;
        return contentContainer;
    }

    createCard(ticket) {
        const card = createElement(
            "section",
            tw`w-full overflow-hidden border border-[#d5dde6] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.14)]`,
        );
        card.append(this.createHeader(), this.createContent(ticket));
        return card;
    }

    updateExpandedState() {
        if (!this._header || !this._contentContainer || !this._content || !this._chevron) return;

        const expanded = this.expanded;
        this._header.setAttribute("aria-expanded", String(expanded));
        this._contentContainer.classList.toggle("grid-rows-[1fr]", expanded);
        this._contentContainer.classList.toggle("grid-rows-[0fr]", !expanded);
        this._content.setAttribute("aria-hidden", String(!expanded));
        this._content.toggleAttribute("inert", !expanded);

        const chevron = this.createChevron();
        this._chevron.replaceWith(chevron);
        this._chevron = chevron;
    }

    render() {
        if (!this.ticket) {
            this.replaceChildren();
            return;
        }

        this.replaceChildren(this.createCard(this.ticket));
        this.updateExpandedState();
    }
}

if (globalThis.customElements && !globalThis.customElements.get("zvv-eticket-card")) {
    globalThis.customElements.define("zvv-eticket-card", ZvvETicketCard);
}

export const ZvvETicketCardExport = ({
    heading,
    subtitle,
    ticket,
    expanded = true,
    onRefundRequest,
    onDownloadRequest,
    onExpandedChange,
} = {}) => {
    if (!ticket) throw new TypeError("ZvvETicketCardExport requires a ticket object.");

    const card = document.createElement("zvv-eticket-card");
    if (heading) card.setAttribute("heading", heading);
    if (subtitle) card.setAttribute("subtitle", subtitle);
    card.ticket = ticket;
    card.expanded = expanded;

    if (onRefundRequest) card.addEventListener("refund-request", onRefundRequest);
    if (onDownloadRequest) card.addEventListener("download-request", onDownloadRequest);
    if (onExpandedChange) card.addEventListener("expanded-change", onExpandedChange);
    return card;
};
