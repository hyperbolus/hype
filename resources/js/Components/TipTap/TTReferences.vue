<script setup>
import {nodeViewProps, NodeViewWrapper} from "@tiptap/vue-3";
import {computed, ref} from "vue";

const props = defineProps(nodeViewProps);
const editing = ref(props.editor?.options?.editable);

const footnotes = computed(() => props.editor.reactiveExtensionStorage.value.footnote.footnotes);
</script>
<template>
    <NodeViewWrapper contenteditable="false" :class="{'border border-ui-700 px-2 py-1 rounded': editing}">
        <h1>{{ props.HTMLAttributes.title ?? 'Notes' }}</h1>
        <ol>
            <li v-for="(note, name) in footnotes[props.HTMLAttributes.group]">{{ name }} // {{ note.content }} <a :href="`#fn:${note.id + 1}`">^{{ note.id + 1 }}</a></li>
        </ol>
    </NodeViewWrapper>
</template>
