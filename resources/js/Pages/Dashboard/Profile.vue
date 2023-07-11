<script setup>
import DashboardLayout from "@/Layouts/DashboardLayout.vue";
import Button from "@/Jetstream/Button.vue";
import Input from "@/Jetstream/Input.vue";
import {useForm} from "@inertiajs/vue3";
import route from "ziggy-js";
import {ref} from "vue";
import Toggle from "@/Components/Toggle.vue";
import Checkbox from "@/Jetstream/Checkbox.vue";

const props = defineProps({
    profile: Object,
    flags: Object
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
    content: props.profile.signature,
    default_visibility: props.profile.signature_visibility
})

const changeSignature = () => {
    signature.post(route('settings.update'), {
        errorBag: 'changeSignature',
        preserveScroll: true,
    })
}

const avatar = useForm({
    action: 'update avatar',
    content: null
})

const avatarPreview = ref(null)

const changeAvatar = () => {
    avatar.post(route('settings.update'), {
        errorBag: 'changeAvatar',
        preserveScroll: true,
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
        preserveScroll: true,
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
        preserveScroll: true,
    })
}

const flag = useForm({
    action: 'update flag',
    content: props.profile.flag ?? null
})
const changeFlag = () => {
    flag.post(route('settings.update'), {
        errorBag: 'changePostbit',
        preserveScroll: true,
    })
}

const intlDisplay = new Intl.DisplayNames(['en'], { type: 'region' });
const intlCountry = (flag) => {
    switch (flag) {
        case "JR":
            return "Jolly Roger"
        default:
            return intlDisplay.of(flag);
    }
};
const intlGroup = (index) => {
    switch (index) {
        case 0:
            return "Africa";
        case 1:
            return "America";
        case 2:
            return "Asia";
        case 3:
            return "Europe";
        case 4:
            return "Middle East";
        case 5:
            return "Oceania";
        case 6:
            return "Other";
    }
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
            <select v-model="flag.content" class="border-0 rounded-lg bg-ui-800">
                <option :value="null">None</option>
                <optgroup v-for="(group, index) in flags" :label="intlGroup(index)">
                    <option v-for="flag in group" :value="flag">{{ intlCountry(flag) }}</option>
                </optgroup>
            </select>
            <Button class="w-fit">Change Flag</Button>
        </form>
        <form @submit.prevent="changeBio" class="y pane space-y-2">
            <h2 class="font-bold text-xl">Bio</h2>
            <textarea v-model="bio.content" placeholder="Once upon a time..." class="resize-none resize-y w-full placeholder-ui-600 bg-ui-800 rounded-lg border-none"></textarea>
            <Button class="w-fit">Change Bio</Button>
        </form>
        <form @submit.prevent="changeSignature" class="y pane space-y-2">
            <h2 class="font-bold text-xl">Signature</h2>
            <textarea v-model="signature.content" placeholder="Sincerely, Summer Glau" class="resize-none resize-y w-full placeholder-ui-600 bg-ui-800 rounded-lg border-none"></textarea>
            <label class="x items-center space-x-2">
                <Checkbox v-model="signature.default_visibility"/>
                <span>Show signature by default</span>
            </label>
            <Button class="w-fit">Change Signature</Button>
        </form>
    </dashboard-layout>
</template>
