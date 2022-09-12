<script setup>
import { onMounted, ref } from 'vue';

defineProps({
    modelValue: String,
    prefix: String,
    type: String,
    placeholder: String,
});

defineEmits(['update:modelValue']);

const input = ref(null);

onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});

defineExpose({ focus: () => input.value.focus() });
</script>

<template>
    <div class="flex bg-neutral-800 rounded">
        <span class="whitespace-nowrap select-none rounded-l pl-2 py-1 text-neutral-500 bg-neutral-800 border-neutral-600">{{ prefix }}</span>
        <input
            ref="input" :type="type" :placeholder="placeholder"
            class="pr-2 py-1 w-full text-neutral-300 bg-neutral-800 focus:ring-0 focus:outline-none rounded-r shadow-sm"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        >
    </div>
</template>
