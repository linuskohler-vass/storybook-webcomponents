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
                        selector: "*:not(.text-\\[\\#ff6800\\]):not(.bg-\\[\\#0479cc\\])",
                    },
                ],
            },
        },
        docs: {
            description: {
                component: `The ETicketCard is a self-rendering Web Component. Pass heading and subtitle separately and provide ticket data through the required **ticket** object property or the JSON **ticket-data** attribute. For the ticket props see the stories.

## Events
Possible to override if not handled inside the component.

- **refund-request** and **download-request** include **{ receiptNumber }**.
- **expanded-change** includes **{ expanded }**.
- **ticket-data-error** includes **{ error }** when JSON parsing fails.

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
        ticket: {
            control: "object",
            description: "Required structured ticket data.",
            type: { name: "object", required: true },
            table: { type: { summary: "ZvvETicket" } },
        },
        expanded: { control: "boolean" },
        onRefundRequest: { control: false, description: "Handles the refund-request event." },
        onDownloadRequest: { control: false, description: "Handles the download-request event." },
        onExpandedChange: { control: false, description: "Handles the expanded-change event." },
    },
    args: {
        heading: "Gültige E-Tickets",
        subtitle: "Aktive Tickets anzeigen",
        ticket: {
            passengerName: "Satoshi Nakamoto",
            provider: "Zürcher Verkehrsverbund",
            product: "ZVV Einzelbillett",
            zones: ["Zone 143", "Zone 144"],
            travelClass: "2. Klasse, Vollpreis",
            validity: "09.09.2025 16:36 – 09.09.2025 17:36",
            receipt: {
                label: "Kaufbeleg",
                number: "1428757139",
            },
            actions: {
                refundLabel: "Ticket erstatten",
                downloadLabel: "Ticket herunterladen",
            },
            qrCode: {
                src: qrCodeSrc,
                alt: "QR-Code für das ZVV Einzelbillett",
            },
        },
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
