<script setup>
import Tooltip from "@/Components/Tooltip.vue";
import Icon from "@/Components/Icon.vue";
import {useClipboard} from "@vueuse/core/index";
import {capitalize} from "@/util";
import AutoLink from "@/Components/AutoLink.vue";

defineProps({
    data: Object,
    links: Object,
    copyables: Object,
});

// Since this is a shared instance, if there are multiple copyable data values
// the tooltip message will change for them all. But only the one hovered will
// be visible to the user, so this ius probably fine. Still worth jotting down
const { copied, copy } = useClipboard({legacy: true})
</script>
<template>
    <div class="y space-y-2 pane">
        <div v-for="(value, key) in data" class="x justify-between items-center">
            <span class="capitalize">{{ key }}</span>
            <div class="x space-x-1 items-center text-right">
                <Tooltip v-if="(copyables ?? []).includes(key)" @click="copy(value)" class="cursor-pointer" :class="{'text-green-500': copied}" :message="copied ? 'Copied!' : `Copy ${capitalize(key)}`">
                    <Icon scale="w-4" name="clipboard-document-list"/>
                </Tooltip>
                <AutoLink v-if="(links ?? {}).hasOwnProperty(key)" :href="links[key]" class="text-white hover:underline">{{ value }}</AutoLink>
                <span v-else>{{ value }}</span>
            </div>
        </div>
    </div>
</template>
