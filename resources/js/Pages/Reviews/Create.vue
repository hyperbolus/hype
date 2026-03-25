<script setup>
import AppLayout from "@/Layouts/Dash.vue";
import route from "ziggy-js";
import {useForm} from "@inertiajs/vue3";
import Errors from "@/Components/Errors.vue";
import TipTap from "@/Components/TipTap.vue";
import Checkbox from "@/Jetstream/Checkbox.vue";
import {onMounted, ref} from "vue";
import {useEventListener} from "@vueuse/core/index";
import Icon from "@/Components/Icon.vue";
import RaRGuidelines from "@/Components/RaRGuidelines.vue";
import RatingInput from "@/Components/RatingInput.vue";
import LevelTicket from "@/Components/LevelTicket.vue";

const props = defineProps({
    level: Object,
    review: Object,
});

const DEFAULT_BODY = '<p></p>';

const form = useForm({
    rating_gameplay: props.review?.rating_gameplay ?? 5,
    rating_visuals: props.review?.rating_visuals ?? 5,
    rating_overall: props.review?.rating_overall ?? 5,
    body: props.review?.review ?? DEFAULT_BODY,
    level: props.level.id
});

// TODO: remember with cookie?
const optionals = ref({
    overall: true,
    gameplay: false,
    visuals: false,
});

const submit = () => {
    form.transform((data) => {
        let final = {...data};
        final.rating_gameplay = optionals.value.gameplay ? final.rating_gameplay : null;
        final.rating_visuals = optionals.value.visuals ? final.rating_visuals : null;
        final.body = final.body === '<p></p>' ? null : final.body;
        return final;
    }).post(route('reviews.store'), {
        preserveScroll: true,
    });
};

const unload = (e) => form.isDirty ? e.preventDefault() : void(0)

onMounted(() => {
    useEventListener(window, 'beforeunload', unload)
    useEventListener(document, 'inertia:before', (e) => {
        if (form.isDirty && !form.processing && !confirm('You have unsaved changes with your rating/review that might be lost! Are you sure you want to leave?')) {
            e.preventDefault()
        }
    })
});
</script>
<template>
    <AppLayout>
        <div class="y space-y-4 w-full">
            <LevelTicket :level="level" :show-ratings="false"/>

            <div class="flex flex-col-reverse md:flex-row gap-2">
                <div class="y space-y-1 md:w-2/3">
                    <h2 class="text-2xl font-bold">Review</h2>
                    <TipTap class="pane !p-0 border border-ui-700 grow" v-model="form.body"/>
                </div>
                <div class="y space-y-1 md:w-1/3">
                    <h2 class="text-2xl font-bold">Rating</h2>
                    <RatingInput :form="form" :optionals="optionals"/>
                </div>
            </div>
            <div class="y space-y-1 !mt-2">
                <label class="pane">
                    <Checkbox class="mr-1.5 -mt-0.5"/>
                    <span>This is my own honest rating and my written review is not spam.</span>
                </label>
                <label v-if="form.body.length > DEFAULT_BODY.length" class="pane">
                    <Checkbox class="mr-1.5 -mt-0.5"/>
                    <span>I understand threats, harassment, and hateful personal attacks are prohibited and can get my account banned</span>
                </label>
            </div>
            <Errors/>

            <div class="review-submit group">
                <button @click="submit" :class="{ '!bg-blue-800 !text-ui-400': form.processing }" :disabled="form.processing">
                    <span v-if="form.processing" class="font-bold">Processing</span>
                    <span v-else class="font-bold">{{ review ? 'Edit' : 'Submit' }} Rating{{ form.body.length > DEFAULT_BODY.length ? ' & Review' : '' }}</span>
                    <Icon v-if="form.processing" name="ellipsis-horizontal" size="24"/>
                    <Icon v-else name="pencil" size="24"/>
                </button>
                <div></div>
                <div v-show="!form.processing" class="opacity-0 group-hover:opacity-100 transition-opacity"><div></div></div>
            </div>

            <RaRGuidelines/>

            <p class="text-center">Thank you for contributing to our site <span class="text-red-500">&hearts;</span></p>
        </div>
    </AppLayout>
</template>
<style scoped>
.review-submit {
    @apply relative self-center;
}

.review-submit > button {
    @apply flex relative z-20 items-center space-x-1.5 text-white bg-blue-500 px-4 py-2 rounded-md transition-colors;
}

.review-submit > div:first-of-type {
    @apply absolute z-10;
    inset: calc(-1rem + -1px);
    box-shadow: inset 0 0 10px 15px rgb(var(--color-ui-950));
}

.review-submit > div:last-of-type {
    @apply absolute -inset-4 rounded-lg overflow-hidden z-0 bg-blue-500;
}

.review-submit > div:last-of-type > div {
    @apply absolute aspect-square rounded-full z-0 bg-blue-500;
    animation: glow-spin 10s linear infinite;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    width: 150%;
    mix-blend-mode: color-dodge;
    background: repeating-conic-gradient(#fff, rgb(var(--color-ui-950)), #fff 10%);
}

@keyframes glow-spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
