<script setup>
import AppLayout from '@/Layouts/Dash.vue'
import {Link, useForm} from '@inertiajs/vue3';
import Input from "@/Jetstream/Input.vue";
import {ref} from "vue";
import route from "ziggy-js";

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
    <app-layout>
        <div class="flex flex-col w-full space-y-4">
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
                <div @click="searchID" class="button w-fit">Check</div>
            </div>
            <div class="flex justify-center gap-2">
                <button :disabled="form.processing" @click="submit" class="button">Submit Level</button>
            </div>
        </div>
    </app-layout>
</template>
