<script setup>
import route from 'ziggy-js'
import {Link} from '@inertiajs/vue3';
import Tooltip from "@/Components/Tooltip.vue";
import Avatar from "@/Components/Avatar.vue";
import UserFlag from "@/Components/UserFlag.vue";
import {invisiblePixel} from "@/util.js";
import sparkle from '@/../images/sparkle_4.gif'
import UserTitle from "@/Components/UserTitle.vue";

const props = defineProps({
    user: Object,
    href: String,
    flag: {
        type: Boolean,
        default: false
    },
    card: {
        type: Boolean,
        default: true
    },
    badge: {
        type: Boolean,
        default: true
    },
    popUnder: Boolean
})
</script>
<template>
    <div class="inline-flex items-center text-ui-200 break-all">
        <UserFlag v-if="flag"/>
        <template v-if="badge">
            <Tooltip :message="'Administrator'" v-if="user.primary_group_id === 1" class="mr-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="text-red-500 w-5 h-5">
                    <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                </svg>
            </Tooltip>
            <Tooltip :message="'Verified'" v-if="user.primary_group_id === 2" class="mr-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="text-green-500 w-5 h-5">
                    <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                </svg>
            </Tooltip>
            <Tooltip :message="'Community Manager'" v-if="user.id === 69" class="mr-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="text-amber-500 w-5 h-5">
                    <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM1.49 15.326a.78.78 0 0 1-.358-.442 3 3 0 0 1 4.308-3.516 6.484 6.484 0 0 0-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 0 1-2.07-.655ZM16.44 15.98a4.97 4.97 0 0 0 2.07-.654.78.78 0 0 0 .357-.442 3 3 0 0 0-4.308-3.517 6.484 6.484 0 0 1 1.907 3.96 2.32 2.32 0 0 1-.026.654ZM18 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM5.304 16.19a.844.844 0 0 1-.277-.71 5 5 0 0 1 9.947 0 .843.843 0 0 1-.277.71A6.975 6.975 0 0 1 10 18a6.974 6.974 0 0 1-4.696-1.81Z" />
                </svg>
            </Tooltip>
        </template>
        <Tooltip v-if="card" :caret="false" :decoration="false" :inline="true" :container-class="`${popUnder ? 'top-full' : 'pb-1 bottom-full'} right-full`">
            <Link v-if="user.primary_group_id === 1" :href="href ?? route('users.show', user.id)" :style="`color:rgb(255,75,75);background-image: url('${sparkle}');text-shadow: black 0 1px 3px;`">{{ user.name }}</Link>
            <Link v-else-if="user.primary_group_id === 2" :href="href ?? route('users.show', user.id)" style="filter: hue-rotate(120deg);color:rgb(255,125,125);text-shadow: black 0 1px 3px;" :style="`background-image: url('${sparkle}');`">{{ user.name }}</Link>
            <Link v-else-if="user.id === 69" :href="href ?? route('users.show', user.id)" style="color:#f59e0b;text-shadow: black 0 1px 3px;">{{ user.name }}</Link>
            <Link v-else :href="href ?? route('users.show', user.id)">{{ user.name }}</Link>
            <template #content>
                <div class="x box shadow-xl !p-0 overflow-hidden bg-cover bg-center" :style="`background-image: url('${user.banner_url ?? invisiblePixel}');`">
                    <div class="x items-center bg-black/50 space-x-4 p-4 min-w-[20rem]">
                        <Avatar width="w-16" :user="user"/>
                        <div class="y [text-shadow:black_0_1px_2px]">
                            <span class="font-bold text-lg w-fit" :class="{'line-through': user.banned_at}" :style="user.primary_group_id === 1 ? `color:rgb(255,75,75);background-image: url('${sparkle}');text-shadow: black 0 1px 3px;` : ''">{{ user.name }}</span>
                            <UserTitle class="[text-shadow:black_0_1px_3px]" :user="user"/>
                        </div>
                    </div>
                </div>
            </template>
        </Tooltip>
        <template v-else>
            <Link v-if="user.primary_group_id === 1" :href="href ?? route('users.show', user.id)" :style="`color:rgb(255,75,75);background-image: url('${sparkle}');text-shadow: black 0 1px 3px;`">{{ user.name }}</Link>
            <Link v-else-if="user.primary_group_id === 2" :href="href ?? route('users.show', user.id)" style="filter: hue-rotate(120deg);color:rgb(255,125,125);text-shadow: black 0 1px 3px;" :style="`background-image: url('${sparkle}');`">{{ user.name }}</Link>
            <Link v-else-if="user.id === 69" :href="href ?? route('users.show', user.id)" style="color:#f59e0b;text-shadow: black 0 1px 3px;">{{ user.name }}</Link>
            <Link v-else :href="href ?? route('users.show', user.id)">{{ user.name }}</Link>
        </template>
    </div>
</template>
