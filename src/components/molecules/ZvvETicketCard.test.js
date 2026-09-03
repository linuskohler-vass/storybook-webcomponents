import { afterEach, describe, expect, it, vi } from "vitest";

import { ZvvETicketCardExport } from "./ZvvETicketCard.js";

const createCard = (overrides = {}) => {
    const card = ZvvETicketCardExport({
        heading: "Gültige E-Tickets",
        zones: ["Zone 143", "Zone 144"],
        receiptNumber: "1428757139",
        refundLabel: "Ticket erstatten",
        downloadLabel: "Ticket herunterladen",
        ...overrides,
    });
    document.body.appendChild(card);
    return card;
};

afterEach(() => {
    document.body.innerHTML = "";
});

describe("ZvvETicketCard", () => {
    it("serializes and normalizes zones", () => {
        const card = createCard({ zones: ["Zone 143", " Zone 144 ", ""] });

        expect(card.getAttribute("zones")).toBe("Zone 143, Zone 144 ,");
        expect(card.zones).toEqual(["Zone 143", "Zone 144"]);
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
