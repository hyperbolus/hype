<script setup>
import Dash from "@/Layouts/Dash.vue";
import {onMounted, ref} from "vue";

const props = defineProps({
    level_info: Object
})

/**
 * @type {Ref<HTMLCanvasElement>}
 */
const canvas = ref(null);
const ctx = ref(null);
onMounted(() => {
    canvas.value.removeAttribute('style');
})
</script>
<template>
    <Dash :fullwidth="true" :decorations="false">
        <div class="relative w-full grow bg-ui-1000/75">
            <canvas class="absolute inset-0 z-30 h-full w-full bg-blue-500" ref="canvas" style="display: none;"></canvas>
            <div class="y z-20 space-y-6 p-8 items-center justify-center absolute inset-0">
                <div class="pane font-bold uppercase tracking-widest font-mono text-5xl">Loading</div>
                <div class="bg-ui-800 w-full max-w-7xl text-center font-bold text-lg rounded-full w-full">
                    <div class="text-center font-bold text-lg p-1 rounded-full bg-blue-500" :style="`width: 20%;`"></div>
                </div>
                <span>Loading textures (2/17)</span>
            </div>
            <div class="z-10 absolute animate-pulse inset-0 bg-ui-1000"></div>
        </div>
    </Dash>
</template>
