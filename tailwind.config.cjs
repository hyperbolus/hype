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
                }
            },
        },
    },

    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography')
    ],
};
