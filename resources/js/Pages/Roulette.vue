<script setup>
import AppLayout from "@/Layouts/Dash.vue";
import {ref} from "vue";
import {Link, usePage} from '@inertiajs/vue3'
import Username from "@/Components/Username.vue";
import LevelTicket from "@/Components/LevelTicket.vue";
import PlaylistTicket from "@/Components/PlaylistTicket.vue";
import Input from "@/Jetstream/Input.vue";
import VideoLightbox from "@/Components/VideoLightbox.vue";
import {isAdmin} from "@/util";

const props = defineProps({
    levels: Array,
    progress: Number,
    playlist: Object
});

// TODO: add roulette main page if no playlist selected

const progress = ref(props.progress)
const percent = ref(0);
const currentPercent = ref(null);
const finished = ref(false)
const won = ref(false)

const levelPercents = ref([]);

const newSeed = () => {
    let params = new URLSearchParams(usePage().url)
    params.set('seed', Math.floor(Math.random() * (99999 - 10000) + 99999).toString())
    return params.toString().substring(3).replace('%3F', '?')
}

const next = () => {
    if (currentPercent.value <= percent.value || currentPercent.value % 1 !== 0) {
        alert(`Invalid percent. Must be higher than ${percent.value + 1}. Whole numbers only!`)
        return;
    }

    levelPercents.value[progress.value] = currentPercent.value;
    percent.value = currentPercent.value;

    currentPercent.value++;

    if (++progress.value === props.levels.length) {
        // you died ran out of levels somehow
        finished.value = true;
        won.value = false;
    }

    if (percent.value >= 100) {
        finished.value = true;
        won.value = true;
    }
}

const reset = () => {
    progress.value = 0;
    finished.value = false;
    won.value = false;
    percent.value = 0
    currentPercent.value = null;
    levelPercents.value = [];
}
</script>
<template>
    <app-layout>
        <div class="y space-y-2 w-full">
            <teleport to="#teleports">
                <div v-if="!(finished && won)" class="fixed inset-0 z-50 pointer-events-none" :style="`box-shadow:inset 0 0 200px 0 #FF000060;background:radial-gradient(transparent 80%, #ff803020);opacity:${progress / levels.length};`"></div>
            </teleport>

            <PlaylistTicket :playlist="playlist"/>
            <h1 class="mx-2 text-center font-bold text-4xl mb-2">{{ finished ? 'Results' : 'Level Roulette'}}</h1>
            <div v-if="!finished" class="grid md:grid-cols-2 gap-4">
                <div class="y space-y-2">
                    <VideoLightbox v-if="levels[progress].videos.length > 0" :video="levels[progress].videos[0]"/>
                    <div v-else class="y justify-center text-center aspect-video bg-ui-1000 border-2 border-dashed border-ui-700 w-full rounded-lg">
                        <span>No video available</span>
                    </div>
                </div>
                <div class="y justify-between items-center space-y-2">
                    <LevelTicket :level="levels[progress]" :show-ratings="false" class="w-full"/>
                    <div class="y items-center space-y-2">
                        <span class="font-bold text-xl">At least {{ percent + 1 }}%</span>
                        <Input :max="100" :step="1" type="number" v-model.number="currentPercent" class="!bg-ui-800" :placeholder="`At least ${percent + 1}%`"/>
                        <div class="x space-x-2 justify-center text-while font-bold items-center w-full">
                            <button class="bg-blue-500 px-4 py-2 rounded-lg" @click="next">Done</button>
                            <button class="bg-ui-800 px-4 py-2 rounded-lg" @click="finished = true">Give Up</button>
                        </div>
                        <span v-if="isAdmin()" class="pane !py-1 cursor-pointer" @click="reset">Reset</span>
                        <Link :href="newSeed()" class="text-blue-500 text-sm hover:underline">New Seed</Link>
                    </div>
                    <div class="w-full">
                        <div class="x justify-between text-sm">
                            <span>{{ percent }}%</span>
                            <span>100%</span>
                        </div>
                        <div class="y space-y-0.5 bg-ui-900 px-1 rounded-full">
                            <div class="bg-blue-500 py-0.5 rounded-t-full" :style="`width: ${percent}%;`"></div>
                            <div class="bg-red-500 py-0.5 rounded-b-full" :style="`width: ${100 - progress / levels.length * 100}%;`"></div>
                        </div>
                        <div class="x justify-between text-sm">
                            <span>{{ levels.length - progress }}/{{levels.length}} Levels Remaining</span>
                            <span>Level {{ progress + 1 }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="finished">
                <div class="y space-y-2 text-center">
                    <span v-if="won" class="pane !py-1 self-center">Win in {{ progress }} level{{ progress === 1 ? '' : 's'}} (out of {{ levels.length }})</span>
                    <span v-else class="pane !py-1 self-center">Got {{ percent }}% in {{ progress }} level{{ progress === 1 ? '' : 's'}}</span>
                    <span class="font-bold text-xl" :class="won ? 'text-green-500' : 'text-red-500'">YOU {{ won ? 'WIN!' : 'LOSE...' }}</span>
                    <template v-if="!won">
                        <span v-if="progress === levels.length">You ran out of levels!</span>
                        <span v-else>You gave up</span>
                    </template>
                    <div class="x justify-center space-x-2">
                        <span v-if="isAdmin()" class="pane !py-1 cursor-pointer" @click="reset">Reset</span>
                        <Link :href="newSeed()" class="pane !py-1 cursor-pointer">New Seed</Link>
                    </div>
                </div>
            </div>
            <div class="flex flex-col-reverse gap-1">
                <div v-for="(level, index) in levels" class="x space-x-2 items-center w-full" v-show="index < progress">
                    <span class="rounded-lg bg-ui-900 py-1 font-bold text-center w-16">{{ levelPercents[index] ?? '?' }}%</span>
                    <LevelTicket :key="index" :level="level" :show-ratings="false" class="grow"/>
                </div>
                <p v-if="progress === 0" class="rounded-lg bg-ui-1000 text-center px-2 py-2 text-ui-500">You haven't passed any levels</p>
                <h1 class="mx-2 text-center font-bold text-4xl my-2">Passed</h1>
            </div>
            <div class="y space-y-2 text-center">
                <h1 class="mx-2 font-bold text-2xl">About</h1>
                <p class="pane">This game was inspired by <a class="underline" href="https://github.com/matcool/" target="_blank">matcool</a>'s <a class="underline" href="https://matcool.github.io/extreme-demon-roulette/" target="_blank">Extreme Demon Roulette</a> website with the original idea by <a class="underline" href="https://youtu.be/nv_9FkfGRsc" target="_blank">npesta</a></p>
            </div>
        </div>
    </app-layout>
</template>
