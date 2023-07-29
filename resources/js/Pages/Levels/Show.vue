<script setup>
import AppLayout from '@/Layouts/Dash.vue'
import {Link, useForm, usePage} from '@inertiajs/vue3';
import Button from "@/Jetstream/Button.vue";
import Username from "@/Components/Username.vue";
import Avatar from "@/Components/Avatar.vue";
import background from "@/../images/background.png"
import Carousel from "@/Components/Carousel.vue";
import Dropdown from "@/Jetstream/Dropdown.vue";
import PostPad from "@/Components/PostPad.vue";
import VideoLightbox from "@/Components/VideoLightbox.vue";
import Pagination from "@/Components/Pagination.vue";
import Lightbox from "@/Components/Lightbox.vue";
import Checkbox from "@/Jetstream/Checkbox.vue";
import Tooltip from "@/Components/Tooltip.vue";
import Input from "@/Jetstream/Input.vue";
import route from 'ziggy-js'
import {displayRating, isAdmin, isAuthenticated} from "@/util.js";
import ReportModal from "@/Components/ReportModal.vue";

const props = defineProps({
    level: Object,
    review: Object,
    reviews: Object,
})

const form = useForm({
    rating_gameplay: props.review ? props.review.rating_gameplay : 5,
    rating_difficulty: props.review ? props.review.rating_difficulty : 5,
    rating_visuals: props.review ? props.review.rating_visuals : 5,
    rating_overall: props.review ? props.review.rating_overall : 5,
    body: props.review ? props.review.review : '',
    level_id: props.level.id
});

const blanks = ref({
    difficulty: false,
    gameplay: false,
    visuals: false
});

