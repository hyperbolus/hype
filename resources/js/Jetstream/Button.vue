<script setup>
defineProps({
    type: {
        type: String,
        default: 'submit',
    },
});
</script>

<template>
    <button :type="type" class="inline-flex select-none items-center px-4 py-2 bg-ui-700 border border-transparent rounded-md font-semibold text-xs text-ui-200 uppercase tracking-widest hover:bg-ui-600 active:bg-ui-900 focus:outline-none focus:border-ui-900 focus:ring focus:ring-ui-300 disabled:opacity-25 transition">
        <slot />
    </button>
</template>
