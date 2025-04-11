<script setup>
import { Link } from '@inertiajs/vue3'
import route from 'ziggy-js'

const props = defineProps({
    fullwidth: {
        type: Boolean,
        default: false
    }
})
</script>
<template>
    <div class="x justify-center w-full" :class="fullwidth ? 'bg-ui-950' : 'mt-4'">
        <div class="x items-start gap-2 justify-between w-full lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl text-xs px-4" :class="fullwidth ? '' : 'border-y border-ui-800 bg-ui-900 lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl md:mx-4 md:rounded-lg md:border-x'">
            <div class="x flex-wrap gap-2 py-2">
                <Link :href="route('home')">Hyperbolus</Link>
                <div class="x items-center gap-2" v-if="$page.props.__meta_breadcrumbs" v-for="crumb in $page.props.__meta_breadcrumbs">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                        <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                    </svg>
                    <Link v-if="crumb.url" :href="crumb.url.toString()">{{ crumb.text }}</Link>
                    <span v-else>{{ crumb.text }}</span>
                </div>
                <template v-else>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                        <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                    </svg>
                    <slot/>
                </template>
            </div>
        </div>
    </div>
</template>
