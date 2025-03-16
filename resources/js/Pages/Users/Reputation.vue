<script setup>
import AppLayout from '@/Layouts/Dash.vue'
import {Link, useForm} from '@inertiajs/vue3';
import Username from "@/Components/Username.vue";
import route from 'ziggy-js'
import Pagination from "@/Components/Pagination.vue";
import Button from "@/Jetstream/Button.vue";
import {isAdmin, isAuthenticated, isNotUser, isUser} from "@/util.js";
import Avatar from "@/Components/Avatar.vue";
import UserTitle from "@/Components/UserTitle.vue";
import {useTimeAgo} from "@vueuse/core";

const props = defineProps({
    profile: Object,
    reps: Object,
    rep: Object
})

const form = useForm({
    reputation: props.rep?.reputation ?? 0,
    reason: props.rep?.reason ?? '',
})

const submit = () => {
    form.post(route('reputation.store', props.profile.id))
}

const deleteReputation = () => {
    form.delete(route('reputation.destroy', props.profile.id))
}

const repColor = (rep, positive, negative) => {
    if (rep < 0) return negative;
    if (rep > 0) return positive;
    return '';
}
</script>
<template>
    <app-layout title="Reputation Log">
        <template #breadcrumbs>
            <Link :href="route('users.show', profile.id)">{{ profile.name }}'s Profile</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <span>Reputation Log</span>
        </template>
        <div class="flex flex-col space-y-2 md:w-3/4">
            <h2 class="font-bold text-2xl">{{ profile.name }}'s Reputation</h2>
            <div class="x items-center justify-between pane rounded relative">
                <div class="z-10 x space-x-4">
                    <Avatar width="size-12" :user="profile"/>
                    <div class="y">
                        <Username :card="false" :user="profile"/>
                        <UserTitle class="[text-shadow:black_0_1px_3px]" :user="profile"/>
                    </div>
                </div>
                <div class="z-10 rounded bg-ui-800 px-3 py-1" :class="{'!bg-green-600': profile.reputation > 0, '!bg-red-600': profile.reputation < 0, 'text-white': profile.reputation !== 0}">{{ profile.reputation }}</div>
                <div class="absolute inset-0 bg-cover bg-bottom opacity-25" :style="`background-image:url(${profile.banner_url});`"></div>
            </div>
            <Pagination :list="reps"/>
            <div v-if="reps.data.length > 0" class="pane !px-0 !py-0 divide-y divide-ui-700">
                <div v-for="rep in reps.data" class="x items-center py-4 px-4">
                    <div class="x items-center p-2 w-8 h-8 rounded mr-4 bg-ui-800" :class="{'!bg-red-600': rep.reputation < 0, '!bg-green-600': rep.reputation > 0, 'text-white': rep.reputation !== 0}">
                        <span class="text-center w-full">{{ rep.reputation > 0 ? '+' : '' }}{{ rep.reputation }}</span>
                    </div>
                    <div class="y w-full">
                        <div class="x justify-between">
                            <Username class="text-xs" :user="rep.sender"/>
                            <span class="text-sm text-ui-600">{{ useTimeAgo(rep.created_at) }}</span>
                        </div>
                        <span class="text-sm">{{ rep.reason ?? 'none' }}</span>
                    </div>
                </div>
            </div>
            <p v-else class="pane text-center italic text-ui-500">User has no reputation</p>
        </div>
        <div class="flex flex-col space-y-4 md:w-3/4">
            <h2 class="mx-2 font-bold text-2xl">Give Reputation</h2>
            <div class="space-y-2 pane">
                <p>Giving reputation to a user (negative or positive) helps to distinguish nice or helpful users from unhelpful users.</p>
                <p>It is highly discouraged to give someone rep because of status or clout (being a moderator or famous player/creator)</p>
            </div>
            <p v-if="!isAuthenticated()" class="pane">You must be logged in to give reputation</p>
            <p v-if="isUser(profile.id)" class="pane">You cannot give yourself reputation</p>
            <div v-if="isNotUser(profile.id)" class="pane">
                <span class="text-sm font-bold">Reputation</span>
                <select v-model.number="form.reputation" class="mb-1 block rounded p-1 border-ui-700 bg-ui-800 pl-2 pr-8"  :class="repColor(form.reputation, 'text-green-500', 'text-red-500')">
                    <option v-if="isAdmin()" value="3" class="text-green-400">+3</option>
                    <option v-if="isAdmin()" value="2" class="text-green-400">+2</option>
                    <option value="1" class="text-green-400">+1</option>
                    <option class="text-ui-200" value="0">Neutral</option>
                    <option value="-1" class="text-red-400">-1</option>
                    <option v-if="isAdmin()" value="-2" class="text-red-400">-2</option>
                    <option v-if="isAdmin()" value="-3" class="text-red-400">-3</option>
                </select>
                <span class="text-sm font-bold">Comment</span>
                <textarea v-model="form.reason" class="textbox" placeholder="Write something..."></textarea>
                <span class="block text-sm" :class="{'text-amber-500': form.reason.length > 200, 'text-red-500': form.reason.length > 250}">{{form.reason.length}}/250</span>
                <div class="x space-x-2 mt-2">
                    <Button @click="submit" :disabled="form.reason.length > 250 || form.reason.length === 0">{{ rep ? 'Edit' : 'Submit' }}</Button>
                    <button v-if="rep" @click="deleteReputation" class="button text-red-500 hover:bg-red-500 hover:text-white">Delete</button>
                </div>
            </div>
        </div>
    </app-layout>
</template>
