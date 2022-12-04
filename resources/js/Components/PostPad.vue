<script setup>
import Toggle from "@/Components/Toggle.vue";
import TipTap from "@/Components/TipTap.vue";
import Post from "@/Components/Post.vue";
import Button from "@/Jetstream/Button.vue";
import {computed, ref} from "vue";
import Tooltip from "@/Components/Tooltip.vue";

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
</script>
<template>
    <div class="pane !p-0 border border-neutral-300 dark:border-neutral-700">
        <TipTap v-model="value.body"/>
<!--    <textarea v-else v-model="value.body" class="resize-none resize-y !rounded-none w-full bg-neutral-100 dark:bg-neutral-900"></textarea>-->
        <div class="flex p-2 items-center space-x-2 border-t border-neutral-300 dark:border-neutral-700">
            <Tooltip :message="!$page.props.user.signature ? 'You have not specified a post signature' : ''">
                <div class="flex items-center space-x-2">
                    <Toggle :disabled="!$page.props.user.signature" v-model="value.signature"/>
                    <span :class="{'opacity-50': !$page.props.user.signature}">Show Signature</span>
                </div>
            </Tooltip>
            <!-- TODO: this preview when rendered with a readonly tiptap doesnt update from the other tiptap editor -->
<!--            <div class="flex items-center space-x-2">-->
<!--                <Toggle v-model="showingPreview"/>-->
<!--                <span>Show Preview</span>-->
<!--            </div>-->
        </div>
    </div>
    <form v-if="submit" class="flex justify-center space-x-2" @submit.prevent="submit">
        <Button :class="value.processing ? 'opacity-50' : ''" :disabled="value.processing">Post Reply</Button>
    </form>
    <div :class="{'hidden': !showingPreview}">
        <Post :post="value" v-if="value" :preview="true" :user="$page.props.user"/>
    </div>
</template>
