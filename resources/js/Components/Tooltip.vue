<script setup>
const props = defineProps({
    message: String
});
</script>

<template>
    <div class="group relative">
        <div>
            <slot/>
        </div>

        <div class="relative transition-[visibility] duration-0 invisible group-hover:visible">
            <div class="absolute y items-center w-full pt-2 transition duration-75 group-hover:duration-200 ease-out transform opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100">
                <div class="drop-shadow absolute border-[10px] border-t-0 -top-[1px] border-transparent border-b-neutral-300 dark:border-b-neutral-700"></div>
                <div class="z-20 absolute border-[10px] border-t-0 top-[0.5px] border-transparent border-b-neutral-100 dark:border-b-neutral-900"></div>
                <div class="z-10 shadow-lg rounded bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700">
                    <span v-if="message" class="text-center text-xs select-none px-2">{{ message.replaceAll(' ', '&nbsp;') }}</span>
                    <slot v-else name="content" />
                </div>
            </div>
        </div>
    </div>
</template>
