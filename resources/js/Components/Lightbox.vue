<script setup>
import {ref} from "vue";

const props = defineProps({
    image: String,
    alt: String,
    classes: String|Array
})

const open = ref(false)
</script>
<template>
    <div class="cursor-pointer" @click="open = true">
        <img class="rounded" :class="classes" :alt="alt" :src="image"/>
        <teleport to="body">
            <div @click="open = false" class="x cursor-pointer items-center justify-center z-[100] fixed inset-0 bg-opacity-50 bg-neutral-900" :class="{'!hidden': !open}">
                <transition
                    enter-active-class="transition ease-out duration-200"
                    enter-from-class="transform opacity-0 scale-50"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-50">
                    <img class="rounded" v-show="open" :alt="alt" :src="image"/>
                </transition>
            </div>
        </teleport>
    </div>
</template>
