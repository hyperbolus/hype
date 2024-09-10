<script setup>
import AppLayout from '@/Layouts/Dash.vue'
import {Link} from '@inertiajs/vue3';
import route from 'ziggy-js'
import Pagination from "@/Components/Pagination.vue";
import {ref} from "vue";
import ProfileComments from "@/Pages/Users/Partials/ProfileComments.vue";
import Header from "@/Pages/Users/Partials/Header.vue";

const props = defineProps({
    profile: Object,
    comments: Object,
    reviews: Object,
})

const tab = ref(0);
</script>
<template>
    <app-layout :fullwidth="true" title="Profile" :decorations="false">
        <Header :profile="profile" :reviews="reviews"/>
        <div class="flex flex-col md:flex-row lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full space-x-4 py-4 md:px-4">
            <div class="flex flex-col space-y-4 md:w-1/2 lg:w-1/4">
                <div class="y bg-ui-900 px-4 py-2 md:rounded-lg text-sm !px-2">
                    <div class="x justify-between p-2">
                        <span>Reputation:</span>
                        <Link :href="route('reputation.show', profile.id)" class="text-white">{{ profile.reputation }}</Link>
                    </div>
                    <div class="x justify-between p-2">
                        <span>Credits:</span>
                        <span>{{ profile.credits }}</span>
                    </div>
                    <div class="x justify-between p-2">
                        <span>Username Changes:</span>
                        <Link :href="route('names.show', profile.id)" class="text-white">{{ profile.names_count }}</Link>
                    </div>
                    <div class="x justify-between p-2">
                        <span>Member Since:</span>
                        <span>{{ new Date(profile.created_at).toLocaleDateString() }}</span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 md:w-1/2 lg:w-3/4">
                <div class="y space-y-4 lg:w-1/2">
                    <div class="y md:rounded-b-lg bg-ui-900 divide-y divide-ui-700">
                        <div class="md:rounded-t-lg bg-ui-800 px-2 py-1">
                            Bio
                        </div>
                        <p class="px-4 py-2 text-sm whitespace-pre-wrap" v-if="profile.bio">{{ profile.bio }}</p>
                        <span v-else class="opacity-50 italic px-4 py-2">This user didn't write anything</span>
                    </div>
                    <div class="y md:rounded-b-lg bg-ui-900 divide-y divide-ui-700">
                        <div class="md:rounded-t-lg bg-ui-800 px-2 py-1">
                            Signature
                        </div>
                        <p class="px-4 py-2 whitespace-pre-wrap" v-if="profile.signature">{{ profile.signature }}</p>
                        <span v-else class="opacity-50 italic px-4 py-2">This user has no signature</span>
                    </div>
                    <div class="">
                        <div class="y pane !px-0 !py-0 divide-y divide-ui-700">
                            <div class="rounded-t bg-ui-800 px-2 py-1">
                                Recent Reviews
                            </div>
                            <div v-if="reviews.data.length === 0" class="px-4 py-2">
                                User has not written any reviews
                            </div>
                            <Link v-else v-for="review in reviews.data" :href="route('reviews.show', review.id)" class="y justify-between px-4 py-2">
                                <h2 class="font-bold">{{ review.level.name }}</h2>
                                <span class="text-xs">by&nbsp;<span class="font-bold">{{ review.level.creator }}</span></span>
                                <div class="x flex-wrap space-x-4 lg:space-x-2 items-center justify-between">
                                    <span class="text-xs">DIFF:&nbsp;{{ review.rating_difficulty ? review.rating_difficulty : 'N/A' }}</span>
                                    <span class="text-xs">GAME:&nbsp;{{ review.rating_gameplay ? review.rating_gameplay : 'N/A' }}</span>
                                    <span class="text-xs">VIS:&nbsp;{{ review.rating_visuals ? review.rating_visuals : 'N/A' }}</span>
                                    <span class="text-xs">ALL:&nbsp;{{ review.rating_overall ? review.rating_overall : 'N/A' }}</span>
                                </div>
                                <p class="text-sm">{{ review.review }}</p>
                            </Link>
                            <Pagination class="py-2" :list="reviews" :small="true"/>
                        </div>
                    </div>
                </div>
                <ProfileComments :profile="profile" :comments="comments"/>
            </div>
        </div>
    </app-layout>
</template>
