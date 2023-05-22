const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.vue',
    ],

    darkMode: 'class',

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'ui': {
                    50: '#F9FAFC',
                    100: '#EBEFF5',
                    200: '#DCE2EC',
                    300: '#C2CDDF',
                    400: '#A2AEC3',
                    500: '#737F93',
                    600: '#4E576B',
                    700: '#31384A',
                    800: '#252C3B',
                    900: '#1A212D',
                    950: '#141924',
                    1000: '#0F141C',
                }
            },
        },
    },

    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography')
    ],
};
