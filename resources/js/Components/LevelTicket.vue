<script setup>
import {Link, useForm} from "@inertiajs/vue3";
import {difficulty, face, isAdmin} from "@/util.js";
import LevelRatingStamp from "@/Components/LevelRatingStamp.vue";
import Tooltip from "@/Components/Tooltip.vue";
import route from "ziggy-js";
import {onClickOutside, onKeyStroke, useFileDialog} from "@vueuse/core";
import Icon from "@/Components/Icon.vue";
import {ref, useTemplateRef} from "vue";
import {isAuthenticated} from "@/util";

const props = defineProps({
    level: Object,
    showRatings: {
        type: Boolean,
        default: true
    },
    clickable: {
        type: Boolean,
        default: true,
    },
    contextMenu: {
        type: Boolean,
        default: true,
    },
    fadeType: {
        type: String,
        default: 'half'
    }
})

const banner = useForm({
    action: 'update banner',
    content: null
})

const { open: openBannerFile, onChange } = useFileDialog({
    accept: 'image/*',
    multiple: false,
    directory: false
})

onChange((files) => {
    if (files.length !== 1) return;

    banner.content = files[0];

    banner.post(route('levels.update', props.level), {
        errorBag: 'changeBanner',
    })
})

const context = ref(false);
const component = useTemplateRef('component');

onClickOutside(component, () => {
    context.value = false;
});

