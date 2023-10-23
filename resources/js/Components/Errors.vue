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
</script>
<template>
    <ul v-if="bag === null ? Object.keys(errors).length > 0 : $page.props.errors.hasOwnProperty(bag)" class="list-disc list-inside text-sm text-red-600">
        <li v-for="(error, key) in errors" :key="key">{{ error }}</li>
    </ul>
</template>
