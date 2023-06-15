<script setup>
import { Link } from '@inertiajs/vue3';
import route from "ziggy-js";
import AppLayout from "@/Layouts/Dash.vue";

const props = defineProps({
    title: String
});

</script>
<template>
    <app-layout :title="title + ' - Admin'">
        <template #breadcrumbs>
            <span>Admin</span>
        </template>
        <div class="flex flex-col md:flex-row lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4">
            <div class="flex flex-col space-y-4 md:w-1/4">
                <div class="y pane !px-0 !py-0 divide-y divide-ui-700">
                    <Link :href="route('system.home')" class="p-2">Home</Link>
                    <Link :href="route('system.settings')" class="p-2">Settings</Link>
                    <Link :href="route('system.users')" class="p-2">Users</Link>
                    <Link :href="route('system.forums')" class="p-2">Forums</Link>
                    <Link :href="route('system.groups')" class="p-2">Groups</Link>
                    <Link :href="route('system.permissions')" class="p-2">Permissions</Link>
                    <Link :href="route('system.cosmetics')" class="p-2">Cosmetics</Link>
                </div>
            </div>
            <div class="flex flex-col space-y-2 md:w-3/4">
                <slot/>
            </div>
        </div>
    </app-layout>
</template>
