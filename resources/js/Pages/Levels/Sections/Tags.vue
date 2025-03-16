<script setup>
import {Link, useForm} from '@inertiajs/vue3';
import Button from '@/Jetstream/Button.vue'
import Input from '@/Jetstream/Input.vue'
import Dropdown from '@/Jetstream/Dropdown.vue'
import {onMounted, onUpdated, ref} from "vue";
import Layout from "../Layout.vue";
import route from 'ziggy-js'
import {isAdmin} from "@/util.js";
import Errors from "@/Components/Errors.vue";

const props = defineProps({
    level: Object,
    tags: Array,
    votes: Array
})

const dropdown = ref(null)
const tagname = ref(null)
const tags = ref(props.tags)
const latestResponse = ref(null)

const form = useForm({
    approved: true,
    tag_id: null
})

const formVerify = useForm({
    verify: true,
    tag_id: null
})

const addTag = () => {
    form.post(route('levels.tags.store', props.level.id), {
        onSuccess: () => {
            tagname.value = ''
            form.reset()
            calcVotes()
        }
    });
}

const verify = (tag_id, verify) => {
    formVerify.verify = verify
    formVerify.tag_id = tag_id
    formVerify.post(route('levels.tags.store', props.level.id), {
        onSuccess: () => {
            formVerify.reset()
            calcVotes()
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

const votes = ref([]);

const calcVotes = () => {
    props.level.tags.forEach((tag) => {
        let vote = props.votes.find(o => o.votable_id === tag.id)
        if (vote) {
            tag.approved = vote.approved;
        }
        tag.voted = !!vote;
    })
}

onMounted(() => {
    calcVotes()
})
</script>
<template>
    <Layout :level="level" title="Tags">
        <div class="x !mt-0 flex-col md:flex-row bg-ui-950 border border-ui-900 rounded-lg px-4 py-2 space-x-2">
            <div class="y space-y-2 md:w-1/3">
                <h2 class="font-bold text-2xl">Info</h2>
                <form v-if="$page.props.auth" @submit.prevent="addTag" class="y pane space-y-2">
                    <div>
                        <span class="block font-medium text-sm text-ui-300">Tag</span>
                        <Input @click="dropdown.open = true" @input="searchTag" v-model="tagname" class="mt-1" type="text" placeholder="Tag"/>
                        <Dropdown align="left" ref="dropdown">
                            <template #content>
                                <ul class="max-h-[50vh] overflow-y-auto">
                                    <li class="px-4 py-1" v-if="tags.length === 0">No Results</li>
                                    <template v-else>
                                        <li class="text-sm italic bg-ui-800 px-2 border-b border-ui-700">You must click to select</li>
                                        <li class="px-2 py-1 hover:bg-ui-700 cursor-pointer" v-for="tag in tags" @click="selectTag(tag)">{{ tag.name }}</li>
                                    </template>
                                </ul>
                            </template>
                        </Dropdown>
                    </div>
                    <Errors/>
                    <Button class="w-fit">Submit Tag</Button>
                </form>
                <p v-if="!$page.props.auth" class="pane">
                    You must be <Link :href="route('auth::login')" class="underline">logged in</Link> to add or vote on tags.
                </p>
                <p class="pane">
                    Here you can vote on which tags do or don't fit a level by voting for or against them.
                </p>
                <ul class="pane list-inside list-disc space-y-2">
                    <li>The top rated tags will appear on the level's page.</li>
                    <li>Site moderators can manually mark tags as "verified."</li>
                    <li>Available tags are pre-approved by moderators. If you want to discuss the removal or addition of a tag, visit the level discussion forum.</li>
                </ul>
            </div>
            <div class="y space-y-2 md:w-2/3">
                <h2 class="font-bold text-2xl">Level Tags</h2>
                <div class="y space-y-2">
                    <div class="pane" v-if="level.tags.length === 0">This level has no tags.</div>
                    <div v-for="tag in level.tags" class="x pane justify-between">
                        <div class="x items-center space-x-2">
                            <svg @click="isAdmin() ? verify(tag.id, !tag.pivot.verified) : void(0)" v-if="tag.pivot.verified || isAdmin()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="inline rounded-full w-5 h-5" :class="{'text-green-500': tag.pivot.verified, 'cursor-pointer': isAdmin(), 'opacity-50': !tag.pivot.verified}">
                                <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                            </svg>
                            <h2>{{ tag.name }}</h2>
                            <template v-if="$page.props.auth">
                                <svg @click="!tag.voted || (tag.voted && tag.approved) ? vote(tag.id, false) : void(0)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5" :class="`${!tag.voted || (tag.voted && tag.approved) ? 'cursor-pointer opacity-50' : 'opacity-100'}`">
                                    <path d="M18.905 12.75a1.25 1.25 0 01-2.5 0v-7.5a1.25 1.25 0 112.5 0v7.5zM8.905 17v1.3c0 .268-.14.526-.395.607A2 2 0 015.905 17c0-.995.182-1.948.514-2.826.204-.54-.166-1.174-.744-1.174h-2.52c-1.242 0-2.26-1.01-2.146-2.247.193-2.08.652-4.082 1.341-5.974C2.752 3.678 3.833 3 5.005 3h3.192a3 3 0 011.342.317l2.733 1.366A3 3 0 0013.613 5h1.292v7h-.963c-.684 0-1.258.482-1.612 1.068a4.012 4.012 0 01-2.165 1.73c-.433.143-.854.386-1.012.814-.16.432-.248.9-.248 1.388z" />
                                </svg>
                                <svg @click="!tag.voted || (tag.voted && !tag.approved) ? vote(tag.id, true) : void(0)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5" :class="`${!tag.voted || (tag.voted && !tag.approved) ? 'cursor-pointer opacity-50' : 'opacity-100'}`">
                                    <path d="M1 8.25a1.25 1.25 0 112.5 0v7.5a1.25 1.25 0 11-2.5 0v-7.5zM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0114 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 01-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 01-1.341-.317l-2.734-1.366A3 3 0 006.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 012.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388z" />
                                </svg>
                            </template>
                        </div>
                        <div>
                            <span>{{ (tag.pivot.score * 100).toFixed(1) }}% Approval</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>
