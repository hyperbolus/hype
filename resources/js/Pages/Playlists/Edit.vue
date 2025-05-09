<script setup>
import AppLayout from "@/Layouts/Dash.vue";
import route from 'ziggy-js'
import {Link, useForm} from '@inertiajs/vue3'
import Button from "@/Jetstream/Button.vue";
import Input from "@/Jetstream/Input.vue";

const props = defineProps({
    playlist: Object
})

const form = useForm({
    title: props.playlist.title,
    description: props.playlist.description ?? '',
    visibility: props.playlist.visibility,
    collaboration: props.playlist.collaboration,
})
</script>
<template>
    <app-layout>
        <div class="y">
            <form @submit.prevent="form.post(route('playlists.update', playlist))" class="y space-y-2 p-2 bg-ui-900 rounded-md">
                <label>
                    <span class="text-sm">Playlist Title</span>
                    <Input type="text" v-model="form.title"/>
                </label>
                <label>
                    <span class="text-sm">Description</span>
                    <textarea v-model="form.description" class="textbox"></textarea>
                </label>
                <label>
                    <span class="text-sm">Visibility</span>
                    <select v-model="form.visibility" class="block py-1 px-3 w-full border-none focus:ring-0 focus:outline-none rounded bg-ui-950">
                        <option value="public">Public</option>
                        <option value="unlisted">Unlisted</option>
                        <option value="private">Private</option>
                    </select>
                </label>
                <label>
                    <span class="text-sm">Submission Permissions</span>
                    <select v-model="form.collaboration" class="block py-1 px-3 w-full border-none focus:ring-0 focus:outline-none rounded bg-ui-950">
                        <option value="public">Everyone (public)</option>
                        <option disabled value="invite">Invite Only (Coming Soon)</option>
                        <option value="none">Only You</option>
                    </select>
                </label>
                <div class="x items-center space-x-2">
                    <Button class="w-fit" type="submit" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">{{ form.processing ? 'Working...' : 'Submit' }}</Button>
                    <div class="x ml-2 text-green-500 opacity-0 transition-all" :class="{'!opacity-100': !form.isDirty && form.recentlySuccessful}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mr-0.5">
                            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                        </svg>
                        <span>Done!</span>
                    </div>
                </div>
            </form>
        </div>
    </app-layout>
</template>
