<script setup>
import Toggle from "@/Components/Toggle.vue";
import TipTap from "@/Components/TipTap.vue";
import Post from "@/Components/Post.vue";
import {computed, ref} from "vue";

const props = defineProps({
    modelValue: {
        type: Object,
        required: true
    },
    submit: Function,
    disabled: Boolean
})

const showingPreview = ref(false);

const value = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

const emit = defineEmits(['update:modelValue'])

const richToggle = () => {
    if(value.value.body.length === 0) {
        value.value.body = '';
        value.value.rich = !value.value.rich
    } else {
        if (confirm('This will erase your current draft, are you sure?')) {
            value.value.body = '';
            value.value.rich = !value.value.rich
        }
    }
}
</script>
<template>
    <div class="rounded bg-neutral-900 p-4 border border-neutral-700">
        <TipTap v-if="value.rich" v-model="value.body"/>
        <textarea v-else v-model="value.body" class="resize-none resize-y focus:ring-0 w-full rounded bg-neutral-800"></textarea>
        <div class="flex mt-2 items-center space-x-2">
            <div class="flex items-center space-x-2">
                <Toggle :disabled="!$page.props.user.signature" v-model="value.signature"/>
                <span :class="{'opacity-50': !$page.props.user.signature}">Show Signature</span>
            </div>
            <div class="flex items-center space-x-2">
                <Toggle v-model="showingPreview"/>
                <span>Show Preview</span>
            </div>
            <div class="flex items-center space-x-2" @click="richToggle">
                <Toggle disabled class="cursor-pointer opacity-100" v-model="value.rich"/>
                <span>Rich Text</span>
            </div>
        </div>
    </div>
    <form v-if="submit" class="flex justify-center space-x-2" @submit.prevent="submit">
        <button type="submit" class="cursor-pointer px-2 py-1 rounded bg-blue-600 transition" :class="value.processing ? 'opacity-50' : ''" :disabled="value.processing">Post Reply</button>
    </form>
    <div :class="{'hidden': !showingPreview}">
        <Post :post="value" :preview="true" :user="$page.props.user"/>
    </div>
</template>
