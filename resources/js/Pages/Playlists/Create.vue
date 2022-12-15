<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import {Link, useForm} from '@inertiajs/inertia-vue3';
import Dropdown from "@/Jetstream/Dropdown.vue";
import Button from "@/Jetstream/Button.vue";
import Input from "@/Jetstream/Input.vue";
import route from 'ziggy-js'

const playlist = useForm({
    title: '',
    description: ''
})

const submitPlaylist = () => {
    playlist.post(route('playlists.store'))
}
</script>
<template>
    <app-layout title="Create Playlist">
        <template #breadcrumbs>
            <Link :href="route('playlists.index')">Playlists</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <span>Create</span>
        </template>
        <div class="x lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4">
            <div class="y space-y-4 md:w-3/4">
                <h2 class="mx-2 font-bold text-2xl">Create a New Playlist</h2>
                <form @submit.prevent="submitPlaylist" class="y pane space-y-2">
                    <label class="y">
                        <span class="my-1">Name</span>
                        <Input v-model="playlist.title" type="text" placeholder="Required"/>
                    </label>
                    <label class="y">
                        <span class="my-1">Short Description</span>
                        <Input v-model="playlist.description" type="text" placeholder="Required"/>
                    </label>
                    <ul class="mt-3 list-disc list-inside text-sm text-red-600">
                        <li v-for="(error, key) in $page.props.errors" :key="key">
                            {{ error }}
                        </li>
                    </ul>
                    <Button class="w-fit">Create Playlist</Button>
                </form>
            </div>
        </div>
    </app-layout>
</template>
