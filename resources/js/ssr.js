import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { createInertiaApp } from '@inertiajs/vue3'
import createServer from '@inertiajs/vue3/server'
import route from "ziggy-js";
import {resolvePageComponent} from "laravel-vite-plugin/inertia-helpers";

createServer((page) => createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.globEager('./Pages/**/*.vue')),
    setup({ app, props, plugin }) {
        return createSSRApp({
            render: () => h(app, props),
        }).use(plugin)
            .mixin({ methods: { route: window.route } })
    },
}))
