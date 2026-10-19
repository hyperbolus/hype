<script setup>
import AppLayout from "@/Layouts/Dash.vue";
import Accordion from "@/Components/Accordion.vue";
import {Link} from "@inertiajs/vue3";
import Icon from "@/Components/Icon.vue";
import Username from "@/Components/Username.vue";
import Avatar from "@/Components/Avatar.vue";
import Timestamp from "@/Components/Timestamp.vue";
import UserFlag from "@/Components/UserFlag.vue";

const props = defineProps({
    supporters: Object,
});

const perks = [
    'GIF Banner & Avatar',
    'Custom Post Background',
    'Ad-free Browsing',
    'Change Username (twice a month)',
    'Set Custom User Flair',
    // 'Customize GD Profile Card',
    'Name credit on supporters page & rotating header slot',
    'Supporter Badge',
    // 'Supporter Nameplate',
    // 'Signature on Reviews',
    'Username Customizations',
    // 'View Level Analytics',
    // 'Creator/Profile Analytics',
    // 'Level Viewer',
    // 'Macro Viewer',
    // 'Custom CSS',
];
</script>
<template>
    <app-layout>
        <div class="space-y-2 w-full">
            <h1 class="font-bold text-4xl">Support Us</h1>
            <p>Hyperbolus is free and open source software. If you like this site or find it useful and want to make sure it can keep running in the future, you can support development by becoming an optional paid subscriber on Patreon. As thanks, Hyperbolus supporters can receive exclusive benefits:</p>

            <div class="pane">
                <div v-for="perk in perks" class="x items-center space-x-1">
                    <Icon class="text-green-500" name="check-circle"/>
                    <span>{{ perk }}</span>
                </div>
            </div>

            <h2 class="font-bold text-2xl">Frequently Asked Questions</h2>
            <Accordion :open="true" title="Why should I support you?">
                <p>Your support is completely optional. Hyperbolus is free for all to use. But we still need to support ourselves to pay for servers and other expenses. We currently rely on ad revenue and personal funds to run the site which isn't very sustainable. If you want to ensure that time can be spent continuously improving and keeping the site online, the best way to help is to support us on Patreon. If you can't do that, the second best way is to tell your friends about Hyperbolus so we can grow our community by word of mouth.</p>
            </Accordion>
            <Accordion title="How long do benefits last?">
                <p>Benefits last for the duration of your Patreon billing cycle. You will be charged the day you join and then monthly on that same day. If you choose to cancel, your benefits will expire on that day of the next billing cycle unless otherwise stated.</p>
            </Accordion>
            <Accordion title="Which payment methods are supported?">
                <p>Memberships are managed via Patreon, you can view their help documentation <a class="underline text-blue-500" href="https://support.patreon.com/hc/en-us/articles/360061439691-What-are-my-members-payment-options">here</a>.</p>
            </Accordion>
            <Accordion title="How long does it take to receive benefits on my Hyperbolus account?">
                <p>You must link your Patreon to your Hyperbolus account in the <Link :href="route('settings.connections')">connections</Link> page in settings. You should receive benefits immediately after doing so.</p>
            </Accordion>
            <Accordion title="I linked my account and I haven't received benefits!">
                <p>Try unlinking and relinking your Patreon account in settings. Some benefits might not be fully available due to active bans, blocks, or other account restrictions. If after 24 hours you are not receiving benefits even with a linked account, please <Link :href="route('contact')">contact us</Link>.</p>
            </Accordion>
            <Accordion title="Are there any requirements to support?">
                <p>All you need is a Patreon account. To receive some benefits you must have a registered account on Hyperbolus with a verified email. You may not be able to fully use some benefits depending on active site bans, blocks, or other account restrictions.</p>
            </Accordion>
            <Accordion title="There is a problem with my payment, can I have a refund?">
                <p>Memberships are digital goods to support the site and are not refundable. If you are having trouble with your payment method or some other technical issue using Patreon, contact patreon support. Otherwise, feel free to <Link :href="route('contact')">contact us</Link>.</p>
            </Accordion>

            <h2 class="font-bold text-2xl">Supporters</h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                <div v-for="user in supporters" class="pane flex items-center gap-3">
                    <Avatar :user="user"/>
                    <div class="flex flex-col grow">
                        <Username :user="user"/>
                        <Timestamp class="text-xs text-ui-500" position="left" :length="true" :time="(new Date().getTime() - new Date(user.premium_started_at).getTime()) / 1000"/>
                    </div>
                    <UserFlag :user="user"/>
                </div>
            </div>
        </div>
    </app-layout>
</template>
<style scoped>
a {
    @apply underline text-blue-500;
}
</style>
