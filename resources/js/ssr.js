import '../css/app.css';
import { createSSRApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import {resolvePageComponent} from "laravel-vite-plugin/inertia-helpers";
import {ZiggyVue} from "../../vendor/tightenco/ziggy/dist/vue.m.js"
//import { ZiggyVue } from "ziggy-js/dist/vue";
import { createPinia } from 'pinia'

import { renderToString } from '@vue/server-renderer'
import createServer from '@inertiajs/vue3/server'

const pinia = createPinia()

createServer((page) => createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.globEager('./Pages/**/*.vue')),
    setup({ App, props, plugin }) {
        let _app = createSSRApp({render: () => h(App, props)});
        globalThis.Ziggy = props.initialPage.props.ziggy;

        return _app
            .use(plugin)
            .use(pinia)
            .use(ZiggyVue)
    },
}))
