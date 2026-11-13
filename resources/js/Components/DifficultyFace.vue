<script setup>
import feature from '../../resources/sprites/feature.png';
import featureEpic from '../../resources/sprites/featureEpic.png';
import featureLegendary from '../../resources/sprites/featureLegendary.png';
import featureMythic from '../../resources/sprites/featureMythic.png';

import diff0 from '../../resources/sprites/diffIcon_00_btn_001.png';
import diff1 from '../../resources/sprites/diffIcon_auto_btn_001.png';
import diff2 from '../../resources/sprites/diffIcon_01_btn_001.png';
import diff3 from '../../resources/sprites/diffIcon_02_btn_001.png';
import diff4 from '../../resources/sprites/diffIcon_03_btn_001.png';
import diff5 from '../../resources/sprites/diffIcon_04_btn_001.png';
import diff6 from '../../resources/sprites/diffIcon_05_btn_001.png';
import diff7 from '../../resources/sprites/diffIcon_07_btn_001.png';
import diff8 from '../../resources/sprites/diffIcon_08_btn_001.png';
import diff9 from '../../resources/sprites/diffIcon_06_btn_001.png';
import diff10 from '../../resources/sprites/diffIcon_09_btn_001.png';
import diff11 from '../../resources/sprites/diffIcon_10_btn_001.png';
import {computed, ref} from "vue";

const props = defineProps({
    difficulty: Number,
    featured: {
        type: [Boolean, Number],
        default: false,
    },
    epic: {
        type: Number,
        default: 0,
    },
});

const face = computed(() => {
   return [
       diff0,
       diff1,
       diff2,
       diff3,
       diff4,
       diff5,
       diff6,
       diff7,
       diff8,
       diff9,
       diff10,
       diff11,
   ][props.difficulty] ?? null;
});

const coin = computed(() => {
    let coin = null;

    if (props.epic > 2) {
        coin = featureMythic;
    } else if (props.epic > 1) {
        coin = featureLegendary;
    } else if (props.epic > 0) {
        coin = featureEpic;
    } else if (props.featured) {
        coin = feature;
    }

    return coin;
});

const fitted = ref(false);

const faceSize = computed(() => {
    if (fitted.value) {
        return !props.featured && props.epic === 0 ? 'scale-[200%]' : 'scale-[150%]';
    } else {
        return 'scale-[200%]';
    }
});
</script>
<template>
    <div class="relative z-0">
        <img v-if="coin" alt="" :src="coin" :class="fitted ? 'scale-[150%]' : 'scale-[200%]'" class="z-0 absolute top-0"/>
        <img v-if="face" alt="" :src="face" :class="faceSize" class="z-10 relative"/>
        <div v-if="0" class="flex justify-center absolute bottom-0 w-full">
            <span class="z-20 text-xs rounded-full text-white px-2 py-0 bg-ui-1000 font-bold">10 &star;</span>
        </div>
    </div>
</template>
