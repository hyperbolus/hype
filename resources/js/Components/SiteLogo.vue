<script setup>
import {Link} from '@inertiajs/vue3'
import route from 'ziggy-js'
</script>
<template>
    <Link :href="route('home')" class="font-bold text-2xl select-none"><span class="text-cyan-400">Dash</span>Net</Link>
</template>
