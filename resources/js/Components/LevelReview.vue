<script setup>
import Avatar from "@/Components/Avatar.vue";
import Username from "@/Components/Username.vue";
import Lightbox from "@/Components/Lightbox.vue";
import {Link, useForm} from "@inertiajs/vue3";
import ReportModal from "@/Components/ReportModal.vue";
import {displayRating, face, isAdmin, isAuthenticated, isModerator, isUser} from "@/util.js";
import route from "ziggy-js";
import TipTap from "@/Components/TipTap.vue";
import Timestamp from "@/Components/Timestamp.vue";
import Icon from "@/Components/Icon.vue";
import Tooltip from "@/Components/Tooltip.vue";
import Dropdown from "@/Jetstream/Dropdown.vue";
import {ref, useTemplateRef, watch} from "vue";
import UserFlag from "@/Components/UserFlag.vue";
import WeightBadge from "@/Components/WeightBadge.vue";
import {useElementSize} from "@vueuse/core";
import RatingInput from "@/Components/RatingInput.vue";

const props = defineProps({
    review: Object,
    level: Object,
    weight: Number
});

const list = {
    'rating_overall': 'OVERALL',
    'rating_visuals': 'VISUALS',
    'rating_gameplay': 'GAMEPLAY',
};

const hovering = ref(false);

const lvl = ref(props.review.level ?? props.level ?? false);

const removeForm = useForm({});

const remove = () => {
    if (!confirm('Are you sure you want to delete this review? This will remove your rating, written review, and completion status and CANNOT BE UNDONE!')) return;
    removeForm.delete(route('reviews.destroy', props.review.id), {
        preserveScroll: true
    });
};

const weight = props.review.weight ?? props.review.author?.weight ?? props.weight ?? 1;

const expanded = ref(false);
const long = ref(true);

const body = useTemplateRef('body');

const { height } = useElementSize(body);

watch(height, () => {
    long.value = height.value !== body.value.$el.parentElement.clientHeight;
});

const form = useForm({
    rating_gameplay: props.review.rating_gameplay,
    rating_visuals: props.review.rating_visuals,
    rating_overall: props.review.rating_overall,
    level: props.review.level_id,
    body: props.review.review,
});

