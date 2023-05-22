<script setup>
import {Link, useForm} from '@inertiajs/vue3';
import Button from '@/Jetstream/Button.vue'
import Input from '@/Jetstream/Input.vue'
import Dropdown from '@/Jetstream/Dropdown.vue'
import {ref} from "vue";
import AppLayout from "@/Layouts/Dash.vue";

const props = defineProps({
    level: Object,
    tags: Array
})

const dropdown = ref(null)
const tagname = ref(null)
const tags = ref(props.tags)
const latestResponse = ref(null)

const form = useForm({
    approved: true,
    tag_id: null
})

const addTag = () => {
    form.post(route('levels.tags.store', props.level.id), {
        onSuccess: () => {
            tagname.value = ''
            form.reset()
        }
    });
}

const vote = (tag_id, approve) => {
    form.approved = approve
    form.tag_id = tag_id
    addTag()
}

const searchTag = async () => {
    let time = Date.now()
    form.tag_id = null
    fetch('/api/search?type=tag&name=' + tagname.value)
        .then(res => res.json())
        .then(data => {
            if(latestResponse.value < time) {
                tags.value = data
                dropdown.value.open = true;
            }
        })
}

const selectTag = (tag) => {
    form.tag_id = tag.id
    tagname.value = tag.name
}
</script>
<template>
    <app-layout title="Home">
        <template #breadcrumbs>
            <Link :href="route('levels.show', level.id)">{{ level.id }}</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <span>Tags</span>
        </template>
        <div class="y space-y-2 md:w-1/3">
            <h2 class="font-bold text-2xl">Info</h2>
            <form v-if="$page.props.auth" @submit.prevent="addTag" class="y pane space-y-2">
                <div>
                    <span class="block font-medium text-sm text-neutral-500 dark:text-neutral-300">Tag</span>
                    <Input @click="dropdown.open = true" @input="searchTag" v-model="tagname" class="mt-1" type="text" placeholder="Tag"/>
                    <Dropdown align="left" ref="dropdown">
                        <template #content>
                            <ul>
                                <li class="px-4 py-1" v-if="tags.length === 0">No Results</li>
                                <template v-else>
                                    <li class="text-sm italic bg-neutral-200 dark:bg-ui-800 px-2 border-b border-neutral-300 dark:border-ui-700">You must click to select</li>
                                    <li class="px-2 py-1 dark:hover:bg-ui-700 cursor-pointer" v-for="tag in tags" @click="selectTag(tag)">{{ tag.name }}</li>
                                </template>
                            </ul>
                        </template>
                    </Dropdown>
                </div>
                <ul v-if="$page.props.errorBags.default" class="mt-3 list-disc list-inside text-sm text-red-600">
                    <li v-for="(error, key) in $page.props.errors" :key="key">
                        {{ error }}
                    </li>
                </ul>
                <Button class="w-fit">Submit Tag</Button>
            </form>
            <p v-if="!$page.props.auth" class="pane">
                You must be <Link :href="route('auth::login')" class="underline">logged in</Link> to add or vote on tags.
            </p>
            <p class="pane">
                Here you can vote on which tags do or don't fit a level by voting for or against them.
            </p>
            <ul class="pane list-inside list-disc space-y-4">
                <li>The top rated tags will appear on the level's page.</li>
                <li>Site moderators can manually mark tags as "verified."</li>
                <li>Tags with consistently low scores will periodically be pruned from the tag list completely</li>
                <li>Available tags are pre-approved by moderators. If you want to discuss the removal or addition of a tag, visit the level discussion forum.</li>
            </ul>
        </div>
        <div class="y space-y-2 md:w-2/3">
            <h2 class="font-bold text-2xl">Level Tags</h2>
            <div class="y space-y-2">
                <div class="pane" v-if="level.tags.length === 0">This level has no tags.</div>
                <div v-for="tag in level.tags" class="x pane justify-between">
                    <div class="x items-center space-x-2">
                        <svg v-if="tag.pivot.verified" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="inline rounded-full text-green-500 w-5 h-5">
                            <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                        </svg>
                        <h2>{{ tag.name }}</h2>
                        <template v-if="$page.props.auth">
                            <svg @click="vote(tag.id, false)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="cursor-pointer w-5 h-5">
                                <path d="M18.905 12.75a1.25 1.25 0 01-2.5 0v-7.5a1.25 1.25 0 112.5 0v7.5zM8.905 17v1.3c0 .268-.14.526-.395.607A2 2 0 015.905 17c0-.995.182-1.948.514-2.826.204-.54-.166-1.174-.744-1.174h-2.52c-1.242 0-2.26-1.01-2.146-2.247.193-2.08.652-4.082 1.341-5.974C2.752 3.678 3.833 3 5.005 3h3.192a3 3 0 011.342.317l2.733 1.366A3 3 0 0013.613 5h1.292v7h-.963c-.684 0-1.258.482-1.612 1.068a4.012 4.012 0 01-2.165 1.73c-.433.143-.854.386-1.012.814-.16.432-.248.9-.248 1.388z" />
                            </svg>
                            <svg @click="vote(tag.id, true)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="cursor-pointer w-5 h-5">
                                <path d="M1 8.25a1.25 1.25 0 112.5 0v7.5a1.25 1.25 0 11-2.5 0v-7.5zM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0114 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 01-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 01-1.341-.317l-2.734-1.366A3 3 0 006.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 012.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388z" />
                            </svg>
                        </template>
                    </div>
                    <div>
                        <span>Score: {{ tag.pivot.score }}</span>
                    </div>
                </div>
            </div>
        </div>
    </app-layout>
</template>
