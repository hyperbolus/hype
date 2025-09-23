<script setup>
import AppLayout from "@/Layouts/Dash.vue";
import { Link } from '@inertiajs/vue3';
import route from "ziggy-js";
import Icon from "@/Components/Icon.vue";

const props = defineProps({
    title: String
});

const links = [
    {
        title: 'Home',
        route: 'settings.home',
        icon: 'home'
    },
    {
        title: 'Edit Profile',
        route: 'settings.profile',
        icon: 'user-circle'
    },
    {
        title: 'Relationships',
        route: 'settings.relationships',
        icon: 'users'
    },
    {
        title: 'Account Settings',
        route: 'settings.account',
        icon: 'cog'
    }
]
</script>
<template>
    <app-layout :decorations="false" :title="title + ' - Dashboard'">
        <div class="flex flex-col md:flex-row lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full gap-4 py-4">
            <div class="flex flex-col md:w-1/4 space-y-2 px-2 md:px-0">
                <Link v-for="link in links" :href="route(link.route)" :class="{ 'text-blue-500': route().current(link.route) }" class="x items-center space-x-2 pane transition-colors hover:bg-ui-800">
                    <Icon :name="link.icon" class="size-6"/>
                    <span>{{ link.title }}</span>
                </Link>
            </div>
            <div class="flex flex-col space-y-2 md:w-3/4 border border-ui-900/75 bg-ui-950 md:rounded-md p-2">
                <slot/>
            </div>
        </div>
    </app-layout>
</template>
