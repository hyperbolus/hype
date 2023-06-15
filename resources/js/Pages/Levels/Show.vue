<script setup>
import AppLayout from '@/Layouts/Dash.vue'
import {Link, useForm} from '@inertiajs/vue3';
import Button from "@/Jetstream/Button.vue";
import Username from "@/Components/Username.vue";
import Avatar from "@/Components/Avatar.vue";
import background from "@/../images/background.png"
import Carousel from "@/Components/Carousel.vue";
import Dropdown from "@/Jetstream/Dropdown.vue";
import PostPad from "@/Components/PostPad.vue";
import VideoLightbox from "@/Components/VideoLightbox.vue";

const props = defineProps({
    level: Object,
    review: Object
})

const form = useForm({
    rating_gameplay: props.review ? props.review.rating_gameplay : 5,
    rating_difficulty: props.review ? props.review.rating_difficulty : 5,
    rating_visuals: props.review ? props.review.rating_visuals : 5,
    rating_overall: props.review ? props.review.rating_overall : 5,
    body: props.review ? props.review.review : '',
    level_id: props.level.id
});

const submit = () => {
    form.post(route('reviews.store'), {
        preserveScroll: true,
    });
};

const difficulties = [
    "Unrated",
    "Auto",
    "Easy",
    "Normal",
    "Hard",
    "Harder",
    "Insane",
    "Easy Demon",
    "Medium Demon",
    "Hard Demon",
    "Insane Demon",
    "Extreme Demon",
]

