<script setup>
import {onMounted, ref} from "vue";

const props = defineProps({
    name: String,
    type: {
        type: String,
        default: 'solid'
    },
    size: {
        type: String,
        default: '20'
    }
})

const icons = import.meta.glob(`./../../images/icons/**/*.svg`, {as: 'raw'});

const t = ref('')

onMounted(async () => {
    t.value = await icons[`../../images/icons/${props.size}/${props.type}/${props.name}.svg`]();
})
</script>
<template>
    <div class="icon-container" v-html="t"></div>
</template>
<style>
    .icon-container > svg {
        @apply shrink-0;
    }
</style>
