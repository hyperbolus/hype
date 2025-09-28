<script setup>
import DashboardLayout from "@/Layouts/DashboardLayout.vue";
import Button from "@/Jetstream/Button.vue";
import Input from "@/Jetstream/Input.vue";
import {useForm} from "@inertiajs/vue3";
import {onBeforeMount, onUnmounted, ref} from "vue";
import Errors from "@/Components/Errors.vue";
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import Icon from "@/Components/Icon.vue";
import Textbox from "@/Components/Textbox.vue";
import TipTap from "@/Components/TipTap.vue";
import {capitalize, getUser, invisiblePixel} from "@/util.js";
import {useFileDialog} from "@vueuse/core";
import route from "ziggy-js";

const props = defineProps({
    flags: Object
});

const cropper = ref(null);
const profile = ref(getUser());

const profileForm = useForm({
    pronouns: profile.value.pronouns,
    pronouns_visibility: profile.value.pronouns_visibility|0,

    flag: profile.value.flag,

    location: profile.value.location,
    location_visibility: profile.value.location_visibility|0,

    birthday: profile.value.birthday ? new Date(profile.value.birthday).toISOString().slice(0,10) : null,
    birthday_visibility: profile.value.birthday_visibility|0,
    //age_visibility: profile.value.flag, todo@later year only birthday

    bio: profile.value.bio ?? '',

    signature: profile.value.signature ?? '',
    signature_visibility: profile.value.signature_visibility,
});

const imageForm = useForm({
    kind: '',
    image: null,
});

const imageRemoveForm = useForm({
    kind: '',
});

const saveProfile = () => {
    profileForm.patch(route('settings.profile.update'), {
        preserveScroll: true,
        errorBag: 'profile'
    });
};

const fields = {
    pronouns: {
        type: 'field',
        placeholder: 'ex. they/them',
        visibility: true
    },
    birthday: {
        type: 'date',
        visibility: true
    },
    location: {
        type: 'field',
        placeholder: 'ex. New York, NY',
        visibility: true
    },
    bio: {
        type: 'rich',
        placeholder: 'Tell us about yourself...',
        max: 2000
    },
    signature: {
        type: 'area',
        placeholder: 'Sincerely, Summer Glau',
        max: 200
    }
};

// <editor-fold desc="Flags">
const intlDisplay = new Intl.DisplayNames(['en'], { type: 'region' });
const intlGroups = ['Pride', 'Africa', 'America', 'Asia', 'Europe', 'Middle East', 'Oceania', 'Other'];
const intlCountry = (group, flag) => {
    if (group === 0) return flag === 'CSSource' ? 'Counter-Strike: Source' : flag
    return flag === 'JR' ? 'Jolly Roger' : intlDisplay.of(flag);
}
// </editor-fold>

// <editor-fold desc="Pronouns">
const pronounList = [
    ['she', 'her'],
    ['he', 'him'],
    ['they', 'them'],
    ['it', 'its'],
    ['any', 'all']
];

const pronounOrder = ref([]);

const parsePronouns = () => {
    return; // disable this functionality

    // Maps a single pronoun (ex. she) to its group index in pronounList (ex. 0)
    let lookup = {};

    for (const p in pronounList) lookup[pronounList[p][0]] = lookup[pronounList[p][1]] = p;

    let parts = profileForm.pronouns.split('/');
    let newOrder = [];
    let changed = false;

    for (let i = 0; i < parts.length; i++) {
        if (lookup.hasOwnProperty(parts[i])) {
            let pronoun_id = lookup[parts[i]];
            if (!newOrder.includes(pronoun_id)) {
                if (!changed) newOrder = [];
                newOrder.push(pronoun_id);
                changed = true;
            }
        }
    }

    pronounOrder.value = newOrder;
};

const pronounText = () => {
    let list = [];

    for (const id of pronounOrder.value) {
        list.push(pronounList[id][0]);
        if (pronounOrder.value.length === 1) list.push(pronounList[id][1]);
    }

    profileForm.pronouns = list.join('/');
};

const movePronoun = (p, pos) => {
    if (pos === null) pronounOrder.value.splice(p, 1);

    pronounText();
};
// </editor-fold>

// <editor-fold desc="Images">
const images = {
    avatar: 1,
    banner: 2.39,
    postbit: 9/16
};

const imageModal = ref(false);
const activeImage = ref('');
const blobURL = ref('');

const { open: chooseImage, onChange} = useFileDialog({
    accept: 'image/*',
    directory: false,
    multiple: false,
    reset: true
})

onChange((files) => {
    if (!files || files.length === 0) return;
    if (blobURL.value) URL.revokeObjectURL(blobURL.value); // Clear previous blob if any

    blobURL.value = URL.createObjectURL(files[0])
    imageModal.value = true;
})