const submit = () => {
    form.transform((data) => {
        let final = {...data}; // Copy
        final.rating_difficulty = blanks.value.difficulty ? null : final.rating_difficulty;
        final.rating_gameplay = blanks.value.gameplay ? null : final.rating_gameplay;
        final.rating_visuals = blanks.value.visuals ? null : final.rating_visuals;

        return final;
    }).post(route('reviews.store'), {
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
        <div class="y h-64 shadow-lg rounded-lg justify-between w-full bg-ui-500 bg-ui-800 lg:max-w-5xl xl:max-w-6xl p-4 my-4 bg-center bg-cover" style="box-shadow: rgba(0, 0, 0, 0.85) 0 -275px 75px -200px inset;" :style="`background-image: url('${level.banner_url ?? background}')`">
            <div class="x justify-between items-start">
                <div class="x space-x-2">
                    <span>D: {{ displayRating(level.rating_difficulty) }}</span>
                    <span>G: {{ displayRating(level.rating_difficulty) }}</span>
                    <span>V: {{ displayRating(level.rating_visuals) }}</span>
                    <span>O: {{ displayRating(level.rating_overall) }}</span>
                </div>
                <Link v-show="isAdmin()" :href="route('levels.edit', level)" class="button">Edit</Link>
            </div>
            <div class="x justify-between items-end">
                <div class="x items-end">
                    <div class="y items-center shrink-0">
                        <img class="h-24 mr-2" :src="'https://browser.gdps.io/assets/difficulties/' + face() + '.png'" alt="difficulty"/>
                    </div>
                    <div class="leading-none">
                        <div class="x items-center text-ui-200">
                            <h1 class="font-bold text-2xl mr-2">{{ level.name }}</h1>
                            <span class="text-sm">by {{ level.creator }}</span>
                        </div>
                        <p class="text-ui-200">{{ level.description }}</p>
                        <div class="x items-center mt-2 space-x-2">
                            <div v-if="level.coins" class="x">
                                <img class="h-4" src="https://browser.gdps.io/assets/silvercoin.png" alt="coin"/>
                                <img v-if="level.coins > 1" class="h-4 -ml-1.5" src="https://browser.gdps.io/assets/silvercoin.png" alt="coin"/>
                                <img v-if="level.coins > 2" class="h-4 -ml-1.5" src="https://browser.gdps.io/assets/silvercoin.png" alt="coin"/>
                            </div>
                            <div v-if="level.stars" class="x items-center px-2 py-0.5 text-sm rounded bg-ui-800">
                                <span class="font-bold text-xs mr-1">{{ level.stars }}</span>
                                <img class="h-4" src="https://browser.gdps.io/assets/star.png" alt="star"/>
                            </div>
                            <div v-if="level.difficulty" class="px-2 py-0.5 text-xs rounded bg-ui-800">{{ difficulties[level.difficulty] }}</div>
                            <div v-if="level.featured" class="px-2 py-0.5 text-xs rounded bg-ui-800">Featured</div>
                            <div v-if="level.epic" class="px-2 py-0.5 text-xs rounded bg-ui-800">Epic</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="x bg-ui-950 border border-ui-900 rounded-lg items-center space-x-2 lg:max-w-5xl xl:max-w-6xl w-full px-4 py-2">
            <span class="y items-center font-bold text-sm uppercase">Top Tags</span>
            <div class="py-2 select-none border-r border-ui-400 border-ui-700"></div>
            <span v-if="level.tags.length === 0" class="opacity-50">No Tags</span>
            <Link v-else v-for="tag in level.tags" :href="route('tags.show', tag)" :title="`${tag.pivot.verified ? 'Verified' : 'Unverified'} tag`" class="x items-center text-ui-300 px-2 py-1 text-sm rounded-md bg-ui-800 capitalize">
                <svg v-if="tag.pivot.verified" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="inline mr-1 rounded-full text-green-500 w-5 h-5">
                    <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                </svg>
                {{tag.name}}
            </Link>
            <Link :href="route('levels.tags.show', level)" class="text-sm rounded hover:underline cursor-pointer">{{ level.tags.length === 0 ? 'Submit' : 'More'  }}...</Link>
        </div>
        <div class="flex flex-col md:flex-row bg-ui-950 border border-ui-900 rounded-lg p-4 lg:max-w-5xl xl:max-w-6xl w-full gap-4 my-4">
            <div class="y space-y-2 md:w-3/4">
                <template v-if="false">
                    <div class="x items-center justify-between">
                        <h2 class="font-bold text-2xl">Images</h2>
                        <Link :href="route('levels.images.show', level.id)" class="pane !py-1">Submit</Link>
                    </div>
                    <div v-if="level.images.length === 0" class="pane">No images available. Add one?</div>
                    <Carousel v-else :images="level.images"/>
                </template>
                <h2 class="font-bold text-2xl">Reviews</h2>
                <details v-if="isAuthenticated()" class="pane" :open="!props.review">
                    <summary>
                        <span class="text-xl cursor-pointer">{{ props.review ? 'Edit Your' : 'Submit' }} Rating</span>
                        <Lightbox @click.prevent class="float-right">
                            <span class="underline">help</span>
                            <template #content>
                                <div @click.stop class="cursor-auto bg-ui-900 text-ui-200 p-4 shadow-xl w-full md:w-[32rem] lg:w-[48rem]">
                                    <h1 class="font-bold text-2xl">Rating Help</h1>
                                    <p>Rating levels helps the community by giving the creator feedback, and encouraging players to think critically and learn from levels. It is also a way to share your own interpretations of levels with others.</p>
                                    <h2 class="font-bold text-lg mt-2">How to Rate</h2>
                                    <p>Your rating is comprised of up to 4 scores and a review.</p>
                                    <ul class="list-inside space-y-2 p-2 mt-2 rounded bg-ui-800">
                                        <li><b>Overall Score</b> - The only mandatory score. Use your own criteria to rate the level overall.</li>
                                        <li><b>Difficulty Score</b> - Rate the level's difficulty in your own opinion</li>
                                        <li><b>Gameplay Score</b> - Use your own criteria to score the gameplay of a level. This could by it's sync or playability but it is up to you.</li>
                                        <li><b>Visuals Score</b> - Use your own criteria to score the visual quality of the level.</li>
                                        <li><b>Review</b> - While optional, you are highly encouraged to submit a text review</li>
                                    </ul>
                                    <p class="mt-2">While there are additional optional scores, you are <b>HIGHLY</b> encouraged to be as thorough as possible. Thank you for contributing!</p>
                                </div>
                                <div class="x justify-center p-4">
                                    <Button>Close</Button>
                                </div>
                            </template>
                        </Lightbox>
                    </summary>
                    <form @submit.prevent="submit" class="y gap-4">
                        <div class="space-y-2 w-full">
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
                            <h1 class="text-lg font-bold">Main Scores</h1>
                            <h2>Overall Rating: {{ form.rating_overall }}<span class="opacity-50 text-xs">/10</span></h2>
                            <input class="w-full" v-model.number="form.rating_overall" type="range" min="0" max="10" step="1"/>

                            <div class="flex flex-col sm:flex-row sm:items-center justify-between">
                                <span>Difficulty Rating: {{ blanks.difficulty ? '-' : form.rating_difficulty }}<span class="opacity-50 text-xs">/100</span></span>
                                <span class="x items-center"><Checkbox v-model="blanks.difficulty" class="mr-2"/>Leave Empty</span>
                            </div>
                            <input :disabled="blanks.difficulty" class="w-full" v-model.number="form.rating_difficulty" type="range" min="0" max="100" step="1"/>

                            <h1 class="text-lg font-bold mt-2">Additional Scores (optional)</h1>
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between">
                                <span>Gameplay Rating: {{ blanks.gameplay ? '-' : form.rating_gameplay }}<span class="opacity-50 text-xs">/10</span></span>
                                <span class="x items-center"><Checkbox v-model="blanks.gameplay" class="mr-2"/>Leave Empty</span>
                            </div>
                            <input :disabled="blanks.gameplay" class="w-full" v-model.number="form.rating_gameplay" type="range" min="0" max="10" step="1"/>

                            <div class="flex flex-col sm:flex-row sm:items-center justify-between">
                                <span>Visuals Rating: {{ blanks.visuals ? '-' : form.rating_visuals }}<span class="opacity-50 text-xs">/10</span></span>
                                <span class="x items-center"><Checkbox v-model="blanks.visuals" class="mr-2"/>Leave Empty</span>
                            </div>
                            <input :disabled="blanks.visuals" class="w-full" v-model.number="form.rating_visuals" type="range" min="0" max="10" step="1"/>
                        </div>
                        <Button class="w-fit" @click="submit" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">{{ form.processing ? 'Processing...' : (props.review ? 'Edit Your' : 'Submit') + ' Rating' }}</Button>
                    </form>
                </details>
                <div v-else class="y pane">
                    <h2 class="text-xl"><Link class="underline" :href="route('auth::login')">Log in</Link> to submit a review</h2>
                </div>
                <Pagination :list="reviews"/>
                <div v-if="reviews.data.length === 0" class="pane">
                    This level has no reviews. Be the first!
                </div>
                <div v-for="review in reviews.data" class="x items-center pane">
                    <Avatar class="w-8 h-8 mr-4" :user="review.author"/>
                    <div class="y w-full">
                        <div class="x justify-between items-center space-x-2">
                            <h2><Username :user="review.author"/></h2>
                            <div class="x space-x-2">
                                <Link title="Direct Link" :href="route('reviews.show', review.id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="text-ui-500 w-4 h-4">
                                        <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.366A2.52 2.52 0 0113 4.5z" />
                                    </svg>
                                </Link>
                                <Lightbox title="Report This" v-if="isAuthenticated()">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="text-ui-500 w-4 h-4">
                                        <path d="M3.5 2.75a.75.75 0 00-1.5 0v14.5a.75.75 0 001.5 0v-4.392l1.657-.348a6.449 6.449 0 014.271.572 7.948 7.948 0 005.965.524l2.078-.64A.75.75 0 0018 12.25v-8.5a.75.75 0 00-.904-.734l-2.38.501a7.25 7.25 0 01-4.186-.363l-.502-.2a8.75 8.75 0 00-5.053-.439l-1.475.31V2.75z" />
                                    </svg>
                                    <template #content>
                                        <ReportModal :reportable_id="review.id" :reportable_type="42" @click.stop class="cursor-auto"/>
                                    </template>
                                </Lightbox>
                            </div>
                        </div>
                        <p>{{ review.review }}</p>
                        <div class="x space-x-2 text-sm text-ui-400">
                            <span>DIFF: {{ displayRating(review.rating_difficulty) }}</span>
                            <span>GAME: {{ displayRating(review.rating_gameplay) }}</span>
                            <span>VIS: {{ displayRating(review.rating_visuals) }}</span>
                            <span>ALL: {{ displayRating(review.rating_overall) }}</span>
                        </div>
                    </div>
                </div>
                <Pagination :list="reviews"/>
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
                    <div v-else class="pane !px-0 !py-0 divide-y divide-ui-800">
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
                                    <div class="divide-y divide-ui-700 whitespace-nowrap">
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
    @apply h-1.5 rounded bg-ui-950
}

input[type=range]::-moz-range-thumb, input[type=range]::-webkit-slider-thumb {
    @apply bg-ui-700 border-none cursor-pointer
}

input[type=range][disabled]::-moz-range-thumb, input[type=range]::-webkit-slider-thumb {
    @apply opacity-0
}
</style>
