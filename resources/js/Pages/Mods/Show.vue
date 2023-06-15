<script setup>
import AppLayout from '@/Layouts/Dash.vue'
import route from 'ziggy-js'
import {Link, useForm} from '@inertiajs/vue3'
import Avatar from "@/Components/Avatar.vue";
import Username from "@/Components/Username.vue";
import Carousel from "@/Components/Carousel.vue";
import Timestamp from "@/Components/Timestamp.vue";
import Button from '@/Jetstream/Button.vue'
import Post from "@/Components/Post.vue";
import {ref} from 'vue'
import DiscordInvite from "@/Components/DiscordInvite.vue";

const props = defineProps({
    mod: Object,
    review: Object
})

const form = useForm({
    rating_gameplay: props.review ? props.review.rating_gameplay : 5,
    rating_difficulty: props.review ? props.review.rating_difficulty : 5,
    rating_visuals: props.review ? props.review.rating_visuals : 5,
    rating_overall: props.review ? props.review.rating_overall : 5,
    body: props.review ? props.review.review : '',
    mod_id: props.mod.id
});

const submit = () => {
    form.post(route('reviews.store'), {
        preserveScroll: true,
    });
};

const post = ref({
    id: 1,
    author_id: 1,
    user: {
        id: 1,
        name: 0
    },
    body: '<p>Welcome the the world famous Sum Attempts mod</p><blockquote>The best mod on da market<br/>&mdash; yer baby</blockquote><p><b>so water you waiting for? throw money at your screen already!</b></p>',
    media: [],
    reactions: [
        {
            id: 1,
            reacter_id: 1,
            reacter: {
                id: 1,
                name: 'Admin'
            },
            created_at: '2023-03-17T00:01:02.000000Z'
        }
    ],
    created_at: '2023-03-17T00:01:02.000000Z',
    updated_at: '2023-03-17T00:01:02.000000Z'
})
</script>
<template>
    <app-layout title="Mods">
        <template #breadcrumbs>
            <Link :href="route('mods.index')">Mods</Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
            <Link :href="route('mods.show', mod)">{{ mod.name }}</Link>
        </template>
        <div class="y space-y-2 md:w-3/4">
            <div class="x items-center justify-between">
                <div class="x items-center gap-2">
                    <span class="p-6 bg-blue-500 rounded-full"></span>
                    <div class="y">
                        <h1 class="text-2xl font-bold">{{ mod.name }}<span class="opacity-50 text-lg ml-2">1.0.0</span></h1>
                        <span class="text-sm">{{ mod.blurb }}</span>
                    </div>
                </div>
                <div class="y cursor-pointer items-center leading-none rounded h-fit bg-ui-900 px-3 py-1">
                    <span class="font-bold text-sm">Download Now</span>
                    <span class="text-xs -mt-1">12.83 KB .geode</span>
                </div>
            </div>
            <div>
                <div class="x space-x-1 px-4">
                    <div class="bg-ui-900 px-2 py-1 rounded-t text-sm">Content</div>
                    <div class="bg-ui-800 px-2 py-1 rounded-t text-sm">Files</div>
                    <div class="bg-ui-800 px-2 py-1 rounded-t text-sm">Updates (4)</div>
                    <div class="bg-ui-800 px-2 py-1 rounded-t text-sm">Reviews (70)</div>
                    <div class="bg-ui-800 px-2 py-1 rounded-t text-sm">Discussion</div>
                </div>
                <Post class="border-none" :postbit="false" :user="post.user" :post="post"/>
            </div>
            <h2 class="font-bold text-2xl">Images</h2>
            <div v-if="1 === 0" class="pane">No images available. Add one?</div>
            <Carousel v-else :images="[{url: mod.banner_url}]"/>
            <h2 class="font-bold text-2xl">Reviews</h2>
            <form v-if="$page.props.auth" @submit.prevent="submit" class="x pane gap-4">
                <div class="space-y-2 w-full">
                    <div class="x justify-between">
                        <h2 class="text-xl">{{ props.review ? 'Edit Your' : 'Submit' }} Rating</h2>
                        <div class="relative whitespace-nowrap h-fit">
                            <div class="x">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                            </div>
                            <input class="opacity-50 w-full absolute bottom-0" v-model="form.rating_overall" type="range" min="0" max="10" step="1"/>
                        </div>
                    </div>
                    <textarea v-model="form.body" class="resize-none resize-y w-full pane border-none"></textarea>
                    <Button class="w-fit" @click="submit">{{ props.review ? 'Edit Your' : 'Submit' }} Rating</Button>
                </div>
            </form>
            <div v-else class="y pane">
                <h2 class="text-xl"><Link class="underline" :href="route('auth::login')">Log in</Link> to submit a review</h2>
            </div>
            <div v-if="1 === 0" class="pane">
                This level has no reviews. Be the first!
            </div>
            <div v-for="review in []" class="x items-center pane">
                <Avatar class="w-8 h-8 mr-4" :user="review.author"/>
                <div class="y w-full">
                    <div class="x justify-between items-center space-x-2">
                        <h2><Username :user="review.author"/></h2>
                        <span>{{ review.rating_overall/2 }}/5</span>
                    </div>
                    <p>{{ review.review }}</p>
                </div>
            </div>
        </div>
        <div class="y space-y-2 md:w-1/4">
            <span class="font-bold text-2xl">Author</span>
            <div class="x space-x-4 items-center pane">
                <span class="p-6 bg-blue-500 rounded-full"></span>
                <span class="text-2xl">{{ mod.author }}</span>
            </div>
            <div class="pane text-sm space-y-1">
                <div class="flex justify-between text-sm">
                    <span>Ratings:</span>
                    <div class="x items-center text-sm">
                        <span class="mr-1">(33)</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div class="flex justify-between">
                    <span>Price:</span>
                    <span>FREE</span>
                </div>
                <div class="flex justify-between">
                    <span>Downloads:</span>
                    <span>194</span>
                </div>
                <div class="flex justify-between">
                    <span>Views:</span>
                    <span>1.2k</span>
                </div>
                <div class="flex justify-between">
                    <span>Last Updated:</span>
                    <span>09/09/2022</span>
                </div>
                <div class="flex justify-between">
                    <span>First Created:</span>
                    <span>09/09/2022</span>
                </div>
            </div>
            <DiscordInvite/>
            <div class="x items-center pane">
                <a href="#" class="mr-1 underline">Documentation</a>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                    <path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clip-rule="evenodd" />
                    <path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clip-rule="evenodd" />
                </svg>
            </div>
            <div class="x items-center pane">
                <a href="#" class="mr-1 underline">Source Code</a>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                    <path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clip-rule="evenodd" />
                    <path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clip-rule="evenodd" />
                </svg>
            </div>
            <div class="x items-center pane">
                <a href="#" class="mr-1 underline">Support</a>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                    <path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clip-rule="evenodd" />
                    <path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clip-rule="evenodd" />
                </svg>
            </div>
            <div class="x items-center pane">
                <a href="#" class="mr-1 underline">Issues/Bug Reports</a>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                    <path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clip-rule="evenodd" />
                    <path fill-rule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clip-rule="evenodd" />
                </svg>
            </div>
        </div>
    </app-layout>
</template>
