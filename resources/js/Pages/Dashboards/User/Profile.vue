<script setup>
import DashboardLayout from "@/Layouts/DashboardLayout.vue";
import Button from "@/Jetstream/Button.vue";
import Input from "@/Jetstream/Input.vue";
import {useForm} from "@inertiajs/vue3";
import {computed, onBeforeMount, onUnmounted, ref} from "vue";
import Errors from "@/Components/Errors.vue";
import {Cropper} from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import Icon from "@/Components/Icon.vue";
import Textbox from "@/Components/Textbox.vue";
import TipTap from "@/Components/TipTap.vue";
import {capitalize, getUser, invisiblePixel} from "@/util.js";
import {useFileDialog} from "@vueuse/core";
import route from "ziggy-js";
import Checkbox from "@/Jetstream/Checkbox.vue";
import {isPremium} from "@/util";
import CosmeticCard from "@/Components/CosmeticCard.vue";
import CosmeticName from "@/Components/CosmeticName.vue";
import PremiumButton from "@/Components/PremiumButton.vue";
import Toggle from "@/Components/Toggle.vue";
import {hex, score} from "wcag-contrast/index.js";

const props = defineProps({
    flags: Object,
    cosmetics: Object,
    owned_cosmetics: Object,
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

    custom_title: profile.value.custom_title ?? '',

    signature: profile.value.signature ?? '',
    signature_visibility: profile.value.signature_visibility,
});

