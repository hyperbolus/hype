<script setup>
import {Link} from '@inertiajs/vue3'
import route from "ziggy-js";
import Icon from "@/Components/Icon.vue";
import Username from "@/Components/Username.vue";

const props = defineProps({
    playlist: Object
});
</script>
<template>
    <Link :href="route('playlists.show', playlist.id)" class="y pane relative border" :class="{'border-transparent': playlist.visibility === 'public', 'border-purple-500': playlist.visibility === 'unlisted', 'border-red-500': playlist.visibility === 'private'}">
        <div class="inline-flex items-center space-x-2">
            <div v-if="playlist.visibility !== 'public'" class="flex items-center space-x-1 w-fit rounded-md px-1.5 font-bold" :class="{'border-transparent': playlist.visibility === 'public', 'bg-purple-500': playlist.visibility === 'unlisted', 'bg-red-500': playlist.visibility === 'private'}">
                <Icon v-if="playlist.visibility === 'unlisted'" scale="size-4" name="eye"/>
                <Icon v-if="playlist.visibility === 'private'" scale="size-4" name="lock-closed"/>
                <span class="capitalize">{{ playlist.visibility }}</span>
            </div>
            <h1 class="font-bold text-xl">{{ playlist.title }}</h1>
            <span class="bg-ui-800 px-2 rounded-md">by<Username class="ml-2" :user="playlist.owner"/></span>
        </div>
        <p>{{ playlist.description }}</p>
    </Link>
</template>
