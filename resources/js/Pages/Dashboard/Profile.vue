<script setup>
import DashboardLayout from "@/Layouts/DashboardLayout.vue";
import Button from "@/Jetstream/Button.vue";
import Input from "@/Jetstream/Input.vue";
import {useForm} from "@inertiajs/vue3";
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
    signature.post(route('settings.update'))
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

const postbit = useForm({
    action: 'update postbit',
    content: null
})

const postbitPreview = ref(null)

const changePostbit = () => {
    postbit.post(route('settings.update'), {
        errorBag: 'changePostbit',
    })
}

const flag = useForm({
    action: 'update flag',
    content: null
})
const changeFlag = () => {
    flag.post(route('settings.update'), {
        errorBag: 'changePostbit',
    })
}
</script>
<template>
    <dashboard-layout title="Home">
        <form @submit.prevent="changeAvatar" class="y pane space-y-2">
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
        <form @submit.prevent="changeBanner" class="y pane space-y-2">
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
        <form v-if="$page.props.user.roles.includes('admin')" @submit.prevent="changePostbit" class="y pane space-y-2">
            <h2 class="font-bold text-xl">Postbit Background</h2>
            <img class="max-h-32 self-start object-scale-down" ref="postbit_preview" :src="profile.postbit_url" alt="Postbit Background"/>
            <input type="file" @input="previewImage($event, postbit, $refs.postbit_preview)"/>
            <ul class="mt-3 list-disc list-inside text-sm text-red-600">
                <li v-for="(error, key) in $page.props.errors.changePostbit" :key="key">
                    {{ error }}
                </li>
            </ul>
            <Button class="w-fit">Change Postbit Background</Button>
        </form>
        <form @submit.prevent="changeFlag" class="y pane space-y-2">
            <h2 class="font-bold text-xl">Country Flag <span class="fflag ff-sm" :class="`fflag-${flag.content}`"></span></h2>
            <select v-model="flag.content" class="border-0 rounded-lg dark:bg-ui-800">
                <option :value="null">None</option>
                <optgroup label="Americas">
                    <option value="US">United States of America</option>
                    <option value="CA">Canada</option>
                    <option value="MX">Mexico</option>
                    <option value="BR">Brazil</option>
                    <option value="CO">Columbia</option>
                    <option value="AR">Argentina</option>
                    <option value="VE">Venezuela</option>
                    <option value="CL">Chile</option>
                </optgroup>
                <optgroup label="Europe-ish">
                    <option value="LU">Luxemburg</option>
                    <option value="UK">United Kingdom</option>
                    <option value="ES">Spain</option>
                    <option value="IT">Italy</option>
                    <option value="IE">Ireland</option>
                    <option value="SE">Sweden</option>
                    <option value="BE">Belgium</option>
                    <option value="RS">Serbia</option>
                    <option value="PT">Portugal</option>
                    <option value="PL">Poland</option>
                    <option value="NO">Norway</option>
                    <option value="XL">Kosovo</option>
                    <option value="LT">Lithuania</option>
                    <option value="AL">Albania</option>
                    <option value="UA">Ukraine</option>
                    <option value="RU">Russian Federation</option>
                </optgroup>
                <optgroup label="I'll add more when I have time I am very sorry if I missed your country but I need to type these up manually."></optgroup>
                <optgroup label="I hope this flag will make it up to you in the meantime <3">
                    <option value="JR">Jolly Roger</option>
                </optgroup>
            </select>
            <Button class="w-fit">Change Flag</Button>
        </form>
        <form @submit.prevent="changeBio" class="y pane space-y-2">
            <h2 class="font-bold text-xl">Bio</h2>
            <textarea v-model="bio.content" placeholder="Once upon a time..." class="resize-none resize-y w-full placeholder-neutral-400 dark:placeholder-ui-600 dark:bg-ui-800 rounded-lg border-none"></textarea>
            <Button class="w-fit">Change Bio</Button>
        </form>
        <form @submit.prevent="changeSignature" class="y pane space-y-2">
            <h2 class="font-bold text-xl">Signature</h2>
            <textarea v-model="signature.content" placeholder="Sincerely, Summer Glau" class="resize-none resize-y w-full placeholder-neutral-400 dark:placeholder-ui-600 dark:bg-ui-800 rounded-lg border-none"></textarea>
            <Button class="w-fit">Change Signature</Button>
        </form>
    </dashboard-layout>
</template>
