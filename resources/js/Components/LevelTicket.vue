<script setup>
import {Link} from "@inertiajs/vue3";

const props = defineProps({
    level: Object
})

const difficulties = [
    "Unrated",
    "Auto",
    "Easy",
    "Normal",
    "Hard",
    "Harder",
    "Insane",
    "Easy Demon",
    "Medium Demon",
    "Hard Demon",
    "Insane Demon",
    "Extreme Demon",
]

const face = () => {
    if (!props.level.difficulty) {
        return difficulties[0].toLowerCase()
    }

    let name = difficulties[props.level.difficulty].toLowerCase().split(' ').reverse().join('-')

    if(props.level.epic) {
        name += '-epic'
    } else if (props.level.featured) {
        name += '-featured'
    }

    return name;
}
</script>
<template>
    <Link :href="route('levels.show', level.id)">
        <div class="relative group">
            <div v-if="level.reviews && level.reviews.length" class="z-10 absolute -top-2 -right-2 p-2 bg-ui-700 rounded-full" :title="`Your Review:\n\nDifficulty:\t${level.reviews[0].rating_difficulty}\nGameplay:\t${level.reviews[0].rating_gameplay}\nVisuals:\t\t${level.reviews[0].rating_visuals}\nOverall:\t\t${level.reviews[0].rating_overall}`">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5" :class="{'text-amber-500': !!level.reviews[0].rating_difficulty + !!level.reviews[0].rating_gameplay + !!level.reviews[0].rating_visuals + !!level.reviews[0].rating_overall < 4}">
                    <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                </svg>
            </div>
            <div class="pane overflow-hidden relative hover:shadow-lg transition-shadow text-ui-300 delay-0">
                <div class="y md:flex-row relative z-10 items-center md:space-x-4">
                    <div class="x items-center grow">
                        <div class="x place-items-center w-24 aspect-square mr-4">
                            <img :src="'https://browser.gdps.io/assets/difficulties/' + face(level) + '.png'" alt="difficulty"/>
                        </div>
                        <div class="[text-shadow:black_0_0_10px]">
                            <h2 class="text-2xl font-bold">{{ level.name }}</h2>
                            <p class="text-lg">{{ level.creator }}</p>
                        </div>
                    </div>
                    <div class="x justify-end space-x-4 py-4 transition-[text-shadow] [text-shadow:black_0_0_10px]">
                        <div class="y items-center">
                            <span class="text-2xl font-bold">{{ level.rating_difficulty ? level.rating_difficulty : 'N/A' }}</span>
                            <span class="text-xs">DIFFICULTY</span>
                        </div>
                        <div class="y items-center">
                            <span class="text-2xl font-bold">{{ level.rating_gameplay ? level.rating_gameplay : 'N/A' }}</span>
                            <span class="text-xs">GAMEPLAY</span>
                        </div>
                        <div class="y items-center">
                            <span class="text-2xl font-bold">{{ level.rating_visuals ? level.rating_visuals : 'N/A' }}</span>
                            <span class="text-xs">VISUALS</span>
                        </div>
                        <div class="y items-center">
                            <span class="text-2xl font-bold">{{ level.rating_overall ? level.rating_overall : 'N/A' }}</span>
                            <span class="text-xs">OVERALL</span>
                        </div>
                    </div>
                </div>
                <span v-if="level.reviews_count" class="z-10 absolute right-0 bottom-0 px-2 py-0.5 text-sm rounded-tl-lg bg-ui-700/80">{{ level.reviews_count }} reviews</span>
                <div v-if="level.banner_url" class="absolute right-0 top-0 h-full w-full md:w-3/4 group-hover:scale-105 transition-transform bg-cover bg-center opacity-80 md:[mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.8)_75%);]" :style="`background-image:url('${level.banner_url}');`"></div>
            </div>
        </div>
    </Link>
</template>
