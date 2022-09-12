<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import {Link} from '@inertiajs/inertia-vue3';
import Dropdown from "@/Jetstream/Dropdown.vue";
import Input from "@/Jetstream/Input.vue";
</script>
<template>
    <app-layout title="Home">
        <template #breadcrumbs>
            <Link :href="route('contests.index')">Contests</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <span>Create</span>
        </template>
        <div class="flex lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4">
            <div class="flex flex-col space-y-4 md:w-3/4">
                <h2 class="mx-2 font-bold text-2xl">Create a New Contest</h2>
                <div class="flex flex-col rounded p-4 space-y-2 bg-neutral-900 border border-neutral-700">
                    <label class="flex flex-col">
                        <span class="my-1">Name</span>
                        <Input placeholder="Required"/>
                    </label>
                    <label class="flex flex-col">
                        <span class="my-1">Short Description</span>
                        <Input placeholder="Required"/>
                    </label>
                    <label class="flex flex-col">
                        <span class="my-1">URL</span>
                        <Input prefix="https://gdforums.com/contest/" class="p-0" placeholder="Required"/>
                    </label>
                    <label class="flex flex-col space-y-2">
                        <span class="flex items-center"><input type="radio" name="ranked_type" value="true"/> Ranked — Submission are voted on and placed</span>
                        <span class="flex items-center"><input type="radio" name="ranked_type" value="false"/> Unranked — Submissions are not voted on, just for fun!</span>
                    </label>
                    <span class="rounded px-2 py-1 w-fit select-none cursor-pointer hover:opacity-50 transition bg-neutral-800 border border-neutral-600">Button</span>
                </div>
            </div>
        </div>
    </app-layout>
</template>
