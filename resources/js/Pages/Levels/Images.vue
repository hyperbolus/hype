<script setup>
import {Link, useForm} from '@inertiajs/inertia-vue3';
import AppLayout from "@/Layouts/AppLayout.vue";

const props = defineProps({
    level: Object,
    images: Array
})

const form = useForm({
    approved: true,
    tag_id: null
})

const addTag = () => {
    form.post(route('levels.screenshot.store', props.level.id), {
        onSuccess: () => {
            tagname.value = ''
            form.reset()
        }
    });
}

const vote = (tag_id, approve) => {
    form.approved = approve
    form.tag_id = tag_id
    addTag()
}
</script>
<template>
    <app-layout title="Home">
        <template #breadcrumbs>
            <Link :href="route('levels.show', level.id)">{{ level.id }}</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <span>Tags</span>
        </template>
        <div class="y space-y-4 w-2/3">
            <h2 class="font-bold text-2xl">Info</h2>
            <p class="pane">
                Screenshot submissions coming soon to a local website near you!
            </p>
            <p class="pane">
                Here you can vote on which tags do or don't fit a level by voting for or against them.
            </p>
            <ul class="pane list-inside list-disc space-y-4">
                <li>The top rated images will appear on the level's page.</li>
                <li>Site moderators can manually mark images as "verified."</li>
                <li>Images with consistently low scores will periodically be pruned from the list completely</li>
            </ul>
        </div>
    </app-layout>
</template>
