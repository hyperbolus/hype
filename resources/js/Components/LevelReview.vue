<script setup>
import Avatar from "@/Components/Avatar.vue";
import Username from "@/Components/Username.vue";
import Lightbox from "@/Components/Lightbox.vue";
import {Link, useForm} from "@inertiajs/vue3";
import ReportModal from "@/Components/ReportModal.vue";
import {displayRating, face, isAdmin, isAuthenticated, isUser} from "@/util.js";
import route from "ziggy-js";
import TipTap from "@/Components/TipTap.vue";
import Timestamp from "@/Components/Timestamp.vue";
import Icon from "@/Components/Icon.vue";
import Tooltip from "@/Components/Tooltip.vue";
import Dropdown from "@/Jetstream/Dropdown.vue";

const props = defineProps({
    review: Object
});

const list = {
    'rating_difficulty': 'DIFFICULTY',
    'rating_gameplay': 'GAMEPLAY',
    'rating_visuals': 'VISUALS',
    'rating_overall': 'OVERALL',
};

const removeForm = useForm({});

const remove = () => {
    if (!confirm('Are you sure you want to delete this review? This will remove your rating, written review, and completion status and CANNOT BE UNDONE!')) return;
    removeForm.delete(route('reviews.destroy', props.review.id), {
        preserveScroll: true
    });
};
</script>
<template>
    <div class="y items-center pane !px-2 relative z-0">
        <div v-if="review.level" class="absolute inset-0 bg-blue-500 rounded-md bg-center bg-cover [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.4)_100%);]" :style="`background-image: url(${review.level.banner_url ?? 'https://raw.githubusercontent.com/cdc-sys/level-thumbnails/refs/heads/main/thumbs/' + review.level.id + '.png'})`"></div>
        <div class="z-10 flex flex-col md:flex-row gap-2 items-center w-full justify-between">
            <Link :href="route('levels.show', review.level.id)" v-if="review.level" class="x items-center space-x-2 px-2">
                <img class="h-14" :src="face(review.level)" alt=""/>
                <div class="y">
                    <h2 class="font-bold text-2xl">{{ review.level.name }}</h2>
                    <Link :href="route('profiles.show', review.level.creator)" class="w-fit">{{ review.level.creator }}</Link>
                </div>
            </Link>
            <div v-else class="x items-center space-x-2 px-2">
                <Avatar width="w-10 shrink-0" :user="review.author"/>
                <div class="y">
                    <Username :user="review.author"/>
                    <Timestamp class="w-fit text-sm text-ui-500" position="right" :time="review.created_at"/>
                </div>
            </div>
            <div class="x space-x-2 items-stretch h-full text-sm text-ui-400">
                <div v-for="(item, key) in list" class="y items-end justify-center bg-ui-950 rounded-md px-2 py-1">
                    <span class="font-bold text-2xl">{{ displayRating(review[key], 0) }}<span class="text-sm font-normal text-ui-700">/10{{ key === 'rating_difficulty' ? '0' : '' }}</span></span>
                    <span class="text-xs">{{ item }}</span>
                </div>
            </div>
        </div>
        <TipTap v-if="review.review" :key="review.id" class="z-10 rounded-md bg-ui-800/90 px-2 py-1 w-full mt-2" :editable="false" v-model="review.review"/>
        <div class="z-10 y sm:flex-row justify-between items-center w-full gap-2 mt-2">
            <div v-if="review.level && review.author" class="x space-x-2 items-center">
                <Avatar width="w-7" :user="review.author"/>
                <div class="x items-center relative px-2 py-0.5 rounded-md bg-ui-800">
                    <div class="x space-x-2 items-center">
                        <Username :user="review.author"/>
                        <Timestamp class="w-fit text-sm text-ui-500" position="right" :time="review.created_at"/>
                    </div>
                </div>
            </div>
            <div v-else></div>
            <div class="x gap-2 items-end">
                <div v-if="0" class="x space-x-2 items-center bg-ui-800 px-2 py-1 rounded-md">
                    <span class="text-sm text-ui-500">Comments (0)</span>
                    <Icon class="w-5 text-ui-600" name="chat-bubble-oval-left"/>
                </div>
                <div v-if="0" class="x space-x-2 items-center bg-ui-800 px-2 py-1 rounded-md">
                    <Tooltip message="Like">
                        <Icon class="w-5 text-green-500" name="heart"/>
                    </Tooltip>
                    <Tooltip message="Bookmark">
                        <Icon class="w-5 text-ui-300" name="bookmark"/>
                    </Tooltip>
                </div>
                <div class="x space-x-2 items-center bg-ui-800 px-1.5 p-1 rounded-md">
                    <Dropdown align="top" container-classes="mb-8">
                        <template #trigger>
                            <Icon class="w-5" name="ellipsis-horizontal"/>
                        </template>
                        <template #content>
                            <Link class="block rounded-t px-2 py-1 hover:bg-ui-700" :href="route('reviews.show', review.id)">Permalink</Link>
                            <Lightbox v-if="isAuthenticated()">
                                <div class="px-2 py-1 hover:bg-ui-700 last:rounded-b">Report This</div>
                                <template #content>
                                    <ReportModal :reportable_id="review.id" :reportable_type="42" @click.stop class="cursor-auto"/>
                                </template>
                            </Lightbox>
                            <div v-if="isAdmin() || isUser(review.author.id)" @click="remove" class="text-red-500 hover:text-white hover:bg-red-500 last:rounded-b px-2 py-1">Delete</div>
                        </template>
                    </Dropdown>
                </div>
            </div>
        </div>
    </div>
</template>