const editImage = (type) => {
    activeImage.value = type;
    chooseImage();
}

const saveImage = () => {
    if (!cropper.value) return;

    imageForm.kind = activeImage.value;

    cropper.value.getResult().canvas.toBlob((blob) => {
        imageForm.image = blob;

        imageForm.post(route('settings.profile.image.store'), {
            preserveScroll: true,
            errorBag: 'image',
            forceFormData: true,
            onSuccess: () => {
                imageForm.reset()
                imageModal.value = false;
                activeImage.value = '';
                URL.revokeObjectURL(blobURL.value);
                blobURL.value = '';
            }
        });
    }, 'image/jpeg', 0.95);
}

const removeImage = (kind) => {
    imageRemoveForm.kind = kind;

    imageRemoveForm.delete(route('settings.profile.image.destroy'), {
        preserveScroll: true,
        onSuccess: () => {
            imageForm.reset()
        }
    });
}

// </editor-fold>

onBeforeMount(() => {
    //parsePronouns();
});

onUnmounted(() => {
    imageModal.value = false;
    activeImage.value = null;
    URL.revokeObjectURL(blobURL.value);
});
</script>
<template>
    <dashboard-layout>
        <div class="x space-x-2">
            <div class="x justify-between items-center relative bg-center bg-cover rounded-lg grow p-4 grow bg-ui-900" :style="`background-image:url(${profile.banner_url ?? invisiblePixel});`">
                <div class="bg-ui-900/75 rounded-full w-fit p-2 relative">
                    <img :src="profile.avatar_url ?? invisiblePixel" alt="" class="size-24 md:size-32 select-none rounded-full"/>
                    <div class="absolute inset-0 x items-center justify-center">
                        <button :disabled="imageForm.processing" @click="editImage('avatar')" class="x p-4 items-center justify-center bg-ui-800/75 shadow-lg hover:bg-ui-600/75 transition-colors cursor-pointer rounded-full">
                            <Icon name="camera" class="size-6"/>
                        </button>
                    </div>
                </div>
                <div class="y space-y-4">
                    <button :disabled="imageForm.processing" @click="editImage('banner')" class="x p-4 items-center justify-center bg-ui-800/75 shadow-lg hover:bg-ui-600/75 transition-colors cursor-pointer rounded-full">
                        <Icon name="camera" class="size-6"/>
                    </button>
                    <button v-if="profile.banner_url" :disabled="imageRemoveForm.processing" @click="removeImage('banner')" class="x p-4 items-center justify-center bg-ui-800/75 shadow-lg hover:bg-ui-600/75 transition-colors cursor-pointer rounded-full">
                        <Icon name="x-mark" class="size-6"/>
                    </button>
                </div>
            </div>
            <div class="y space-y-4 justify-center items-center relative bg-center bg-cover rounded-lg p-4 w-32 bg-ui-900" :style="`background-image:url(${profile.postbit_url ?? invisiblePixel});`">
                <button :disabled="imageForm.processing" @click="editImage('postbit')" class="x p-4 items-center justify-center bg-ui-800/75 shadow-lg hover:bg-ui-600/75 transition-colors cursor-pointer rounded-full">
                    <Icon name="camera" class="size-6"/>
                </button>
                <button v-if="profile.postbit_url" :disabled="imageRemoveForm.processing" @click="removeImage('postbit')" class="x p-4 items-center justify-center bg-ui-800/75 shadow-lg hover:bg-ui-600/75 transition-colors cursor-pointer rounded-full">
                    <Icon name="x-mark" class="size-6"/>
                </button>
            </div>
        </div>
        <teleport to="#app">
            <div v-if="imageModal" class="y items-center justify-center z-[100] fixed inset-0 bg-ui-1000/50" >
                <div class="md:rounded-lg bg-ui-900 w-full md:max-w-xl cursor-auto shadow-xl pb-2">
                    <div class="x justify-between space-x-2 items-center py-2 px-2 rounded-t-lg">
                        <Icon @click="imageModal = false; activeImage = null;" class="size-6 cursor-pointer" name="x-mark"/>
                        <button @click="saveImage" class="rounded-md bg-ui-700 px-2 py-1">Save</button>
                    </div>
                    <Cropper ref="cropper" :default-size="({imageSize: i, visibleArea : v}) => ({width: (v || i).width, height: (v || i).height})" :stencil-props="{aspectRatio: images[activeImage]}" class="h-64" :src="blobURL"/>
                    <div class="x justify-center items-center space-x-2 pt-2">
                        <button @click="$refs.cropper.rotate(-90)" class="bg-ui-800 rounded-md p-2">
                            <Icon name="arrow-uturn-left" class="size-4"/>
                        </button>
                        <button @click="$refs.cropper.rotate(90)" class="bg-ui-800 rounded-md p-2">
                            <Icon name="arrow-uturn-right" class="size-4"/>
                        </button>
                    </div>
                    <Errors bag="image" class="px-2"/>
                </div>
            </div>
        </teleport>
        <div class="y pane">
            <div v-if="0" class="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-2 md:items-start w-full">
                <div class="md:w-1/3">
                    <span class="text-sm px-2">Pronouns</span>
                    <Input @input="parsePronouns" v-model="profileForm.pronouns" type="text" placeholder="Pronouns (ex. they/them)"/>
                    <div v-if="0" class="x space-x-1 items-center text-ui-500 mt-0.5">
                        <Icon name="information-circle" class="size-4"/>
                        <span class="text-sm">Pronouns follow a specific format! <u class="text-ui-100">More Info</u></span>
                    </div>
                </div>
                <div v-if="0" class="y space-y-2 px-1 py-1 bg-ui-950 rounded-md md:w-1/4 !mt-6">
                    <div v-for="(p, i) in pronounOrder" class="x space-x-2 rounded-md bg-ui-900 px-2 py-1">
                        <Icon name="bars-4" size="24" class="size-6 text-ui-600 cursor-move focus:cursor-grabbing"/>
                        <span class="grow">{{ i + 1 }}. {{ pronounList[p].join('/') }}</span>
                        <Icon @click="movePronoun(i, null)" name="x-mark" size="24" class="size-6 text-red-500 cursor-pointer"/>
                    </div>
                    <p v-if="profileForm.pronouns.length === 0" class="text-ui-500">No Pronouns Specified</p>
                    <div v-else-if="pronounOrder.length === 0" class="x items-center">
                        <span class="px-1 py-0.5 text-xs bg-ui-800 rounded mr-2 uppercase tracking-wide select-none">Custom</span>
                        <span>{{ profileForm.pronouns }}</span>
                    </div>
                </div>
            </div>
            <div class="w-full">
                <span class="text-sm px-2 mt-2">Flag</span>
                <div class="x items-center space-x-2 bg-ui-800 rounded-lg">
                    <span class="fflag ff-md ml-4" :class="`fflag-${profileForm.flag}`"></span>
                    <select v-model="profileForm.flag" class="px-2 py-1 border-0 bg-transparent grow bg-ui-800 rounded-lg">
                        <option :value="null">None</option>
                        <optgroup v-for="(group, index) in flags" :label="intlGroups[index]">
                            <option v-for="flag in group" :value="flag">{{ intlCountry(index, flag) }}</option>
                        </optgroup>
                    </select>
                </div>
            </div>
            <div v-for="(field, key) in fields" class="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-2 mt-2">
                <div class="y w-full" :class="{'md:w-1/2': field.visibility}">
                    <div class="x justify-between mt-2 capitalize text-sm px-2">
                        <span>{{ key }}</span>
                        <button @click="profileForm[key] = null" class="text-ui-500 hover:text-white hover:underline">Reset</button>
                    </div>
                    <Input v-if="field.type === 'field'" v-model="profileForm[key]" type="text" :placeholder="field.placeholder ?? capitalize(key)"/>
                    <input v-if="field.type === 'date'" v-model="profileForm[key]" type="date" class="px-2 py-1 bg-ui-800 rounded-lg border-none w-full"/>
                    <Textbox v-if="field.type === 'area'" v-model="profileForm[key]" :max="field.max" :placeholder="field.placeholder ?? capitalize(key)"/>
                    <TipTap v-if="field.type === 'rich'" v-model="profileForm[key]" :max="field.max" class="border border-ui-700 rounded-lg"/>
                </div>
                <div v-if="field.visibility" class="md:w-1/2">
                    <span class="text-sm px-2 capitalize">{{ key }} Visibility</span>
                    <select v-model="profileForm[`${key}_visibility`]" class="px-2 py-1 border-0 rounded-lg bg-ui-800 w-full">
                        <option :value="0">Just Me</option>
                        <!--<option :value="2">Friends</option>-->
                        <option :value="1">Everyone</option>
                    </select>
                </div>
            </div>
            <Errors bag="profile"/>
            <div class="x space-x-2 items-center mt-2">
                <Button @click="saveProfile" class="w-fit" :disabled="!profileForm.isDirty || profileForm.processing">Save</Button>
                <span v-show="profileForm.recentlySuccessful" class="text-green-400">Done!</span>
            </div>
        </div>
    </dashboard-layout>
</template>
