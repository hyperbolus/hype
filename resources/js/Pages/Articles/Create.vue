<script setup>
import {useForm} from "@inertiajs/vue3";
import {ref} from 'vue';
import route from "ziggy-js";
import AppLayout from "@/Layouts/Dash.vue";
import Input from "@/Jetstream/Input.vue";
import Errors from "@/Components/Errors.vue";
import Button from "@/Jetstream/Button.vue";
import TipTap from "@/Components/TipTap.vue";
import {useFileDialog} from '@vueuse/core'
import {invisiblePixel} from "@/util";

const form = useForm({
    title: '',
    slug: '',
    tagline: '',
    blurb: '',
    content: '',
    banner: null,
});

const submit = () => {
    form.post(route('articles.create'));
}

const bannerURL = ref(invisiblePixel);

const { open: openBannerFile, onChange } = useFileDialog({
    accept: 'image/*',
    multiple: false,
    directory: false,
})

onChange((files) => {
    if (files.length !== 1) return;

    form.banner = files[0];

    bannerURL.value = URL.createObjectURL(form.banner);
});
</script>
<template>
    <app-layout>
        <div class="y w-full">
            <h1 class="mx-2 font-bold text-4xl">Create a New Article</h1>

            <span class="text-sm mt-2 mb-0.5">Title*</span>
            <Input class="py-1 !bg-ui-800" type="text" v-model="form.title" placeholder="Title"/>

            <span class="text-sm mt-2 mb-0.5">URL Slug*</span>
            <Input class="!bg-ui-900" prefix="hyperbolus.net/news/" type="text" v-model="form.slug" placeholder="example-slug"/>

            <span class="text-sm mt-2 mb-0.5">Tagline</span>
            <Input class="!bg-ui-900" type="text" v-model="form.tagline" placeholder="Community News"/>

            <span class="text-sm mt-2 mb-0.5">Blurb</span>
            <Input class="!bg-ui-900" type="text" v-model="form.blurb" placeholder="Lorem ipsum dolor sit amet"/>

            <span class="text-sm mt-2 mb-0.5">Banner</span>
            <div @click="openBannerFile" class="y items-center justify-center bg-ui-800 rounded-md h-32 cursor-pointer bg-cover bg-center" :style="`background-image:url('${bannerURL}');`">
                <p v-if="!form.banner">Click to attach banner</p>
            </div>

            <span class="text-sm mt-2 mb-0.5">Content</span>
            <TipTap class="rounded-md border border-ui-700" v-model="form.content"></TipTap>

            <Errors/>

            <div class="x justify-center gap-2 mt-1">
                <Button :disabled="form.processing" @click="submit">Publish Article</Button>
            </div>
        </div>
    </app-layout>
</template>
