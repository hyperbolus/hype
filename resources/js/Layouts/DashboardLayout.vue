<script setup>
import {Link, usePage} from '@inertiajs/vue3';
import route from "ziggy-js";
import AppLayout from "@/Layouts/Dash.vue";
import Icon from "../Components/Icon.vue";
import {computed} from "vue";

defineProps({
    showTitle: {
        type: Boolean,
        default: true,
    },
    containerClass: String
});

const links = computed(() => {
    let out = {}, links = usePage().props.__meta_links;

    for (let link in links) if (!links[link].hidden) out[link] = links[link];

    return out;
});
</script>
<template>
    <app-layout :title="$page.props.__meta_title + ' - Admin'" :decorations="false">
        <div class="y md:flex-row lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full gap-2 py-2">
            <div class="y md:w-1/4 space-y-2 px-2 md:px-0">
                <Link v-for="(link, key) in links" :href="route(key)" :class="{ 'text-blue-500': route().current(key) }" class="x items-center space-x-2 pane transition-colors hover:bg-ui-800">
                    <Icon :name="link.icon" class="size-6"/>
                    <span>{{ link.title }}</span>
                </Link>
            </div>
            <div class="y space-y-2 md:w-3/4 border border-ui-900/75 bg-ui-950 md:rounded-md p-4" :class="containerClass">
                <h1 v-if="showTitle" class="text-4xl font-bold">{{ $page.props.__meta_title }}</h1>
                <slot/>
            </div>
        </div>
    </app-layout>
</template>
