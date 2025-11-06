<script setup>
import DashboardLayout from "@/Layouts/DashboardLayout.vue";
import Input from "@/Jetstream/Input.vue";
import Button from "@/Jetstream/Button.vue";
import {useForm} from "@inertiajs/vue3";
import Lightbox from "@/Components/Lightbox.vue";
import Link from "@/Pages/Link/Link.vue";

const linkGD = useForm({

})

const platforms = [
    {
        id: 'discord',
        name: 'Discord',
    },
    {
        id: 'patreon',
        name: 'Patreon',
    },
    {
        id: 'twitter',
        name: 'Twitter',
    },
    {
        id: 'gd',
        name: 'Geometry Dash',
    }
];

</script>
<template>
    <dashboard-layout title="Connections">
        <h1 class="font-bold text-4xl mx-2 my-2">Connections</h1>
        <div class="y space-y-2">
            <div v-for="p in platforms" class="flex justify-between space-x-2 items-center px-4 py-3 bg-ui-900 rounded-md">
                <div class="flex space-x-4 items-center">
                    <svg v-if="p.id === 'twitter'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 209" class="size-10">
                        <path fill="#55acee" d="M256 25.45a105 105 0 0 1-30.166 8.27c10.845-6.5 19.172-16.793 23.093-29.057a105.2 105.2 0 0 1-33.351 12.745C205.995 7.201 192.346.822 177.239.822c-29.006 0-52.523 23.516-52.523 52.52c0 4.117.465 8.125 1.36 11.97c-43.65-2.191-82.35-23.1-108.255-54.876c-4.52 7.757-7.11 16.78-7.11 26.404c0 18.222 9.273 34.297 23.365 43.716a52.3 52.3 0 0 1-23.79-6.57q-.004.33-.003.661c0 25.447 18.104 46.675 42.13 51.5a52.6 52.6 0 0 1-23.718.9c6.683 20.866 26.08 36.05 49.062 36.475c-17.975 14.086-40.622 22.483-65.228 22.483c-4.24 0-8.42-.249-12.529-.734c23.243 14.902 50.85 23.597 80.51 23.597c96.607 0 149.434-80.031 149.434-149.435q0-3.417-.152-6.795A106.8 106.8 0 0 0 256 25.45"/>
                    </svg>
                    <svg v-if="p.id === 'discord'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 199" class="size-10">
                        <path fill="#5865F2" d="M216.856 16.597A208.5 208.5 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046q-29.538-4.442-58.533 0c-1.832-4.4-4.55-9.933-6.846-14.046a207.8 207.8 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161 161 0 0 0 79.735 175.3a136.4 136.4 0 0 1-21.846-10.632a109 109 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a132 132 0 0 0 5.355 4.237a136 136 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848c21.142-6.58 42.646-16.637 64.815-33.213c5.316-56.288-9.08-105.09-38.056-148.36M85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2s23.236 11.804 23.015 26.2c.02 14.375-10.148 26.18-23.015 26.18m85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2c0 14.375-10.148 26.18-23.015 26.18"/>
                    </svg>
                    <svg v-if="p.id === 'patreon'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 247" class="size-10">
                        <path fill="#FF424D" d="M45.136 0v246.35H0V0zm118.521 0C214.657 0 256 41.343 256 92.343s-41.343 92.343-92.343 92.343s-92.343-41.344-92.343-92.343S112.658 0 163.657 0"/>
                    </svg>
                    <span>{{ p.name }}</span>
                </div>
                <div class="rounded-md px-4 py-1 bg-ui-800">Link</div>
            </div>
        </div>
    </dashboard-layout>
</template>
