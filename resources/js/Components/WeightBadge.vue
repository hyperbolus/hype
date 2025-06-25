<script setup>
import Tooltip from "@/Components/Tooltip.vue";
import Icon from "@/Components/Icon.vue";

const props = defineProps({
    weight: Number
});
</script>
<template>
    <Tooltip v-if="weight !== 1" :message="`This review is ${weight < 1 ? (weight === 0 ? 'fully': 'partially') : ''} ${weight < 1 ? 'de' : ''}weighted`" class="px-1 py-0.5 rounded-md bg-ui-800">
        <Icon name="scale" class="w-5" :class="{'text-red-500': weight === 0, 'text-amber-500': weight > 0 && weight < 1, 'text-green-500': weight > 1}"/>
    </Tooltip>
</template>
