<script setup>
import AppLayout from "@/Layouts/Dash.vue";
import { Link } from '@inertiajs/vue3';
import route from "ziggy-js";

const props = defineProps({
    title: String
});

</script>
<template>
    <app-layout :title="title + ' - Dashboard'">
        <template #breadcrumbs>
            <span>Admin</span>
        </template>
        <div class="flex flex-col md:flex-row lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4">
            <div class="flex flex-col space-y-4 md:w-1/3">
                <div class="y pane !px-0 !py-0 divide-y divide-ui-700">
                    <Link :href="route('settings.home')" class="p-2">Home</Link>
                    <Link :href="route('settings.account')" class="p-2">Account Settings</Link>
                    <Link :href="route('settings.profile')" class="p-2">Edit Profile</Link>
                </div>
            </div>
            <div class="flex flex-col space-y-2 md:w-2/3">
                <slot/>
            </div>
        </div>
    </app-layout>
</template>
