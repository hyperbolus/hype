<script setup>
const props = defineProps({
    message: [String,Number],
    caret: {
        type: Boolean,
        default: true
    },
    decoration: {
        type: Boolean,
        default: true
    },
    // TODO: Better positioning
    containerClass: {
        type: String,
        default: ''
    },
    inline: Boolean
})
// TODO: fix username inline bug
</script>
<template>
    <div ref="base" class="relative group" :class="{'inline': inline}">
        <div class="static" :class="{'inline': inline}">
            <slot/>
        </div>

        <div v-if="$slots.content || message" class="z-10 absolute bottom-full -left-1/2 transition-[visibility] duration-0 invisible group-hover:visible" :class="`${containerClass}`">
            <div class="y items-center w-full pb-2 transition ease-out transform duration-75 opacity-0 scale-95 group-hover:opacity-100 group-hover:duration-200 group-hover:scale-100">
                <div v-if="decoration" class="shadow-lg rounded py-1 px-2 bg-ui-1000">
                    <span v-if="message" class="text-center text-sm select-none whitespace-nowrap">{{ message }}</span>
                    <slot v-else name="content"/>
                </div>
                <slot v-else name="content"/>
                <template v-if="caret">
                    <div class="z-10 absolute border-[8px] border-b-0 -bottom-0 border-transparent border-t-ui-1000"></div>
                </template>
            </div>
        </div>
    </div>
</template>
