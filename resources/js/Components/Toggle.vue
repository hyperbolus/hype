<script setup>
import {computed} from "vue";

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    disabled: Boolean
})

const value = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

const toggle = () => {
    if (!props.disabled) {
        value.value = !value.value // lol???
    }
}
const emit = defineEmits(['update:modelValue'])
</script>
<template>
    <div class="relative" :class="{ 'opacity-50': disabled, 'cursor-pointer': !disabled }" @click="toggle">
      <label>
        <input type="checkbox" class="sr-only" v-model="value">
      </label>
      <div class="block w-9 h-5 rounded-full"  :class="value ? 'bg-green-400' : 'bg-ui-800'"></div>
      <div class="absolute shadow left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform" :class="value ? 'translate-x-full' : ''"></div>
    </div>
</template>
