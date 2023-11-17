<script setup>
import Lightbox from "@/Components/Lightbox.vue";
import {Link} from "@inertiajs/vue3";

const props = defineProps({
   video: Object
});
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
                    <Link @click.stop :href="route('levels.show', video.level_id)" class="box !py-1 !px-3">Level Page</Link>
                    <a @click.stop :href="`https://youtube.com/watch?v=${video.video_id}`" target="_blank" class="x items-center space-x-1 box !py-1 !px-3">
                        <span>YouTube Video</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                            <path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clip-rule="evenodd" />
                            <path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clip-rule="evenodd" />
                        </svg>
                    </a>
                </div>
            </div>
        </template>
    </Lightbox>
</template>
