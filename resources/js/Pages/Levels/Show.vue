<script setup>
import Layout from './Layout.vue'
import {Link, useForm} from '@inertiajs/vue3';
import Carousel from "@/Components/Carousel.vue";
import VideoLightbox from "@/Components/VideoLightbox.vue";
import route from 'ziggy-js'
import {isAuthenticated} from "@/util.js";
import {ref} from "vue";
import LevelReview from "@/Components/LevelReview.vue";
import ReplayTicket from "@/Components/ReplayTicket.vue";
import Input from "@/Jetstream/Input.vue";
import Button from "@/Jetstream/Button.vue";
import Icon from "@/Components/Icon.vue";
import {useClipboard} from "@vueuse/core";
import Lightbox from "@/Components/Lightbox.vue";
import Errors from "@/Components/Errors.vue";
import getYouTubeID from "get-youtube-id";
import RatingsCurve from "@/Components/RatingsCurve.vue";
import PaneTable from "@/Components/PaneTable.vue";
import LevelTicket from "@/Components/LevelTicket.vue";
import PlaylistTicket from "@/Components/PlaylistTicket.vue";

const props = defineProps({
    level: Object,
    playlists: Object,
    ranking: Object,
    review: Object,
    reviews: Object,
    sorting: Object,
    curve: Object,
    moreBy: Object,
})

const source = ref(props.level.id)
const { copied, copy } = useClipboard({source, legacy: true})

const videoForm = useForm({
    level_id: props.level.id,
    video_id: ''
})

const submitVideo = () => {
    videoForm.transform(data => ({
        ...data,
        video_id: getYouTubeID(videoForm.video_id),
    })).post(route('videos.store'), {
        onFinish: () => videoForm.reset('video_id'),
    });
};

const reviewData = ref({
    'All': props.level.reviews_only_count + props.level.ratings_only_count,
    'Reviews Only': props.level.reviews_only_count,
    'Ratings Only': props.level.ratings_only_count,
});

const levelData = ref({
    'ID': props.level.id,
    'Title': props.level.name,
    'Creator': props.level.creator,
    'Downloads': props.level.downloads,
    'Likes': props.level.likes,
});

