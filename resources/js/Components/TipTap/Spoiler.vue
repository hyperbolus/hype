<script setup>
import { MarkViewContent, markViewProps } from '@tiptap/vue-3'
import {ref} from "vue";

const props = defineProps(markViewProps);

const visible = ref(false);
</script>
<template>
    <span @click="visible = !visible" class="w-fit cursor-pointer relative rounded bg-ui-700 p-0.5">
        <span v-show="!visible" class="absolute inset-0 bg-ui-500 rounded"></span>
        <mark-view-content as="span" class="transition-[filter]"/>
    </span>
</template>
