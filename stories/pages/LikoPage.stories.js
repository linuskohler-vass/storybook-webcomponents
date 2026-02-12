import * as LikoHeaderStories from "../molecules/LikoHeader.stories";
import { LikoPageExport } from "@/components/pages/LikoPage";

export default {
    title: "Pages/LikoPage",
    render: (args) => LikoPageExport(args),
};

export const LoggedIn = {
    args: {
        // More on composing args: https://storybook.js.org/docs/writing-stories/args#args-composition
        ...LikoHeaderStories.LoggedIn.args,
    },
};

export const LoggedOut = {
    args: {
        ...LikoHeaderStories.LoggedOut.args,
    },
};