const songData = ref({
    'ID': props.level.song_id,
    'Song': props.level.song_name,
    'Artist': props.level.song_author,
});
</script>
<template>
    <Layout>
        <div class="flex !mt-0 flex-col md:flex-row bg-ui-950 border border-ui-900 rounded-lg p-4 gap-4 my-4">
            <div class="y space-y-2 md:w-3/4">
                <h2 class="font-bold text-2xl">Description</h2>
                <p class="pane" :class="{'text-ui-500 text-center': level.description?.trim().length === 0}">{{ level.description?.trim().length > 0 ? level.description : 'No description provided' }}</p>
                <template v-if="false">
                    <div class="x items-center justify-between">
                        <h2 class="font-bold text-2xl">Images</h2>
                        <Link :href="route('levels.images.show', level.id)" class="pane !py-1">Submit</Link>
                    </div>
                    <div v-if="level.images.length === 0" class="pane">No images available. Add one?</div>
                    <Carousel v-else :images="level.images"/>
                </template>
                <div class="x items-center justify-between">
                    <h2 class="font-bold text-2xl">Videos</h2>
                    <Lightbox>
                        <span class="pane !py-1 cursor-pointer">Submit</span>
                        <template #content>
                            <div @click.stop v-if="isAuthenticated()" class="glass p-4 text-ui-200">
                                <form @submit.prevent="submitVideo" class="space-y-2">
                                    <Input v-model="videoForm.video_id" type="text" placeholder="YouTube Video Link" required/>
                                    <Errors/>
                                    <Button>Add</Button>
                                </form>
                            </div>
                            <div @click.stop v-else class="pane text-ui-200">
                                <span>You must <Link class="underline" :href="route('auth::login')">log in</Link> to submit a video</span>
                            </div>
                        </template>
                    </Lightbox>
                </div>
                <div v-if="level.videos.length === 0" class="pane text-ui-500 text-center">No videos available</div>
                <div class="x gap-2">
                    <VideoLightbox v-for="video in level.videos" :video="video"/>
                    <Lightbox v-if="level.videos.length < 3" class="hidden sm:block w-full">
                        <div class="y text-ui-400 items-center justify-center border-4 border-ui-600 bg-ui-900 border-dashed rounded-md py-5" :class="{'aspect-video': level.videos.length > 0}">
                            <p>Submit a Video</p>
                            <Icon type="outline" size="24" scale="size-12" name="plus-circle"/>
                        </div>
                        <template #content>
                            <div @click.stop v-if="isAuthenticated()" class="glass p-4 text-ui-200">
                                <form @submit.prevent="submitVideo" class="space-y-2">
                                    <Input v-model="videoForm.video_id" type="text" placeholder="YouTube Video Link" required/>
                                    <Errors/>
                                    <Button>Add</Button>
                                </form>
                            </div>
                            <div @click.stop v-else class="pane text-ui-200">
                                <span>You must <Link class="underline" :href="route('auth::login')">log in</Link> to submit a video</span>
                            </div>
                        </template>
                    </Lightbox>
                    <div v-if="level.videos.length === 1" class="hidden md:block w-full aspect-video rounded-md bg-ui-900"></div>
                </div>

                <LevelReview v-if="review" :review="review" :level="level"/>

                <div class="x items-center justify-between">
                    <h2 class="font-bold text-2xl">Recent Reviews</h2>
                    <Link :href="route('reviews.create') + '?level=' + level.id" class="x items-center space-x-1.5 rounded-md font-bold text-white px-3 py-1 !bg-blue-500">
                        <span>{{ review ? 'Edit Your' : 'Write a' }} Review/Rating</span>
                        <Icon name="pencil"/>
                    </Link>
                </div>
                <div v-if="reviews.length === 0" class="pane">This level has no reviews. Be the first!</div>
                <LevelReview v-for="review in reviews" :review="review" :level="level"/>
                <Link :href="route('levels.reviews.show', level.id)" class="self-end underline !mt-0">More Reviews</Link>

                <h2 class="font-bold text-2xl">More Levels</h2>
                <div v-if="moreBy.length === 0" class="pane text-ui-500 text-center">No other levels by this creator are tracked on Hyperbolus</div>
                <LevelTicket v-for="lvl in moreBy" :level="lvl"/>

                <h2 class="font-bold text-2xl">Included in Playlists</h2>
                <div v-if="playlists.length === 0" class="pane text-ui-500 text-center">This level is not included in any Hyperbolus playlists</div>
                <PlaylistTicket  v-for="playlist in playlists" :key="playlist.id" :playlist="playlist"/>
            </div>
            <div class="y space-y-2 md:w-1/4">
                <div class="w-full space-y-2">
                    <h2 class="font-bold text-2xl">Info</h2>
                    <div v-if="ranking && ranking.rank <= 100" class="x items-center pane !px-3 !bg-amber-500 text-white">
                        <Icon size="24" scale="size-8" class="mr-2" name="trophy"/>
                        <div class="y leading-tight">
                            <span class="font-bold">#{{ ranking.rank }} User Rated Overall</span>
                            <span class="text-xs" v-if="ranking.joint_ranked > 1">{{ ranking.joint_ranked }}-Way Tie</span>
                        </div>
                    </div>
                    <PaneTable :data="levelData" :copyables="['ID']" :links="{'Creator': route('profiles.show', level.creator)}"/>
                    <PaneTable :data="songData" :copyables="['ID']" :links="{'Artist': `//${level.song_author}.newgrounds.com`, 'Song': `//newgrounds.com/audio/listen/${level.song_id}`}"/>
                    <RatingsCurve :model="level" :curve="curve"/>
                    <PaneTable :data="reviewData"/>
                </div>
                <div class="hidden md:block w-full space-y-2">
                    <div class="x items-center justify-between">
                        <h2 class="font-bold text-2xl">Replays</h2>
                        <Link :href="route('replays.create')" class="pane !py-1 cursor-pointer">Submit</Link>
                    </div>
                    <div v-if="level.replays?.length === 0" class="pane">No replays available</div>
                    <div v-else class="pane !py-0 !px-0 divide-y divide-ui-800">
                        <ReplayTicket v-for="macro in level.replays" :macro="macro" :level="level"/>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>
<style scoped>
input[type=range] {
    @apply h-1.5 rounded bg-ui-950
}

input[type=range]::-moz-range-thumb, input[type=range]::-webkit-slider-thumb {
    @apply bg-ui-700 border-none cursor-pointer
}

input[type=range][disabled]::-moz-range-thumb, input[type=range]::-webkit-slider-thumb {
    @apply opacity-0
}
</style>
