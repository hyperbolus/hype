<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import {Link, useForm} from '@inertiajs/inertia-vue3';
import Button from "@/Jetstream/Button.vue";
import Username from "@/Components/Username.vue";
import {ref} from "vue";
import route from "ziggy-js";

const props = defineProps({
    level: Object
})

const banner = useForm({
    action: 'update banner',
    content: null
})

const bannerPreview = ref(null)

const changeBanner = () => {
    banner.post(route('levels.update', props.level), {
        errorBag: 'changeBanner',
    })
}

const previewImage = (e, form, ref) => {
    form.content = e.target.files[0];
    ref.src = URL.createObjectURL(form.content)
}
</script>
<template>
    <app-layout title="Home">
        <template #breadcrumbs>
            <Link :href="route('levels.index')">Levels</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <Link :href="route('levels.show', level.id)">{{ level.id }}</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <span>Edit</span>
        </template>
        <div class="x max-w-6xl w-full gap-4 py-4">
            <div class="y space-y-4 w-3/4">
                <h2 class="font-bold text-2xl">Edit</h2>
                <form @submit.prevent="changeBanner" class="y box space-y-2">
                    <h2 class="font-bold text-xl">Banner</h2>
                    <img class="max-h-32 self-start object-scale-down" ref="banner_preview" :src="level.banner_url" alt="Banner"/>
                    <input type="file" @input="previewImage($event, banner, $refs.banner_preview)"/>
                    <ul class="mt-3 list-disc list-inside text-sm text-red-600">
                        <li v-for="(error, key) in $page.props.errors.changeBanner" :key="key">
                            {{ error }}
                        </li>
                    </ul>
                    <div class="x items-center pb-2">
                        <Button class="w-fit">Change Level Banner</Button>
                        <div class="x ml-2 text-green-500 opacity-0 transition-all" :class="{'!opacity-100': !banner.isDirty && banner.recentlySuccessful}">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 mr-0.5">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                            </svg>
                            <span>Done!</span>
                        </div>
                    </div>
                </form>
            </div>
            <div class="y space-y-4 w-1/4">
                <h2 class="font-bold text-2xl">More</h2>
                <div class="box">
                    Idk
                </div>
            </div>
        </div>
    </app-layout>
</template>
