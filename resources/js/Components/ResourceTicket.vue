<script setup>
import {Link} from '@inertiajs/vue3'

const props = defineProps({
    mod: Object
})
</script>
<template>
    <Link :href="route('mods.show', mod)">
        <div class="y rounded !p-0 overflow-hidden relative hover:shadow-lg transition-shadow delay-0">
            <div class="x bg-ui-900 justify-center py-8 bg-center bg-cover" :style="`background-image:url('${mod.banner_url}');`">
                <div :class="{'invisible': mod.banner_url}" class="bg-ui-800/60 rounded-full p-8">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                    </svg>
                </div>
            </div>
            <div class="bg-ui-800 w-full">
                <div class="px-4 py-2">
                    <div class="x items-center">
                        <h2 class="text-2xl font-bold">{{ mod.name }}</h2>
                        <span v-show="Math.floor(Math.random() * 2) === 0" class="x ml-2 items-center font-bold text-green-400 bg-ui-900 rounded-full px-2 aspect-square">$</span>
                    </div>
                    <p class="text-lg">{{ mod.author }}</p>
                    <div>
                        <span class="rounded bg-ui-900 text-sm px-2 py-0.5">Standalone</span>
                    </div>
                </div>
            </div>
        </div>
    </Link>
</template>
