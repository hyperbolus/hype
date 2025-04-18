<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
    align: {
        type: String,
        default: 'right',
    },
    width: {
        type: String,
        default: '48',
    },
    contentClasses: {
        type: [Array, String],
        default: () => [],
    },
    containerClasses: {
        type: [Array, String],
        default: () => ['mt-2'],
    },
});

const open = ref(false);
defineExpose({open})

const closeOnEscape = (e) => {
    if (open.value && e.key === 'Escape') {
        open.value = false;
    }
};

onMounted(() => document.addEventListener('keydown', closeOnEscape));
onUnmounted(() => document.removeEventListener('keydown', closeOnEscape));

const widthClass = computed(() => {
    return {
        '48': 'w-48',
        'full': 'w-full',
        'fit': 'w-fit'
    }[props.width.toString()];
});

const alignmentClasses = computed(() => {
    if (props.align === 'left') {
        return 'origin-top-left left-0';
    }

    if (props.align === 'right') {
        return 'origin-top-right right-0';
    }

    if (props.align === 'top') {
        return 'origin-bottom-right right-0 bottom-0';
    }

    return 'origin-top';
});
</script>

<template>
    <div class="relative select-none cursor-pointer">
        <div @click="open = ! open">
            <slot name="trigger" />
        </div>

        <!-- Full Screen Dropdown Overlay -->
        <div v-show="open" class="fixed inset-0 z-40" @click="open = false" />

        <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <div v-show="open" class="absolute z-50 rounded-md shadow-lg" :class="[widthClass, alignmentClasses, containerClasses]" style="display: none;" @click="open = false">
                <div class="dropdown rounded-md bg-ui-900 border border-ui-700" :class="contentClasses">
                    <slot name="content" />
                </div>
            </div>
        </transition>
    </div>
</template>
<style scoped>
.dropdown > * + * {
    @apply border-t border-t-ui-700;
}
</style>
