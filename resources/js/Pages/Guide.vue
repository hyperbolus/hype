<script setup>
import AppLayout from "@/Layouts/Dash.vue";
import Username from "@/Components/Username.vue";
import Icon from "@/Components/Icon.vue";
import {Link} from '@inertiajs/vue3';
import Tooltip from "@/Components/Tooltip.vue";

const props = defineProps({
    owner: Object
})

const boxes = [
    {
        'title': 'Editor',
        'description': 'Learn to create!',
        'icon': 'wrench-screwdriver',
    },
    {
        'title': 'Gameplay',
        'description': 'Learn how to excel at GD',
        'icon': 'sparkles',
    },
    {
        'title': 'Vaults',
        'description': 'Unlock the secret vaults',
        'icon': 'lock-closed',
    },
    {
        'title': 'Modding',
        'description': 'Learn the technical side of GD',
        'icon': 'code-bracket',
    }
];
</script>
<template>
    <AppLayout>
        <div class="y space-y-2 items-center w-full">
            <Tooltip message="WE ARCHIMEDES UP IN THIS BITCH!!! 🔥 🔥 🔥" class="text-center text-4xl font-bold">Hyperpedia</Tooltip>
            <p>Geometry Dash Knowledgebase</p>
            <div class="y space-y-4 w-full">
                <Link :href="'#'" v-for="box in boxes" class="x relative overflow-hidden space-x-2 items-center rounded-lg border border-ui-700 bg-ui-900 px-4 py-2 hover:border-green-200 hover:[filter:drop-shadow(0_0_5px_rgb(103_232_249))]">
                    <div class="">
                        <h2 class="text-3xl font-bold">{{ box.title }}</h2>
                        <p>{{ box.description }}</p>
                    </div>
                    <Icon :name="box.icon" size="24" class="absolute text-ui-700 -right-4 -bottom-12 w-32"/>
                </Link>
            </div>
        </div>
    </AppLayout>
</template>
