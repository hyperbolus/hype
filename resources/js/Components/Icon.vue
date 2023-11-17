<script setup>
import {onMounted, ref} from "vue";

const props = defineProps({
    name: String,
    type: String,
    size: String
})

const icons = import.meta.glob(`./../../images/icons/**/*.svg`, {as: 'raw'});

const t = ref('')

onMounted(async () => {
    t.value = await icons[`../../images/icons/${props.size}/${props.type}/${props.name}.svg`]();
})
</script>
<template>
    <div v-html="t"></div>
</template>
