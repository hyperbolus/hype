<template>
    <document-head title="Home"/>

    <app-layout>
        <template #breadcrumbs> / <Link href="/link" class="underline">link</Link></template>

        <div v-if="page === 0">
            <p class="mb-2" v-if="stage[0]">Click 'Next' to proceed</p>
            <p class="mb-2" v-else>Choose your verification level before clicking 'Next'</p>
            <div class="select-none flex flex-row space-x-4 max-w-xl">
                <div @click="form.type = 0; stage[0] = true" class="flex flex-col border-2 border-gray-200 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-150 p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-16 w-16" :class="stage[0] ? 'stroke-green-300' : 'stroke-gray-700'" fill="none"
                         viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                    </svg>
                    <span class="font-bold">Ownership Verification</span>
                    <p class="text-gray-400 text-sm">The simplest form of account linking. Allows third-party services
                        to verify, via OAuth 2.0, GD account ownership only. Not edit or access other account data such
                        as messages, statuses, settings, or save data. No passwords are stored anywhere.</p>
                </div>
                <div class="select-none flex flex-col justify-center border-2 border-gray-200 bg-gray-50 rounded-lg p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-16 w-16 stroke-gray-500" fill="none"
                         viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
                    </svg>
                    <span class="font-bold">Full Access <span class="text-red-500">(Unavailable)</span></span>
                    <p class="text-gray-400 text-sm">The highest level of account linking which both verifies ownership
                        as well as allowing configurable read/write access to a GD account. Since this account type
                        requires storing your GD account password it is only available to select testers at the
                        moment.</p>
                </div>
            </div>
        </div>
        <div v-if="page === 1">
            <p class="mb-2" v-if="stage[1]">Click 'Next' to proceed</p>
            <p class="mb-2" v-else>Choose your verification method before clicking 'Next'</p>
            <div class="flex flex-row space-x-4 max-w-xl">
                <div @click="form.method = 0; stage[1] = true" class="select-none hover:cursor-pointer flex flex-col border-2 border-gray-200 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-150 p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-16 w-16" :class="stage[1] ? 'stroke-green-300' : 'stroke-gray-700'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                    </svg>
                    <span class="font-bold">Password</span>
                    <p class="text-gray-400 text-sm">Enter your GD account username and password. This is the
                    quickest and simplest way of linking your GD account. <template v-if="form.type === 0">Since your
                        verification level is set to Ownership Verification, we will NOT store your password.
                        It will only be used to log into your GD account.</template><template v-else>Since your
                        verification level is set to Full Access, will WILL store your GD account password in our
                        database. It will be encrypted.</template></p>
                </div>
                <div class="select-none flex flex-col justify-center border-2 border-gray-200 bg-gray-50 rounded-lg p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-16 w-16 stroke-gray-500" fill="none" viewBox="0 0 24 24" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span class="font-bold">GD Message <span class="text-red-500">(Unavailable)</span></span>
                    <p class="text-gray-400 text-sm">This method may be slower and is prone to error. You will send
                    a message with a special code to a GD account from the account you wish to link. If your
                    account is being linked manually or with a staff member, choose this option.</p>
                </div>
            </div>
        </div>
        <div v-if="page === 2">
            <p class="mx-32">Enter your information</p>
            <p class="text-red-500">{{formMessage}}</p>
            <form @submit.prevent="submit" class="text-left mt-2" role="presentation" autocomplete="off">
                <div>
                    <jet-label for="gdname" value="GD Username" />
                    <jet-input id="gdname" type="text" class="mt-1 block w-full" v-model="usernameInput" required autofocus autocomplete="gd_licker"/>
                </div>
                <div class="mt-2">
                    <jet-label for="gdpass" value="GD Password" />
                    <jet-input id="gdpass" type="password" class="mt-1 block w-full" v-model="passwordInput" required autofocus autocomplete="gd_tickler"/>
                </div>
            </form>
        </div>
        <div v-if="page === 3">
            <p class="mx-32 text-green-400">Success! Your account {{ form.username }} has been linked.</p>
            <h6 class="underline text-center"><Link href="/">Return Home</Link></h6>
        </div>
        <div v-if="page !== 3" class="mt-4 flex flex-row justify-between">
            <button v-if="page !== 0" @click="page--" class="rounded bg-gray-100 py-1 px-2 shadow hover:shadow-md transition-shadow">&lt; Back</button>
            <button disabled v-else class="rounded text-white py-1 px-2">&lt; Back</button>
            <span>Step {{ page + 1 }}</span>
            <template v-if="page === 2">
                <button v-if="stage[2]" @click="submit" class="select-none rounded bg-green-400 text-white py-1 px-2">Finish</button>
                <button disabled v-else class="rounded bg-gray-200 text-gray-400 py-1 px-2 shadow hover:shadow-md transition-shadow">Finish</button>
            </template>
            <template v-else>
                <button v-if="stage[page]" @click="page++" class="rounded bg-gray-100 py-1 px-2 shadow hover:shadow-md transition-shadow">Next &gt;</button>
                <button disabled v-else class="rounded bg-gray-200 text-gray-400 py-1 px-2">Next &gt;</button>
            </template>
        </div>
    </app-layout>
</template>
<script>
import {defineComponent} from 'vue'
import {Head as DocumentHead, Link} from '@inertiajs/inertia-vue3';
import AppLayout from "@/Pages/Beta/Layout";
import JetLabel from "@/Jetstream/Label";
import JetInput from "@/Jetstream/Input";
import InputError from "@/Jetstream/InputError";

export default defineComponent({
    props: {
        page: Number
    },
    components: {
        InputError,
        AppLayout,
        DocumentHead,
        Link,
        JetLabel,
        JetInput,
    },
    data() {
        return {
            page: this.$page.props.page ?? 0,
            stage: [
                false,
                false,
                false
            ],
            form: this.$inertia.form({
                type: null,
                method: null,
                user: this.$page.props.user.id,
                code: '',
                username: '',
                password: '',
            }),
            usernameInput: '',
            passwordInput: '',
            formMessage: '',
        }
    },
    methods: {
        submit() {
            axios.post('/proxy/login', {
                username: this.form.username,
                password: this.form.password,
                user: this.form.user
            }).then((response) => {
                if (response.data.status === 'success') {
                    this.page = 3;
                } else {
                    this.formMessage = `Login failed. Error: ${response.data.reason} Try again.`;
                }
            })
            /*this.form.post('/proxy/login', {
                    onFinish: () => {
                        this.form.reset('password');
                        this.passwordInput = '';
                    },
            })*/
        }
    },
    watch: {
        usernameInput(val) {
            this.form.username = val;
            this.stage[2] = !!(val && this.form.password);
        },
        passwordInput(val) {
            // TODO: add asterisk thingy workaround stupid fuck browsers i am your god
            this.form.password = val;
            this.stage[2] = !!(this.form.username && val);
        },
        loginResponse() {

        }
    }
})
</script>
