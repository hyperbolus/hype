export default {
    name: 'JavaScript',
    libraries: {
        fetch: {
            name: 'fetch',
            slice: 0,
            wrap: true,
            capitalMethod: true,
            parameter: '    \'%KEY%\': \'%VALUE%\',\n',
            boilerplate: ``,
        },
    },
}
