<template>
    <Head title="F.A.Q." />

    <div class="font-sans text-gray-900 antialiased">
        <div class="pt-4 bg-gray-100">
            <div class="min-h-screen flex flex-col items-center pt-6 sm:pt-0">
                <div>
                    <jet-authentication-card-logo />
                </div>

                <div class="w-full sm:max-w-2xl my-6 p-6 bg-white shadow-md overflow-hidden sm:rounded-lg prose">
                    <div class="max-w-6xl">
                        <h1 class="text-xl font-bold text-center">Frequently Asked Questions</h1>
                        <h6 class="underline text-center"><Link href="/">Return Home</Link></h6>
                        <h2 class="text-md font-bold">Do you store my GD password?</h2>
                        <p>No. Not unless you tell us to. When you link your GD account we ask for a password only to verify you own the account, but we do not store it. When you link your GD account you will have two options: Ownership Verification and Full Access. The first one checks ownership only but does not store your password. The second one does store your password for API access to your account. Do to the nature of how GD's servers work having your password is required for performing some of the actions in a Full Access account, but we do encrypt the passwords so even if our database was hacked the hacker would not be able to read your password in plain text. Regardless, for security reasons only certain testers can create Full Access accounts while they are still in beta. The ability to create Full Access accounts are primarily given to other developers. If you are interested in testing it out, feel free to contact staff via Discord. Again, as a precaution if you are a high-profile user such as a top leaderboard player / creator / moderator then you will not be able to create a Full Access link with that GD account.</p>
                        <h2 class="text-md font-bold">I still don't trust it. Is there a way to link my account without a password?</h2>
                        <p>Yes, you can still link your account without entering your password. That's smart security, and I respect that! You can contact a staff member on Discord to walk you through the instructions. We do not have an automated system such as making a profile post or sending a private message in GD to verify to prevent social engineering. We may implement this in the future once we find a method that we determine to be robust enough to prevent less tech-informed users from inadvertently letting someone else link their account on DashLink.</p>
                        <h2 class="text-md font-bold">I tried linking my account and it said it requires further verification. I can't log in with DashLink on other sites ever after linking my account.</h2>
                        <p>There may be a few reason why this has happened.</p>
                        <p>1. Your account may have been banned from using DashLink which can happen for a number of reasons. You can join our discord and ask a staff member for more information.</p>
                        <p>2. Some high-profile accounts have locks on them to prevent unauthorized authentication on other sites. Please contact us on our Discord so we can enable your account manually or let you know why your account is banned.</p>
                        <p>3. If you linked your account but you can't log in on another site, DashLink may be down for maintenance.</p>
                        <h2 class="text-md font-bold">How does Two Factor Authentication work?</h2>
                        <p>Any time you log into DashLink, or you try to log in to another service with DashLink, you will get a Two Factor Authentication code so that you always know when your account is being accessed. If you are a High-Profile account such as a top 100 player, creator, or moderator, 2fa is required.</p>
                        <h2 class="text-md font-bold">What's the point of this?</h2>
                        <p>TL;DR it's like that "Log In with Google" button you see on a lot of websites, except for GD.</p>
                        <p>DashLink may seem less useful from an end-user point of view, but say for example you were a developer of a Geometry Dash related website like MyDemonList, Pointercrae, Lotus or GD Profiles. If you want someone to link their account, you want to be sure that they actually own that account. There are a few ways to do this, but they can require complicated methods like messaging or adding friends within GD. Or typing in your GD password. Some of these methods may take time to verify, especially if done manually. And what if you don't trust the website with your password? We use something called OAuth 2.0 to provide a standard way of authenticating users with their Geometry Dash accounts on other websites. This way you are fully in control. If you wish to remove a third-party website you can simply go on the connections page and remove it.</p>
                        <h2 class="text-md font-bold">How do I use DashLink as a developer?</h2>
                        <p>You can request an API token at the <Link href="/help/developers">Developer Center</Link> along with instructions on using OAuth 2.0</p>
                        <h2 class="text-md font-bold">How is DashLink pronounced?</h2>
                        <p>It's spelled DashLink but pronounced Da Shlink.</p>
                        <h2 class="text-md font-bold">Is there a based balls minigame?</h2>
                        <Link href="/basedball">Yep.</Link>
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