const face = () => {
    if (!props.level.difficulty) {
        return difficulties[0].toLowerCase()
    }

    let name = difficulties[props.level.difficulty].toLowerCase().split(' ').reverse().join('-')

    if(props.level.epic) {
        name += '-epic'
    } else if (props.level.featured) {
        name += '-featured'
    }

    return name;
}
</script>
<template>
    <app-layout title="Home" :decorations="false">
        <template #breadcrumbs>
            <Link :href="route('levels.index')">Levels</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <span>{{ level.id }}</span>
        </template>
        <div class="y h-64 shadow-lg rounded-lg justify-between w-full bg-neutral-500 bg-ui-800 lg:max-w-5xl xl:max-w-6xl p-4 my-4 bg-center bg-cover" style="box-shadow: rgba(0, 0, 0, 0.85) 0 -275px 75px -200px inset;" :style="`background-image: url('${level.banner_url ?? background}')`">
            <div class="x justify-between items-start">
                <div class="x space-x-2">
                    <span>D: {{ level.rating_difficulty ? level.rating_difficulty : 'N/A' }}</span>
                    <span>G: {{ level.rating_gameplay ? level.rating_gameplay : 'N/A' }}</span>
                    <span>V: {{ level.rating_visuals ? level.rating_visuals : 'N/A' }}</span>
                    <span>O: {{ level.rating_overall ? level.rating_overall : 'N/A' }}</span>
                </div>
                <Link v-show="$page.props.auth && $page.props.user.roles.includes('admin')" :href="route('levels.edit', level)" class="button">Edit</Link>
            </div>
            <div class="x justify-between items-end">
                <div class="x items-end">
                    <div class="y items-center shrink-0">
                        <img class="h-24 mr-2" :src="'https://browser.gdps.io/assets/difficulties/' + face() + '.png'" alt="difficulty"/>
                    </div>
                    <div class="leading-none">
                        <div class="x items-center text-neutral-200">
                            <h1 class="font-bold text-2xl mr-2">{{ level.name }}</h1>
                            <span class="text-sm">by {{ level.creator }}</span>
                        </div>
                        <p class="text-neutral-200">{{ level.description }}</p>
                        <div class="x items-center mt-2 space-x-2">
                            <div v-if="level.coins" class="x">
                                <img class="h-4" src="https://browser.gdps.io/assets/silvercoin.png" alt="coin"/>
                                <img v-if="level.coins > 1" class="h-4 -ml-1.5" src="https://browser.gdps.io/assets/silvercoin.png" alt="coin"/>
                                <img v-if="level.coins > 2" class="h-4 -ml-1.5" src="https://browser.gdps.io/assets/silvercoin.png" alt="coin"/>
                            </div>
                            <div v-if="level.stars" class="x items-center px-2 py-0.5 text-sm transition-colors rounded bg-neutral-100 dark:bg-ui-800">
                                <span class="font-bold text-xs mr-1">{{ level.stars }}</span>
                                <img class="h-4" src="https://browser.gdps.io/assets/star.png" alt="star"/>
                            </div>
                            <div v-if="level.difficulty" class="px-2 py-0.5 text-xs transition-colors rounded bg-neutral-100 dark:bg-ui-800">{{ difficulties[level.difficulty] }}</div>
                            <div v-if="level.featured" class="px-2 py-0.5 text-xs transition-colors rounded bg-neutral-100 dark:bg-ui-800">Featured</div>
                            <div v-if="level.epic" class="px-2 py-0.5 text-xs transition-colors rounded bg-neutral-100 dark:bg-ui-800">Epic</div>
                        </div>
                    </div>
                </div>
                <div class="!hidden x space-x-2 items-end">
                    <span>{{ level.rating_difficulty ? Math.round((level.rating_difficulty / 2) * 100) / 100 : 'N/A' }}</span>
                    <span>{{ level.rating_difficulty ? Math.round((level.rating_difficulty / 2) * 100) / 100 : 'N/A' }}</span>
                    <span>{{ level.rating_difficulty ? Math.round((level.rating_difficulty / 2) * 100) / 100 : 'N/A' }}</span>
                    <span>{{ level.rating_difficulty ? Math.round((level.rating_difficulty / 2) * 100) / 100 : 'N/A' }}</span>
                </div>
            </div>
        </div>
        <div class="x transition-colors bg-neutral-200 dark:bg-ui-950 dark:border dark:border-ui-900 rounded-lg items-center space-x-2 lg:max-w-5xl xl:max-w-6xl w-full px-4 py-2">
            <div class="y items-center font-bold text-sm">
                TOP TAGS
            </div>
            <div class="py-2 select-none transition-colors border-r border-neutral-400 dark:border-ui-700"></div>
            <span v-if="level.tags.length === 0" class="opacity-50">No Tags</span>
            <Link v-else v-for="tag in level.tags" :href="route('tags.show', tag)" class="x items-center text-neutral-700 dark:text-ui-300 px-2 py-1 text-sm rounded-md bg-neutral-100 dark:bg-ui-800 capitalize">
                    <span title="Verified Tag">
                        <svg v-if="tag.pivot.verified" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="inline mr-1 rounded-full text-green-500 w-5 h-5">
                            <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                        </svg>
                    </span>
                {{tag.name}}
            </Link>
            <Link :href="route('levels.tags.show', level)" class="text-sm rounded hover:underline cursor-pointer">{{ level.tags.length === 0 ? 'Submit' : 'More'  }}...</Link>
        </div>
        <div class="flex flex-col md:flex-row dark:bg-ui-950 dark:border dark:border-ui-900 rounded-lg p-4 lg:max-w-5xl xl:max-w-6xl w-full gap-4 my-4">
            <div class="y space-y-2 md:w-3/4">
                <div class="x items-center justify-between">
                    <h2 class="font-bold text-2xl">Images</h2>
                    <Link :href="route('levels.images.show', level.id)" class="pane !py-1">Submit</Link>
                </div>
                <div v-if="level.images.length === 0" class="pane">No images available. Add one?</div>
                <Carousel v-else :images="level.images"/>
                <h2 class="font-bold text-2xl">Reviews</h2>
                <form v-if="$page.props.auth" @submit.prevent="submit" class="y pane gap-4">
                    <div class="space-y-2 w-full">
                        <h2 class="text-xl">{{ props.review ? 'Edit Your' : 'Submit' }} Rating</h2>
                        <ul v-if="Object.keys($page.props.errors).length > 0" class="list-disc list-inside text-sm text-red-500">
                            <li v-for="(error, key) in $page.props.errors" :key="key">
                                {{ error }}
                            </li>
                        </ul>
                        <p class="hidden">{{ form.body }}</p>
                        <textarea v-model="form.body" class="resize-none resize-y w-full pane !bg-ui-800 border-none"></textarea>
                        <PostPad v-if="false" v-model="form"/>
                    </div>
                    <div class="w-full">
                        <h2>Gameplay Rating: {{ form.rating_gameplay }}<span class="opacity-50 text-xs">/10</span></h2>
                        <input class="w-full" v-model.number="form.rating_gameplay" type="range" min="0" max="10" step="1"/>
                        <h2>Difficulty Rating: {{ form.rating_difficulty }}<span class="opacity-50 text-xs">/100</span></h2>
                        <input class="w-full" v-model.number="form.rating_difficulty" type="range" min="0" max="100" step="1"/>
                        <h2>Visuals Rating: {{ form.rating_visuals }}<span class="opacity-50 text-xs">/10</span></h2>
                        <input class="w-full" v-model.number="form.rating_visuals" type="range" min="0" max="10" step="1"/>
                        <h2>Overall Rating: {{ form.rating_overall }}<span class="opacity-50 text-xs">/10</span></h2>
                        <input class="w-full" v-model.number="form.rating_overall" type="range" min="0" max="10" step="1"/>
                    </div>
                    <Button class="w-fit" @click="submit">{{ props.review ? 'Edit Your' : 'Submit' }} Rating</Button>
                </form>
                <div v-else class="y pane">
                    <h2 class="text-xl"><Link class="underline" :href="route('auth::login')">Log in</Link> to submit a review</h2>
                </div>
                <div v-if="level.reviews.length === 0" class="pane">
                    This level has no reviews. Be the first!
                </div>
                <div v-for="review in level.reviews" class="x items-center pane">
                    <Avatar class="w-8 h-8 mr-4" :user="review.author"/>
                    <div class="y w-full">
                        <div class="x justify-between items-center space-x-2">
                            <h2><Username :user="review.author"/></h2>
                            <span>{{ review.rating_overall }}/10</span>
                        </div>
                        <p>{{ review.review }}</p>
                    </div>
                </div>
            </div>
            <div class="y space-y-2 md:w-1/4">
                <div class="w-full space-y-2">
                    <div v-if="false" class="flex items-center justify-center rounded-md px-4 py-2 bg-rose-500 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mr-2">
                            <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                            <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                        </svg>
                        <span class="font-bold cursor-pointer">Download Level</span>
                    </div>
                    <div class="x items-center justify-between">
                        <h2 class="font-bold text-2xl">Videos</h2>
                        <span class="!hidden pane !py-1 cursor-pointer">Submit</span>
                    </div>
                    <div v-if="level.videos.length === 0" class="pane">
                        No videos available
                    </div>
                    <VideoLightbox v-for="video in level.videos" :video="video" class="w-full"/>
                </div>
                <div class="hidden md:block w-full space-y-2">
                    <div class="x items-center justify-between">
                        <h2 class="font-bold text-2xl">Replays</h2>
                        <span class="!hidden pane !py-1 cursor-pointer">Submit</span>
                    </div>
                    <div v-if="true" class="pane">No replays available</div>
                    <div v-else class="pane !px-0 !py-0 divide-y divide-neutral-200 dark:divide-neutral-800">
                        <div class="x px-4 py-2 space-x-2 items-center justify-between">
                            <Dropdown width="fit" class="pane !px-2 w-full">
                                <template #trigger>
                                    <div class="x justify-between items-center">
                                        <span>Choose Format</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                </template>
                                <template #content>
                                    <div class="divide-y dark:divide-neutral-700 whitespace-nowrap">
                                        <div class="px-4 py-1">MegaHack Replay (json)</div>
                                        <div class="px-4 py-1">ReplayBot</div>
                                        <div class="px-4 py-1">TASBOT</div>
                                        <div class="px-4 py-1">zbot (frame)</div>
                                        <div class="px-4 py-1">ybot (frame)</div>
                                        <div class="px-4 py-1">xbot (frame)</div>
                                        <div class="px-4 py-1">Universal Replay</div>
                                    </div>
                                </template>
                            </Dropdown>
                            <span class="text-sm underline cursor-pointer">Download</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </app-layout>
</template>
<style scoped>
input[type=range] {
    @apply h-1.5 rounded bg-white dark:bg-ui-950
}

input[type=range]::-moz-range-thumb, input[type=range]::-webkit-slider-thumb {
    @apply bg-white dark:bg-ui-700 border-neutral-300 dark:border-none cursor-pointer
}
</style>
