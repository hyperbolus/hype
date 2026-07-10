<script setup>
import route from "ziggy-js";
import {Link} from "@inertiajs/vue3";
import Icon from "@/Components/Icon.vue";
import {face} from "@/util";

const props = defineProps({
    level: Object,
    link: {
        type: Boolean,
        default: false,
    }
});

const format = Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 1
});

const tiny = n => format.format(n);
</script>
<template>
    <component :is="link ? Link : 'div'" :href="link ? route('levels.show', level.id) : null" class="x space-x-2 items-center px-2 py-1 hover:bg-ui-800 cursor-pointer">
        <img class="w-12" alt="Difficulty" :src="face(level)"/>
        <div class="y leading-tight grow">
            <h1 class="font-bold">{{ level.name }}</h1>
            <h2 class="text-xs text-ui-500">{{ level.creator }}</h2>
            <div class="text-xs text-ui-400 x items-center space-x-1">
                <Icon scale="size-3" name="eye"/>
                <div class="mr-4">{{ tiny(level.downloads) }}</div>
                <Icon scale="size-3" name="hand-thumb-up" :class="{'rotate-180': level.likes < 0}"/>
                <div>{{ tiny(level.likes) }}</div>
            </div>
        </div>
        <slot name="side"/>
    </component>
</template>
<style scoped>

</style>
