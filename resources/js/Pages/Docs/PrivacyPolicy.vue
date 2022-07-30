<template>
    <Head title="Privacy Policy" />

    <div class="font-sans text-gray-900 antialiased">
        <div class="pt-4 bg-gray-100">
            <div class="min-h-screen flex flex-col items-center pt-6 sm:pt-0">
                <div>
                    <jet-authentication-card-logo />
                </div>

                <div class="w-full sm:max-w-2xl my-6 p-6 bg-white shadow-md overflow-hidden sm:rounded-lg prose">
                    <div class="max-w-6xl">
                        <h1 class="text-xl font-bold text-center">Privacy Policy</h1>
                        <h6 class="underline text-center"><Link href="/">Return Home</Link></h6>
                        <h2 class="text-md font-bold">Information We Collect</h2>
                        <p>We collect information required for site operation. There are no third-party cookies or trackers. If you
                            choose to register an account we will collect your email and when you link an account we will save your
                            Geometry Dash account ID and user ID. If you have a Full Access account we will also store an encrypted
                            (not hashed) version of your password for API use. We do not store passwords in any other scenario. If
                            you are unsure if your account is Full Access, it is not. Some other things we may collect include but
                            are not limited to IP Address (and any information that can be acquired from it), User Agent, and
                            cookies.</p>
                        <h2 class="text-md font-bold">Children Under 13</h2>
                        <p>To protect children under the age of 13 we require registered users to verify their age upon sign up.
                            This information is not stored.</p>
                        <h2 class="text-md font-bold">Governing Laws</h2>
                        <p>This site's server is hosted and operates within the US state of Missouri and as such is bound by US
                            federal and Missouri state laws.</p>
                        <h2 class="text-md font-bold">Deleted & Requesting Your Personal Information</h2>
                        <p>You have a right to request the deletion of your account and related information. Please contact a staff
                            member and we can sort it out for you. You also may ask a staff member for a copy of the data we have
                            collected.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue'
import { Head, Link } from '@inertiajs/inertia-vue3';
import JetAuthenticationCardLogo from '@/Jetstream/AuthenticationCardLogo.vue'

export default defineComponent({
    components: {
        Link,
        Head,
        JetAuthenticationCardLogo,
    },
})
</script>
