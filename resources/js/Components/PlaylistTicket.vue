<script setup>
import {Link} from '@inertiajs/vue3'
import route from "ziggy-js";

const props = defineProps({
    playlist: Object
});
</script>
<template>
    <Link :href="route('playlists.show', playlist.id)" class="y pane">
        <h1 class="font-bold text-xl">{{ playlist.title }}</h1>
        <p>{{ playlist.description }}</p>
    </Link>
</template>
