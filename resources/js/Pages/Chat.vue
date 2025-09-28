<script setup>
import AppLayout from "@/Layouts/Dash.vue";
import Pagination from "@/Components/Pagination.vue";
import {Link, router, useForm} from "@inertiajs/vue3";
import Avatar from "@/Components/Avatar.vue";
import Username from "@/Components/Username.vue";
import route from 'ziggy-js'
import Timestamp from "@/Components/Timestamp.vue";
import {onMounted, onUnmounted, ref, useTemplateRef, watch} from "vue";
import {useElementSize} from "@vueuse/core";
import Lightbox from "@/Components/Lightbox.vue";
import Input from "@/Jetstream/Input.vue";
import {getUser} from "@/util.js";
import Icon from "@/Components/Icon.vue";
import axios from "axios";

const props = defineProps({
    conversations: Object,
    messages: Object,
    recipient: Object,
    unread: Object
});

// todo@later: add other buttons next to delete button etc also muteing and menu buttons on convo cards and header
const convos = ref(props.conversations);
const unreads = ref(props.unread);

const msgs = ref(props.messages.data);
const page = ref(props.messages.current_page)

const message = useForm({
    recipient_id: props.recipient ? props.recipient.id : null,
    body: null
})

const appendingMsg = ref(false);
const sendingMsg = ref(false);
const pending = ref(null);

const sendMessage = () => {
    if (!message.body || sendingMsg.value) return;
    // probably only one pending message can be sent at a time?
    // todo@later: discord style where you can keep sending
    sendingMsg.value = true;

    updatePercentScroll();

    pending.value = 0;
    msgs.value.unshift({
        id: -1,
        sender_id: getUser().id,
        recipient_id: props.recipient.id,
        body: message.body,
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
    })  ;

    axios.post(route('inbox.store'), {
        recipient_id: message.recipient_id,
        body: message.body
    }).then(res => {
        if (res.status !== 200) {
            msgs.value.splice(pending.value, 1);
            sendingMsg.value = false;
        } else {
            message.body = null;
        }
    })
}

const username = ref('')
const users = ref([])
const latestResponse = ref(null)

const searchName = async () => {
    let time = Date.now();
    message.recipient_id = null;

    fetch('/api/mention?except=' + getUser().id + '&name=' + username.value)
        .then(res => res.json())
        .then(data => {
            if(time > latestResponse.value) users.value = data
        })
}

const other = obj => obj.sender_id === getUser().id ? obj.recipient : obj.sender;

const isOther = obj => obj.sender_id !== getUser().id;

const msgClasses = (msg, i) => {
    let classes = '';
    let other = msg.sender_id === props.recipient.id;

    if (msg.sender_id === msgs.value[i + 1]?.sender_id) classes += other ? 'rounded-tl' : 'rounded-tr';

    classes += other ? ' rounded-bl' : ' rounded-br';

    if (msg.id === -1) {
        classes += other ? ' bg-ui-700/50 text-ui-400' : ' bg-blue-500/50 text-ui-300';
    } else {
        classes += other ? ' bg-ui-700' : ' bg-blue-500 text-white';
    }

    return classes;
}

const keypress = (e) => {
    if (!e.shiftKey && e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
    }
}

const messageContainer = useTemplateRef('messageContainer');
const scroller = useTemplateRef('scroller');
const percentScrolled = ref(1);
const scrollTop = ref(0);

onMounted(() => {
    Echo.private(`conversations.${getUser().id}`)
        .listen('MessageSent', (e) => {
            // if currently focused convo
            if ([e.message.recipient_id, e.message.sender_id].includes(props.recipient?.id)) {
                appendingMsg.value = true;
                updatePercentScroll();

                if (pending.value !== null) msgs.value.splice(pending.value, 1); // delete pending ghost
                msgs.value.unshift(e.message);

                pending.value = null;
                sendingMsg.value = false;
            } else {
                fetch('.', {
                    headers: {
                        "X-Inertia": true,
                        "X-Inertia-Partial-Component": 'Chat',
                        "X-Inertia-Partial-Data": 'conversations,unread',
                    }
                }).then(res => res.json())
                    .then(data => {
                        convos.value = data.props.conversations;
                        unreads.value = data.props.unread;
                    });
            }
        });

    if (!props.recipient) return;

    const { height } = useElementSize(messageContainer);

    let parent = scroller.value.parentElement;
    let container = messageContainer.value.parentElement;

    // Height change probably means resize or new message once we get websockets figured.
    watch(height, (v, old) => {
        scroller.value.style.height = (parent.clientHeight * container.scrollHeight / container.clientHeight) + 'px';

        if (old === 0) fetchMsgs();

        if (appendingMsg.value) {
            container.scrollTop = scrollTop.value;
        } else {
            let change = v - old;
            container.scrollTop = change + Math.max(container.scrollTop - change, 0);
        }

        if (percentScrolled.value === 1) container.scrollTop = container.scrollHeight;

        appendingMsg.value = false;
        fetching.value = false;
    });
});

