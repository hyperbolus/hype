<script setup>
import AppLayout from "../../Layouts/Dash.vue";
import Pagination from "@/Components/Pagination.vue";
import route from "ziggy-js";
import {Link} from "@inertiajs/vue3"
import Username from "@/Components/Username.vue";

const props = defineProps({
    stencils: Object
})
</script>
<template>
    <app-layout title="Stencils">
        <div class="x space-x-2 w-full">
            <div class="y space-y-2 w-2/3">
                <div class="x justify-between items-center">
                    <h1 class="font-bold text-3xl">Stencils</h1>
                    <Link :href="route('stencils.create')" class="rounded py-1 px-2 bg-ui-900">Submit Stencil</Link>
                </div>
                <Pagination :list="stencils"/>
                <Link v-for="stencil in stencils.data" :href="route('stencils.show', stencil.id)" class="x space-x-2 items-center pane">
                    <span class="font-bold text-xl">{{ stencil.name }}</span>
                    <span class="x items-center space-x-1">
                        <span>By</span>
                        <Username :user="stencil.author"/>
                    </span>
                </Link>
                <Pagination :list="stencils"/>
            </div>
            <div class="y space-y-2 w-1/3">
                <h2 class="font-bold text-3xl">More</h2>
                <details class="pane" open>
                    <summary class="font-bold text-xl">About Stencils</summary>
                    <p>Stencils are sharable collections of objects just like Geometry Dash's in-game "Custom Objects"</p>
                </details>
                <details class="pane" open>
                    <summary class="font-bold text-xl">How to Use</summary>
                    <p>The basic format for stencils is the exact same as custom objects stored in your save file. You can use them with a mod like BetterEdit 4 to paste in the object string. Other formats are supported too but may have limited support.</p>
                </details>
                <details class="pane" open>
                    <summary class="font-bold text-xl">How to upload</summary>
                    <p class="text-red-400">Uploads are only enabled for select beta testers.</p>
                    <p>You can get level strings from your save file. There may be mods that can help with this.</p>
                </details>
            </div>
        </div>
    </app-layout>
</template>
