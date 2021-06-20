import { configure, addDecorator } from '@storybook/react';
import themeDecorator from '../src/themes/themeDecorator';

addDecorator(themeDecorator);

const loaderFn = () => {
    const req = require.context('../src/components', true, /\.stories\.js$/);
    req.keys().forEach(fname => req(fname));
};

configure(loaderFn, module);