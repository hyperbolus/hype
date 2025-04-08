<script setup>
import {ref} from "vue";
import Icon from "@/Components/Icon.vue";

const props = defineProps({
    title: String,
    open: {
        default: false,
        type: Boolean
    },
});

const open = ref(props.open);
const content = ref();

const setZero = () => {
    content.value.style.height = '0';
}

const setHeight = () => {
    content.value.style.height = content.value.scrollHeight + 'px';
}
</script>
<template>
    <div class="pane">
        <div @click="open = !open" class="x select-none items-center justify-between font-bold text-2xl">
            <h2 class="font-bold text-2xl">{{ title }}</h2>
            <Icon class="w-6" :class="{'rotate-90': !open}" name="chevron-down"/>
        </div>
        <transition @before-enter="setZero" @leave="setZero" @before-leave="setHeight" @enter="setHeight" enter-active-class="overflow-hidden" leave-active-class="overflow-hidden">
            <div v-show="open" ref="content" class="transition-[height] duration-300">
                <slot/>
            </div>
        </transition>
    </div>
</template>
