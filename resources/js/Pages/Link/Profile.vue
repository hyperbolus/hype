<template>
    <div class="flex flex-col justify-center items-center min-h-screen" style="background:linear-gradient(#004A63, #00222D);">
        <div class="flex flex-col space-y-4 rounded-lg p-4 text-white" style="background-color: rgba(0, 0, 0, 0.6)">
            <h1 class="font-bold text-3xl">{{ profile.username }}</h1>
            <div class="flex flex-row space-x-4">
                <span class="flex flex-row items-center text-xl font-bold"><img class="h-8 mr-2" src="../../../img/star.png" alt="stars"/>{{ profile.stars }}</span>
                <span class="flex flex-row items-center text-xl font-bold"><img class="h-8 mr-2" src="../../../img/diamond.png" alt="diamond"/>{{ profile.diamonds }}</span>
                <span class="flex flex-row items-center text-xl font-bold"><img class="h-8 mr-2" src="../../../img/coin.png" alt="coin"/>{{ profile.coins }}</span>
                <span class="flex flex-row items-center text-xl font-bold"><img class="h-8 mr-2" src="../../../img/silvercoin.png" alt="silvercoin"/>{{ profile.userCoins }}</span>
                <span class="flex flex-row items-center text-xl font-bold"><img class="h-8 mr-2" src="../../../img/demon.png" alt="demon"/>{{ profile.demons }}</span>
                <span class="flex flex-row items-center text-xl font-bold"><img class="h-8 mr-2" src="../../../img/cp.png" alt="cp"/>{{ profile.cp }}</span>
            </div>
            <template v-if="!!profile.plus">
                <p v-if="profile.plus.bio" class="rounded p-2" style="background-color: rgba(255, 255, 255, 0.25)">{{ profile.plus.bio }}</p>
                <div class="flex flex-row space-x-4 justify-center">
                    <span class="flex flex-row items-center" v-if="profile.plus.pronouns">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {{ profile.plus.pronouns }}
                    </span>
                    <span class="flex flex-row items-center" v-if="profile.plus.location">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        {{ profile.plus.location }}
                    </span>
                    <span class="flex flex-row items-center" v-if="profile.plus.website">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                        {{ profile.plus.website }}
                    </span>
                    <span class="flex flex-row items-center" v-if="profile.plus.discord">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
                        {{ profile.plus.discord }}
                    </span>
                </div>
            </template>
            <div class="flex flex-row justify-between">
                <iframe v-if="profile.plus.video" src="https://www.youtube-nocookie.com/embed/gzF7aHxk4Y4" title="YouTube" frameborder="0" allow="clipboard-write; encrypted-media; picture-in-picture" allowfullscreen></iframe>
                <img style="height: 200px;" alt="card" :src="'https://i.profile.gd/'+profile.username+'.png'"/>
            </div>
        </div>
        <document-head>
            <title>{{ profile.username }}</title>
            <meta property="og:title" :content="profile.username + '\'s Profile'" />
            <meta property="og:type" content="website" />
            <meta property="og:url" :content="'https://profile.gd/' + profile.username" />
            <meta property="og:image" :content="'https://i.profile.gd/' + profile.username.toLowerCase() + '.png'" />
            <template v-if="!!profile.plus.bio">
                <meta property="og:description" :content="profile.plus.bio" />
            </template>
            <meta v-else property="og:description" :content="'This user has no bio'" />
            <meta name="twitter:card" content="summary_large_image">
        </document-head>
    </div>
</template>
<script>
import {defineComponent} from 'vue'
import {Link, Head as DocumentHead} from '@inertiajs/inertia-vue3'


export default defineComponent({
    components: {
        Link,
        DocumentHead
    },
    props: {
        profile: Object
    },
})
</script>
