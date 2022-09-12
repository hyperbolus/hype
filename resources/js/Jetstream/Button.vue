<script setup>
defineProps({
    type: {
        type: String,
        default: 'submit',
    },
});
</script>

<template>
    <button :type="type" class="inline-flex items-center px-4 py-2 bg-neutral-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-neutral-600 active:bg-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring focus:ring-neutral-300 disabled:opacity-25 transition">
        <slot />
    </button>
</template>
