<script setup>
import AppLayout from '@/Layouts/Dash.vue'
import {Link, router} from '@inertiajs/vue3';
import Dropdown from "@/Jetstream/Dropdown.vue";
import Pagination from "@/Components/Pagination.vue";
import route from 'ziggy-js'
import {ref} from "vue";
import ResourceTicket from "@/Components/ResourceTicket.vue";
import Input from "@/Jetstream/Input.vue";
import Label from "@/Jetstream/Label.vue";
import PostPad from "@/Components/PostPad.vue";

</script>
<template>
    <app-layout title="Submit Texture Pack">
        <template #breadcrumbs>
            <Link :href="route('styles.index')">Texture Packs</Link>
        </template>
        <div class="y space-y-4 w-2/3">
            <h1 class="font-bold text-3xl">Create New Style</h1>
            <div class="y space-y-4 pane">
                <Label>
                    Style Name
                    <Input type="text"/>
                </Label>

                <PostPad model-value=""/>
            </div>
        </div>
        <div class="y space-y-4 w-1/3">
            <div class="pane">Texture pack submission is a work in progress to ensure there's a robust system where low effort texture packs don't get through and legal biz is covered for assets or if you are redistributing, even modified, versions of base GD resources.</div>
            <div class="pane">If you wanna submit something join the discord and we'll talk :)</div>
            <div class="pane">If the re-upload bot has uploaded your texture pack and you want it transferred to your own account or removed you can message on site, or email, however discord is the fastest way to communicate.</div>
        </div>
    </app-layout>
</template>