const imageForm = useForm({
    kind: '',
    coordinates: '',
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
        visibility: true,
    },
    birthday: {
        type: 'date',
        visibility: true,
    },
    location: {
        type: 'field',
        placeholder: 'ex. New York, NY',
        visibility: true,
    },
    custom_title: {
        type: 'field',
        placeholder: 'Review Master',
        description: 'Customize your user flair, visible on your profile and username hover card',
        premium: true,
    },
    bio: {
        type: 'rich',
        placeholder: 'Tell us about yourself...',
        max: 2000,
    },
    signature: {
        type: 'area',
        placeholder: 'Sincerely, Summer Glau',
        max: 200,
    },
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
const blob = ref(null);

const { open: chooseImage, onChange} = useFileDialog({
    accept: 'image/*',
    directory: false,
    multiple: false,
    reset: true
})

onChange((files) => {
    if (!files || files.length === 0) return;
    if (blobURL.value || blob.value) {
        // Clear previous blob if any
        URL.revokeObjectURL(blobURL.value);
        blob.value = null;
    }

    blobURL.value = URL.createObjectURL(files[0]);
    blob.value = files[0];
    imageModal.value = true;
})

const editImage = (type) => {
    activeImage.value = type;
    chooseImage();
}

const saveImage = () => {
    if (!cropper.value) return;

    imageForm.kind = activeImage.value;

    imageForm.coordinates = cropper.value.getResult().coordinates;
    imageForm.image = blob.value

    imageForm.post(route('settings.profile.image.store'), {
        preserveScroll: true,
        errorBag: 'image',
        forceFormData: true,
        preserveState: false,
        onSuccess: () => {
            imageForm.reset()
            imageModal.value = false;
            activeImage.value = '';
            URL.revokeObjectURL(blobURL.value);
            blobURL.value = '';
            blob.value = null;
        }
    });
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

const tab = ref(0);

const cosmeticForm = useForm({
    name: getUser().cosmetics?.['name_color']?.value ?? '#ffffff',
    glow: getUser().cosmetics?.['glow_color']?.value ?? '#ffffff',
    sparkle: getUser().cosmetics?.['sparkles_color']?.value ?? '#ffffff',
    name_enabled: (getUser().cosmetics ?? {}).hasOwnProperty('name_color'),
    glow_enabled: (getUser().cosmetics ?? {}).hasOwnProperty('glow_color'),
    sparkle_enabled: (getUser().cosmetics ?? {}).hasOwnProperty('sparkle_color'),
});

const resetCosmetics = () => {
    cosmeticForm.name_enabled = false;
    cosmeticForm.glow_enabled = false;
    cosmeticForm.sparkle_enabled = false;
    saveCosmetic();
};

const saveCosmetic = () => {
    cosmeticForm.patch(route('settings.cosmetics.update'), {
        preserveScroll: true,
        errorBag: 'cosmetic'
    });
};

const nameContrast = ref(1);

const bgCol = computed(() => {
    if (!window) return 0;

    let rgb = window.getComputedStyle(document.body).getPropertyValue('--color-ui-900');

    return rgb.split(/\s+/).map(n => n|0);
});

const rgbToHex = (r, g, b) => {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

const hexToRgb = (hex) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
    ] : null;
}

const cosm = computed(() => {
    let out = {};

    if (cosmeticForm.name_enabled) {
        out['name_color'] = {
            slot: 'name_color',
            value: cosmeticForm.name,
            classes: null,
            styles: null,
        };
    }

    if (cosmeticForm.glow_enabled) {
        out['glow_color'] = {
            slot: 'glow_color',
            value: cosmeticForm.glow,
            classes: null,
            styles: null,
        };
    }

    if (cosmeticForm.sparkle_enabled) {
        out['sparkle_color'] = {
            slot: 'sparkle_color',
            value: cosmeticForm.sparkle,
            classes: 'cosmetic-sparkles',
            styles: null,
        };
    }

    let bg = bgCol.value;

    if (cosmeticForm.glow_enabled) {
        // how much to combine
        const alpha = 0.5;
        const glow = hexToRgb(cosmeticForm.glow);
        bg = bg.map((col, i) => Math.round(glow[i] * alpha + col * (1 - alpha)));
    }

    nameContrast.value = hex(cosmeticForm.name, rgbToHex(...bg));

    return out;
});
</script>
<template>
    <dashboard-layout :show-title="false">
        <div class="x justify-between items-center">
            <h1 class="text-4xl font-bold">Profile</h1>
            <div class="x pl-3 pr-4 py-1 items-center space-x-1 bg-amber-500/25 text-amber-500 rounded-lg">
                <Icon name="circle-stack"/>
                <span>{{ getUser().credits }}</span>
            </div>
        </div>
        <p class="rounded-lg bg-[#d28eff]/25 border border-[#d28eff] px-2 py-1 text-white text-center">Supporters can upload animated GIFs as their avatars, banners, and postbit backgrounds!</p>
        <div class="flex flex-col md:flex-row gap-4 pane !p-4">
            <div class="flex flex-col grow">
                <h2 class="text-xl font-bold">Avatar</h2>
                <p class="grow">Your profile icon site-wide</p>
                <div class="flex gap-2 mt-2">
                    <button :disabled="imageForm.processing" @click="editImage('avatar')" class="px-2 py-1 bg-ui-800/75 rounded-lg">Upload Image</button>
                    <button :disabled="imageRemoveForm.processing" @click="removeImage('avatar')" class="px-2 py-1 bg-ui-800/75 rounded-lg">Remove Image</button>
                </div>
            </div>
            <div class="bg-center bg-cover rounded-lg bg-ui-950 shrink-0 md:w-1/3 h-32" :style="`background-image:url(${profile.avatar_url ?? invisiblePixel});`"></div>
        </div>
        <div class="flex flex-col md:flex-row gap-4 pane !p-4">
            <div class="flex flex-col grow">
                <h2 class="text-xl font-bold">Profile Banner</h2>
                <p class="grow">Displays as the background on your profile page and profile hover card</p>
                <div class="flex gap-2 mt-2">
                    <button :disabled="imageForm.processing" @click="editImage('banner')" class="px-2 py-1 bg-ui-800/75 rounded-lg">Upload Image</button>
                    <button :disabled="imageRemoveForm.processing" @click="removeImage('banner')" class="px-2 py-1 bg-ui-800/75 rounded-lg">Remove Image</button>
                </div>
            </div>
            <div class="bg-center bg-cover rounded-lg bg-ui-950 shrink-0 md:w-1/3 h-32" :style="`background-image:url(${profile.banner_url ?? invisiblePixel});`"></div>
        </div>
        <div class="flex flex-col md:flex-row gap-4 pane !p-4">
            <div class="flex flex-col grow">
                <h2 class="text-xl font-bold">Postbit Background</h2>
                <p class="grow">Your postbit is where your profile information is displayed next to your forum posts.</p>
                <div class="flex gap-2 mt-2">
                    <button v-if="isPremium()" :disabled="imageForm.processing" @click="editImage('postbit')" class="px-2 py-1 bg-ui-800/75 rounded-lg">Upload Image</button>
                    <PremiumButton v-else/>
                    <button v-if="profile.postbit_url || isPremium()" :disabled="imageRemoveForm.processing" @click="removeImage('postbit')" class="px-2 py-1 bg-ui-800/75 rounded-lg">Remove Image</button>
                </div>
            </div>
            <div class="bg-center bg-cover rounded-lg bg-ui-950 shrink-0 md:w-1/3 h-32" :style="`background-image:url(${profile.postbit_url ?? invisiblePixel});`"></div>
        </div>
        <teleport to="#app">
            <div v-if="imageModal" class="y items-center justify-center z-[100] fixed inset-0 bg-ui-1000/50" >
                <div class="md:rounded-lg bg-ui-900 w-full md:max-w-xl cursor-auto shadow-xl pb-2">
                    <div class="x justify-between space-x-2 items-center py-2 px-2 rounded-t-lg">
                        <Icon @click="imageModal = false; activeImage = null;" scale="size-6" class="cursor-pointer" name="x-mark"/>
                        <button @click="saveImage" class="rounded-md bg-ui-700 px-2 py-1">Save</button>
                    </div>
                    <Cropper ref="cropper" :default-size="({imageSize: i, visibleArea : v}) => ({width: (v || i).width, height: (v || i).height})" :stencil-props="{aspectRatio: images[activeImage]}" class="h-64" :src="blobURL"/>
                    <div class="x justify-center items-center space-x-2 pt-2">
                        <button @click="$refs.cropper.rotate(-90)" class="bg-ui-800 rounded-md p-2">
                            <Icon name="arrow-uturn-left" scale="size-4"/>
                        </button>
                        <button @click="$refs.cropper.rotate(90)" class="bg-ui-800 rounded-md p-2">
                            <Icon name="arrow-uturn-right" scale="size-4"/>
                        </button>
                    </div>
                    <Errors bag="image" class="px-2"/>
                </div>
            </div>
        </teleport>
        <div class="flex flex-col gap-2 pane !p-4">
            <h2 class="text-xl font-bold">Username Customization</h2>
            <CosmeticName class="text-xl" :cosmetics="cosm">{{ getUser().name }}</CosmeticName>
            <CosmeticName :cosmetics="cosm">{{ getUser().name }}</CosmeticName>
            <p class="grow">Customize your username with colors and effects</p>
            <div class="px-2 py-1 border border-amber-500 bg-amber-500/10 text-white rounded-lg" v-show="nameContrast < 4.5 && isPremium()">
                <p>Your chosen name and glow colors may be difficulty for visually impaired people to see against the background. Please be considerate about the readability of your name for other users.</p>
                <p class="font-bold">WCAG Accessibility rating: {{ score(nameContrast) }} ({{ nameContrast.toFixed(2) }})</p>
            </div>
            <div v-if="isPremium()" class="flex flex-col gap-2">
                <div class="flex items-center gap-2">
                    <Toggle v-model="cosmeticForm.name_enabled"/>
                    <input @change="cosmeticForm.name_enabled = true" type="color" v-model="cosmeticForm.name"/>
                    <span>Username Color</span>
                </div>
                <div class="flex items-center gap-2">
                    <Toggle v-model="cosmeticForm.glow_enabled"/>
                    <input @change="cosmeticForm.glow_enabled = true" type="color" v-model="cosmeticForm.glow"/>
                    <span>Username Glow</span>
                </div>
                <div class="flex items-center gap-2">
                    <Toggle v-model="cosmeticForm.sparkle_enabled"/>
                    <input @change="cosmeticForm.sparkle_enabled = true" type="color" v-model="cosmeticForm.sparkle"/>
                    <span>Username Sparkle</span>
                </div>
                <button @click="saveCosmetic" class="bg-ui-800 rounded-md p-2">Save</button>
                <button @click="resetCosmetics" class="bg-ui-800 rounded-md p-2">Reset</button>
                <span v-show="cosmeticForm.recentlySuccessful" class="text-green-500">Changes Saved</span>
            </div>
            <div v-else>
                <p v-if="getUser().cosmetics" class="text-[#d28eff] mb-2">Join our Patreon to regain access to your username customizations!</p>
                <PremiumButton/>
            </div>
        </div>
        <div class="x justify-center" v-if="0">
            <div class="p-1 bg-ui-900 x w-fit rounded-lg border border-ui-700">
                <button class="x items-center space-x-1 px-2 rounded-lg border" :class="tab === 0 ? 'bg-blue-500/25 border-blue-500 text-white' : 'border-transparent'" @click="tab = 0">
                    <Icon name="user" size="16" scale="size-4"/>
                    <span>Profile</span>
                </button>
                <button class="x items-center space-x-1 px-2 rounded-lg border" :class="tab === 1 ? 'bg-blue-500/25 border-blue-500 text-white' : 'border-transparent'" @click="tab = 1">
                    <Icon name="paint-brush" size="16" scale="size-4"/>
                    <span>Cosmetics</span>
                </button>
                <button class="x items-center space-x-1 px-2 rounded-lg border" :class="tab === 2 ? 'bg-blue-500/25 border-blue-500 text-white' : 'border-transparent'" @click="tab = 2">
                    <Icon name="building-storefront" size="16" scale="size-4"/>
                    <span>Shop</span>
                </button>
            </div>
        </div>
        <div v-show="tab === 0" class="y pane">
            <div v-if="0" class="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-2 md:items-start w-full">
                <div class="md:w-1/3">
                    <span class="text-sm px-2">Pronouns</span>
                    <Input @input="parsePronouns" v-model="profileForm.pronouns" type="text" placeholder="Pronouns (ex. they/them)"/>
                    <div v-if="0" class="x space-x-1 items-center text-ui-500 mt-0.5">
                        <Icon name="information-circle" scale="size-4"/>
                        <span class="text-sm">Pronouns follow a specific format! <u class="text-ui-100">More Info</u></span>
                    </div>
                </div>
                <div class="y space-y-2 px-1 py-1 bg-ui-950 rounded-md md:w-1/4 !mt-6">
                    <div v-for="(p, i) in pronounOrder" class="x space-x-2 rounded-md bg-ui-900 px-2 py-1">
                        <Icon name="bars-4" size="24" scale="size-6" class="text-ui-600 cursor-move focus:cursor-grabbing"/>
                        <span class="grow">{{ i + 1 }}. {{ pronounList[p].join('/') }}</span>
                        <Icon @click="movePronoun(i, null)" name="x-mark" size="24" scale="size-6" class="text-red-500 cursor-pointer"/>
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
                    <div class="x justify-between mt-2 text-sm px-2">
                        <span class="capitalize">{{ key.replaceAll('_', ' ') }}</span>
                        <button v-if="!(field.premium && !isPremium())" @click="profileForm[key] = null" class="text-ui-500 hover:text-white hover:underline">Reset</button>
                    </div>
                    <div v-if="field.premium && !isPremium()">
                        <p v-if="getUser()[key]" class="mb-2 text-[#d28eff] px-3 py-1 bg-ui-950 rounded-lg">To regain access to this customization, join our Patreon!</p>
                        <PremiumButton/>
                    </div>
                    <div v-else>
                        <Input v-if="field.type === 'field'" v-model="profileForm[key]" type="text" :placeholder="field.placeholder ?? capitalize(key)"/>
                        <input v-if="field.type === 'date'" v-model="profileForm[key]" type="date" class="px-2 py-1 bg-ui-800 rounded-lg border-none w-full"/>
                        <Textbox v-if="field.type === 'area'" v-model="profileForm[key]" :max="field.max" :placeholder="field.placeholder ?? capitalize(key)"/>
                        <TipTap v-if="field.type === 'rich'" v-model="profileForm[key]" :max="field.max" class="border border-ui-700 rounded-lg"/>
                    </div>
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
            <label class="x space-x-2 items-center px-2">
                <Checkbox v-model="profileForm['signature_visibility']"/>
                <span>Show signature by default</span>
            </label>
            <Errors bag="profile"/>
            <div class="x space-x-2 items-center mt-2">
                <Button @click="saveProfile" class="w-fit" :disabled="!profileForm.isDirty || profileForm.processing">Save</Button>
                <span v-show="profileForm.recentlySuccessful" class="text-green-400">Done!</span>
            </div>
        </div>
        <div v-show="tab === 1" class="y pane">
            <div class="pane">
                <div class="relative">
                    <div class="x space-x-2 relative w-full justify-between px-3 pt-1 z-20">
                        <div v-for="i in [0, 1, 2, 3, 4, 5, 6]" :key="i" class="y items-center text-center">
                            <div class="rounded-full aspect-square" :class="{'bg-blue-500': i < 3}">{{ i + 1 }}</div>
                        </div>
                    </div>
                    <div class="x space-x-2 absolute top-0 w-full justify-between">
                        <div v-for="i in [0, 1, 2, 3, 4, 5, 6]" :key="i" class="y items-center text-center">
                            <div class="rounded-full aspect-square p-4 bg-ui-800"></div>
                        </div>
                    </div>
                    <div class="py-1 absolute left-2 right-2 top-2.5 bg-ui-800 z-10">
                        <div class="py-0.5 bg-blue-500" :style="`width:${Math.max(3 - 1, 0) / 6 * 100}%;`"></div>
                    </div>
                </div>
                <div class="x justify-between px-0.5 mt-1">
                    <div v-for="i in [0, 1, 2, 3, 4, 5, 6]" :key="i" class="y items-center text-center">100</div>
                </div>
            </div>
        </div>
        <div v-show="tab === 2" class="y gap-2">
            <div class="flex items-center gap-4 border border-fuchsia-500 bg-fuchsia-500/10 px-4 py-2 rounded-lg">
                <Icon name="heart" class="p-1.5 rounded-lg text-fuchsia-500 bg-fuchsia-500/25"/>
                <span>Cosmetics available to Patreon members for as long as they are subscribed. When you membership ends you will lose access to these cosmetics and if equipped they will be unequipped.</span>
            </div>
            <div class="flex items-center gap-4 border border-green-500 bg-green-500/10 px-4 py-2 rounded-lg">
                <Icon name="banknotes" class="p-1.5 rounded-lg text-green-500 bg-green-500/25"/>
                <span>Cosmetics purchased with real-world currency. Once these cosmetics are purchased you get to keep them regardless of Patreon membership status.</span>
            </div>
            <div class="flex items-center gap-4 border border-amber-500 bg-amber-500/10 px-4 py-2 rounded-lg">
                <Icon name="circle-stack" class="p-1.5 rounded-lg text-amber-500 bg-amber-500/25"/>
                <span>Cosmetics purchased with site credits. Credits are earned through various site activities. Learn more. Once these cosmetics are purchased you get to keep them regardless of Patreon membership status.</span>
            </div>
            <span>Your Cosmetics</span>
            <p>{{owned_cosmetics}}</p>

            <div v-for="(type, key) in cosmetics">
                <h2 class="capitalize font-bold text-lg mb-2">{{ key.replaceAll('_', ' ') }}</h2>
                <div class="grid grid-cols-3 gap-2">
                    <CosmeticCard v-for="c in type" :cosmetic="c"/>
                </div>
            </div>
            <CosmeticName class="text-2xl font-bold" :cosmetics="['rainbow', 'sparkles']">Hyperbolus</CosmeticName>
            <textarea v-if="0">{{cosmetics}}</textarea>
            <div v-if="0">
                <h2 class="text-lg font-bold">Name Glow</h2>
                <h3>Add a glow color to your username</h3>
            </div>
            <div  v-if="0" class="grid grid-cols-3 gap-2 mt-2">
                <CosmeticCard type="name" name="Rainbow Gradient" :ids="['rainbow']" :cents="499" premium description="Animated rainbow name"/>
                <CosmeticCard type="name" name="Sparkles" :ids="['sparkles']" :cents="499" premium description="Sparkles"/>
                <CosmeticCard type="name" name="Pulse" :ids="['pulse', 'glow-green', 'text-transparent']" :cents="499" premium description="Pulse"/>
            </div>
        </div>
    </dashboard-layout>
</template>
