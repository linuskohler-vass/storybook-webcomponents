import * as LikoHeaderStories from './LikoHeader.stories';
import { LikoPageExport } from '@/components/LikoPage';

export default {
  title: 'Liko/LikoPage',
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
