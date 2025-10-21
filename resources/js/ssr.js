import '../css/app.css';
import { createSSRApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import {resolvePageComponent} from "laravel-vite-plugin/inertia-helpers";
import { createPinia } from 'pinia'
import route from "ziggy-js";
import { renderToString } from '@vue/server-renderer'
import createServer from '@inertiajs/vue3/server'

const pinia = createPinia()

createServer((page) => createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.globEager('./Pages/**/*.vue')),
    setup({ App, props, plugin }) {
        let _app = createSSRApp({render: () => h(App, props)});
        globalThis.Ziggy = props.initialPage.props.app.ziggy;

        return _app
            .use(plugin)
            .use(pinia)
            .use({
                install(app, options) {
                    const r = (name, params, absolute, config = options) => route(name, params, absolute, config);

                    app.mixin({
                        methods: {
                            route: r,
                        },
                    });

                    if (parseInt(app.version) > 2) {
                        app.provide('route', r);
                    }
                },
            })
    },
}))
