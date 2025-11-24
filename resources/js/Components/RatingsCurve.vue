<script setup>
import {Link} from '@inertiajs/vue3'
import route from "ziggy-js";
import Tooltip from "@/Components/Tooltip.vue";
import {computed, ref} from "vue";
import Dropdown from "@/Jetstream/Dropdown.vue";
import Icon from "@/Components/Icon.vue";

const props = defineProps({
    model: Object,
    curve: Object,
    type: String,
});

const url = (score) => {
    let url = null;

    if (props.type === 'user') {
        url = route('users.reviews', props.model.id)
    } else {
        console.log(url);
        return url;
    }

    return `${url}?overall=${score}-${score}`
}

const color = (column) => {
    switch (column) {
        case 'rating_overall': return 'bg-blue-500';
        case 'rating_visuals': return 'bg-green-500';
        case 'rating_gameplay': return 'bg-yellow-500';
        case 'rating_difficulty': return 'bg-red-500';
    }
}

const sum = array => array.reduceRight((s, n) => s + n, 0);
const format = string => string.split('_').pop();

const current = ref('rating_overall');

const title = computed(() => format(current.value))
const total = computed(() => Object.values(props.curve).reduceRight((s, n) => Math.max(s, sum(n)), 0))
</script>
<template>
    <div class="y space-y-2 pane !pl-2">
        <div class="x items-center pr-2 space-x-1.5">
            <Dropdown align="left">
                <template #trigger>
                    <div class="x items-center space-x-1 bg-ui-800 rounded-md pl-1 pr-2 py-1 text-sm cursor-pointer">
                        <Icon class="w-4" name="chevron-down"/>
                        <span class="capitalize">{{ title }}</span>
                    </div>
                </template>
                <template #content>
                    <div class="y bg-ui-800 overflow-hidden rounded-md">
                        <span v-for="(strata, column) in curve" @click="current = column" class="px-2 py-0.5 capitalize hover:bg-ui-900">{{ format(column) }}</span>
                    </div>
                </template>
            </Dropdown>
            <h1>Rating Curve</h1>
        </div>
        <div class="relative">
            <div v-for="(strata, column) in curve" class="flex flex-col-reverse" :class="{'!hidden': column !== current}">
                <div class="x items-center justify-between text-sm px-1">
                    <span class="text-ui-500">Total</span>
                    <span class="overflow-hidden">{{ total }} Ratings</span>
                </div>
                <div class="x items-center justify-between text-sm px-1">
                    <span class="text-ui-500 capitalize">{{ title }}</span>
                    <span class="overflow-hidden">{{ sum(curve[current]) }} Ratings</span>
                </div>
                <div class="border-b border-ui-700 mt-1 mb-1.5"></div>
                <template v-for="(count, score) in strata">
                    <component :is="url(score) ? Link : 'div'" :href="url(score)" class="x items-center text-sm group">
                        <span class="text-ui-500 w-5 mr-2 text-center">{{ score }}</span>
                        <div class="x items-center w-full">
                            <div class="bg-ui-800 rounded overflow-hidden grow">
                                <div class="p-0.5" :class="{'invisible': count === 0, [color(column)]: 1}" :style="`width: ${count / Math.max(...strata) * 100}%;`"></div>
                            </div>
                            <!-- TODO: make it so bar does not change and is proportionally correct instead of shrinking and being inaccurate -->
                            <div class="max-w-0 group-hover:max-w-[10rem] group-hover:px-2 transition-all duration-300 ease-out overflow-hidden">{{ count }}&nbsp;Ratings</div>
                        </div>
                    </component>
                </template>
            </div>
        </div>
        <Tooltip v-if="model?.hasOwnProperty('weight') && model.weight === 0" class="text-center" message="This user's ratings do not affect site-wide level averages">
            <p class="rounded bg-red-500 text-white text-sm font-bold px-1">DEWEIGHTED</p>
        </Tooltip>
    </div>
</template>
<style scoped>
select {
    appearance: none;
}
</style>
