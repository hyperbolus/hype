<script setup>
import {Link} from "@inertiajs/vue3";
import route from "ziggy-js";
import kitty from "@/../images/kitty.png"
import {cdn} from "@/util";
import {computed} from "vue";

const props = defineProps({
    user: Object,
    size: {
        type: String,
        default: 'size-8',
    },
    width: String,
    link: Boolean,
});

const image = computed(() => props.user.avatar_url ?? cdn('/api/avatar?name=' + props.user.name));
const href = computed(() => props.link ? route('users.show', props.user.id) : null);
</script>
<template>
    <component :is="link ? Link : 'span'" :href="href" class="relative inline-block bg-ui-700 rounded-full" :class="width ?? size">
        <img class="rounded-full" :src="image" alt=""/>
        <div v-if="0" class="absolute z-20 -inset-[20%] pointer-events-none">
            <img alt="" :src="kitty">
        </div>
    </component>
</template>
