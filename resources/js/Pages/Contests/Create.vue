<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import {Link} from '@inertiajs/inertia-vue3';
import Button from "@/Jetstream/Button.vue";
import Input from "@/Jetstream/Input.vue";
</script>
<template>
    <app-layout title="Create Contest">
        <template #breadcrumbs>
            <Link :href="route('contests.index')">Contests</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <span>Create</span>
        </template>
        <div class="y space-y-4 md:w-2/3">
            <h2 class="mx-2 font-bold text-2xl">Create a New Contest</h2>
            <div class="y pane space-y-2">
                <label class="y">
                    <span class="my-1">Name</span>
                    <Input type="text" placeholder="Required"/>
                </label>
                <label class="y">
                    <span class="my-1">Short Description</span>
                    <Input type="text" placeholder="Required"/>
                </label>
                <label class="y">
                    <span class="my-1">URL</span>
                    <Input type="text" prefix="https://gdforums.com/contest/" class="p-0" placeholder="Required"/>
                </label>
                <label class="y space-y-2">
                    <span class="flex items-center"><input type="radio" name="ranked_type" value="true" class="mr-1"/> Ranked — Submission are voted on and placed</span>
                    <span class="flex items-center"><input type="radio" name="ranked_type" value="false" class="mr-1"/> Unranked — Submissions are not voted on, just for fun!</span>
                </label>
                <Button onclick="alert('wip!')" class="w-fit">Create Contest</Button>
            </div>
        </div>
    </app-layout>
</template>
