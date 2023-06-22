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

const displayRating = (rating) => {
    return rating ? rating.toFixed(1) : '-';
}
// TODO: Fucking disgusting, clean it up
</script>
<template>
    <Link :href="route('levels.show', level.id)">
        <div class="relative group">
            <div v-if="level.reviews && level.reviews.length" class="z-10 absolute -top-2 -right-2 p-2 bg-ui-700 rounded-full" :title="`Your Review:\n\nDifficulty:\t${level.reviews[0].rating_difficulty}\nGameplay:\t${level.reviews[0].rating_gameplay}\nVisuals:\t\t${level.reviews[0].rating_visuals}\nOverall:\t\t${level.reviews[0].rating_overall}`">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5" :class="{'text-amber-500': !!level.reviews[0].rating_difficulty + !!level.reviews[0].rating_gameplay + !!level.reviews[0].rating_visuals + !!level.reviews[0].rating_overall < 4}">
                    <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                </svg>
            </div>
            <div class="pane z-0 !px-0 !py-0 overflow-hidden relative hover:shadow-lg transition-shadow text-ui-300 delay-0">
                <div class="x relative z-10 items-center md:space-x-2">
                    <div class="y w-full z-0">
                        <div class="x items-center px-4 py-2 [text-shadow:black_0_0_10px]">
                            <div class="hidden mr-4 sm:flex place-items-center w-16 aspect-square">
                                <img :src="'https://browser.gdps.io/assets/difficulties/' + face(level) + '.png'" alt="difficulty"/>
                            </div>
                            <div class="y">
                                <div class="x z-10 items-center h-full space-x-1">
                                    <h2 class="text-2xl font-bold mr-2">{{ level.name }}</h2>
                                    <div class="rounded-full p-[.15rem] py-2 bg-yellow-400" :class="{'invisible': level.stars === 0}"></div>
                                    <div class="rounded-full p-[.15rem] py-2 bg-amber-500" :class="{'invisible': !level.featured}"></div>
                                    <div class="rounded-full p-[.15rem] py-2 bg-red-500" :class="{'invisible': !level.epic}"></div>
                                </div>
                                <p class="text-lg">{{ level.creator }}</p>
                            </div>
                        </div>
                        <div class="x z-10 md:-translate-x-8 justify-center sm:w-fit sm:skew-x-12 sm:rounded-tr-lg bg-ui-800">
                            <div class="grid sm:-skew-x-12 grid-cols-4 md:ml-8 gap-4 py-1.5 px-4 transition-[text-shadow] [text-shadow:black_0_0_10px]">
                                <span class="y">
                                    <span class="text-xs uppercase">Difficulty</span>
                                    <span class="text-lg font-bold">{{ displayRating(level.rating_difficulty) }}</span>
                                </span>
                                <span class="y">
                                    <span class="text-xs uppercase">Gameplay</span>
                                    <span class="text-lg font-bold">{{ displayRating(level.rating_gameplay) }}</span>
                                </span>
                                <span class="y">
                                    <span class="text-xs uppercase">Visuals</span>
                                    <span class="text-lg font-bold">{{ displayRating(level.rating_visuals) }}</span>
                                </span>
                                <span class="y">
                                    <span class="text-xs uppercase">Overall</span>
                                    <span class="text-lg font-bold">{{ displayRating(level.rating_overall) }}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="level.banner_url" class="absolute right-0 top-0 h-full w-full -md:w-4/5 group-hover:scale-105 transition-transform bg-cover bg-center opacity-80 [mask-image:linear-gradient(to_right,rgba(0,0,0,0.1)_25%,rgba(0,0,0,1)_60%);]" :style="`background-image:url('${level.banner_url}');`"></div>
            </div>
        </div>
    </Link>
</template>
