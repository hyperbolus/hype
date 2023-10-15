<script setup>
import AppLayout from "@/Layouts/Dash.vue";
import {Link} from "@inertiajs/vue3"

const props = defineProps({
    profile: Object
})
</script>
<template>
    <app-layout>
        <div class="y space-y-2 w-full">
            <h2 class="mx-2 font-bold text-3xl">{{ props.profile.username }}</h2>
            <img alt="Profile Card" :src="`https://i.profile.gd/${props.profile.username}.png`"/>
        </div>
    </app-layout>
</template>
