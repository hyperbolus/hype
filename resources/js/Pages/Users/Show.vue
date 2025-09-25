<script setup>
import AppLayout from '@/Layouts/Dash.vue'
import {Link} from '@inertiajs/vue3';
import route from 'ziggy-js'
import ProfileComments from "@/Pages/Users/Partials/ProfileComments.vue";
import Header from "@/Pages/Users/Partials/Header.vue";
import RatingsCurve from "@/Components/RatingsCurve.vue";
import {capitalize, isSameDay, writtenNumber, yearsSince} from "@/util.js";

const props = defineProps({
    profile: Object,
    comments: Object,
    reviews: Object,
    curve: Object
});

const profileAge = yearsSince(props.profile.created_at);

const info = {
    reputation: {
        url: route('reputation.show', props.profile.id)
    },
    credits: {},
    names_count: {
        name: 'Username Changes',
        url: route('names.show', props.profile.id)
    },
    created_at: {
        name: 'Member Since',
        value: new Date(props.profile.created_at).toLocaleDateString()
    }
};

const serviceColor = ['text-white', 'text-cyan-300','text-fuchsia-300', 'text-amber-400', 'text-red-400'][profileAge - 1]
</script>
<template>
    <app-layout :fullwidth="true" title="Profile" :decorations="false">
        <Header :profile="profile" :reviews="reviews"/>
        <div class="y md:flex-row lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full space-y-4 md:space-y-0 md:space-x-4 py-4 md:px-4">
            <div class="y space-y-4 md:w-1/2 lg:w-1/4">
                <div class="y bg-ui-900 px-4 py-2 md:rounded-lg  text-sm !px-2">
                    <template v-for="(field, key) in info">
                        <div v-if="field" class="x justify-between p-2">
                            <span class="capitalize">{{ field.name ?? key }}:</span>
                            <Link v-if="field.url" :href="field.url" class="text-white">{{ field.value ?? profile[key] }}</Link>
                            <span v-else>{{ field.value ?? profile[key] }}</span>
                        </div>
                    </template>
                </div>
                <p v-if="profile.birthday && isSameDay(profile.birthday)" class="pane font-bold text-center !mt-2 text-fuchsia-300">Happy Birthday!!!</p>
                <p v-if="profileAge > 0" class="pane font-bold text-center !mt-2" :class="serviceColor">{{ capitalize(writtenNumber(profileAge)) }} Years of Service</p>
                <RatingsCurve :user="profile" :curve="curve"/>
            </div>
            <div class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 md:w-1/2 lg:w-3/4">
                <div class="y space-y-4 lg:w-1/2">
                    <div class="y md:rounded-lg bg-ui-900 divide-y divide-ui-700">
                        <div class="md:rounded-t-lg bg-ui-800 px-2 py-1">Bio</div>
                        <p class="px-4 py-2 text-sm whitespace-pre-wrap" v-if="profile.bio">{{ profile.bio }}</p>
                        <span v-else class="opacity-50 italic px-4 py-2">This user didn't write anything</span>
                    </div>
                    <div v-if="profile.signature" class="y md:rounded-lg bg-ui-900 divide-y divide-ui-700">
                        <div class="md:rounded-t-lg bg-ui-800 px-2 py-1">Signature</div>
                        <p class="px-4 py-2 whitespace-pre-wrap">{{ profile.signature }}</p>
                    </div>
                    <img v-if="0" alt="" src="https://i.profile.gd/AmoungPequeno.png">
                    <div v-if="0" class="x space-x-2 items-center rounded-md bg-ui-900">
                        <div class="aspect-square bg-ui-700 rounded-l-md p-4 x justify-center items-center">
                            <img class="w-12" alt="" src="https://img.ngfiles.com/defaults/icon-audio.png?f1707337412">
                        </div>
                        <div class="y w-full p-2">
                            <div class="y leading-tight">
                                <div class="x justify-between">
                                    <span class="text-xl font-bold">Chaoz Fantasy</span>
                                    <span class="text-xs underline">Newgrounds</span>
                                </div>
                                <span>ParagonX9</span>
                            </div>
                        </div>
                    </div>
                </div>
                <ProfileComments :profile="profile" :comments="comments"/>
            </div>
        </div>
    </app-layout>
</template>
