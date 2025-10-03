<script setup>
// import {onBeforeUnmount, onMounted, ref} from "vue";
// import {Renderer, Level, Texture, Annotation} from 'graphalite'
//
// import ATLAS_1 from '@/../resources/GJ_GameSheet-uhd.png'
// import ATLAS_2 from '@/../resources/GJ_GameSheet02-uhd.png'
// import ATLAS_3 from '@/../resources/FireSheet_01-uhd.png'
//
// import P_ATLAS_1 from '@/../resources/GJ_GameSheet-uhd.plist?url'
// import P_ATLAS_2 from '@/../resources/GJ_GameSheet02-uhd.plist?url'
// import P_ATLAS_3 from '@/../resources/FireSheet_01-uhd.plist?url'
//
// import BG_1 from '@/../resources/game_bg_01_001-uhd.png'
//
// const props = defineProps({
//     decoration: {
//         type: Boolean,
//         default: true
//     },
//     levelData: String
// })
//
// let renderer;
//
// const canvas = ref(null);
// const container = ref(null);
// const overlay = ref(null);
//
// onMounted(async () => {
//     renderer = new Renderer({
//         canvas: canvas.value,
//         overlay: overlay.value,
//         container: container.value,
//         logging: 'none'
//     });
//
//     await Level.loadAtlas(renderer, ATLAS_1, P_ATLAS_1, 0);
//     await Level.loadAtlas(renderer, ATLAS_2, P_ATLAS_2, 1);
//     await Level.loadAtlas(renderer, ATLAS_3, P_ATLAS_3, 2);
//     renderer.bgs[1] = new Texture(renderer, BG_1);
//
//     await renderer.initialize();
//     renderer.loadLevel(props.levelData);
//
//     renderer.level.annotations = [
//         new Annotation(90, 90, 'This is a test. This renderer is currently very buggy so don\'t expect much to be accurate.')
//     ]
//
//     renderer.camera.x = 540;
//     renderer.camera.y = 120;
//
//     requestAnimationFrame(renderer.draw.bind(renderer))
// })
//
// const fullscreen = ref(false);
//
// onBeforeUnmount(() => {
//     //renderer.destroy()
// })
</script>
<template>
<!--    <div ref="container" id="renderer" class="y"  :class="decoration ? (fullscreen ? '!mt-0 z-[999] absolute inset-0 p-6 h-screen bg-black/50' : 'relative h-[24rem]') : 'relative grow'">-->
<!--        <div ref="overlay" class="z-10 absolute inset-0 overflow-hidden" id="overlay"></div>-->
<!--        <div class="z-20 y grow justify-between space-y-2 absolute inset-0 p-2" :class="{'inset-6': fullscreen}">-->
<!--            <slot/>-->
<!--        </div>-->
<!--        <canvas ref="canvas" class="absolute inset-0 w-full h-full" :class="{'border border-ui-700 rounded-lg bg-ui-900': decoration}" id="display"></canvas>-->
<!--    </div>-->
    <span>sorry chief</span>
</template>
<style>
.annotation {
    @apply absolute px-2 py-1 rounded border border-ui-700 bg-ui-900
}
</style>
