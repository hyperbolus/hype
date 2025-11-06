<script setup>
import {ref} from "vue";
import Icon from "./Icon.vue";

const props = defineProps({
    forum: Object
})

const open = ref(false)
</script>
<template>
    <div class="x justify-between px-2 py-1">
        <div class="x gap-2">
            <span class="opacity-50">{{ forum.id }}</span>
            <span>{{ forum.name }}</span>
        </div>
        <div class="x items-center gap-2">
            <Icon @click="open = !open" class="w-5" name="pencil-square"/>
            <Icon class="w-5" name="x-mark"/>
        </div>
    </div>
    <div v-show="open" class="x bg-ui-900 p-2">
        ddddd
    </div>
</template>
