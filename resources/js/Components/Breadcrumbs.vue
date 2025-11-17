<script setup>
import { Link } from '@inertiajs/vue3'
import route from 'ziggy-js'
import {siteName} from "../util.js";
import Icon from "./Icon.vue";

const props = defineProps({
    fullwidth: {
        type: Boolean,
        default: false
    },
    decoration: {
        type: Boolean,
        default: true
    },
})
</script>
<template>
    <div class="x justify-center w-full" :class="{'decorated': decoration, 'fullwidth': fullwidth}">
        <div class="x items-start gap-2 justify-between w-full text-xs">
            <div class="x flex-wrap gap-2 py-2">
                <Link :href="route('home')">{{ siteName() }}</Link>
                <div class="x items-center gap-2" v-if="$page.props.__meta_breadcrumbs" v-for="crumb in $page.props.__meta_breadcrumbs">
                    <Icon class="size-4" name="chevron-right"/>
                    <Link v-if="crumb.url" :href="crumb.url.toString()">{{ crumb.text }}</Link>
                    <span v-else>{{ crumb.text }}</span>
                </div>
                <template v-else>
                    <Icon class="size-4" name="chevron-right"/>
                    <slot/>
                </template>
            </div>
        </div>
    </div>
</template>
<style scoped>
.decorated.fullwidth {
    @apply bg-ui-950;
}

.decorated:not(.fullwidth) {
    @apply mt-2;
}

.decorated > div {
    @apply lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4;
}

.decorated:not(.fullwidth) > div {
    @apply border-y border-ui-800 bg-ui-900 lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl md:mx-4 md:rounded-lg md:border-x;
}
</style>