onUnmounted(() => {
    if (!props.recipient) return;

    Echo.leave(`conversations.${getUser().id}`);
})

const fetching = ref(false);

const updatePercentScroll = () => {
    let container = messageContainer.value.parentElement;
    let value = container.scrollTop / (container.scrollHeight - container.clientHeight);
    if (!isNaN(value)) percentScrolled.value = value;
}

const proxyScroll = (source, target) => {
    if (appendingMsg.value) return;
    source  = source.target;
    let percent = source.scrollTop / (source.scrollHeight - source.clientHeight);
    target.scrollTop = (target.scrollHeight - target.clientHeight) * percent;
    scrollTop.value = messageContainer.value.parentElement.scrollTop;
    updatePercentScroll();
    fetchMsgs();
}

const fetchMsgs = () => {
    if (messageContainer.value.parentElement.scrollTop > 50 || page.value === props.messages.last_page || fetching.value) return;
    fetching.value = true;

    // make sure to check if already fetching and if already has a form processing either send message or scroll up
    fetch(route('inbox.show', props.recipient.id) + '?page=' + (page.value + 1), {
        headers: {
            "X-Inertia": true
        }
    }).then(res => res.json())
        .then(data => {
            // fetching must be set false only at the end!!
            updatePercentScroll();
            msgs.value.push(...data.props.messages.data);
            page.value = data.props.messages.current_page;
        });
}

const deleting = ref(false);

