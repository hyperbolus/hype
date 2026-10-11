<script setup>
import Icon from "./Icon.vue";
import CosmeticName from "@/Components/CosmeticName.vue";
import Modal from "@/Jetstream/Modal.vue";
import Lightbox from "@/Components/Lightbox.vue";

const props = defineProps({
    cosmetic: Object,
    wide: Boolean,
});


</script>
<template>
    <div class="rounded-lg border border-ui-700 divide-ui-700" :class="wide ? 'x divide-x' : 'y divide-y'">
        <div class="y relative items-center justify-center text-center p-8 shrink-0" :class="wide ? 'rounded-l-lg w-1/2' : 'rounded-t-lg'" style="background-image:radial-gradient(rgb(var(--color-ui-900)), rgb(var(--color-ui-1000)));">
            <CosmeticName v-if="cosmetic.preview === 'name'" class="text-2xl font-bold" :cosmetics="[cosmetic]">Username</CosmeticName>
            <div class="pr-24" v-else-if="cosmetic.preview === 'postbit'">
                <div class="x border border-ui-700 relative bg-ui-900 rounded-l-lg">
                    <div class="y items-center gap-2 p-4 relative">
                        <div class="absolute inset-0 rounded-l-lg bg-red-500 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0)_100%);]">

                        </div>
                        <div class="w-16 py-1.5 bg-ui-700 animate-pulse"></div>
                        <div class="w-10 py-1.5 bg-ui-700 animate-pulse"></div>
                        <div class="aspect-square rounded-full w-full bg-ui-700 animate-pulse"></div>
                        <div class="w-10 py-1.5 bg-ui-700 animate-pulse"></div>
                    </div>
                    <div class="absolute left-full top-[-1px] bottom-[-1px] y gap-2 bg-ui-800 p-4 border-y border-ui-700" style="mask-image: linear-gradient(to right, white, transparent)">
                        <div class="w-24 py-1.5 bg-ui-700 animate-pulse"></div>
                        <div class="w-12 py-1.5 bg-ui-700 animate-pulse"></div>
                        <div class="w-16 py-1.5 bg-ui-700 animate-pulse"></div>
                    </div>
                </div>
            </div>
            <slot v-else/>
        </div>
        <div class="y space-y-2 p-4 pt-3 bg-ui-900 grow" :class="wide ? 'rounded-r-lg ' : 'rounded-b-lg'">
            <div class="y gap-1 items-start justify-between">
                <span class="font-bold">{{ cosmetic.name }}</span>
                <div class="x flex-wrap gap-1">
                    <div v-if="cosmetic.credits" class="x px-2 py-0.5 items-center space-x-1 bg-amber-500/25 text-amber-500 text-sm rounded-lg">
                        <Icon name="circle-stack" size="16" scale="size-4"/>
                        <span>{{ cosmetic.credits }}</span>
                    </div>
                    <div v-if="cosmetic.cents" class="x px-2 py-0.5 items-center space-x-1 bg-green-500/25 text-green-500 text-sm rounded-lg">
                        <Icon name="banknotes" size="16" scale="size-4"/>
                        <span>${{ cosmetic.cents / 100 }}</span>
                    </div>
                    <div v-if="cosmetic.premium_tier" class="x px-2 py-0.5 items-center space-x-1 bg-fuchsia-500/25 text-fuchsia-500 text-sm rounded-lg">
                        <Icon name="heart" size="16" scale="size-4"/>
                        <span>Supporter</span>
                    </div>
                </div>
            </div>
            <p v-if="cosmetic.description" class="text-ui-500 grow">{{ cosmetic.description }}</p>
            <Lightbox>
                <button class="bg-blue-500 rounded-lg text-white font-bold px-2 py-1 w-full">Purchase</button>
                <template #content>
                    <div class="rounded-lg bg-ui-800">
                        <div>

                        </div>
                        <button class="bg-blue-500 rounded-lg text-white font-bold px-2 py-1 w-full">Purchase</button>
                    </div>
                </template>
            </Lightbox>
        </div>
    </div>
</template>
