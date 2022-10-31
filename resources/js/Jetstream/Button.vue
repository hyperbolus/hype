<script setup>
defineProps({
    type: {
        type: String,
        default: 'submit',
    },
});
</script>

<template>
    <button :type="type" class="inline-flex select-none items-center px-4 py-2 bg-neutral-200 dark:bg-neutral-700 border border-transparent rounded-md font-semibold text-xs text-neutral-700 dark:text-neutral-200 uppercase tracking-widest hover:bg-neutral-300 dark:hover:bg-neutral-600 active:bg-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring focus:ring-neutral-300 disabled:opacity-25 transition">
        <slot />
    </button>
</template>
