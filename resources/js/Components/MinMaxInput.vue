<script setup>
import {computed, ref} from "vue";

const props = defineProps({
    min: Number,
    max: Number,
    step: Number,
    disabled: Boolean,
    low: Number,
    high: Number
});

const emit = defineEmits(['update:low', 'update:high', 'commit'])
const a = ref(props.low);
const b = ref(props.high);
const minV = computed(() => Math.min(a.value, b.value));
const maxV = computed(() => Math.max(a.value, b.value));

const update = () => {
    emit('update:low', minV.value);
    emit('update:high', maxV.value);
}

const commit = () => {
    emit('commit');
}
</script>
<template>
    <div class="y space-y-1 w-full">
        <div class="x text-sm justify-between space-x-2 text-ui-500">
            <span>{{ minV }}</span>
            <span>{{ maxV }}</span>
        </div>
        <div class="relative w-full pb-2">
            <!-- TODO: grab the blue bar to drag both of the knobs around maybe -->
            <input @keyup.enter="commit" @mouseup="commit" @touchend="commit" v-if="!disabled" class="w-full z-20 absolute h-1 bg-transparent appearance-none pointer-events-none" v-model="a" @input="update" :step="step" :min="min" :max="max" type="range" :disabled="disabled"/>
            <input @keyup.enter="commit" @mouseup="commit" @touchend="commit" v-if="!disabled" class="w-full z-20 absolute h-1 bg-transparent appearance-none pointer-events-none" v-model="b" @input="update" :step="step" :min="min" :max="max" type="range"  :disabled="disabled"/>
            <div class="z-10 relative rounded-full bg-ui-950 px-2 overflow-hidden">
                <div class="p-0.5 bg-blue-500 rounded-full" :class="{'invisible': disabled}" :style="`width:${(maxV - minV) / (max - min) * 100}%;margin-left:${(minV - min) / (max - min) * 100}%;`"></div>
            </div>
        </div>
    </div>
</template>
<style scoped>
input[type=range]::-moz-range-thumb {
    @apply bg-ui-700 border-none cursor-pointer pointer-events-auto
}

input[type=range]::-webkit-slider-thumb {
    @apply bg-ui-700 border-none cursor-pointer pointer-events-auto appearance-none p-1 w-4 h-4 rounded-full
}
</style>
