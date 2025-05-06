<script setup>
const props = defineProps({
    max: {
        default: 200,
        type: Number,
        required: false
    },
    min: Number,
    placeholder: {
        default: 'Write something...',
        type: String
    }
});

const model = defineModel();
</script>
<template>
    <div class="y space-x-0.5">
        <textarea v-model="model" :placeholder="placeholder" :maxlength="max" class="resize-none resize-y w-full placeholder-ui-600 bg-ui-950 rounded-md border-none focus:ring-0 focus:outline-none"></textarea>
        <span v-if="max !== null" class="text-sm" :class="{'text-amber-500': model.length > max - (max * 0.15)}">{{ model.length }}/{{ max }}</span>
    </div>
</template>
