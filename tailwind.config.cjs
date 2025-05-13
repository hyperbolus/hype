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
                    50:   'rgb(var(--color-ui-50)  )',
                    100:  'rgb(var(--color-ui-100) )',
                    200:  'rgb(var(--color-ui-200) )',
                    300:  'rgb(var(--color-ui-300) )',
                    400:  'rgb(var(--color-ui-400) )',
                    500:  'rgb(var(--color-ui-500) )',
                    600:  'rgb(var(--color-ui-600) )',
                    700:  'rgb(var(--color-ui-700) )',
                    800:  'rgb(var(--color-ui-800) )',
                    900:  'rgb(var(--color-ui-900) )',
                    950:  'rgb(var(--color-ui-950) )',
                    1000: 'rgb(var(--color-ui-1000))',
                },
                'redperbolus': {
                    50:   '#FCF9FB',
                    100:  '#F4F0F3',
                    200:  '#EAE3E7',
                    300:  '#DBD2D8',
                    400:  '#C3B6BE',
                    500:  '#A2919A',
                    600:  '#74636D',
                    700:  '#54424C',
                    800:  '#3F3038',
                    900:  '#2F232A',
                    950:  '#23191E',
                    1000: '#1A1116',
                },
                'lightredperbolus': {
                    1000: '#FCF9FB',
                    950: '#F4F0F3',
                    900: '#EAE3E7',
                    800: '#DBD2D8',
                    700: '#C3B6BE',
                    600: '#A2919A',
                    500: '#74636D',
                    400: '#54424C',
                    300: '#3F3038',
                    200: '#2F232A',
                    150: '#23191E',
                    50: '#1A1116',
                }
            },
        },
    },

    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography')
    ],
};
