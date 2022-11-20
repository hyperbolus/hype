import './bootstrap';
import '../css/app.css';

import { createApp, h } from 'vue';
import {createInertiaApp} from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from 'ziggy-js/dist/vue.m';
import route from "ziggy-js";
import Ziggy from "ziggy-js";

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'DashNet';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    //resolve: (name) => resolvePageComponent(`./Pages/Sig.vue`, import.meta.glob('./Pages/Sig.vue')),
    setup({ el, app, props, plugin }) {
        let _app = createApp({ render: () => h(app, props) })
        _app.config.globalProperties.$route = route

        return _app
            .use(plugin)
            .use(ZiggyVue, Ziggy)
            .mixin({ methods: { route: window.route } })
            .mount(el);
    },
});

InertiaProgress.init({ color: '#4B5563' });
