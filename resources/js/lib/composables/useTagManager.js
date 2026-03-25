import {useForm} from "@inertiajs/vue3";
import route from "ziggy-js";
import {ref, watch} from "vue";

export function useTagManager(tags, level, votes, tagsKey = 'top_tags') {
    const searchResults = ref([]);
    const searchQuery = ref('');

    watch(searchQuery, q => {
        const LIMIT = 25;

        searchResults.value = [];

        if (q.toString().trim() === '') {
            for (let i = 0; i < Math.min(tags.length, LIMIT); i++) searchResults.value.push(tags[i]);
        } else {
            for (let i = 0; i < tags.length; i++) {
                if (tags[i].name.toString().toLowerCase().includes(q.toString().toLowerCase())) searchResults.value.push(tags[i]);
                if (searchResults.value.length >= LIMIT) break;
            }
        }
    }, { immediate: true })

    watch([level, votes], () => calcVotes());

    const formVote = useForm({
        approved: true,
        tag_id: null,
    });

    const formVerify = useForm({
        verify: true,
        tag_id: null,
    });

    const fromName = (name) => {
        if (typeof name === 'number') return name;

        for (const tag of tags) if (tag.name.toString().toLowerCase() === name.toString().toLowerCase()) return tag.id;

        return null;
    }

    const vote = (tag, approved = true,  callback = null) => {
        formVote.tag_id = fromName(tag);
        formVote.approved = approved;

        formVote.post(route('levels.tags.store', level.value.id), {
            onSuccess: () => {
                if (typeof callback === 'function') callback();
                formVote.reset();
            }
        });
    }

    const verify = (tag, verified) => {
        formVerify.tag_id = fromName(tag);
        formVerify.verify = verified;

        formVerify.post(route('levels.tags.store', level.value.id), {
            onSuccess: () => {
                formVerify.reset();
            }
        });
    }

    const calcVotes = () => {
        for (let tag in level.value[tagsKey]) {
            // If this vote is in your list of voted on tags for this level
            let vote = votes.value.find(v => v.votable_id === level.value[tagsKey][tag].id)

            // Set approved or not
            if (vote) level.value[tagsKey][tag].approved = vote.approved;

            // Mark the tag as having a vote from you on it
            level.value[tagsKey][tag].voted = !!vote;
        }
    }

    calcVotes();

    return {
        formVerify,
        formVote,
        searchQuery,
        searchResults,
        vote,
        verify,
    };
}
