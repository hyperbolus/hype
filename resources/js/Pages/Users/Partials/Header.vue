<script setup>
import Lightbox from "@/Components/Lightbox.vue";
import ReportModal from "@/Components/ReportModal.vue";
import Stats from "@/Pages/Users/Partials/Stats.vue";
import Timestamp from "@/Components/Timestamp.vue";
import soundparty from '@/../images/soundparty.jpg'
import sparkle from '@/../images/sparkle_4.gif'
import {Link} from '@inertiajs/vue3'
import route from "ziggy-js"
import Avatar from "@/Components/Avatar.vue";
import UserFlag from "@/Components/UserFlag.vue";
import {isAuthenticated} from "@/util.js";
import UserTitle from "@/Components/UserTitle.vue";

const props = defineProps({
    profile: Object,
    reviews: Object,
})

const isOnline = (time) => {
    const now = new Date()
    const then = new Date(time)
    return now - then <= 300000 // 1000 * 60 * 5
}
</script>
<template>
    <div class="y w-full items-center bg-center bg-cover" :style="`background-image: url('${profile.banner_url ?? soundparty}');`" style="box-shadow: rgba(0, 0, 0, 0.85) 0 -100px 55px -25px inset;">
        <div class="x h-64 justify-center lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full w-full bg-cover bg-center">
            <div class="y justify-between w-full lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl py-4 px-4">
                <div class="x w-full gap-2 justify-between">
                    <div v-if="isAuthenticated()" class="x gap-2">
                        <Link v-if="profile.id !== $page.props.user.id" :href="route('inbox.create') + '?to=' + profile.id" class="cursor-pointer text-xs rounded bg-ui-800 px-2 pb-1 pt-1.5 uppercase">Message</Link>
                        <Link v-else :href="route('settings.profile')" class="cursor-pointer text-xs rounded bg-ui-800 px-2 pb-1 pt-1.5 uppercase">Edit Profile</Link>
                    </div>
                    <div class="x gap-2">
                        <Lightbox>
                            <span class="cursor-pointer text-xs rounded bg-ui-800 px-2 pb-1 pt-1.5 uppercase">Report</span>
                            <template #content>
                                <ReportModal :reportable_id="profile.id" :reportable_type="1" @click.stop class="cursor-auto"/>
                            </template>
                        </Lightbox>
                    </div>
                </div>
                <div class="x items-end justify-between">
                    <div class="x items-end">
                        <div class="x relative shrink-0 shadow-lg justify-center items-center rounded-full -mb-16 z-10 mr-4">
                            <div class="x items-center justify-center absolute z-10 w-full h-full rounded-full opacity-0 cursor-pointer hover:opacity-100 bg-black/50">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8">
                                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                                </svg>
                            </div>
                            <Avatar class="relative z-0" width="w-40" :user="profile"/>
                        </div>
                        <div class="leading-none text-ui-200">
                            <div class="x items-center space-x-2 font-bold text-2xl">
                                <UserFlag size="md" :user="profile"/>
                                <span class="bg-cover bg-center" :class="{'line-through': profile.banned_at}" :style="profile.primary_group_id === 1 ? `background-image: url('${sparkle}');text-shadow: black 0 1px 3px;color:rgb(255,75,75);` : ''">{{ profile.name }}</span>
                            </div>
                            <UserTitle :user="profile"/>
                        </div>
                    </div>
                    <Stats :profile="profile"/>
                </div>
            </div>
        </div>
    </div>
    <div class="x justify-center w-full bg-ui-900 items-center px-4 py-2">
        <div class="y mt-12 sm:mt-0 sm:pl-44 z-10 w-full lg:max-w-5xl xl:max-w-6xl">
            <span><span class="text-sm font-bold mr-1 uppercase" :class="isOnline(profile.last_seen) ? 'text-green-500' : 'text-red-500'">{{ isOnline(profile.last_seen) ? 'ON' : 'OFF' }}LINE</span> Last seen <Timestamp :time="profile.last_seen"/></span>
            <span>Time spent online: <Timestamp :time="profile.time_online" :length="true"/></span>
        </div>
    </div>
    <div class="x justify-center w-full bg-ui-950 items-center px-4">
        <div class="flex flex-wrap font-bold text-sm justify-center z-10">
            <Link :href="route('users.show', profile.id)" :class="{'bg-ui-900': route().current('users.show')}" class="py-1.5 px-4">Overview</Link>
            <Link :href="route('users.reviews', profile.id)" :class="{'bg-ui-900': route().current('users.reviews')}" class="py-1.5 px-4">Reviews</Link>
            <Link :href="route('users.posts', profile.id)" :class="{'bg-ui-900': route().current('users.posts')}" class="py-1.5 px-4">Posts</Link>
            <Link :href="route('users.playlists', profile.id)" :class="{'bg-ui-900': route().current('users.playlists')}" class="py-1.5 px-4">Playlists</Link>
            <Link :href="route('users.videos', profile.id)" :class="{'bg-ui-900': route().current('users.videos')}" class="py-1.5 px-4">Videos</Link>
        </div>
    </div>
</template>
