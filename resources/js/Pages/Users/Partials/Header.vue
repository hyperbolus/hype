<script setup>
import Lightbox from "@/Components/Lightbox.vue";
import ReportModal from "@/Components/ReportModal.vue";
import Stats from "@/Pages/Users/Partials/Stats.vue";
import Timestamp from "@/Components/Timestamp.vue";
import soundparty from '@/../images/soundparty.jpg'
import {Link, router} from '@inertiajs/vue3'
import route from "ziggy-js"
import Avatar from "@/Components/Avatar.vue";
import {isAuthenticated, isUser} from "@/util.js";
import UserTitle from "@/Components/UserTitle.vue";
import 'vue-advanced-cropper/dist/style.css';
import Username from "@/Components/Username.vue";
import Dropdown from "@/Jetstream/Dropdown.vue";
import Icon from "@/Components/Icon.vue";
import Tooltip from "@/Components/Tooltip.vue";

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
                <div class="x w-full gap-2 justify-end">
                    <Link v-if="isUser(profile.id)" :href="route('settings.profile')" class="bg-ui-900/50 p-2.5 rounded-full">
                        <Icon class="size-5 text-white" name="pencil"/>
                    </Link>
                    <template v-else-if="isAuthenticated()">
                        <Link v-if="!profile.blocking && !profile.blocked" :href="route('inbox.show', profile)" class="bg-ui-900/75 p-2.5 rounded-full">
                            <Icon class="size-5 text-white" name="envelope"/>
                        </Link>
                        <Dropdown>
                            <template #trigger>
                                <div class="bg-ui-900/75 p-2.5 rounded-full">
                                    <Icon class="size-5 text-white" name="ellipsis-horizontal"/>
                                </div>
                            </template>
                            <template #content>
                                <div class="y">
                                    <Lightbox v-if="!isUser(profile.id)">
                                        <div class="px-2 py-1 hover:bg-ui-800 w-full">Report</div>
                                        <template #content>
                                            <ReportModal :reportable_id="profile.id" :reportable_type="1" @click.stop class="cursor-auto"/>
                                        </template>
                                    </Lightbox>
                                    <div v-if="false" class="px-2 py-1 hover:bg-ui-800">Add Friend</div>
                                    <div v-if="profile.blocked" @click="router.delete(route('relationships.destroy', profile.id))" class="px-2 py-1 hover:bg-ui-800">Unblock</div>
                                    <div v-else @click="router.post(route('relationships.store'), {user_id: profile.id})" class="px-2 py-1 hover:bg-ui-800">Block</div>
                                </div>
                            </template>
                        </Dropdown>
                    </template>
                </div>
                <div class="x items-end justify-between">
                    <div class="x items-end">
                        <div class="x relative shrink-0 shadow-lg justify-center items-center rounded-full -mb-16 z-10 mr-4">
                            <Avatar class="relative z-0" width="w-40" :user="profile"/>
                        </div>
                        <div class="leading-none text-ui-200">
                            <div class="x items-center space-x-2 font-bold text-2xl">
                                <Username :user="profile" :card="false" :flag="true"/>
                                <Tooltip v-if="profile.blocking" message="This user has blocked you">
                                    <Icon name="no-symbol" class="size-5 text-red-500"/>
                                </Tooltip>
                            </div>
                            <p><UserTitle :user="profile"/><span v-if="profile.pronouns"> &middot; {{ profile.pronouns }}</span><span v-if="profile.location"> &middot; {{ profile.location }}</span></p>
                        </div>
                    </div>
                    <Stats :profile="profile"/>
                </div>
            </div>
        </div>
    </div>
    <div class="x justify-center w-full bg-ui-900 items-center py-2 z-0">
        <div class="y px-4 mt-12 sm:mt-0 sm:pl-48 z-10 w-full lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
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
