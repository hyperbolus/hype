<script setup>
import { MarkViewContent, markViewProps } from '@tiptap/vue-3'
import {ref} from "vue";

const props = defineProps(markViewProps);

const visible = ref(false);
</script>
<template>
    <span @click="visible = !visible" class="w-fit cursor-pointer relative rounded bg-ui-700 p-0.5">
        <mark-view-content as="span" class="rounded select-none" :class="{'text-transparent bg-ui-500': !visible}"/>
    </span>
</template>
