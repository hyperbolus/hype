<script setup>
import Lightbox from "@/Components/Lightbox.vue";
import {ref} from "vue";

const props = defineProps({
    images: Array,
    decorations: {
        type: String,
        default: 'pane !py-4'
    }
})

const scroller = ref(null)
const scroll = (el, left) => {
    el.scrollBy({left: (el.clientWidth - 100) * (left ? -1 : 1), behavior: 'smooth'})
}
</script>
<template>
    <div class="x items-center relative">
        <div @click="scroll(scroller, true)" class="absolute z-10 left-2 drop-shadow cursor-pointer bg-neutral-100 dark:bg-ui-800 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <div ref="scroller" class="x w-full items-center space-x-2 snap-x overflow-x-hidden" :class="decorations" style="mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.8) 5%, rgba(0,0,0,0.8) 95%, transparent 100%)">
            <Lightbox v-for="(image, index) in images" :key="index" class="shrink-0" classes="max-h-40 object-fill" :image="image.url" :alt="image.caption"/>
            <slot/>
        </div>
        <div @click="scroll(scroller, false)" class="absolute z-10 right-2 drop-shadow cursor-pointer bg-neutral-100 dark:bg-ui-800 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
    </div>
</template>
