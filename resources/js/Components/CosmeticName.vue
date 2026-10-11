<script setup>
import {computed, ref} from "vue";

const props = defineProps({
    cosmetics: Object,
});

const style = computed(() => {
    let out = {
        classes: [],
        styleText: {},
        styleShadow: {},
    };

    for (let c of props.cosmetics) {
        if (c.type === 'name_color') {
            out.styleText['color'] = c.value;
        }

        if (c.type === 'glow_color') {
            out.styleShadow['--cosmetic-glow-color'] = c.value;
        }
    }

    console.log(out)

    return out;
});
</script>
<template>
    <span class="relative w-fit" :class="style.classes">
        <span class="relative z-20 cosmetic-text" :style="style.styleText"><slot/></span>
        <span class="absolute left-0 z-10 cosmetic-shadow" :style="style.styleShadow"><slot/></span>
        <span class="cosmetic-background"></span>
    </span>
</template>
