<script setup>
import AppLayout from '@/Layouts/Dash.vue'
import {Link, useForm} from '@inertiajs/vue3';
import Input from "@/Jetstream/Input.vue";
import {ref} from "vue";

const props = defineProps({
    playlist: Object,
})

const form = useForm({
    level_id: '',
})

const submit = () => {
    form.post(route('submissions.store', props.playlist))
}

const searchName = async () => {
    return await fetch('/api/level/search?type=old&server=0&id=' + id).then(data => data.json())
}

const validID = ref(null)
const searchResult = ref(null)

const searchID = async () => {
    let res = await fetch('/api/level/' + form.level_id).then(data => data.json())
    if(res === -1) {
        validID.value = false
    } else {
        validID.value = true
        searchResult.value = res
    }
}
</script>
<template>
    <app-layout title="Home">
        <template #breadcrumbs>
            <Link :href="route('playlists.index')">Playlists</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <Link :href="route('playlists.show', playlist)">{{ playlist.title }}</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <span>Submit</span>
        </template>
        <div class="flex flex-col lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4">
            <h2 class="mx-2 font-bold text-2xl">Submit Level to {{ playlist.title }}</h2>
            <div class="flex flex-col space-y-2 pane">
                <label class="flex flex-col">
                    <span class="my-1">ID</span>
                    <Input type="number" v-model="form.level_id" placeholder="Required"/>
                </label>
                <template v-if="validID === true">
                    <span class="text-green-500">Valid ID!</span>
                    <h1 class="font-bold text-xl">{{ searchResult.name }}</h1>
                    <span>By {{ searchResult.author }}</span>
                    <p>{{ searchResult.description }}</p>
                </template>
                <span v-else-if="validID === false" class="text-red-500">Invalid ID!</span>
                <div @click="searchID" class="rounded w-fit cursor-pointer border border-neutral-700 px-2 py-1 bg-neutral-800">Check</div>
            </div>
            <div class="flex justify-center gap-2">
                <button :disabled="form.processing" @click="submit" class="rounded px-2 py-1 w-fit select-none cursor-pointer hover:opacity-50 transition bg-neutral-800 border border-neutral-600">Submit Level</button>
            </div>
        </div>
    </app-layout>
</template>
