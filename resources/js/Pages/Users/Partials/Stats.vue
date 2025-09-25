<script setup>
import Icon from "@/Components/Icon.vue";

const props = defineProps({
    profile: Object
});

const stats = {
    posts: 'chat-bubble-bottom-center-text',
    threads: 'chat-bubble-left-right',
    reviews: 'star'
};
</script>
<template>
    <div class="hidden md:flex text-ui-200 py-2 px-2 rounded-lg bg-ui-900">
        <div v-for="(stat, key) in stats" class="x items-center gap-2 px-2">
            <Icon :name="stat" size="24" class="size-6"/>
            <div class="y">
                <span>{{ profile[key + '_count'] }}</span>
                <span class="uppercase text-xs opacity-75 tracking-widest">{{ key }}</span>
            </div>
        </div>
    </div>
</template>