const optionals = ref({
    overall: props.review.rating_overall !== null,
    gameplay: props.review.rating_gameplay !== null,
    visuals: props.review.rating_visuals !== null,
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
</script>
<template>
    <div class="y">
        <span v-if="isUser(review.user_id) && review.author" class="ml-4 text-xs font-bold bg-amber-500 w-fit text-black px-1.5 rounded-t">Your {{ review.review ? 'Review' : 'Rating' }}</span>
        <div class="y items-center rounded-lg shadow bg-ui-900 p-2 relative z-0" :class="isUser(review.user_id) && review.author ? '-mt-0.5 border-2 border-amber-500' : ''">
            <div v-if="review.level" class="absolute inset-0 rounded-md bg-center bg-cover [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.4)_100%);]" :style="`background-image: url(${review.level.banner_url ?? 'https://levelthumbs.prevter.me/thumbnail/' + review.level.id + '/small'})`"></div>
            <div class="z-10 flex flex-col md:flex-row gap-2 items-center w-full justify-between">
                <div v-if="review.level" class="x items-center space-x-2">
                    <Link :href="route('levels.show', review.level.id)">
                        <img class="h-14" :src="face(review.level)" alt=""/>
                    </Link>
                    <div class="y">
                        <Link :href="route('levels.show', review.level.id)" class="font-bold text-2xl">{{ review.level.name }}</Link>
                        <Link :href="route('profiles.show', review.level.creator)" class="w-fit">{{ review.level.creator }}</Link>
                    </div>
                </div>
                <div v-else class="x items-center space-x-2 px-2">
                    <Avatar v-if="review.author" width="w-10 shrink-0" :user="review.author"/>
                    <div class="y">
                        <div class="x items-center space-x-2" v-if="review.author">
                            <Username :user="review.author"/>
                            <UserFlag size="sm" :user="review.author"/>
                        </div>
                        <Timestamp class="w-fit text-sm text-ui-500" position="right" :time="review.created_at"/>
                    </div>
                </div>
                <div @mouseenter="hovering = true" @mouseleave="hovering = false" class="x space-x-2 items-stretch h-full text-sm text-ui-400">
                    <span class="[text-orientation:mixed] [writing-mode:sideways-lr] text-center text-xs tracking-tighter" :class="{'invisible': !hovering}">AVERAGE</span>
                    <div v-for="(item, key) in list" class="y items-end justify-center bg-ui-950 rounded-md px-2 py-1 first-of-type:!ml-0.5">
                        <div class="x items-center">
                            <template v-if="!hovering && lvl && review[key] !== null">
                                <Icon v-if="lvl[key] !== null && review[key] > lvl[key] + 0.5 || review[key] < lvl[key] - 0.5" name="arrow-up" scale="size-4" class="mr-0.5" :class="{'rotate-180': review[key] < lvl[key],'text-green-500': review[key] > lvl[key] + 2.5, 'text-red-500': review[key] < lvl[key] - 2.5}"/>
                                <Icon v-else-if="review[key] !== null && !lvl[key]" name="plus" scale="size-5" class="mr-0.5 invisible"/>
                                <span v-else class="font-bold text-lg px-1">&thickapprox;</span>
                            </template>
                            <span class="font-bold text-2xl">{{ displayRating(hovering ? lvl[key] : review[key], hovering ? 2 : 0) }}<span class="text-sm font-normal text-ui-700">/10{{ key === 'rating_difficulty' ? '0' : '' }}</span></span>
                        </div>
                        <span class="text-xs">{{ item }}</span>
                    </div>
                </div>
            </div>
            <div v-if="review.review" class="y items-center mt-2 bg-ui-800/90 rounded-lg w-full relative px-2 py-1">
                <div class="w-full" :class="{'max-h-48 overflow-hidden': !expanded, '[mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_25%,rgba(0,0,0,0.1)_85%,rgba(0,0,0,0)_100%);]': long && !expanded}">
                    <TipTap :key="review.id" ref="body" :editable="false" v-model="review.review"/>
                </div>
                <button v-if="long" @click="expanded = !expanded" class="py-1 z-20 bg-ui-600 px-2 rounded text-xs my-1" :class="{'absolute bottom-1 tracking-widest uppercase': !expanded}">read {{ expanded ? 'less' : 'more' }}...</button>
            </div>
            <div class="z-10 y sm:flex-row justify-between items-center w-full gap-2 mt-2">
                <div class="x space-x-2 items-center">
                    <template v-if="review.level">
                        <Avatar v-if="review.author" width="w-7" :user="review.author"/>
                        <div class="x items-center relative px-2 py-0.5 rounded-md bg-ui-800">
                            <div class="x space-x-2 items-center">
                                <Username  v-if="review.author" :user="review.author"/>
                                <Timestamp class="w-fit text-sm" :class="review.author ? 'text-ui-500' : 'text-ui-400'" :time="review.created_at"/>
                            </div>
                        </div>
                    </template>
                    <WeightBadge :weight="weight"/>
                </div>
                <div class="x gap-2 items-end">
                    <div v-if="0" class="x space-x-2 items-center bg-ui-800 px-2 py-1 rounded-md">
                        <span class="text-sm text-ui-500">Comments (0)</span>
                        <Icon class="text-ui-600" name="chat-bubble-oval-left"/>
                    </div>
                    <div v-if="0" class="x space-x-2 items-center bg-ui-800 px-2 py-1 rounded-md">
                        <Tooltip message="Like">
                            <Icon class="text-green-500" name="heart"/>
                        </Tooltip>
                        <Tooltip message="Bookmark">
                            <Icon class="text-ui-300" name="bookmark"/>
                        </Tooltip>
                    </div>
                    <div class="x space-x-2 items-center bg-ui-800 px-1.5 p-1 rounded-md">
                        <Dropdown align="top" container-classes="mb-8">
                            <template #trigger>
                                <Icon name="ellipsis-horizontal"/>
                            </template>
                            <template #content>
                                <Link class="block rounded-t px-2 py-1 hover:bg-ui-700" :href="route('reviews.show', review.id)">Permalink</Link>
                                <Lightbox v-if="isAuthenticated()">
                                    <div class="px-2 py-1 hover:bg-ui-700 last:rounded-b">Report This</div>
                                    <template #content>
                                        <ReportModal :reportable_id="review.id" :reportable_type="42" @click.stop class="cursor-auto"/>
                                    </template>
                                </Lightbox>
                                <Lightbox v-if="isUser(review.user_id)">
                                    <div class="px-2 py-1 hover:bg-ui-700 last:rounded-b">Edit Review</div>
                                    <template #content>
                                        <div @click.stop class="y items-center space-y-2 bg-ui-950 rounded-lg p-4 cursor-auto">
                                            <h2 class="text-2xl font-bold w-full">Edit Review</h2>
                                            <TipTap class="pane !p-0 border border-ui-700 grow" v-model="form.body"/>
                                            <button @click="submit" :disabled="form.processing" :class="{'opacity-50': form.processing}" class="bg-blue-500 rounded-md px-2 py-1">{{ form.processing ? 'Processing...' : 'Submit Edit' }}</button>
                                        </div>
                                    </template>
                                </Lightbox>
                                <Lightbox v-if="isUser(review.user_id)">
                                    <div class="px-2 py-1 hover:bg-ui-700 last:rounded-b">Edit Rating</div>
                                    <template #content>
                                        <div @click.stop class="y items-center space-y-2 bg-ui-950 rounded-lg p-4 cursor-auto">
                                            <h2 class="text-2xl font-bold w-full">Edit Rating</h2>
                                            <RatingInput :form="form" :optionals="optionals"/>
                                            <button @click="submit" :disabled="form.processing" :class="{'opacity-50': form.processing}" class="bg-blue-500 rounded-md px-2 py-1">{{ form.processing ? 'Processing...' : 'Submit Edit' }}</button>
                                        </div>
                                    </template>
                                </Lightbox>
                                <div v-if="isModerator() || isAdmin() || isUser(review.user_id)" @click="remove" class="text-red-500 hover:text-white hover:bg-red-500 last:rounded-b px-2 py-1">Delete</div>
                            </template>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
