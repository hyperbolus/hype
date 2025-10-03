<script setup>
import TipTap from "@/Components/TipTap.vue";
import Post from "@/Components/Post.vue";
import Button from "@/Jetstream/Button.vue";
import {computed, onMounted, ref} from "vue";
import Tooltip from "@/Components/Tooltip.vue";
import Resumable from "resumablejs";
import route from 'ziggy-js'
import prettyBytes from "pretty-bytes";
import {usePage} from "@inertiajs/vue3";
import {getUser} from "../util.js";
import Checkbox from "@/Jetstream/Checkbox.vue";
import Icon from "@/Components/Icon.vue";

const props = defineProps({
    modelValue: {
        type: Object,
        required: true
    },
    submit: Function,
    disabled: Boolean,
    attachments: Boolean
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
const dropbox = ref(null)

const resumable = ref(new Resumable({
    chunkSize: 1 * 1024 * 1024, // 1MB
    simultaneousUploads: 3,
    testChunks: false,
    throttleProgressCallbacks: 1,
    target: route('media.upload'),
    query:{_token : usePage().props.app.csrf}
}))

onMounted(() => {
    resumable.value.assignBrowse(dropbox.value);
    resumable.value.assignDrop(dropbox.value);

    resumable.value.on('fileAdded', function(file, event){
        filelist.value[file.uniqueIdentifier] = {
            'name': file.fileName,
            'size': file.size,
            'progress': file.progress()
        }
        resumable.value.upload()
    })
    resumable.value.on('fileSuccess', function(file, message){
        console.log('file_success')
    })
    resumable.value.on('fileError', function(file, message){
        console.log('file_error')
    })
    resumable.value.on('fileProgress', function(file, message){
        filelist.value[file.uniqueIdentifier]['progress'] = file.progress()
        progress.value = resumable.value.progress()
    })
})

const filelist = ref({})
const progress = ref(0)
</script>
<template>
    <div class="pane !p-0 border border-ui-700">
        <TipTap v-model="value.body"/>
        <div class="!hidden y gap-2 p-4 bg-ui-800">
            <span class="tracking-widest uppercase text-sm text-ui-500">Attachments:</span>
            <div ref="dropbox" class="y cursor-pointer place-items-center gap-2 p-4 rounded border-2 text-ui-500 border-dashed border-ui-700 bg-ui-900">
                <Icon class="w-8" size="24" type="outline" name="arrow-up-tray"/>
                <span>Click or drag and drop some file(s) here to upload</span>
            </div>
            <div v-for="(file, id) in filelist" :key="id" class="y gap-2">
                <div class="x gap-2 justify-between items-center rounded box !px-2 !py-1">
                    <div class="x gap-2 items-center">
                        <!--
                        Proposed Types:
                        - File/Paperclip
                        - Archive
                        - Image
                        - Gif
                        - Film
                        -->
                        <Icon class="w-4" size="20" type="solid" name="document"/>
                        <a class="text-sm text-blue-500 hover:underline truncate whitespace-nowrap" href="/download/X3D76GqO">{{ file.name }}</a>
                        <span class="text-xs whitespace-nowrap">({{ prettyBytes(file.size) }})</span>
                    </div>
                    <div class="x items-center gap-2">
                        <span class="text-xs">{{ Math.round(file.progress * 100) }}%</span>
                        <div class="rounded-full overflow-hidden border border-ui-700 w-64">
                            <div class="text-xs py-1 transition-[width] duration-500" :class="file.progress === 1 ? 'bg-green-500' : 'bg-blue-500'" :style="`width: ${file.progress * 100}%;`"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="y p-2 items-center space-y-2 border-t border-ui-700">
            <Tooltip class="w-full" :message="!$page.props.user.signature ? 'You have not specified a post signature in your profile settings' : ''">
                <div class="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2">
                    <span class="shrink-0">Signature Visibility</span>
                    <select v-model="value.signature" class="block py-1 px-3 w-full border-none focus:ring-0 focus:outline-none rounded bg-ui-950">
                        <option :value="true">Always show</option>
                        <option :value="false">Always hide</option>
                        <option :value="null">Use my default ({{ getUser().signature_visibility ? 'show' : 'hide' }})</option>
                    </select>
                </div>
            </Tooltip>
        </div>
    </div>
    <div class="x justify-center">
        <div class="y space-y-2">
            <label class="x items-center space-x-2">
                <Checkbox v-model="value.watch" :checked="value.watch"/>
                <span>Watch this thread</span>
            </label>
            <label class="x items-center space-x-2 ml-8">
                <Checkbox :disabled="!value.watch" :class="{'cursor-not-allowed opacity-50': !value.watch}" v-model="value.watch_email"  :checked="value.watch_email"/>
                <span>And email me notifications</span>
            </label>
        </div>
    </div>
    <form v-if="submit" class="flex justify-center space-x-2" @submit.prevent="submit">
        <Button :class="value.processing ? 'opacity-50' : ''" :disabled="value.processing">Post Reply</Button>
    </form>
    <div :class="{'hidden': !showingPreview}">
        <Post :post="value" v-if="value" :preview="true" :user="$page.props.user"/>
    </div>
</template>
