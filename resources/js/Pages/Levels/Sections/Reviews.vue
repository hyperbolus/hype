<script setup>
import Layout from '../Layout.vue'
import {Link, useForm} from '@inertiajs/vue3';
import Button from "@/Jetstream/Button.vue";
import Pagination from "@/Components/Pagination.vue";
import Lightbox from "@/Components/Lightbox.vue";
import Checkbox from "@/Jetstream/Checkbox.vue";
import Input from "@/Jetstream/Input.vue";
import route from 'ziggy-js'
import {isAuthenticated} from "@/util.js";
import {onMounted, ref} from "vue";
import Errors from "@/Components/Errors.vue";
import LevelReview from "@/Components/LevelReview.vue";
import TipTap from "@/Components/TipTap.vue";
import {useEventListener} from "@vueuse/core";
import QueryFooter from "@/Components/QueryFooter.vue";
import Sorting from "@/Components/Sorting.vue";
import RatingOverview from "@/Components/RatingOverview.vue";

const props = defineProps({
    level: Object,
    review: Object,
    reviews: Object,
    sorting: Object,
})

const form = useForm({
    rating_gameplay: props.review ? props.review.rating_gameplay : 5,
    rating_difficulty: props.review ? props.review.rating_difficulty : 5,
    rating_visuals: props.review ? props.review.rating_visuals : 5,
    rating_overall: props.review ? props.review.rating_overall : 5,
    body: props.review ? (!props.review.review ? '<p></p>' : props.review.review) : '<p></p>',
    level_id: props.level.id
});

const blanks = ref({
    difficulty: false,
    gameplay: false,
    visuals: false
});

const submitting = ref(false);

const submit = () => {
    submitting.value = true;
    form.transform((data) => {
        let final = {...data}; // Copy
        final.rating_difficulty = blanks.value.difficulty ? null : final.rating_difficulty;
        final.rating_gameplay = blanks.value.gameplay ? null : final.rating_gameplay;
        final.rating_visuals = blanks.value.visuals ? null : final.rating_visuals;
        final.body = final.body === '<p></p>' ? null : final.body;

        return final;
    }).post(route('reviews.store'), {
        preserveScroll: true,
        onFinish: () => {
            submitting.value = false;
        }
    });
};

const removeForm = useForm({});

const remove = () => {
    submitting.value = true;
    removeForm.delete(route('reviews.destroy', props.review.id), {
        preserveScroll: true,
        onFinish: () => {
            submitting.value = false;
        }
    });
};

const unload = (e) => form.isDirty ? e.preventDefault() : void(0)

onMounted(() => {
    useEventListener(window, 'beforeunload', unload)
    useEventListener(document, 'inertia:before', (e) => {
        if (form.isDirty && !submitting.value && !confirm('You have unsaved changes with your rating/review that might be lost! Are you sure you want to leave?')) {
            e.preventDefault()
        }
    })
})
</script>
<template>
    <Layout :level="level">
        <div class="y !mt-0 bg-ui-950 border border-ui-900 rounded-lg px-4 py-2 gap-2">
            <h2 class="font-bold text-2xl">Average Ratings</h2>
            <RatingOverview :level="level"/>
            <details v-if="isAuthenticated()" class="pane">
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
                <!-- if you wanna get technical, maybe form should only wrap the button and not this whole thing bc adding any button inside it can trigger submit -->
                <form @submit.prevent="void(0)" class="y space-y-4">
                    <div class="space-y-2 w-full">
                        <Errors/>
                        <p class="font-bold text-sm text-red-400">NOTE: Reviews are NOT comments! Reviews should be thoughtful and constructive in a way that is helpful or insightful for the creator or others visiting the site. If a review is only a sentence and a half, it probably isn't a review. If you don't wish to write a text review, remember that you are free (and encouraged) to skip it.</p>
                        <p class="text-sm text-red-100">We are working to write helpful review guidelines and systems for up/down voting un/helpful reviews. Guidelines will just be writing suggestions, users will always be free to write what they wish without being deleted (except spam), we just ask for consideration. Thank you for contributing to our site <span class="text-red-500">&hearts;</span></p>
                        <p class="hidden">{{ form.body }}</p>
                        <TipTap class="pane !p-0 border border-ui-700" v-model="form.body"/>
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
                    <div class="x space-x-2">
                        <Button class="w-fit" @click="submit" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">{{ form.processing ? 'Processing...' : (props.review ? 'Edit Your' : 'Submit') + ' Rating' }}</Button>
                        <button v-if="props.review" class="button text-red-500 hover:text-white hover:bg-red-500" @click="remove" :class="{ 'opacity-25': removeForm.processing }" :disabled="removeForm.processing">{{ removeForm.processing ? 'Processing...' : 'Delete' }}</button>
                    </div>
                </form>
            </details>
            <div v-else class="y pane">
                <h2 class="text-xl"><Link class="underline" :href="route('auth::login')">Log in</Link> to submit a review</h2>
            </div>
            <div class="y md:flex-row items-center gap-2 justify-between">
                <h2 class="font-bold text-2xl">Reviews</h2>
                <Sorting :sorting="sorting" :url="route('levels.reviews.show', level.id)"/>
            </div>
            <Pagination :list="reviews"/>
            <div v-if="reviews.data.length === 0" class="pane">This level has no reviews. Be the first!</div>
            <LevelReview :key="review.id" v-for="review in reviews.data" :review="review"/>
            <QueryFooter :sorting="sorting" :url="route('levels.reviews.show', level.id)" :results="reviews"/>
            <Pagination :list="reviews"/>
        </div>
    </Layout>
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
