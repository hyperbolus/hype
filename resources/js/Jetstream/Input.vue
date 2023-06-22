<script setup>
import { onMounted, ref } from 'vue';

defineProps({
    modelValue: String,
    prefix: String,
    type: String,
    pattern: String,
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
<!--    <div class="flex rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 focus-within:!border-blue-600 overflow-clip">-->
<!--        <span v-if="prefix" class="whitespace-nowrap select-none rounded-l pl-2 pr-1 py-1 bg-neutral-200 dark:bg-neutral-800 text-neutral-500 border-r border-r-neutral-300 dark:border-r-neutral-700">{{ prefix }}</span>-->
<!--        <input-->
<!--            ref="input" :pattern="pattern" :type="type" :placeholder="placeholder"-->
<!--            class="pr-2 py-1 w-full placeholder-neutral-400 dark:placeholder-neutral-600 bg-transparent border-none focus:ring-0 focus:outline-none rounded-r shadow-sm" :class="{'rounded': !prefix, 'pl-1': prefix}"-->
<!--            :value="modelValue"-->
<!--            @input="$emit('update:modelValue', $event.target.value)"-->
<!--        >-->
<!--    </div>-->

    <div class="flex rounded bg-ui-950/50 overflow-clip">
        <span v-if="prefix" class="whitespace-nowrap select-none rounded-l pl-2 pr-1 py-1 bg-ui-800 text-ui-500 border-r border-r-ui-700">{{ prefix }}</span>
        <input
            ref="input" :pattern="pattern" :type="type" :placeholder="placeholder"
            class="pr-2 py-1 w-full placeholder-ui-500 bg-transparent border-none focus:ring-0 focus:outline-none rounded-r shadow-sm" :class="{'rounded': !prefix, 'pl-1': prefix}"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        >
    </div>
</template>
