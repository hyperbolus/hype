<script setup>
import Pagination from "@/Components/Pagination.vue";
import Sorting from "@/Components/Sorting.vue";
import QueryFooter from "@/Components/QueryFooter.vue";

const props = defineProps({
    title: String,
    results: Object,
    sorting: Object,
    containerClasses: [String, Object],
    url: String,
    delay: {
        default: 40,
        type: Number
    }
});
</script>
<template>
    <div class="flex flex-col space-y-2 w-full">
        <div class="y md:flex-row gap-1 justify-between items-center">
            <h2 class="font-bold text-2xl">{{ title }}</h2>
            <Sorting v-if="sorting" :sorting="sorting" :url="url ?? $page.url"/>
        </div>
        <Pagination :list="results"/>
        <div v-if="results.data.length === 0 && results.total === 0" class="pane text-center italic text-ui-500">No Results</div>
        <div class="pane text-center italic text-ui-500" v-else-if="results.data.length === 0 && results.total > 0">"You just blow in from stupid town?"</div>
        <!-- TODO: add setting if user wants animation either in footer or as a global website setting -->
        <transition-group v-if="results.data.length > 0" enter-from-class="opacity-0 -translate-x-6" enter-to-class="opacity-100 translate-x-0" appear name="fade" tag="div" :class="containerClasses">
            <div v-for="(item, index) in results.data" :key="index" :style="`transition-delay: ${index * delay}ms;`">
                <slot :item="item" :index="index"/>
            </div>
        </transition-group>
        <QueryFooter :results="results" :sorting="sorting ?? null" :url="url" class="!mt-0.5"/>
        <Pagination :list="results"/>
    </div>
</template>
<style>
.fade-enter-active {
    transition: opacity 300ms ease-out, transform 300ms ease-out;
}
</style>
