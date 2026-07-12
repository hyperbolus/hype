<script setup>
import Lightbox from "@/Components/Lightbox.vue";
import {Link, useForm} from "@inertiajs/vue3";
import Icon from "@/Components/Icon.vue";
import route from "ziggy-js";
import {isAdmin} from "@/util.js";
import ReportModal from "@/Components/ReportModal.vue";

const props = defineProps({
   video: Object
});

const deleteVideo = useForm({});

const remove = () => {
    deleteVideo.delete(route('videos.destroy', props.video.id), {
        preserveScroll: true
    })
}
</script>
<template>
    <Lightbox class="w-full">
        <div class="rounded-lg overflow-hidden">
            <img class="w-full aspect-video object-cover hover:scale-105 transition-transform duration-100" loading="lazy" :src="`https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg`" alt=""/>
        </div>
        <template #content>
            <div class="y space-y-2">
                <div class="relative shadow bg-ui-900/50 backdrop-blur-lg border border-ui-700 rounded-lg h-[60vh] aspect-video">
                    <iframe class="z-10 relative w-full h-full rounded-lg" referrerpolicy="strict-origin-when-cross-origin" :src="'https://www.youtube-nocookie.com/embed/' + video.video_id" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <img class="absolute inset-0 blur-xl h-full w-full opacity-75 object-cover [mask-image:linear-gradient(to_top,rgba(0,0,0,0.1)_0%,rgba(0,0,0,1)_100%);]" loading="lazy" :src="`https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg`" alt=""/>
                    <span class="absolute top-1/2 w-full text-center text-ui-200 text-xl font-bold">Loading&nbsp;Video...</span>
                </div>
                <div class="x gap-2 justify-between text-ui-200">
                    <div class="x items-center space-x-2">
                        <Link @click.stop :href="route('levels.show', video.level_id)" class="box !py-1 !px-3">Level Page</Link>
                        <Lightbox @click.stop>
                            <div class="flex box !py-2 !px-2 hover:text-red-500"><Icon name="flag" scale="size-4"/></div>
                            <template #content>
                                <ReportModal :reportable_id="video.id" :reportable_type="43" @click.stop class="cursor-auto"/>
                            </template>
                        </Lightbox>
                        <div v-if="isAdmin()" @click.stop="remove" class="box !py-2 !px-2 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-600"><Icon name="trash" scale="size-4"/></div>
                    </div>
                    <a @click.stop :href="`https://youtube.com/watch?v=${video.video_id}`" target="_blank" class="x items-center space-x-1 box !py-1 !px-3">
                        <span>YouTube Video</span>
                        <Icon name="arrow-top-right-on-square" scale="size-4"/>
                    </a>
                </div>
            </div>
        </template>
    </Lightbox>
</template>
