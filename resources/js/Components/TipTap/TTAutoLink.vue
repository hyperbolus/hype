<script setup>
import { MarkViewContent, markViewProps } from '@tiptap/vue-3'
import AutoLink from "@/Components/AutoLink.vue";

const props = defineProps(markViewProps);
</script>
<template>
    <AutoLink :to="props.HTMLAttributes.href" rel="noopener noreferrer nofollow">
        <mark-view-content/>
    </AutoLink>
</template>
