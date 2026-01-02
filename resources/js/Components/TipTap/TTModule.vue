<script setup>
import {nodeViewProps} from '@tiptap/vue-3';
import TTBadgeWrapper from "@/Components/TipTap/TTBadgeWrapper.vue";

const props = defineProps(nodeViewProps);

const inputAttr = (e) => {
    props.updateAttributes({[e.target.dataset.attr]: e.target.value});
    // Using the input loses the editor's focus so we need to manually force it back
    props.editor.commandManager.commands.setNodeSelection(props.getPos());
}

const inputs = {
    'module': 'The module\'s name',
    'subscript': 'Which module export to get',
    'args': 'Arguments to the function',
}
</script>
<template>
    <TTBadgeWrapper label="Module" icon="command-line" color="red" :node-props="props" tooltip-classes="y !py-1">
        <label v-for="(input, key) in inputs">
            <span class="capitalize">{{ key }}</span>
            <input v-model="props.HTMLAttributes[key]" :data-attr="key" @input="inputAttr"/>
            <span class="text-ui-500">{{ input }}</span>
        </label>
    </TTBadgeWrapper>
</template>
<style scoped>
label > span {
    @apply text-sm;
}

input {
    @apply px-2 py-1 text-sm border-none bg-ui-900 rounded;
}
</style>
