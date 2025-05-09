<script setup>
import AppLayout from '@/Layouts/Dash.vue'
import {useForm} from '@inertiajs/vue3';
import Button from "@/Jetstream/Button.vue";
import Input from "@/Jetstream/Input.vue";
import route from 'ziggy-js'
import Errors from "@/Components/Errors.vue";
import Textbox from "@/Components/Textbox.vue";

const playlist = useForm({
    title: '',
    description: ''
})

const submit = () => {
    playlist.post(route('playlists.store'))
}
</script>
<template>
    <app-layout>
        <div class="y space-y-4 md:w-3/4">
            <h2 class="mx-2 font-bold text-2xl">Create a New Playlist</h2>
            <div class="y pane space-y-2">
                <label class="y">
                    <span>Name</span>
                    <Input v-model="playlist.title" type="text" placeholder="Required"/>
                </label>
                <label class="y">
                    <span>Short Description</span>
                    <textbox v-model="playlist.description" :max="200">a</textbox>
                </label>
                <Errors/>
                <Button @click="submit" class="w-fit">Create Playlist</Button>
            </div>
        </div>
    </app-layout>
</template>
