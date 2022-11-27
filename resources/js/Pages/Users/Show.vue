<script setup>
import AppLayout from '@/Layouts/AppLayout.vue'
import {Link, useForm} from '@inertiajs/inertia-vue3';
import Button from "@/Jetstream/Button.vue";
import route from 'ziggy-js'
import background from "@/../images/banner.jpg"
import Pagination from "@/Components/Pagination.vue";
import Avatar from "@/Components/Avatar.vue";
import Timestamp from "@/Components/Timestamp.vue";

const props = defineProps({
    profile: Object,
    comments: Object,
    reviews: Object,
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

const isOnline = (time) => {
    const now = new Date()
    const then = new Date(time)
    return now - then <= 300000 // 1000 * 60 * 5
}
</script>
<template>
    <app-layout title="Home" :background="profile.banner_url">
        <template #breadcrumbs>
            <Link :href="route('users.index')">Users</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <span>{{ profile.id }}</span>
        </template>
        <div class="x h-64 justify-center lg:max-w-5xl xl:max-w-6xl w-full w-full bg-cover bg-center">
            <div class="y justify-between w-full lg:max-w-5xl xl:max-w-6xl p-4">
                <div class="x w-full gap-2" :class="{'justify-end': !$page.props.auth || profile.id === $page.props.user.id, 'justify-between': $page.props.auth && profile.id !== $page.props.user.id}">
                    <div v-if="$page.props.auth && profile.id !== $page.props.user.id" class="x gap-2">
                        <Link :href="route('inbox.create') + '?to=' + profile.id" class="cursor-pointer text-xs rounded bg-neutral-300 dark:bg-neutral-800 !bg-opacity-75 px-2 pb-1 pt-1.5 uppercase">Message</Link>
                    </div>
                    <div class="x gap-2">
                        <span onclick="alert('wip')" class="cursor-pointer text-xs rounded bg-neutral-300 dark:bg-neutral-800 !bg-opacity-75 px-2 pb-1 pt-1.5 uppercase">Report</span>
                    </div>
                </div>
                <div class="x items-end justify-between">
                    <div class="x items-end">
                        <div class="x shrink-0 shadow-lg justify-center items-center rounded-full w-40 h-40 -mb-16 z-10 mr-4">
                            <Avatar :user="profile"/>
                        </div>
                        <div class="leading-none text-neutral-200">
                            <h1 class="font-bold text-2xl">{{ profile.name }}</h1>
                            <span class="text-sm">Junior Member</span>
                        </div>
                    </div>
                    <div class="x text-neutral-200">
                        <div class="x items-center gap-2 px-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clip-rule="evenodd" />
                            </svg>
                            <div class="y">
                                <span>{{ profile.posts_count }}</span>
                                <span class="uppercase text-xs opacity-75 tracking-widest">Posts</span>
                            </div>
                        </div>
                        <div class="x items-center gap-2 px-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                                <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                            </svg>
                            <div class="y">
                                <span>{{ profile.threads_count }}</span>
                                <span class="uppercase text-xs opacity-75 tracking-widest">Threads</span>
                            </div>
                        </div>
                        <div class="x items-center gap-2 px-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                            </svg>
                            <div class="y">
                                <span>{{ reviews.total }}</span>
                                <span class="uppercase text-xs opacity-75 tracking-widest">Reviews</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="x justify-center box !py-0 lg:max-w-5xl xl:max-w-6xl w-full bg-neutral-200 dark:bg-neutral-800 w-full">
            <div class="x w-full justify-between px-4 py-2">
                <div class="mt-12 sm:mt-0 sm:ml-44 z-10">
                    <span class="text-sm font-bold mr-1 uppercase" :class="isOnline() ? 'text-green-500' : 'text-red-500'">{{ isOnline(profile.last_seen) ? 'ON' : 'OFF' }}LINE</span> Last seen <Timestamp :time="profile.last_seen"/>
                    <br/>
                    <span>Time spent online: <Timestamp :time="profile.time_online" :length="true"/></span>
                </div>
                <div>

                </div>
            </div>
        </div>
        <div class="flex flex-col md:flex-row lg:max-w-5xl xl:max-w-6xl w-full gap-4 p-4">
            <div class="flex flex-col space-y-4 md:w-1/4">
                <div class="y box !px-0 !py-0 divide-y dark:divide-neutral-700">
                    <div class="rounded-t bg-neutral-100 dark:bg-neutral-800 px-2 py-1">
                        Bio
                    </div>
                    <p class="px-4 py-2 text-sm" v-if="profile.bio">{{ profile.bio }}</p>
                    <span v-else class="opacity-50 italic px-4 py-2">This user didn't write anything</span>
                </div>
                <div class="y box text-sm !px-0 !py-0 divide-y dark:divide-neutral-700">
                    <div class="x justify-between p-2">
                        <span>Reputation:</span>
                        <Link :href="route('reputation.show', profile.id)" class="text-black dark:text-white">{{ profile.reputation }}</Link>
                    </div>
                    <div class="x justify-between p-2">
                        <span>Credits:</span>
                        <span>{{ profile.credits }}</span>
                    </div>
                    <div class="x justify-between p-2">
                        <span>Username Changes:</span>
                        <Link :href="route('names.show', profile.id)" class="text-black dark:text-white">{{ profile.names_count }}</Link>
                    </div>
                    <div class="x justify-between p-2">
                        <span>Member Since:</span>
                        <span>{{ new Date(profile.created_at).toLocaleDateString() }}</span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col space-y-4 md:w-1/2">
                <div class="y box !px-0 !py-0 divide-y dark:divide-neutral-700">
                    <div class="rounded-t bg-neutral-100 dark:bg-neutral-800 px-2 py-1">Profile Comments</div>
                    <div v-if="comments.data.length === 0" class="px-4 py-2">
                        Nobody has commented on {{ profile.name }}'s profile yet. <span v-if="$page.props.auth">Be the first!</span>
                    </div>
                    <div v-else v-for="comment in comments.data" class="x gap-4 items-center justify-between p-4">
                        <Avatar class="w-8" :user="comment.commenter"/>
                        <div class="y w-full">
                            <div class="x justify-between mb-1 text-xs">
                                <Link :href="route('users.show', comment.commenter_id)">{{ comment.commenter.name }}</Link>
                                <span>{{ new Date(comment.created_at).toLocaleString([], {year: 'numeric', month:'numeric', day: 'numeric', hour: '2-digit', minute:'2-digit'}) }}</span>
                            </div>
                            <p class="text-sm">{{ comment.body }}</p>
                        </div>
                    </div>
                    <div class="px-2">
                        <Pagination class="py-2" :list="comments"/>
                        <div v-if="$page.props.auth" class="y items-center gap-2 pb-2">
                            <textarea v-model="newComment.body" style="min-height: 4rem !important;" class="resize-none !min-h-16 resize-y rounded h-fit w-full bg-neutral-100 dark:bg-neutral-800 placeholder-neutral-400 dark:placeholder-neutral-500 border-neutral-200 dark:border-neutral-700" placeholder="Comment..."></textarea>
                            <Button @click="postComment" class="w-fit">Submit Comment</Button>
                        </div>
                    </div>
                </div>
                <div class="y box !px-0 !py-0 divide-y dark:divide-neutral-700">
                    <div class="rounded-t bg-neutral-100 dark:bg-neutral-800 px-2 py-1">
                        Signature
                    </div>
                    <p class="px-4 py-2" v-if="profile.signature">{{ profile.signature }}</p>
                    <span v-else class="opacity-50 italic px-4 py-2">This user has no signature</span>
                </div>
            </div>
            <div class="flex flex-col space-y-4 md:w-1/4">
                <div class="y box !px-0 !py-0 divide-y dark:divide-neutral-700">
                    <div class="rounded-t bg-neutral-100 dark:bg-neutral-800 px-2 py-1">
                        Recent Reviews
                    </div>
                    <div v-if="reviews.data.length === 0" class="px-4 py-2">
                        User has not written any reviews
                    </div>
                    <Link v-else v-for="review in reviews.data" :href="route('levels.show', review.level.id)" class="y justify-between px-4 py-2">
                        <h2 class="font-bold">{{ review.level.name }}</h2>
                        <span class="text-xs">by&nbsp;<span class="font-bold">{{ review.level.creator }}</span></span>
                        <div class="x flex-wrap gap-x-4 lg:gap-x-2 items-center justify-between">
                            <span class="text-xs">DIFF:&nbsp;{{ review.rating_difficulty ? Math.round((review.rating_difficulty / 2) * 100) / 100 : 'N/A' }}</span>
                            <span class="text-xs">GAME:&nbsp;{{ review.rating_gameplay ? Math.round((review.rating_gameplay / 2) * 100) / 100 : 'N/A' }}</span>
                            <span class="text-xs">VIS:&nbsp;{{ review.rating_visuals ? Math.round((review.rating_visuals / 2) * 100) / 100 : 'N/A' }}</span>
                            <span class="text-xs">ALL:&nbsp;{{ review.rating_overall ? Math.round((review.rating_overall / 2) * 100) / 100 : 'N/A' }}</span>
                        </div>
                        <p class="text-sm">{{ review.review }}</p>
                    </Link>
                    <Pagination class="py-2" :list="reviews"/>
                </div>
            </div>
        </div>
    </app-layout>
</template>
