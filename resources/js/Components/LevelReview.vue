<script setup>
import Avatar from "@/Components/Avatar.vue";
import Username from "@/Components/Username.vue";
import Lightbox from "@/Components/Lightbox.vue";
import {Link} from "@inertiajs/vue3";
import ReportModal from "@/Components/ReportModal.vue";
import {displayRating, isAuthenticated} from "@/util.js";
import route from "ziggy-js";
import TipTap from "@/Components/TipTap.vue";
import Timestamp from "@/Components/Timestamp.vue";

const props = defineProps({
    review: Object
});

const list = {
    'rating_difficulty': 'DIFFICULTY',
    'rating_gameplay': 'GAMEPLAY',
    'rating_visuals': 'VISUALS',
    'rating_overall': 'OVERALL',
};
</script>
<template>
    <div class="y items-center pane !px-2 space-y-2">
        <div class="flex flex-col md:flex-row gap-2 items-start md:items-center w-full justify-between">
            <div class="x items-center space-x-2 px-2">
                <Avatar width="w-10 shrink-0" :user="review.author"/>
                <div class="y">
                    <Username :user="review.author"/>
                    <Timestamp class="w-fit text-sm text-ui-500" position="right" :time="review.created_at"/>
                </div>
            </div>
            <div class="x space-x-2 items-center text-sm text-ui-400">
                <div v-for="(item, key) in list" class="y items-end leading-tight bg-ui-950 rounded px-2 py-0.5">
                    <span class="font-bold text-2xl">{{ displayRating(review[key], false) }}</span>
                    <span class="text-xs">{{ item }}</span>
                </div>
                <div class="y space-y-2">
                    <Link class="rounded p-1 bg-ui-800" title="Direct Link" :href="route('reviews.show', review.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="text-ui-500 w-4 h-4">
                            <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.366A2.52 2.52 0 0113 4.5z" />
                        </svg>
                    </Link>
                    <Lightbox class="rounded p-1 bg-ui-800" title="Report This" v-if="isAuthenticated()">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="text-ui-500 w-4 h-4">
                            <path d="M3.5 2.75a.75.75 0 00-1.5 0v14.5a.75.75 0 001.5 0v-4.392l1.657-.348a6.449 6.449 0 014.271.572 7.948 7.948 0 005.965.524l2.078-.64A.75.75 0 0018 12.25v-8.5a.75.75 0 00-.904-.734l-2.38.501a7.25 7.25 0 01-4.186-.363l-.502-.2a8.75 8.75 0 00-5.053-.439l-1.475.31V2.75z" />
                        </svg>
                        <template #content>
                            <ReportModal :reportable_id="review.id" :reportable_type="42" @click.stop class="cursor-auto"/>
                        </template>
                    </Lightbox>
                </div>
            </div>
        </div>
        <TipTap v-if="review.review" :key="review.id" class="rounded-md bg-ui-800 px-2 py-1 w-full" :editable="false" v-model="review.review"/>
    </div>
</template>
