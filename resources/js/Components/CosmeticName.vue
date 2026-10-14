<script setup>
import {computed} from "vue";

const props = defineProps({
    cosmetics: {
        type: Object,
        default: {},
    },
    banned: Boolean,
    premium: {
        type: Boolean,
        default: false,
    },
});

const style = computed(() => {
    let out = {
        classes: {},
        style: {},
    };

    if (!props.cosmetics) return {};

    for (let slot in props.cosmetics) {
        let c = props.cosmetics[slot];

        if (c.premium && !props.premium) continue;

        if (c.slot === 'name_color') {
            out.style['--cosmetic-text-color'] = c.value;
        }

        if (c.slot === 'glow_color') {
            out.style['--cosmetic-glow-color'] = c.value;
            out.classes['font-bold'] = true;
        }

        if (c.slot === 'sparkle_color') {
            out.classes['cosmetic-sparkle'] = true;
            out.style['--cosmetic-sparkle-color'] = c.value;
        }
    }

    return out;
});
</script>
<template>
    <span class="relative w-fit cosmetic-name" :class="style.classes" :style="style.style">
        <span class="relative z-20 cosmetic-text" :class="{'line-through': banned}"><slot/></span>
        <span class="absolute left-0 z-10 cosmetic-shadow"><slot/></span>
        <span class="cosmetic-background"></span>
    </span>
</template>
