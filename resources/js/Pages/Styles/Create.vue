<script setup>
import AppLayout from '@/Layouts/Dash.vue'
import {useForm} from '@inertiajs/vue3';
import Input from "@/Jetstream/Input.vue";
import Label from "@/Jetstream/Label.vue";
import PostPad from "@/Components/PostPad.vue";
import TipTap from "@/Components/TipTap.vue";

const form = useForm({
    post: {
        body: ''
    }
})
</script>
<template>
    <app-layout title="Submit Texture Pack">
        <div class="y space-y-2 w-2/3">
            <h1 class="font-bold text-3xl">Create New Style</h1>
            <div class="y space-y-4 pane">
                <Label>
                    Style Name
                    <Input type="text"/>
                </Label>

                <Label>
                    Description
                    <TipTap class="border border-ui-700 rounded-md" v-model="form.post"/>
                </Label>

                <PostPad v-model="form.post"/>
            </div>
        </div>
        <div class="y space-y-2 w-1/3">
            <div class="pane">Texture pack submission is a work in progress to ensure there's a robust system where low effort texture packs don't get through and legal biz is covered for assets or if you are redistributing, even modified, versions of base GD resources.</div>
            <div class="pane">If you wanna submit something join the discord and we'll talk :)</div>
            <div class="pane">If the re-upload bot has uploaded your texture pack and you want it transferred to your own account or removed you can message on site, or email, however discord is the fastest way to communicate.</div>
        </div>
    </app-layout>
</template>
