import { configure } from '@storybook/react'


const loaderFn = () => {
    const req = require.context('../src/components', true, /\.stories\.js$/)
    req.keys().forEach(fname => req(fname))
}

configure(loaderFn, module)