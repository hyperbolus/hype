export default {
    name: 'Shell',
    libraries: {
        curl: {
            name: 'cURL',
            slice: 0,
            wrap: false,
            capitalMethod: true,
            parameter: ' \\\n     --header \'%KEY%: %VALUE%\'',
            boilerplate: ``,
        },
    },
}
