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
                <div class="x items-center">
                    <Checkbox :checked="optionals[key]" v-model="optionals[key]" class="mr-1.5"/>
                    <span class="grow capitalize">{{ key }}</span>
                </div>
                <span>{{ optionals[key] ? form['rating_' + key] : '-' }}<span class="opacity-50 text-xs">/10</span></span>
            </div>
            <input class="w-full" v-show="optionals[key]" :disabled="!optionals[key]" v-model.number="form['rating_' + key]" type="range" min="0" max="10" step="1"/>
        </template>
    </div>
</template>
