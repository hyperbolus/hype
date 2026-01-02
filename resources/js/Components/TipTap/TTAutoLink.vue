<script setup>
import { MarkViewContent, markViewProps } from '@tiptap/vue-3'
import AutoLink from "@/Components/AutoLink.vue";
import {computed, ref, toRaw} from "vue";
import Icon from "@/Components/Icon.vue";
import {useClipboard} from "@vueuse/core";

const props = defineProps(markViewProps);
const editing = ref(props.editor?.options?.editable);

const href = ref(props.HTMLAttributes.href)
const { copy, copied } = useClipboard({ source: href, legacy: true })

const active = computed(() => {
    if (!editing.value) return false;

    const self = toRaw(props.mark);

    for (let mark of props.editor.reactiveState.value.selection.$anchor.marks()) {
        if (self === mark) return true;
    }

    return false;
})
</script>
<template>
    <AutoLink class="relative" :to="editing ? null : href" rel="noopener noreferrer nofollow">
        <span><mark-view-content/></span>
        <div v-if="active" contenteditable="false" class="absolute top-[105%] left-1/2 -translate-x-1/2 pt-2">
            <div class="x items-center space-x-2 text-ui-200 rounded-md bg-ui-1000 pl-1 pr-2 py-1 z-10 relative">
                <input :value="href" @input="e => props.updateAttributes({href: e.target.value})" class="px-2 py-1 text-sm border-none bg-ui-900 rounded"/>
                <Icon @click="copy()" :class="copied ? 'text-green-500' : ''" name="document-duplicate"/>
                <a :href="href" target="_blank"><Icon class="text-ui-200" name="arrow-top-right-on-square"/></a>
<!--                <Icon name="link-slash"/>-->
            </div>
            <div class="absolute border-8 bottom-full -mb-4 left-1/2 -translate-x-1/2 rotate-45 border-ui-1000"></div>
        </div>
    </AutoLink>
</template>
