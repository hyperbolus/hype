<script setup>
import Tooltip from "@/Components/Tooltip.vue";
import Checkbox from "@/Jetstream/Checkbox.vue";

defineProps({
    form: Object,
    optionals: Object,
});
</script>
<template>
    <div class="y pane h-fit">
        <h1 class="text-lg font-bold">Scores</h1>
        <template v-for="(score, key) in optionals" :key="key">
            <div class="x items-center justify-between">
                <Tooltip v-if="key === 'overall'" message="Overall score is required">
                    <div class="x items-center">
                        <Checkbox :disabled="true" :checked="true" class="!bg-ui-700 cursor-not-allowed mr-1.5"/>
                        <span class="grow capitalize">{{ key }}</span>
                    </div>
                </Tooltip>
                <div v-else class="x items-center">
                    <Checkbox :checked="optionals[key]" v-model="optionals[key]" class="mr-1.5"/>
                    <span class="grow capitalize">{{ key }}</span>
                </div>
                <span>{{ form['rating_' + key] }}<span class="opacity-50 text-xs">/10</span></span>
            </div>
            <input class="w-full" v-show="optionals[key]" :disabled="!optionals[key]" v-model.number="form['rating_' + key]" type="range" min="0" max="10" step="1"/>
        </template>
    </div>
</template>
