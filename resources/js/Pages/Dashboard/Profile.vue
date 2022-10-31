<script setup>
import DashboardLayout from "@/Layouts/DashboardLayout.vue";
import Button from "@/Jetstream/Button.vue";
import Input from "@/Jetstream/Input.vue";
import {useForm} from "@inertiajs/inertia-vue3";
import route from "ziggy-js";
import {ref} from "vue";

const props = defineProps({
    profile: Object
})

const previewImage = (e, form, ref) => {
    form.content = e.target.files[0];
    ref.src = URL.createObjectURL(form.content)
}

const bio = useForm({
    action: 'update bio',
    content: props.profile.bio
})

const changeBio = () => {
    bio.post(route('settings.update'))
}

const signature = useForm({
    action: 'update signature',
    content: props.profile.signature
})

const changeSignature = () => {
    bio.post(route('settings.update'))
}

const avatar = useForm({
    action: 'update avatar',
    content: null
})

const avatarPreview = ref(null)

const changeAvatar = () => {
    avatar.post(route('settings.update'), {
        errorBag: 'changeAvatar',
    })
}

const banner = useForm({
    action: 'update banner',
    content: null
})

const bannerPreview = ref(null)

const changeBanner = () => {
    banner.post(route('settings.update'), {
        errorBag: 'changeBanner',
    })
}
</script>
<template>
    <dashboard-layout title="Home">
        <form @submit.prevent="changeAvatar" class="y box space-y-2">
            <h2 class="font-bold text-xl">Avatar</h2>
            <img class="max-h-32 w-32" ref="avatar_preview" :src="profile.avatar_url" alt="Avatar"/>
            <input type="file" @input="previewImage($event, avatar, $refs.avatar_preview)"/>
            <ul class="mt-3 list-disc list-inside text-sm text-red-600">
                <li v-for="(error, key) in $page.props.errors.changeAvatar" :key="key">
                    {{ error }}
                </li>
            </ul>
            <Button class="w-fit">Change Avatar</Button>
        </form>
        <form @submit.prevent="changeBanner" class="y box space-y-2">
            <h2 class="font-bold text-xl">Banner</h2>
            <img class="max-h-32 self-start object-scale-down" ref="banner_preview" :src="profile.banner_url" alt="Banner"/>
            <input type="file" @input="previewImage($event, banner, $refs.banner_preview)"/>
            <ul class="mt-3 list-disc list-inside text-sm text-red-600">
                <li v-for="(error, key) in $page.props.errors.changeBanner" :key="key">
                    {{ error }}
                </li>
            </ul>
            <Button class="w-fit">Change Profile Banner</Button>
        </form>
        <form @submit.prevent="changeBio" class="y box space-y-2">
            <h2 class="font-bold text-xl">Bio</h2>
            <textarea v-model="bio.content" placeholder="Once upon a time..." class="resize-none resize-y w-full rounded placeholder-neutral-400 dark:placeholder-neutral-600 bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700"></textarea>
            <Button class="w-fit">Change Bio</Button>
        </form>
        <form @submit.prevent="changeSignature" class="y box space-y-2">
            <h2 class="font-bold text-xl">Signature</h2>
            <textarea v-model="signature.content" placeholder="Sincerely, Summer Glau" class="resize-none resize-y w-full rounded placeholder-neutral-400 dark:placeholder-neutral-600 bg-neutral-100 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700"></textarea>
            <Button class="w-fit">Change Signature</Button>
        </form>
    </dashboard-layout>
</template>
