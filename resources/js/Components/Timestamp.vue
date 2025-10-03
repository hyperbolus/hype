<script setup>
import Tooltip from "@/Components/Tooltip.vue";
import {onBeforeMount, ref} from "vue";
import {useTimeAgo} from "@vueuse/core";

const props = defineProps({
    time: [String, Number],
    length: Boolean,
    position: String
})

const timeLength = (seconds) => {
    if (!seconds) {
        return 'none'
    }

    let time = ''
    const years = Math.floor(seconds / 22896000) // 60 * 60 * 24  * 265
    seconds -= years * 22896000;
    const months = Math.floor(seconds / 2592000) // 60 * 60 * 24 * 30
    seconds -= months * 2592000;
    const days = Math.floor(seconds / 86400) // 60 * 60 * 24
    seconds -= days * 86400;
    const hours = Math.floor(seconds / 3600) // 60 * 60
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60)

    if (years > 0) {
        time += years + ' year' + (years > 1 ? 's' : '') + ', '
    }

    if (months > 0) {
        time += months + ' month' + (months > 1 ? 's' : '') + ', '
    }

    if (days > 0) {
        time += days + ' day' + (days > 1 ? 's' : '')
    }

    if (hours > 0 && years === 0) {
        if (days > 0) {
            time += ', '
        }
        time += hours + ' hour' + (hours > 1 ? 's' : '')
    }

    if (minutes > 0 && months === 0) {
        if (days > 0 || hours > 0) {
            time += ', '
        }
        time += minutes + ' minute' + (minutes > 1 ? 's' : '')
    }

    return time;
}
</script>
<template>
    <Tooltip :position="position" class="select-none inline-block" container-class="text-ui-400" :message="length ? `${time}s` : new Date(time).toLocaleString()">{{ length ? timeLength(time) : useTimeAgo(time) }}</Tooltip>
</template>
