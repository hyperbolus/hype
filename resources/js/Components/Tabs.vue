<script setup>
import {ref, useSlots} from "vue";

const currentTab = ref(0);

const slots = useSlots().default()

const props = defineProps({
    decorate: {
        type: Boolean,
        default: false
    }
});

const updateTab = (e) => {
    currentTab.value = e.target.value
}

</script>
<template>
    <div class="y gap-2">
        <div class="text-center pane !px-1 !py-3 select-none">
            <div class="x font-bold text-sm uppercase justify-around items-center relative">
                <template v-for="(tab, index) in slots">
                    <label class="z-10 grow" :class="{'cursor-pointer': parseInt(currentTab) !== index}" :for="`tab-${index}`">{{ slots[index].props['data-tab-name'] ?? 'Tab' }}</label>
                    <input @input="updateTab" class="hidden" :value="index" type="radio" :id="`tab-${index}`" name="tab"/>
                </template>
                <div class="z-0 bg-ui-1000 absolute glider left-0 rounded-lg py-2 transition-transform ease-out duration-200" :style="`width: calc(100% / ${slots.length}); transform: translateX(calc(100% * ${currentTab}));`">&nbsp;</div>
            </div>
        </div>
        <template v-for="(tab, index) in slots" :key="index">
            <component v-if="parseInt(currentTab) === index" :is="tab"/>
        </template>
    </div>
</template>
