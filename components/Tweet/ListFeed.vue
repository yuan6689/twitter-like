<template>
  <div>
    <div v-if="isEmptyArray" class="p-4">
      <p class="text-center text-gray-500">No tweets :)</p>
    </div>

    <!-- 就是在父组件中给子组件绑定一个原生的事件，就将子组件变成了普通的HTML标签，不加'. native'事件是无法触发的 -->
    <div
      v-else
      class="pb-4 border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300 dark:border-gray-800"
      v-for="tweet in tweets"
      :key="tweet.id"
    >
      <div @click.native="redirect(tweet)">
        <TweetItem :tweet="tweet" compact />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tweets: {
    type: Array,
    required: true,
  },
});

const isEmptyArray = computed(() => {
  return props.tweets.length === 0;
});

const redirect = (tweet) => {
  navigateTo({ path: `/status/${tweet.id}` });
  console.log("navigateTo(`status/${tweet.id}`): ", `/status/${tweet.id}`);
};
</script>
