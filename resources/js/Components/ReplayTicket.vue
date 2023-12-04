<script setup>
import Tooltip from "@/Components/Tooltip.vue";
import Username from "@/Components/Username.vue";
import Icon from "@/Components/Icon.vue";
import Lightbox from "@/Components/Lightbox.vue";
import {isAdmin} from "@/util.js";

const props = defineProps({
    macro: Object,
    level: Object
});
</script>
<template>
    <div class="y space-y-1 justify-between p-2">
        <div class="x items-center space-x-2 justify-between w-full">
            <div class="x items-center space-x-1">
                <Tooltip v-if="level" position="left" :message="macro.approved_at === null ? 'Unverified Macro' : 'Verified Macro'">
                    <svg v-if="macro.approved_at === null" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="text-yellow-500 w-5 h-5">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="text-green-500 w-5 h-5">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                    </svg>
                </Tooltip>
                <span class="text-sm font-bold">{{ level.name }}</span>
                <span class="text-xs">{{ level.creator }}</span>
            </div>
            <div class="x space-x-1">
                <Tooltip v-if="macro.notes" position="top" :message="macro.notes ?? 'This macro has no notes'" class="x items-center rounded p-1 bg-ui-800">
                    <Icon class="w-4" name="information-circle"/>
                </Tooltip>
                <Lightbox v-if="isAdmin()" class="rounded bg-ui-800 p-1">
                    <Icon class="w-4" name="cog-6-tooth" size="20" type="solid"/>
                    <template #content>
                        <div @click.stop class="y space-y-2 pane text-ui-200 w-[32rem]">
                            <h1 class="font-bold text-3xl">Replay Moderation</h1>
                            <div>
                                <span>First Coin</span>
                            </div>
                        </div>
                    </template>
                </Lightbox>
                <Tooltip class="block" :message="macro.files[0].filename">
                    <a :href="macro.files[0].url" class="block rounded bg-ui-800 p-1">
                        <Icon class="w-4" name="arrow-down-tray"/>
                    </a>
                </Tooltip>
            </div>
        </div>
        <div class="x flex-wrap items-end justify-between gap-1 text-sm">
            <div class="rounded px-2 bg-ui-800 text-sm">
                <span class="text-red-500 animate-pulse">&bullet; </span>
                <Username :user="macro.author"/>
            </div>
            <div class="x space-x-1">
                <span class="rounded px-2 bg-ui-800">{{ macro.format }}</span>
                <span class="rounded px-2 bg-ui-800">{{ macro.fps ? (macro.fps % 1 ? macro.fps : Math.round(macro.fps)) : 'Unknown' }}&nbsp;FPS</span>
            </div>
        </div>
    </div>
</template>
