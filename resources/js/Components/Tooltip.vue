<script setup>
const props = defineProps({
    message: [String,Number],
    caret: {
        type: Boolean,
        default: true
    }
})

</script>
<template>
    <div ref="base" class="relative group">
        <div class="static">
            <slot/>
        </div>

        <div v-if="$slots.content || message" class="absolute left-0 transition-[visibility] duration-0 invisible group-hover:visible">
            <div class="y items-center w-full pt-2 transition ease-out transform duration-75 opacity-0 scale-95 group-hover:opacity-100 group-hover:duration-200 group-hover:scale-100">
                <template v-if="caret">
                    <div class="drop-shadow absolute border-[8px] border-t-0 top-0 border-transparent border-b-neutral-300 dark:border-b-ui-700"></div>
                    <div class="z-10 absolute border-[8px] border-t-0 top-[1.5px] border-transparent border-b-neutral-100 dark:border-b-ui-900"></div>
                </template>
                <div class="shadow-lg box !py-0 !px-0">
                    <div v-if="message" class="px-2">
                        <span class="text-center text-xs select-none whitespace-nowrap">{{ message }}</span>
                    </div>
                    <slot v-else name="content"/>
                </div>
            </div>
        </div>
    </div>
</template>
