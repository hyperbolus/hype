<script setup>
import Tooltip from "@/Components/Tooltip.vue";

const props = defineProps({
    curve: Object
});
</script>
<template>
    <div class="y pane !pl-2">
        <h1 class="px-2">Rating Curve</h1>
        <div class="flex flex-col-reverse">
            <Tooltip v-for="(count, score) in curve" position="left" :message="`${count} Ratings`">
                <div class="x items-center">
                    <span class="text-sm text-ui-500 w-5 mr-2 text-center">{{ score }}</span>
                    <div class="bg-ui-800 rounded overflow-hidden grow">
                        <div class="bg-blue-500 p-0.5" :class="{'invisible': count === 0}" :style="`width: ${count / Math.max(...curve) * 100}%;`"></div>
                    </div>
                </div>
            </Tooltip>
        </div>
    </div>
</template>
