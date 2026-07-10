import {useForm} from "@inertiajs/vue3";
import route from "ziggy-js";
import {ref, watch} from "vue";

export function usePlaylistManager(defaultOptions = {preserveScroll: true}) {
    const formDeleteSubmission = useForm({});

    const submitLevelForm = useForm({
        level_id: '',
        position: '',
    });

    const deleteSubmission = (id, options) => {
        formDeleteSubmission.delete(route('submissions.destroy', id), {
            ...defaultOptions,
            ...options,
        });
    }

    const submit = (playlist, level, options) => {
        if (submitLevelForm.processing) return;

        // check for callbacks to hook them manually at the end

        submitLevelForm.level_id = level;
        submitLevelForm.post(route('submissions.store', playlist), {
            ...defaultOptions,
            ...options,
            onSuccess: () => {
                submitLevelForm.reset();
            },
        });
    }

    return {
        submit,
    };
}
