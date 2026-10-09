import { setProjectAnnotations } from '@storybook/web-components';
import * as a11yAnnotations from '@storybook/addon-a11y/preview';
import * as previewAnnotations from './preview';

setProjectAnnotations([a11yAnnotations, previewAnnotations]);
