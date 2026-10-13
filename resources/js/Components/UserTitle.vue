<script setup>
import {computed} from "vue";
import {isPremium} from "@/util.js";

const props = defineProps({
    user: Object
});

const title = computed(() => {
   if (props.user.banned_at) return 'Banned';

   if (props.user.custom_title && isPremium(props.user)) return props.user.custom_title;

   if (props.user.primary_group_id === 1) return 'Administrator';

   return 'Junior Member'
});
</script>
<template>
    <span class="text-base font-normal">{{ title }}</span>
</template>
