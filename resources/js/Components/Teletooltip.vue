<script setup>
import {nextTick, onMounted, ref} from "vue";

const props = defineProps({
    message: [String,Number],
    caret: {
        type: Boolean,
        default: true
    }
})

onMounted(() => {
    nextTick(() => {
        position()
    })
})

const tooltip = ref()
const shadow = ref()
const base = ref()
const open = ref(false)

const position = (engage) => {
    //let pos = shadow.value.getBoundingClientRect()
    //tooltip.value.style.cssText = `transform: translate3d(${pos.x}px ,${pos.y}px ,0)`
    if (engage) {
        open.value = true;
    }
}

</script>
<template>
    <div @mouseout="open = false" @mouseenter="position(true)" ref="base" class="relative group">
        <div class="static">
            <slot/>
        </div>

        <div ref="shadow" class="z-100 absolute left-1/2 transition-[visibility] duration-0 " :class="open ? 'visible' : 'invisible'">
            <div class="absolute y items-center w-full pt-2 transition ease-out transform" :class="open ? ['opacity-100', 'duration-200', 'scale-100'] : ['duration-75', 'opacity-0', 'scale-95']">
                <template v-if="caret">
                    <div class="drop-shadow absolute border-[8px] border-t-0 top-0 border-transparent border-b-ui-700"></div>
                    <div class="z-10 absolute border-[8px] border-t-0 top-[1.5px] border-transparent border-b-ui-900"></div>
                </template>
                <div class="shadow-lg rounded bg-ui-900 border border-ui-700 rounded overflow-clip">
                    <div v-if="message" class="px-2">
                        <span class="text-center text-xs select-none whitespace-nowrap">{{ message }}</span>
                    </div>
                    <slot v-else name="content" />
                </div>
            </div>
        </div>

        <Teleport v-if="false" to="body">
            <div ref="tooltip" class="opacity-0 z-100 absolute top-0 left-0 transition-[visibility] duration-0 " :class="open ? 'visible' : 'invisible'">
                <div class="absolute y items-center w-full pt-2 transition ease-out transform" :class="open ? ['opacity-100', 'duration-200', 'scale-100'] : ['duration-75', 'opacity-0', 'scale-95']">
                    <div class="drop-shadow absolute border-[8px] border-t-0 top-0 border-transparent border-b-ui-700"></div>
                    <div class="z-10 absolute border-[8px] border-t-0 top-[1.5px] border-transparent border-b-ui-900"></div>
                    <div class="relative shadow-lg rounded bg-ui-900 border border-ui-700 rounded overflow-clip">
                        <span v-if="message" class="block text-center text-xs select-none px-2 py-1">{{ message.toString().replaceAll(' ', '&nbsp;') }}</span>
                        <slot v-else name="content" />
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>
