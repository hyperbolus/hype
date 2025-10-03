import './bootstrap.js';
import '../css/app.css';
import { createSSRApp, createApp, h } from 'vue';
import {createInertiaApp} from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import {ZiggyVue} from "ziggy-js/dist/vue.m"
import route from "ziggy-js";
import { createPinia } from 'pinia'

const appName = window.document.getElementsByTagName('title')[0]?.innerText;
const pinia = createPinia()

createInertiaApp({
    title: (title) => `${title}${appName ? ' - ' + appName : ''}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        let _app = createSSRApp({ render: () => h(App, props) })
        _app.config.globalProperties.$route = route

        return _app
            .use(plugin)
            .use(pinia)
            .use(ZiggyVue, route)
            .mixin({ methods: { route: window.route } })
            .mount(el);
    },
    progress: { color: '#34d399', delay: 350 }
}).then();

