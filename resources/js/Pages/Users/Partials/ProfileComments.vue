<script setup>
import Avatar from "@/Components/Avatar.vue";
import Username from "@/Components/Username.vue";
import Pagination from "@/Components/Pagination.vue";
import {useForm} from "@inertiajs/vue3";
import route from "ziggy-js";

const props = defineProps({
    profile: Object,
    comments: Object,
})

const newComment = useForm({
    body: '',
    user_id: props.profile.id
})

const postComment = () => {
    newComment.post(route('user.comments.store', props.profile.id), {
        preserveScroll: true,
        onSuccess: () => {
            newComment.body = ''
        }
    })
}
</script>
<template>
    <div class="y h-fit md:rounded-b-lg bg-ui-900 lg:w-1/2 divide-y divide-ui-700">
        <div class="md:rounded-t-lg bg-ui-800 px-2 py-1">Profile Comments</div>
        <div v-if="comments.data.length === 0" class="px-4 py-2">
            Nobody has commented on {{ profile.name }}'s profile yet. <span v-if="$page.props.auth">Be the first!</span>
        </div>
        <div v-else v-for="comment in comments.data" class="x space-x-4 justify-between p-4">
            <div class="y items-center space-y-4 justify-between">
                <Avatar class="w-8" :user="comment.commenter"/>
                <div class="!hidden x w-fit justify-center p-1 rounded bg-ui-800">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                        <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
            <div class="y w-full">
                <div class="x justify-between  text-xs">
                    <Username class="font-bold" :user="comment.commenter"/>
                    <span>{{ new Date(comment.created_at).toLocaleString([], {year: 'numeric', month:'numeric', day: 'numeric', hour: '2-digit', minute:'2-digit'}) }}</span>
                </div>
                <p class="text-sm">{{ comment.body }}</p>
            </div>
        </div>
        <div class="px-2">
            <Pagination class="py-2" :list="comments"/>
            <div v-if="$page.props.auth" class="y items-center gap-2 pb-2">
                <textarea class="textbox" v-model="newComment.body" placeholder="Comment..." style="min-height: 4rem !important;"/>
                <Button @click="postComment" class="w-fit" :class="{ 'opacity-25': newComment.processing }" :disabled="newComment.processing">{{ newComment.processing ? 'Submitting' : 'Submit Comment' }}</Button>
            </div>
        </div>
    </div>
</template>
