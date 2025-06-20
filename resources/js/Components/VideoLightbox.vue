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
        <img class="w-full aspect-video object-cover rounded glass" loading="lazy" :src="`https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg`" alt=""/>
        <template #content>
            <div class="y space-y-2">
                <div class="relative box !px-0 !py-0">
                    <iframe class="z-10 relative aspect-video h-[60vh]" :src="'https://www.youtube-nocookie.com/embed/' + video.video_id" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <span class="absolute top-1/2 w-full text-center text-ui-200 text-xl font-bold">Loading&nbsp;Video...</span>
                </div>
                <div class="x gap-2 justify-between text-ui-200">
                    <div class="x items-center space-x-2">
                        <Link @click.stop :href="route('levels.show', video.level_id)" class="box !py-1 !px-3">Level Page</Link>
                        <Lightbox @click.stop>
                            <div class="flex box !py-2 !px-2 hover:text-red-500"><Icon name="flag" class="size-4"/></div>
                            <template #content>
                                <ReportModal :reportable_id="video.id" :reportable_type="43" @click.stop class="cursor-auto"/>
                            </template>
                        </Lightbox>
                        <div v-if="isAdmin()" @click.stop="remove" class="box !py-2 !px-2 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-600"><Icon name="trash" class="size-4"/></div>
                    </div>
                    <a @click.stop :href="`https://youtube.com/watch?v=${video.video_id}`" target="_blank" class="x items-center space-x-1 box !py-1 !px-3">
                        <span>YouTube Video</span>
                        <Icon name="arrow-top-right-on-square" class="size-4"/>
                    </a>
                </div>
            </div>
        </template>
    </Lightbox>
</template>
