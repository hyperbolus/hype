const templates = import.meta.glob('./templates/*', {eager: true, import: 'default', query: '?raw'});

export default {
    name: 'PHP',
    libraries: {
        curl: {
            name: 'cURL',
            slice: 0,
            wrap: true,
            parameter: '    \'%KEY%\' => \'%VALUE%\',\n',
            capitalMethod: true,
            boilerplate: ``,
        },
        guzzle: {
            name: 'Guzzle',
            slice: 0,
            wrap: true,
            parameter: '    \'%KEY%\' => \'%VALUE%\',\n',
            install: 'composer require guzzlehttp/guzzle',
            capitalMethod: true,
            boilerplate: ``,
        },
    },
}
