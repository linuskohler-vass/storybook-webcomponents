import { LikoMetaListExport } from "@/components/molecules/LikoMetaList";

export default {
    title: "Molecules/LikoMetaList",
    tags: ["autodocs"],
    render: (args) => LikoMetaListExport(args),
    argTypes: {
        items: { control: "object" },
    },
};

export const Default = {
    args: {
        items: [
            { label: "Client", value: "Acme Corporation" },
            { label: "Year", value: "2025" },
            { label: "Category", value: "Web Development" },
            { label: "Status", value: "Completed" },
            { label: "Location", value: "Zurich, Switzerland" },
        ],
    },
};

export const Minimal = {
    args: {
        items: [
            { label: "Type", value: "Photography" },
            { label: "Date", value: "March 2025" },
        ],
    },
};
