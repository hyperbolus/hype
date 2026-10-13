<script setup>
import route from 'ziggy-js'
import {Link} from '@inertiajs/vue3';
import Tooltip from "@/Components/Tooltip.vue";
import Avatar from "@/Components/Avatar.vue";
import UserFlag from "@/Components/UserFlag.vue";
import UserTitle from "@/Components/UserTitle.vue";
import Icon from "@/Components/Icon.vue";
import {computed} from "vue";
import {invisiblePixel, isPremium} from "@/util";
import CosmeticName from "@/Components/CosmeticName.vue";

const props = defineProps({
    user: Object,
    href: {
        type: [String, Boolean],
        default: null,
    },
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
});

const link = props.href ?? route('users.show', props.user.id)

const groups = {
    0: {},
    1: {
        name: 'Administrator',
        badge: 'check-badge',
        color: 'rgb(255 75 75)',
    },
    2: {
        name: 'Moderator',
        badge: 'check-badge',
        color: '#a467ea',
    },
    3: {
        name: 'Verified',
        badge: 'check-badge',
        color: 'rgb(34 197 94)',
    },
    4: {
        name: 'Wiki Contributor',
        badge: 'open-book',
        color: '#8eb3ff',
    },
    5: {
        name: 'Supporter',
        badge: 'heart',
        color: '#d28eff',
    }
};

const group = groups[props.user.primary_group_id ?? 0];
const style = computed(() => {
    let a = ['text-shadow: black 0 1px 3px;'];

    if (group.color) a.push(`color:${group.color};`);
    if (group.style) a.push(group.style);

    return a.join('');
});

const allGroups = computed(() => {
    let arr = [group];

    if (props.user.primary_group_id === null && isPremium(props.user)) arr.push(groups[5]);

    return arr;
});
</script>
<template>
    <div class="inline-flex items-center text-ui-200 break-all">
        <UserFlag v-if="flag" :user="user" size="md" class="mr-1.5"/>
        <template v-for="g in allGroups">
            <Tooltip v-if="g.badge" :inline="true" :message="g.name" class="w-3.5 ml-1 mr-1 badge-cover" :style="`color: ${g.color};`">
                <Icon scale="size-2.5" class="scale-[205%] badge" :name="g.badge"/>
            </Tooltip>
        </template>
        <Tooltip v-if="card" :caret="false" :decoration="false" :inline="true" :container-class="`${popUnder ? 'top-full' : 'pb-1 bottom-full'} right-full`">
            <component :is="link ? Link : 'div'" :href="link ? link : null">
                <CosmeticName :cosmetics="user.cosmetics" :banned="user.banned_at">{{ user.name }}</CosmeticName>
            </component>
            <template #content>
                <div class="x box shadow-xl !p-0 overflow-hidden bg-cover bg-center" :style="`background-image:url(${user.banner_url ?? invisiblePixel});`">
                    <div class="x items-center bg-black/50 space-x-4 p-4 min-w-[20rem]">
                        <Avatar width="w-16" :user="user"/>
                        <div class="y [text-shadow:black_0_1px_3px]">
                            <CosmeticName :cosmetics="user.cosmetics"  :banned="user.banned_at">{{ user.name }}</CosmeticName>
                            <UserTitle class="[text-shadow:black_0_1px_3px]" :user="user"/>
                        </div>
                    </div>
                </div>
            </template>
        </Tooltip>
        <template v-else>
            <component :is="link ? Link : 'div'" :href="link ? link : null">
                <CosmeticName :cosmetics="user.cosmetics" :banned="user.banned_at">{{ user.name }}</CosmeticName>
            </component>
        </template>
    </div>
</template>
<style>
.text-xs .badge > svg {
    @apply size-2
}

.text-sm .badge > svg {
    @apply size-2
}

.text-2xl .badge > svg {
    @apply size-3
}

.text-xs .badge-cover {
    @apply mr-0 ml-0.5
}

.text-sm .badge-cover {
    @apply mr-0
}

.text-2xl .badge-cover {
    @apply mr-1.5
}
</style>
