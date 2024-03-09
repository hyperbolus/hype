<script setup>
import Lightbox from "@/Components/Lightbox.vue";
import {ref} from "vue";
import Icon from "@/Components/Icon.vue";

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
        <div @click="scroll(scroller, true)" class="absolute z-10 left-2 drop-shadow cursor-pointer bg-ui-800 rounded-full">
            <Icon name="arrow-left-circle" type="outline" size="24" class="w-6"/>
        </div>
        <div ref="scroller" class="x w-full items-center space-x-2 snap-x overflow-x-hidden" :class="decorations" style="mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.8) 5%, rgba(0,0,0,0.8) 95%, transparent 100%)">
            <Lightbox v-for="(image, index) in images" :key="index" class="shrink-0" classes="max-h-40 object-fill" :image="image.url" :alt="image.caption"/>
            <slot/>
        </div>
        <div @click="scroll(scroller, false)" class="absolute z-10 right-2 drop-shadow cursor-pointer bg-ui-800 rounded-full">
            <Icon name="arrow-right-circle" type="outline" size="24" class="w-6"/>
        </div>
    </div>
</template>
