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
import {invisiblePixel} from "@/util.js";

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
    <div class="y w-full items-center bg-center" :style="`background-image: url('${profile.banner_url ?? soundparty}');`" style="box-shadow: rgba(0, 0, 0, 0.85) 0 -100px 55px -25px inset;">
        <div class="x h-64 justify-center lg:max-w-5xl xl:max-w-6xl w-full w-full bg-cover bg-center">
            <div class="y justify-between w-full lg:max-w-5xl xl:max-w-6xl p-4">
                <div class="x w-full gap-2" :class="{'justify-end': !$page.props.auth || profile.id === $page.props.user.id, 'justify-between': $page.props.auth && profile.id !== $page.props.user.id}">
                    <div v-if="$page.props.auth && profile.id !== $page.props.user.id" class="x gap-2">
                        <Link :href="route('inbox.create') + '?to=' + profile.id" class="cursor-pointer text-xs rounded bg-ui-800 px-2 pb-1 pt-1.5 uppercase">Message</Link>
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
                        <div class="x shrink-0 shadow-lg justify-center items-center rounded-full -mb-16 z-10 mr-4">
                            <Avatar width="w-40" :user="profile"/>
                        </div>
                        <div class="leading-none text-ui-200">
                            <div class="x items-center space-x-2 font-bold text-2xl">
                                <UserFlag size="md" :user="profile"/>
                                <span class="bg-cover bg-center" :style="profile.primary_group_id === 1 ? `background-image: url('${sparkle}');text-shadow: black 0 1px 3px;color:rgb(255,75,75);` : ''">{{ profile.name }}</span>
                            </div>
                            <span class="text-sm">Junior Member</span>
                        </div>
                    </div>
                    <Stats :profile="profile" :reviews="reviews"/>
                </div>
            </div>
        </div>
    </div>
    <div class="x justify-center w-full bg-ui-900 items-center px-4 py-2">
        <div class="y mt-12 sm:mt-0 sm:pl-48 z-10 w-full lg:max-w-5xl xl:max-w-6xl">
            <span><span class="text-sm font-bold mr-1 uppercase" :class="isOnline(profile.last_seen) ? 'text-green-500' : 'text-red-500'">{{ isOnline(profile.last_seen) ? 'ON' : 'OFF' }}LINE</span> Last seen <Timestamp :time="profile.last_seen"/></span>
            <span>Time spent online: <Timestamp :time="profile.time_online" :length="true"/></span>
        </div>
    </div>
</template>
