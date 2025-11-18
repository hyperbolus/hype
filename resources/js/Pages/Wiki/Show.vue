<script setup>
import WikiLayout from "@/Layouts/WikiLayout.vue";
import {Link, useForm} from "@inertiajs/vue3";
import {useDateFormat} from '@vueuse/core';
import TipTap from "@/Components/TipTap.vue";
import {ref, computed} from "vue";
import {isAdmin} from "@/util.js";
import DiscordInvite from "@/Components/DiscordInvite.vue";
import Textbox from "@/Components/Textbox.vue";
import Button from "../../Jetstream/Button.vue";
import Username from "../../Components/Username.vue";
import Icon from "../../Components/Icon.vue";
import RequestToolbox from "../../Components/RequestToolbox.vue";
import {hasRole, settings, wiki} from "../../util";
import Breadcrumbs from "../../Components/Breadcrumbs.vue";
import LevelTicket from "../../Components/LevelTicket.vue";

const props = defineProps({
    page: Object,
    revision: Object,
    revisions: Object,

    title: String,
    language: String,
    namespace: String,
    path: String,

    action: String
})

const EMPTY = '<p></p>';

// TODO@later: make this a template server-side maybe?
// const MISSING_PAGE = `<p>This level doesn\'t have an article yet. Do you want to <u>create it</u>?</p>`;

const editing = ref(props.action === 'edit');
const outdated = ref(props.action !== 'history' && props.page?.revision_id !== props.revision?.id);
const permalink = ref(new URLSearchParams(window.location.search).has('revision'));
const body = ref(props.revision?.text ? props.revision.text.content : EMPTY);

const edit = useForm({
    title: null,
    content: '',
    language: '',
    namespace: '',
    description: '',
});

const submitRevision = () => {
    edit.content = body.value;
    edit.title = props.title;
    edit.language = props.language;
    edit.namespace = props.namespace;
    let routePrefix = settings('_subsite') === 'wiki' ? 'wiki$' : '';
    edit[props.page ? 'patch' : 'post'](props.page ? route(routePrefix + 'wiki.update', props.page.id) : route(routePrefix + 'wiki.store'), {
        onSuccess: () => {
            editing.value = false;
            edit.reset();
        }
    });
};

const fullTitle = computed(() => {
    let path = ''

    if (props.namespace !== 'Article') path += props.namespace + ':';

    path += props.title;

    return path;
});
</script>
<template>
    <WikiLayout :edited_at="revision?.created_at" :language="language" :namespace="namespace" :title="title" :action="action" :outdated="outdated" :permalink="permalink">
        <div class="x justify-between space-x-4 border-b border-ui-700 pb-1 px-4 actions">
            <Link :href="wiki(title)" class="!border-b-blue-500">{{ namespace }}</Link>
            <div class="x space-x-4">
                <Link v-if="page" :href="wiki(fullTitle)" :class="{'!border-b-blue-500': action === 'read'}">Read</Link>
                <Link :href="wiki(fullTitle) + '?action=edit'" :class="{'!border-b-blue-500': editing}">{{ page ? 'Edit' : 'Create' }}</Link>
                <Link v-if="page" :href="wiki(fullTitle) + '?action=history'" :class="{'!border-b-blue-500': action === 'history'}">History</Link>
            </div>
        </div>

        <Breadcrumbs class="px-2 text-ui-400 !mt-0" :decoration="false"/>

        <div v-if="permalink" class="x space-x-2 items-center rounded-md p-2 border" :class="outdated ? 'bg-amber-500/10 border-amber-500' : 'bg-blue-500/10 border-blue-500'">
            <Icon class="w-8 mx-1" :name="outdated ? 'exclamation-triangle' : 'information-circle'" :class="outdated ? 'text-amber-500' : 'text-blue-500'"/>
            <div class="y">
                <span v-if="outdated">This is a permalink to an outdated revision of this page</span>
                <span v-else>This is a permalink to the the latest revision of this page, but it may become outdated later.</span>
                <div class="x space-x-2 items-center text-sm">
                    <Link v-if="outdated" :href="wiki(fullTitle)" class="text-blue-500 hover:underline">Latest Revision</Link>
                    <span v-if="outdated" class="border-ui-500 border-x py-1.5"></span>
                    <span>Revision edited by <Username :user="revision.author"/> at {{ useDateFormat(revision.created_at, 'hh:mm A on MMMM DD, YYYY') }}</span>
                </div>
            </div>
        </div>

        <TipTap v-if="action !== 'history'" v-show="!editing || (editing && isAdmin())" v-model="body" :editable="editing" :class="{'border border-ui-700 rounded-lg': editing}"/>

        <div v-if="action === 'history'" class="y space-y-2">
            <div v-for="revision in revisions?.data ?? []" class="x space-x-2 pane text-sm">
                <Link :href="wiki(fullTitle) + `?revision=${revision.id}`" class="text-blue-500 hover:underline w-56 text-right">{{ useDateFormat(revision.created_at, 'MMMM DD, YYYY @ hh:mm A') }}</Link>
                <Username :user="revision.author"/>
                <span>({{ revision.size.new_length }} bytes)</span>
                <span :class="revision.size.new_length > revision.size.old_length ? 'text-green-500' : 'text-red-500'">({{ revision.size.new_length > revision.size.old_length ? '+' : '' }}{{ revision.size.new_length - revision.size.old_length }})</span>
                <span class="italic">"{{ revision.description }}"</span>
            </div>
            <p v-if="!revisions || revisions?.data.length === 0">This article has no history</p>
        </div>

        <template v-if="editing">
            <div v-if="hasRole('wiki_contributor')" class="y pane !py-4">
                <span class="text-sm">Edit Description</span>
                <Textbox v-model="edit.description" class="w-full"/>
                <Button @click="submitRevision" class="w-fit">Submit</Button>
            </div>
            <div v-else class="y space-y-2 items-center pane !py-4">
                <span class="font-bold text-2xl">Hold Up!</span>
                <p class="text-center">Wiki page editing is only available to select users. If you would like to contribute to the wiki, please join our Discord!</p>
                <DiscordInvite code="JJc8nndmFE"/>
            </div>
        </template>
    </WikiLayout>
</template>
<style scoped>
.actions a {
    @apply border-b-2 border-transparent -mb-1;
}
</style>