onKeyStroke('Escape', () => {
    context.value = false;
})
</script>
<template>
    <div ref="component" class="pane !px-0 !py-0 relative group/ticket hover:shadow-lg transition-shadow text-ui-300 delay-0">
        <div class="x relative items-center md:space-x-2 z-20">
            <div class="y w-full items-start relative z-0">
                <Link v-if="clickable" :href="route('levels.show', level.id)" class="z-0 absolute inset-0"></Link>
                <div class="x items-stretch relative z-10 [text-shadow:black_0_0_10px]">
                    <span class="y sm:hidden space-y-1 justify-center mx-3">
                        <span class="rounded-full p-[.15rem] px-2 bg-yellow-400" :class="{'invisible': level.stars === 0}"></span>
                        <span v-if="level.featured" class="rounded-full p-[.15rem] px-2 bg-amber-500"></span>
                        <span v-if="level.epic > 0" class="rounded-full p-[.15rem] px-2 bg-red-500"></span>
                        <span v-if="level.epic > 1" class="rounded-full p-[.15rem] px-2 bg-fuchsia-500"></span>
                        <span v-if="level.epic > 2" class="rounded-full p-[.15rem] px-2 bg-cyan-300"></span>
                    </span>
                    <Tooltip :message="difficulty(level)" class="sm:ml-3 mr-3 my-2 sm:flex place-items-center w-16 aspect-square shrink-0">
                        <img :src="face(level)" alt=""/>
                    </Tooltip>
                    <div class="y">
                        <component :is="clickable ? Link : 'div'" :href="route('levels.show', level.id)" class="x z-10 pt-2 items-center w-fit">
                            <Tooltip v-if="level.length === -1" message="Platformer Level">
                                <Icon name="moon" scale="size-4" class="mr-1 text-ui-500"/>
                            </Tooltip>
                            <Tooltip v-else message="Classic Level">
                                <Icon name="star" scale="size-4" class="mr-1 text-ui-500"/>
                            </Tooltip>
                            <h2 class="text-2xl font-bold">{{ level.name }}</h2>
                            <div class="hidden sm:flex items-center [text-shadow:black_0px_2px_2px]">
                                <div class="pl-2 pr-0.5 py-2 group">
                                    <div class="rounded-sm px-[.15rem] bg-yellow-400" :class="{'invisible': level.stars === 0}">
                                        <div class="w-0 transition-all overflow-hidden group-hover:w-20 text-center text-white text-xs uppercase [text-shadow:black_1px_1px_2px] text-black">Rated</div>
                                    </div>
                                </div>
                                <div class="px-0.5 last:!pr-12 py-2 group">
                                    <div class="rounded-sm px-[.15rem] bg-amber-500" :class="{'hidden': level.featured === 0}">
                                        <div class="w-0 transition-all overflow-hidden group-hover:w-20 text-center text-white text-xs uppercase">Featured</div>
                                    </div>
                                </div>
                                <div v-if="level.epic > 0" class="px-0.5 last:!pr-12 py-2 group">
                                    <div class="rounded-sm px-[.15rem] bg-red-500">
                                        <div class="w-0 transition-all overflow-hidden group-hover:w-20 text-center text-white text-xs uppercase">Epic</div>
                                    </div>
                                </div>
                                <div v-if="level.epic > 1" class="px-0.5 last:!pr-12 py-2 group">
                                    <div class="rounded-sm px-[.15rem] bg-fuchsia-500">
                                        <div class="w-0 transition-all overflow-hidden group-hover:w-20 text-center text-white text-xs uppercase">Legendary</div>
                                    </div>
                                </div>
                                <div v-if="level.epic > 2" class="px-0.5 last:!pr-12 py-2 group">
                                    <div class="rounded-sm px-[.15rem] bg-cyan-300">
                                        <div class="w-0 transition-all overflow-hidden group-hover:w-20 text-center text-white text-xs uppercase">Mythic</div>
                                    </div>
                                </div>
                            </div>
                        </component>
                        <p v-if="level.creator === '-'" class="text-lg">{{ level.creator }}</p>
                        <div v-else class="x">
                            <component :is="clickable ? Link : 'span'" class="text-lg w-fit" :href="route('profiles.show', level.creator)">{{ level.creator }}</component>
                            <Link v-if="clickable" :href="route('levels.show', level.id)" class="grow"></Link>
                        </div>
                    </div>
                </div>
                <LevelRatingStamp v-if="showRatings" :level="level"/>
            </div>
        </div>
        <div v-if="contextMenu && context" class="y absolute right-1 top-12 rounded-md border border-ui-700 bg-ui-800 z-50">
            <div v-if="isAuthenticated()" class="group/playlists relative">
                <button class="px-2 py-1 hover:bg-ui-900 text-left">Add to Playlist</button>
                <div class="flex-col absolute min-w-32 top-0 right-[95%] shadow-lg bg-ui-800 border border-ui-700 rounded-md hidden group-hover/playlists:flex whitespace-nowrap">
                    <button v-for="(pl, i) in $page.props.user.playlists" class="px-2 py-1 hover:bg-ui-900 text-left" :class="{'rounded-t-md': i === 0}">{{ pl.title }}</button>
                    <button class="x items-center px-2 py-1 text-left hover:bg-ui-900 rounded-b-md">
                        <Icon name="plus-circle" class="mr-1"/>
                        <span>New Playlist</span>
                    </button>
                </div>
            </div>
            <button @click="openBannerFile" v-if="isAdmin()" class="px-2 py-1 hover:bg-ui-900 text-left">Set Banner</button>
            <div class="border-t border-ui-700 mx-1"></div>
            <Link :href="route('levels.reviews.show', level.id)" class="px-2 py-1 hover:bg-ui-900 text-left">Reviews</Link>
            <Link :href="route('levels.replays.show', level.id)" class="px-2 py-1 hover:bg-ui-900 text-left">Macros</Link>
            <div class="border-t border-ui-700 mx-1"></div>
            <button @click="context = false" class="px-2 py-1 hover:bg-ui-900 text-red-500 text-left">Close</button>
        </div>
        <div v-if="contextMenu" @click="context = !context" class="absolute right-2 top-2 group-hover/ticket:block z-30 cursor-pointer p-2 bg-ui-1000/75 rounded-full" :class="{'hidden': !context}">
            <Icon name="ellipsis-horizontal"/>
        </div>
        <div class="absolute z-0 right-0 top-0 h-full w-full rounded-lg overflow-hidden" :class="{'full-fade': fadeType === 'full', 'half-fade': fadeType === 'half'}">
            <video v-if="level.preview_url" class="absolute top-1/2 w-full -translate-y-1/2 opacity-0 group-hover/ticket:opacity-100 transition-opacity z-10" :src="level.preview_url" muted autoplay loop></video>
            <img loading="lazy" class="absolute top-1/2 w-full -translate-y-1/2 -md:w-4/5 group-hover/ticket:scale-105 transition-transform" :src="level.banner_url ?? ('https://levelthumbs.prevter.me/thumbnail/' + level.id + '/small')" alt="">
        </div>
    </div>
</template>
<style>
.half-fade {
    mask-image: linear-gradient(to right, rgba(0,0,0,0.1) 25%, rgba(0,0,0,1) 60%);
}

.full-fade {
    mask-image: linear-gradient(to right, rgba(0,0,0,0.1) 25%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 55%, rgba(0,0,0,0.1) 80%);
}
</style>
