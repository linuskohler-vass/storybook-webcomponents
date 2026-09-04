import { afterEach, describe, expect, it, vi } from "vitest";

import { ZvvETicketCardExport } from "./ZvvETicketCard.js";

const defaultTicket = {
    passengerName: "Satoshi Nakamoto",
    provider: "Zürcher Verkehrsverbund",
    product: "ZVV Einzelbillett",
    zones: ["Zone 143", "Zone 144"],
    travelClass: "2. Klasse, Vollpreis",
    validity: "09.09.2025 16:36 – 09.09.2025 17:36",
    receipt: { label: "Kaufbeleg", number: "1428757139" },
    actions: {
        refundLabel: "Ticket erstatten",
        downloadLabel: "Ticket herunterladen",
    },
    qrCode: { alt: "QR-Code für das ZVV Einzelbillett" },
};

const createCard = ({
    heading = "Gültige E-Tickets",
    subtitle = "Aktive Tickets anzeigen",
    ticket = {},
    ...options
} = {}) => {
    const card = ZvvETicketCardExport({
        heading,
        subtitle,
        ticket: {
            ...defaultTicket,
            ...ticket,
            receipt: { ...defaultTicket.receipt, ...ticket.receipt },
            actions: { ...defaultTicket.actions, ...ticket.actions },
            qrCode: { ...defaultTicket.qrCode, ...ticket.qrCode },
        },
        ...options,
    });
    document.body.appendChild(card);
    return card;
};

afterEach(() => {
    document.body.innerHTML = "";
});

describe("ZvvETicketCard", () => {
    it("requires a ticket object", () => {
        expect(() => ZvvETicketCardExport({})).toThrow("requires a ticket object");
    });

    it("normalizes zones from the ticket object", () => {
        const card = createCard({ ticket: { zones: ["Zone 143", " Zone 144 ", ""] } });

        expect(card.ticket.zones).toEqual(["Zone 143", "Zone 144"]);
        expect(card.querySelectorAll("article span")).toHaveLength(2);
    });

    it("accepts serialized ticket data for declarative HTML", () => {
        const card = document.createElement("zvv-eticket-card");
        card.setAttribute("heading", "Ticket");
        card.setAttribute(
            "ticket-data",
            JSON.stringify({
                passengerName: "Ada Lovelace",
                receipt: { label: "Beleg", number: "1234" },
            }),
        );
        document.body.appendChild(card);

        expect(card.ticket).toMatchObject({
            passengerName: "Ada Lovelace",
            receipt: { label: "Beleg", number: "1234" },
        });
        expect(card.querySelector("button[aria-controls]").textContent).toContain("Ticket");
        expect(card.querySelector("article").textContent).toContain("Beleg: 1234");
    });

    it("emits the receipt number for ticket actions", () => {
        const onRefundRequest = vi.fn();
        const card = createCard({ onRefundRequest });

        [...card.querySelectorAll("button")].find((button) => button.textContent === "Ticket erstatten").click();

        expect(onRefundRequest).toHaveBeenCalledOnce();
        expect(onRefundRequest.mock.calls[0][0]).toMatchObject({
            type: "refund-request",
            detail: { receiptNumber: "1428757139" },
        });
    });

    it("updates disclosure state and emits the new value", () => {
        const onExpandedChange = vi.fn();
        const card = createCard({ expanded: false, onExpandedChange });
        const toggle = card.querySelector("button[aria-controls]");

        expect(card.expanded).toBe(false);
        expect(toggle.getAttribute("aria-expanded")).toBe("false");

        toggle.click();

        expect(card.expanded).toBe(true);
        expect(toggle.getAttribute("aria-expanded")).toBe("true");
        expect(onExpandedChange.mock.calls[0][0].detail).toEqual({ expanded: true });
    });
});
