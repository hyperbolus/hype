<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import {ref} from "vue";
import {Link, usePage} from '@inertiajs/inertia-vue3'
import Username from "@/Components/Username.vue";

const props = defineProps({
    levels: Array,
    progress: Number,
    playlist: Object
})

const progress = ref(props.progress)
const finished = ref(false)
const won = ref(false)

const newSeed = () => {
    let params = new URLSearchParams(usePage().url.value)
    params.set('seed', Math.floor(Math.random() * (99999 - 10000) + 99999).toString())
    return params.toString().substring(3).replace('%3F', '?')
}
</script>
<template>
    <app-layout title="Roulette">
        <template #breadcrumbs>
            <Link :href="$page.url">Roulette</Link>
        </template>
        <div class="y space-y-2 md:w-2/3">
            <h1 class="mx-2 text-center font-bold text-4xl">{{ finished ? 'Results' : 'Level Roulette'}}</h1>
            <div class="x self-center space-x-2">
                <span class="pane !py-1"><Link :href="route('playlists.show', playlist.id)">{{ playlist.title }}</Link> by <Username :user="playlist.owner"/></span>
                <span class="pane !py-1" v-show="!finished">Current Progress: {{progress }}</span>
            </div>
            <template v-if="finished">
                <div class="y space-y-2 text-center">
                    <span class="pane !py-1 self-center">{{ progress }} Level{{ progress === 1 ? '' : 's'}} Passed</span>
                    <div class="x justify-center space-x-2">
                        <span class="pane !py-1 cursor-pointer" @click="progress = 0; finished = false; won = false">Reset</span>
                        <Link :href="newSeed()" class="pane !py-1 cursor-pointer">New Seed</Link>
                    </div>
                </div>
            </template>
            <template v-else>
                <div v-for="(level, index) in levels" :key="index" v-show="index <= progress" class="x pane justify-between">
                    <div class="x items-center space-x-2">
                        <span class="font-bold text-xl">{{ level.name }}</span>
                        <span class="text-sm">by {{ level.creator }}</span>
                    </div>
                    <div class="x space-x-2 items-center" v-show="index === progress">
                        <span>At least {{ index+1 }}%</span>
                        <span class="pane !py-1 cursor-pointer" @click="progress++">Done</span>
                        <span class="pane !py-1 cursor-pointer" @click="finished = true">Give Up</span>
                    </div>
                </div>
            </template>
        </div>
        <div class="y space-y-2 md:w-1/3">
            <h1 class="mx-2 font-bold text-2xl">About</h1>
            <p class="pane">This game was inspired by <a class="underline" href="https://github.com/matcool/" target="_blank">matcool</a>'s <a class="underline" href="https://matcool.github.io/extreme-demon-roulette/" target="_blank">Extreme Demon Roulette</a> website with the original idea by <a class="underline" href="https://youtu.be/nv_9FkfGRsc" target="_blank">npesta</a></p>
        </div>
    </app-layout>
</template>
