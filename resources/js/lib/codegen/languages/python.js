export default {
    name: 'Python',
    libraries: {
        requests: {
            name: 'Requests',
            slice: 2,
            wrap: true,
            install: 'python -m pip install requests',
            parameter: '    "%KEY%": "%VALUE%",\n',
            boilerplate: '',
        },
    },
}
