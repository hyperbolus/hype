<script setup>
import AppLayout from "@/Layouts/Dash.vue";
import {Link} from "@inertiajs/vue3"
import LevelTicket from "@/Components/LevelTicket.vue";

const props = defineProps({
    profile: Object,
    levels: Object
})
</script>
<template>
    <app-layout>
        <div class="y space-y-4 w-full">
            <div class="y space-y-2 w-full">
                <h2 class="mx-2 font-bold text-3xl">{{ profile.username }}</h2>
                <img alt="Profile Card" :src="`https://i.profile.gd/${profile.username}.png`"/>
            </div>
            <div class="x space-x-2 items-center justify-center">
                <a v-if="profile.youtube" :href="`https://youtube.com/channel/${profile.youtube}`" class="x items-center aspect-square pane">
                    <svg xmlns="http://www.w3.org/2000/svg"  class="w-8" viewBox="0 0 256 268"><!-- Icon from All by undefined - undefined --><path fill="#5A3E85" d="M17.458 0L0 46.556v186.201h63.983v34.934h34.931l34.898-34.934h52.36L256 162.954V0zm23.259 23.263H232.73v128.029l-40.739 40.741H128L93.113 226.92v-34.886H40.717zm64.008 116.405H128V69.844h-23.275zm63.997 0h23.27V69.844h-23.27z"/></svg>
                </a>
                <a v-if="profile.twitter" :href="`https://twitter.com/${profile.twitter}`" class="x items-center aspect-square pane">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8" viewBox="0 0 256 180"><!-- Icon from All by undefined - undefined --><path fill="red" d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134"/><path fill="#FFF" d="m102.421 128.06l66.328-38.418l-66.328-38.418z"/></svg>
                </a>
                <a v-if="profile.twitch" :href="`https://twitch.tv/${profile.twitch}`" class="x items-center aspect-square pane">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8" viewBox="0 0 256 209"><!-- Icon from All by undefined - undefined --><path fill="#55acee" d="M256 25.45a105 105 0 0 1-30.166 8.27c10.845-6.5 19.172-16.793 23.093-29.057a105.2 105.2 0 0 1-33.351 12.745C205.995 7.201 192.346.822 177.239.822c-29.006 0-52.523 23.516-52.523 52.52c0 4.117.465 8.125 1.36 11.97c-43.65-2.191-82.35-23.1-108.255-54.876c-4.52 7.757-7.11 16.78-7.11 26.404c0 18.222 9.273 34.297 23.365 43.716a52.3 52.3 0 0 1-23.79-6.57q-.004.33-.003.661c0 25.447 18.104 46.675 42.13 51.5a52.6 52.6 0 0 1-23.718.9c6.683 20.866 26.08 36.05 49.062 36.475c-17.975 14.086-40.622 22.483-65.228 22.483c-4.24 0-8.42-.249-12.529-.734c23.243 14.902 50.85 23.597 80.51 23.597c96.607 0 149.434-80.031 149.434-149.435q0-3.417-.152-6.795A106.8 106.8 0 0 0 256 25.45"/></svg>
                </a>
            </div>
            <div class="y space-y-2">
                <LevelTicket v-for="level in levels" :level="level"/>
            </div>
        </div>
    </app-layout>
</template>
