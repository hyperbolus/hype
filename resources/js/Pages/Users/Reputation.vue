<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import {Link} from '@inertiajs/inertia-vue3';
import Username from "@/Components/Username.vue";
import route from 'ziggy-js'
import Pagination from "@/Components/Pagination.vue";

const props = defineProps({
    profile: Object,
    reps: Object
})
</script>
<template>
    <app-layout title="Reputation Log">
        <template #breadcrumbs>
            <Link :href="route('users.show', profile.id)">{{ profile.name }}'s Profile</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <span>Reputation Log</span>
        </template>
        <div class="flex lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4">
            <div class="flex flex-col space-y-2 md:w-3/4">
                <h2 class="font-bold text-2xl">{{ profile.name }}'s Reputation</h2>
                <Pagination :list="reps"/>
                <div class="pane !px-0 !py-0 divide-y dark:divide-neutral-700">
                    <div v-for="rep in reps.data" class="x items-center py-4 px-4">
                        <div class="x items-center font-bold p-2 w-8 h-8 rounded mr-4 bg-neutral-200 dark:bg-neutral-800" :class="{'!bg-red-500': rep.reputation < 0, '!bg-green-500': rep.reputation > 0, '!text-white': rep.reputation !== 0}">
                            <span class="text-center w-full">{{ rep.reputation > 0 ? '+' : '' }}{{ rep.reputation }}</span>
                        </div>
                        <div class="y">
                            <Username class="text-xs" :user="rep.sender"/>
                            <span class="text-sm">{{ rep.reason ?? 'none' }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </app-layout>
</template>
