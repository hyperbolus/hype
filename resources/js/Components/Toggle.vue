<script setup>
import {defineModel} from "vue";
import Icon from "@/Components/Icon.vue";

const props = defineProps({
    modelValue: {
        type: Boolean,
    },
    disabled: Boolean
})

const model = defineModel();

const toggle = () => {
    if (!props.disabled) {
        model.value = !model.value;
    }
}

</script>
<template>
    <div class="relative" :class="disabled ? 'opacity-50' : 'cursor-pointer'" @click="toggle">
      <label>
        <input type="checkbox" class="sr-only" v-model="model">
      </label>
      <div class="rounded-full p-1 transition-colors"  :class="model ? 'bg-green-500 text-green-500' : 'bg-ui-600 text-ui-600'">
          <div class="shadow size-5 rounded-full transition-[margin] bg-white" :class="model ? 'ml-5' : 'mr-5'">
              <Icon v-show="model" name="check" size="16"/>
              <Icon v-show="!model" name="x-mark" size="16"/>
          </div>
      </div>
    </div>
</template>
