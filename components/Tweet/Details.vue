<template>
    <div>
        <TweetItem :tweet="props.tweet"/>

        <TweetForm placeholder="Tweet your reply" :user="user" :reply-to="props.tweet" @on-success="handlePostSuccess"/>

        <TweetListFeed :tweets="replies" />
    </div>
</template>

<script setup>
const props = defineProps({
    tweet: {
        type: Object,
        required: true
    },
    user: {
        type: Object,
        required: true
    },
})

const replies = computed(() => props.tweet?.replies || []);

const handlePostSuccess = (data) => {
    // console.log(data);
    navigateTo({
        path: `/status/${data.id}`
    })
    // UNKNOWN: navigateTo 的 {path} 与 String 有什么区别 
}
</script>