<script setup>
import Accordion from "@/Components/Accordion.vue";
import DiscordInvite from "@/Components/DiscordInvite.vue";
</script>
<template>
    <div>
        <h2 class="text-2xl font-bold">Guidelines & F.A.Q.</h2>
        <p class="pane mt-1">These are written as guidelines instead of hard rules as well as being broadly permissive to encourage freedom for users to express themselves on the site. The number one consideration when it comes to review moderation is acting in good faith as a reviewer.</p>
        <Accordion title="Reviews vs. Feedback" class="mt-2">
            <p>Even if your review passes these moderation guidelines it doesn't necessarily make it a "good review." A "review" is different from "feedback." Reviews on Hyperbolus (as in, the text you can write to accompany your ratings) don't necessarily <i>need</i> to be constructive because they are unsolicited opinions that center the views of the reviewer. Feedback in contrast should be constructive especially when solicited by creators as they center their work and the creator.</p>
            <div class="y items-center mt-2 space-y-2">
                <p>If you are interested in learning how to give good feedback in your reviews, visit the GD Feedback Hub Discord</p>
                <DiscordInvite code="RpPQvWcrKe"/>
            </div>
        </Accordion>
        <Accordion title="How do I write a review?" class="mt-2">
            <p>Your rating is comprised of up to 1 overall score, 2 optional scores, and a review.</p>
            <ul class="list-inside space-y-2 p-2 mt-2 rounded bg-ui-800">
                <li><b><span class="text-blue-500">Overall</span> Score</b> - The only mandatory score. Use your own criteria to rate the level overall.</li>
                <li><b><span class="text-green-500">Gameplay</span> Score</b> - Use your own criteria to score the gameplay of a level. This could be, for example, its movement or enjoyment; it's up to you.</li>
                <li><b><span class="text-amber-500">Visuals</span> Score</b> - Use your own criteria to score the visual quality of the level. Perhaps its fidelity, cohesiveness or uniqueness, again it's up to you.</li>
                <li><b>Review</b> - While optional, you are highly encouraged to submit a text review</li>
            </ul>
            <p class="mt-2">While there are additional optional scores, you are <b>HIGHLY</b> encouraged to be as thorough as possible. Thank you for contributing!</p>
        </Accordion>
        <Accordion title="What is rating manipulation?" class="mt-2">
            <p>Rating manipulation is the act of affecting a level's rating and chart ranking on the site through unnatural means. Rating manipulation can happen maliciously and non-maliciously.</p>
            <p class="mt-2"><b>Example 1</b> - If you and a group of friends rate all of each other's levels 10/10 no matter what so that they can get high on the charts, this would be considered rating manipulation and can lead to your reviews or even your whole account being deweighted.</p>
            <p class="mt-2"><b>Example 2</b> - If you and others collude to rate-bomb a level so that it places lower on the charts, this would be manipulation and can lead to your reviews and even your account being deweighted or in some cases banned. If you all give a level 0/10 because you earnestly believe the level it's just so awful it shouldn't even exist, that is alright. Writing a review to explain your rating can clarify this and also help other users understand why you gave the review you did. You can also reach out to the mod team to request a particularly nasty/offensive/hateful level be unlisted from the charts.</p>
            <p class="mt-2"><b>Example 3</b> - If you have a community and you tell your community to highly rate your level or offer rewards for rating it highly, this would be rating manipulation and can result in your level(s) being blocked from placing on the charts. You are allowed to promote yourself and your levels on Hyperbolus so long as you are not directly incentivizing others to leave dishonest ratings or reviews for you.</p>
            <p class="mt-2">Ultimately, because it can be difficult to deduce user intention, users will often be given the benefit of the doubt in cases such as this. 99% of the time you need not worry about if you are engaging in this as long as you follow the spirit of these guidelines. If you have any questions or want clarification, you can reach out to the mod team and we will be happy to clarify.</p>
        </Accordion>
        <Accordion title="What is considered spam?" class="mt-2">
            <p>Spam in reviews can take many forms, and moderation is often pretty lax on this as the baseline is that the review at the very least helps communicate your opinion on the level and/or explain/expand on your rating; a fairly low bar. Review these examples to see what kinds of reviews would be considered spam or not, and in what contexts.</p>
            <p class="mt-2"><b>Example 1</b> - Your review is <span class="text-green-400 font-bold">allowed</span> to contain simply a decimal rating, A-F letter grade or anything otherwise used to provide more specificity in your rating than what Hyperbolus currently allows. We are looking into ways to improve this for users, but in the meantime saying simply "9.5" or "S" on your 9/10 review is acceptable.</p>
            <p class="mt-2"><b>Example 2</b> - Your review is <span class="text-yellow-400 font-bold">usually allowed</span> (although discouraged) to be just a short quippy line, so long as there's some way for it to add to your rating or communicate an opinion on a level. Saying just "green" in your review of Toxin Lab II is technically not considered a substantive review, though it is harmless and thus low priority for moderators and can stay. If many users flood a review section with the same short word or phrase to the point where it does not provide substance and instead hurts the user experience having to wade through pages of "green" reviews moderators may then remove or hide these reviews that are collectively considered spam when they exist in great numbers.</p>
            <p class="mt-2"><b>Example 3</b> - Your review is <span class="text-orange-400 font-bold">generally discouraged</span> from being in part or in whole written by a large language model (generative AI) such as ChatGPT. Again, the bar is low in terms of justifying that your review provides commentary or opinion (maybe you leave a review written by or in the style of AI in response to a level that you feel is extremely cookie-cutter or offensively inoffensive and bland because it feels as if it was made by AI) HOWEVER, using AI to completely fabricate a review when you did not play or even see the level is considered spam, especially when done en masse to boost your rating/review counts. <u>Total automation of deciding and writing Hyperbolus ratings is completely prohibited!</u> You are allowed to use AI to edit your review's prose or even to fully write out and expand a list of opinions fed to the AI (pasting in a bullet point list of opinions might not be great prose but is also allowed and preferable!). Rest assured we will not aggressively police users suspected of being AI or not unless it's super obvious your review is fake, has nothing to do with the level, and damages the experience of other users. You should be allowed to use ethical em dashes responsibly and to your heart's content.</p>
        </Accordion>
        <Accordion title="Can I review my own level?" class="mt-2">
            <p>You are more than welcome to rate or review your own levels! Reflecting on your own work is both a good exercise and can prove very valuable to other users.</p>
            <p class="mt-2">So long as your ratings are honest and you don't go on to engage in <b>Rating Manipulation</b>, rating and reviewing your own levels is completely fine.</p>
        </Accordion>
    </div>
</template>
