<script setup>
import {isAuthenticated} from "@/util";

const props = defineProps({
    containerClasses: String,
});
</script>
<template>
    <div class="relative">
        <div v-if="isAuthenticated()" class="y text-sm absolute inset-0 z-50 bg-ui-900/50 backdrop-blur-sm py-4 px-3 items-center justify-center" :class="containerClasses">
            <p class="text-center">This feature is for supporters only</p>
            <a :href="route('settings.connections')" class="bg-ui-600/75 px-2 py-1 mt-1.5 rounded">Join</a>
        </div>
        <slot/>
    </div>
</template>
