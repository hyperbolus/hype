<script setup>
import {usePage} from "@inertiajs/vue3";
import {computed} from "vue";

const props = defineProps({
    bag: {
        type: String,
        default: null
    }
})

const errors = computed(() => props.bag === null ? usePage().props.errors : usePage().props.errors[props.bag.value])
const hasErrors = computed(() => props.bag === null ? Object.keys(errors).length > 0 : usePage().props.errors.hasOwnProperty(props.bag));
</script>
<template>
    <ul v-if="hasErrors" class="mt-1 list-disc list-inside text-sm text-red-600">
        <li v-for="(error, key) in errors" :key="key">{{ error }}</li>
    </ul>
</template>