const deleteMessage = (id) => {
    deleting.value = true;

    axios.delete(route('inbox.destroy', id)).then(res => {
            if (res.status !== 200) return;
            for (const msg in msgs.value) {
                if (msgs.value[msg].id === id) {
                    msgs.value.splice(msg, 1);
                    break;
                }
            }
            deleting.value = false;
        })
}
</script>
<template>
    <app-layout :fullwidth="true" :decorations="false">
        <div class="x flex-grow shadow-xl bg-ui-950 border border-ui-900/75 lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl w-full md:mx-4 md:my-4 rounded-lg">
            <div class="flex-col space-y-4 md:w-2/5 relative z-10 grow" :class="recipient ? 'hidden md:flex' : 'flex'">
                <div class="x justify-between p-2">
                    <h2 class="mx-2 font-bold text-2xl">Conversations</h2>
                    <Lightbox>
                        <button @click="username = ''; users = [];" class="button">New</button>
                        <template #content>
                            <div @click.stop class="p-4 bg-ui-900 shadow-xl w-full md:w-[32rem] lg:w-[48rem]">
                                <span class="my-1">Recipient</span>
                                <Input @input="searchName" v-model="username" type="text" placeholder="User"/>
                                <ul class="max-h-64 overflow-y-auto min-w-full">
                                    <li class="px-2 py-1 opacity-75 italic" v-if="users.length === 0">No Results</li>
                                    <li class="px-2 py-1 hover:bg-ui-700" v-for="user in users"><Link :href="route('inbox.show', user)">{{ user.name }}</Link></li>
                                </ul>
                            </div>
                        </template>
                    </Lightbox>
                </div>
                <Pagination :list="convos"/>
                <div v-if="convos.total === 0" class="pane text-center italic text-ui-500">damn nobody wanna talk to u fr (0 messages)</div>
                <div class="relative grow overflow-y-auto overflow-x-hidden scroller">
                    <div class="y absolute inset-0">
                        <Link v-for="conversation in convos.data" :href="route('inbox.show', other(conversation).id)" :key="other(conversation).id" class="x justify-between items-center p-4 space-x-2 hover:bg-ui-900 transition-colors" :class="{'bg-ui-800': recipient?.id === other(conversation).id}">
                            <Avatar class="shrink-0" width="w-10" :user="other(conversation)"/>
                            <div class="y grow">
                                <div class="x items-center space-x-2">
                                    <Username :href="false" :card="false" :user="other(conversation)"/>
                                    <Timestamp position="right" class="text-ui-500 text-sm" :time="conversation.created_at"/>
                                </div>
                                <p class="line-clamp-1 text-ui-500 overflow-hidden">{{ recipient && other(conversation).id === recipient.id && msgs ? msgs[0].body : conversation.body }}</p>
                            </div>
                            <span v-show="unreads.hasOwnProperty(conversation.id)" class="flex h-3 w-3 relative">
                            <span class="animate-ping absolute inline-flex bg-blue-500 rounded-full h-full w-full opacity-75"></span>
                            <span class="inline-flex bg-blue-500 rounded-full h-3 w-3"></span>
                        </span>
                        </Link>
                    </div>
                </div>
            </div>
            <div class="flex-col justify-center md:w-3/5 border-l border-ui-900/75 grow" :class="recipient ? 'flex' : 'hidden md:flex'">
                <p v-if="!recipient" class="text-center">Select a conversation to talk</p>
                <div v-if="recipient" class="y grow relative">
                    <div class="flex flex-col md:flex-row absolute top-0 w-full bg-ui-800/50 backdrop-blur-lg rounded-tr-lg z-10 items-center p-4">
                        <Link :href="route('inbox.index')" class="absolute left-0 top-0 bottom-0 h-full x items-center px-4">
                            <Icon name="chevron-left" class="size-6"/>
                        </Link>
                        <Avatar width="size-10 md:size-8" class="md:mr-2" :user="recipient"/>
                        <Username :user="recipient"/>
                    </div>
                    <div class="y relative grow border-b border-ui-900/75">
                        <div class="y justify-center text-center absolute inset-0">
                            <p v-if="msgs.length === 0">Start a conversation</p>
                        </div>
                        <div @scroll="proxyScroll($event, messageContainer.parentElement)" class="absolute bottom-0 right-0 pr-3 top-24 md:top-16 z-20 overflow-y-auto scroller">
                            <div ref="scroller"></div>
                        </div>
                        <div @scroll="proxyScroll($event, scroller.parentElement)" class="absolute inset-0 overflow-y-auto pt-28 md:pt-20 px-6 hide-scroll">
                            <div ref="messageContainer" class="flex flex-col-reverse">
                                <div class="y mb-1 relative group" :class="{'items-end': !isOther(message)}" v-for="(message, i) in msgs">
                                    <div class="flex items-center w-full justify-end" :class="{'flex-row-reverse': isOther(message)}">
                                        <div v-if="!isOther(message) && message.id !== -1" v-show="!deleting" @click="deleteMessage(message.id)" class="p-2 hidden group-hover:block text-ui-600 hover:text-red-500 cursor-pointer transition-colors">
                                            <Icon name="trash" class="size-5"/>
                                        </div>
                                        <p class="y px-4 py-2 rounded-3xl max-w-[80%] break-words whitespace-break-spaces w-fit" :class="msgClasses(message, i)">{{ message.body }}</p>
                                    </div>
                                    <div v-if="message.sender_id !== msgs[i - 1]?.sender_id" class="text-ui-400 text-ui-600">
                                        <span v-if="message.id === -1" >Pending...</span>
                                        <Timestamp v-else :position="isOther(message) ? 'right' : 'left'" :time="message.created_at"/>
                                    </div>
                                </div>
                                <p v-if="page === messages.last_page" class="border-b border-ui-700 pb-1 text-ui-500 w-full text-center mb-4">Start of conversation</p>
                                <div v-else class="y items-center pb-4 pt-10">
                                    <div class="size-10 animate-spin rounded-full border-4 border-l-blue-500 border-b-blue-500/60 border-r-blue-500/30 border-t-transparent" :class="{'invisible': !fetching}"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p v-if="recipient.blocked" class="pane !bg-red-500 font-bold text-white text-center m-2 text-ui-500">You are blocking this user. <u class="cursor-pointer" @click="router.delete(route('relationships.destroy', recipient.id))">Unblock</u></p>
                    <p v-if="recipient.blocking" class="pane text-center m-2 text-ui-500">You cannot message this user because they blocked you</p>
                    <div v-else-if="!recipient.blocking" class="x pane space-x-2 m-2">
                        <div class="grow relative">
                            <textarea @keydown="keypress" rows="1" v-model="message.body" placeholder="Start writing" class="px-1 py-1 resize-none break-all absolute overflow-hidden inset-0 border-none placeholder-ui-600 bg-transparent focus-visible:ring-0"></textarea>
                            <div aria-hidden="true" class="invisible whitespace-pre-wrap break-all px-1 py-1">{{ message.body }}&ZeroWidthSpace;</div>
                        </div>
                        <button :disabled="sendingMsg" @click="sendMessage" class="w-fit transition-colors" :class="{'text-ui-600': sendingMsg}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </app-layout>
</template>
<style scoped>
.scroller {
    scrollbar-width: thin;
    scrollbar-color: #fff7 transparent;
}

.hide-scroll {
    scrollbar-width: none;
}
</style>
