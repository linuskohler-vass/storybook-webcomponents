import { expect, fn, userEvent } from "storybook/test";

import { ZvvETicketCardExport } from "@/components/molecules/ZvvETicketCard";

const qrCodeSrc = "https://api.qrserver.com/v1/create-qr-code/?size=224x224&data=ZVV-1428757139";

const render = (args) => {
    const wrapper = document.createElement("div");
    wrapper.className = "w-[min(760px,calc(100vw-2rem))]";
    wrapper.appendChild(ZvvETicketCardExport(args));
    return wrapper;
};

const verifyDisclosure = async (canvasElement, initiallyExpanded) => {
    const card = canvasElement.querySelector("zvv-eticket-card");
    const toggle = card.querySelector("button[aria-controls]");
    const content = card.querySelector(`#${toggle.getAttribute("aria-controls")}`);

    const expectState = async (expanded) => {
        await expect(toggle).toHaveAttribute("aria-expanded", String(expanded));
        await expect(content).toHaveAttribute("aria-hidden", String(!expanded));
        await expect(content.inert).toBe(!expanded);
    };

    await expect(content).toBeTruthy();
    await expectState(initiallyExpanded);
    toggle.focus();
    await userEvent.keyboard("{Enter}");
    await expectState(!initiallyExpanded);
    await userEvent.click(toggle);
    await expectState(initiallyExpanded);
};

export default {
    title: "ZVV/ETicketCard",
    tags: ["autodocs"],
    render,
    parameters: {
        layout: "centered",
        a11y: {
            config: {
                rules: [
                    {
                        id: "color-contrast",
                        selector: "*:not(.text-\\[\\#f4511e\\]):not(.bg-\\[\\#0785d1\\])",
                    },
                ],
            },
        },
        docs: {
            description: {
                component: `The ETicketCard component presents an electronic ticket together with passenger, validity, zone, receipt, and QR-code information. Its ticket details can be expanded or collapsed.

## Accessibility

> **Info:** Accessibility tests and analysis reports are included in each story. To see them, open a story and click on the Accessibility tab in the control panel. The included tests run against a set of established measurement metrics based on WCAG. For more insight into the accessibility test plugin, see the [Storybook accessibility testing documentation](https://storybook.js.org/docs/writing-tests/accessibility-testing).

## HTML

> **Info:** To copy and paste the component's HTML, open a story and click on the HTML tab in the control panel.`,
            },
        },
    },
    argTypes: {
        heading: { control: "text" },
        subtitle: { control: "text" },
        passengerName: { control: "text" },
        provider: { control: "text" },
        product: { control: "text" },
        zones: { control: "object" },
        travelClass: { control: "text" },
        validity: { control: "text" },
        receiptLabel: { control: "text" },
        receiptNumber: { control: "text" },
        refundLabel: { control: "text" },
        downloadLabel: { control: "text" },
        qrCodeSrc: { control: "text" },
        qrCodeAlt: { control: "text" },
        expanded: { control: "boolean" },
    },
    args: {
        heading: "Gültige E-Tickets",
        subtitle: "Aktive Tickets anzeigen",
        passengerName: "Satoshi Nakamoto",
        provider: "Zürcher Verkehrsverbund",
        product: "ZVV Einzelbillett",
        zones: ["Zone 143", "Zone 144"],
        travelClass: "2. Klasse, Vollpreis",
        validity: "09.09.2025 16:36 – 09.09.2025 17:36",
        receiptLabel: "Kaufbeleg",
        receiptNumber: "1428757139",
        refundLabel: "Ticket erstatten",
        downloadLabel: "Ticket herunterladen",
        qrCodeSrc,
        qrCodeAlt: "QR-Code für das ZVV Einzelbillett",
        expanded: true,
        onRefundRequest: fn(),
        onDownloadRequest: fn(),
        onExpandedChange: fn(),
    },
};

export const Default = {
    play: ({ canvasElement }) => verifyDisclosure(canvasElement, true),
};

export const Collapsed = {
    args: { expanded: false },
    play: ({ canvasElement }) => verifyDisclosure(canvasElement, false),
};
