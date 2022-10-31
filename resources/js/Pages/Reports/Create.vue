<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import {Link, useForm} from '@inertiajs/inertia-vue3';
import Dropdown from "@/Jetstream/Dropdown.vue";
import Button from "@/Jetstream/Button.vue";
import Input from "@/Jetstream/Input.vue";
import route from 'ziggy-js'

const props = defineProps({
    type: Number,
    id: Number
})

const report = useForm({
    title: '',
    content: '',
    model: null,
    id: null,
})

const submit = () => {
    report.post(route('reports.store'))
}
</script>
<template>
    <app-layout title="Create Playlist">
        <template #breadcrumbs>
            <span>New Report</span>
        </template>
        <div class="x lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4">
            <div class="y space-y-4 md:w-3/4">
                <h2 class="mx-2 font-bold text-2xl">Create a New Report</h2>
                <form @submit.prevent="submit" class="y box space-y-2">
                    <label class="y">
                        <span class="my-1">Subject</span>
                        <Input v-model="report.title" type="text" placeholder="Required"/>
                    </label>
                    <label class="y">
                        <span class="my-1">Details</span>
                        <textarea v-model="report.content" placeholder="Required" class="resize-none resize-y w-full rounded placeholder-neutral-400 dark:placeholder-neutral-600 bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700"></textarea>
                        <span class="x items-center text-neutral-400 dark:text-neutral-600 text-sm mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 mr-0.5">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
                            </svg>
                            Please be as specific as possible
                        </span>
                    </label>
                    <ul class="mt-3 list-disc list-inside text-sm text-red-600">
                        <li v-for="(error, key) in $page.props.errors" :key="key">
                            {{ error }}
                        </li>
                    </ul>
                    <Button class="w-fit">Submit Report</Button>
                </form>
            </div>
        </div>
    </app-layout>
</template>
