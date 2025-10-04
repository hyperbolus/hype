<script setup>
import {Link} from "@inertiajs/vue3";
import Toggle from "@/Components/Toggle.vue";
import {GDPR_KEY, GDPR_VERSION, getGDPR, siteName} from "../util.js";
import route from "ziggy-js";
import Icon from "@/Components/Icon.vue";

const consent = getGDPR()

const all = (value) => {
    consent.value.data.tracking = value;
    consent.value.data.targeting = value;

    // Let the user see the toggles change
    setTimeout(() => {
        close();
    }, 200)
}

const close = () => {
    // TODO@later: logic for disabling/enabling the stuff when it's added

    consent.value.dismissed = true;
}
</script>
<template>
    <div v-show="!consent.dismissed" class="space-y-2 pane border border-ui-700 shadow-xl md:w-full md:max-w-xl fixed bottom-2 left-2 right-2 md:left-4 md:bottom-4 md:right-auto z-50">
        <div class="x items-center justify-between">
            <h2 class="text-2xl font-bold">GDPR Cookie Consent</h2>
            <Icon @click="close" name="x-mark" class="size-6 cursor-pointer"/>
        </div>
        <p>{{ siteName() }} uses cookies and local browser storage to enable basic functionality of the site. If we make any changes to these options we will ask for your consent again.</p>
        <div class="x space-x-2 items-center">
            <Toggle :model-value="true" :disabled="true"/>
            <span>Strictly necessary</span>
        </div>
        <div class="x space-x-2 items-center">
            <Toggle v-model="consent.data.tracking"/>
            <span>Analytics and performance</span>
        </div>
        <div class="x space-x-2 items-center">
            <Toggle v-model="consent.data.targeting"/>
            <span>Advertising personalization</span>
        </div>
        <div class="y md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-2">
            <button @click="all(false)" class="px-4 py-1 rounded-md bg-ui-700 text-white w-full">Reject non-essential</button>
            <button @click="all(true)" class="px-4 py-1 rounded-md bg-ui-700 text-white w-full">Accept all</button>
        </div>
        <p class="text-center">sorry about this gang</p>
        <div class="y md:flex-row space-x-2 items-center justify-between text-sm text-ui-500">
            <div class="x space-x-4">
                <Link class="hover:underline" :href="route('legal.terms')">Terms of Service</Link>
                <Link class="hover:underline" :href="route('legal.privacy')">Privacy Policy</Link>
            </div>
            <span class="font-mono text-xs text-ui-600">{{ GDPR_KEY }} v{{GDPR_VERSION}}</span>
        </div>
    </div>
</template>
