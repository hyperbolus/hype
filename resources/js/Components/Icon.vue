<script setup>
import {onBeforeMount, onMounted, ref} from "vue";
import {icons} from '@iconify-json/heroicons/icons.json';

const props = defineProps({
    name: String,
    type: {
        type: String,
        default: 'solid'
    },
    size: {
        type: String,
        default: '20'
    },
    scale: {
        type: String,
        default: 'size-5'
    }
})

const DEFAULT = '<rect width="100%" height="100%" fill="#ff00ff"></rect><rect width="50%" height="50%" x="50%" fill="#000000"></rect><rect width="50%" height="50%" y="50%" fill="#000000"></rect>';

const t = ref((() => {
    let key = props.name;

    if (props.size !== '24') key += '-' + props.size;
    if (props.type !== 'outline') key += '-' + props.type;

    return icons[key]?.body ?? DEFAULT;
})())

// TODO: div center and also autodetect default css size based on icon size
</script>
<template>
    <div>
        <svg :class="scale" :viewBox="`0 0 ${size} ${size}`" fill="currentColor" v-html="t"></svg>
    </div>
</template>
