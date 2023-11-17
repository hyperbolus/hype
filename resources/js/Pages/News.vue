<script setup>
import AppLayout from "@/Layouts/Dash.vue";

const props = defineProps({
    articles: Object
})
</script>
<template>
    <AppLayout title="News">
        <div class="y space-y-4 w-full">
            <div class="y space-y-2 w-72">
                <div class="h-40 bg-ui-600 rounded"></div>
                <div>
                    <h2 class="font-bold text-xl">Article Title Wee Woo Wee Woo</h2>
                    <p>A short stub from the article. Just enough to get you hooked on the...</p>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
