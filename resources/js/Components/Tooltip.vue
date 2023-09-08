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
    position: {
        type: String,
        default: 'top'
    },
    offset: {
        type: String,
        default: 'center'
    },
    inline: Boolean
})

const positioning = () => {
    let style = '';
    switch (props.position) {
        case 'top':
            style = 'bottom-full left-[50%] translate-x-[-50%]';
            break;
        case 'bottom':
            style = 'top-full left-[50%] translate-x-[-50%]';
            break;
        case 'left':
            style = 'right-full top-[50%] translate-y-[-50%]';
            break;
        case 'right':
            style = 'left-full top-[50%] translate-y-[-50%]';
            break;
    }

    return style;
}
// TODO: fix username inline bug
</script>
<template>
    <div ref="base" class="relative group/tooltip" :class="{'inline': inline}">
        <div class="static" :class="{'inline': inline}">
            <slot/>
        </div>

        <div v-if="$slots.content || message" class="z-10 font-normal h-fit absolute p-1 transition-[visibility] duration-0 invisible group-hover/tooltip:visible" :class="`${containerClass} ${positioning()}`">
            <div class="y items-center justify-center w-full p-2 transition ease-out transform duration-75 opacity-0 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:duration-200 group-hover/tooltip:scale-100">
                <div v-if="decoration" class="translate-x-[0%] shadow-lg rounded py-1 px-2 bg-ui-1000">
                    <span v-if="message" class="text-center text-sm select-none whitespace-nowrap">{{ message }}</span>
                    <slot v-else name="content"/>
                </div>
                <slot v-else name="content"/>
                <template v-if="caret">
                    <div v-if="position === 'top'" class="z-10 absolute border-[8px] border-b-0 -bottom-0 border-transparent border-t-ui-1000"></div>
                    <div v-if="position === 'bottom'" class="z-10 absolute border-[8px] border-t-0 -top-0 border-transparent border-b-ui-1000"></div>
                    <div v-if="position === 'right'" class="z-10 absolute border-[8px] border-l-0 -left-0 border-transparent border-r-ui-1000"></div>
                    <div v-if="position === 'left'" class="z-10 absolute border-[8px] border-r-0 -right-0 border-transparent border-l-ui-1000"></div>
                </template>
            </div>
        </div>
    </div>
</template>
