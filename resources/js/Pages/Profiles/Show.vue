<script setup>
import CommonLayout from "@/Layouts/CommonLayout.vue";
import {Link} from "@inertiajs/inertia-vue3"

const props = defineProps({
    profile: Object
})
</script>
<template>
    <common-layout :title="props.profile.name">
        <template #breadcrumbs>
            <Link :href="$page.props.url">{{ props.profile.name }}</Link>
        </template>
        <div class="y space-y-2 w-full">
            <h2 class="mx-2 font-bold text-3xl">{{ props.profile.name }}</h2>

        </div>
    </common-layout>
</template>
