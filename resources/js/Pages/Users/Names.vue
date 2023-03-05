<script setup>
import AppLayout from '@/Layouts/Dash.vue'
import {Link} from '@inertiajs/vue3';
import route from 'ziggy-js'

const props = defineProps({
    profile: Object,
    names: Array,
})
</script>
<template>
    <app-layout title="Username History">
        <template #breadcrumbs>
            <Link :href="route('users.show', profile.id)">{{ profile.name }}'s Profile</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <span>Username History</span>
        </template>
        <div class="flex flex-col space-y-2 md:w-3/4">
            <div class="flex justify-between items-center">
                <h2 class="font-bold text-2xl">{{ profile.name }}'s Username History</h2>
            </div>
            <div v-if="names.length > 0" class="y pane !px-0 !py-0 divide-y dark:divide-neutral-700">
                <div v-for="change in names" class="block justify-between flex items-center px-4 py-2">
                    <span>From {{ change.from }} to {{ change.to }}</span>
                    <span class="text-sm text-neutral-400 dark:text-neutral-600">{{ new Date(change.created_at).toLocaleString([], {day: '2-digit', month: '2-digit', year:'2-digit', hour: '2-digit', minute: '2-digit'}) }}</span>
                </div>
            </div>
            <div v-else>No name changes have been logged</div>
        </div>
    </app-layout>
</template>
