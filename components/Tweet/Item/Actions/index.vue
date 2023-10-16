<template>
  <div class="flex items-center justify-around w-full">
    <TweetItemActionsIcon color="blue" :size="size" @on-click="emits('onCommentClick')">
      <template v-slot:icon="{ classes }">
        <ChatBubbleOvalLeftEllipsisIcon :class="classes" />
      </template>

      <template v-slot:default v-if="showStats">
        {{ props.tweet.repliesCount }}
      </template>
    </TweetItemActionsIcon>
    <TweetItemActionsIcon color="green" :size="size">
      <template v-slot:icon="{ classes }">
        <ArrowPathIcon :class="classes" />
      </template>

      <template v-slot:default v-if="showStats">
        {{ generateRandomNumber() }}
      </template>
    </TweetItemActionsIcon>
    <TweetItemActionsIcon color="red" :size="size">
      <template v-slot:icon="{ classes }">
        <HeartIcon :class="classes" />
      </template>

      <template v-slot:default v-if="showStats">
        {{ generateRandomNumber() }}
      </template>
    </TweetItemActionsIcon>
    <TweetItemActionsIcon color="blue" :size="size">
      <template v-slot:icon="{ classes }">
        <ShareIcon :class="classes" />
      </template>

      <template v-slot:default v-if="showStats">
        {{ generateRandomNumber() }}
      </template>
    </TweetItemActionsIcon>
  </div>
</template>

<script setup>
// import { ChatBubbleOvalLeftEllipsisIcon,  } from "@heroicons/vue/24/outline";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  ArrowPathIcon,
  HeartIcon,
  ShareIcon,
} from "@heroicons/vue/20/solid";

const props = defineProps({
  tweet: {
    type: Object,
    required: true,
  },
  compact: {
    type: Boolean,
    default: false,
  },
});

const showStats = computed(() => props.compact);
const size = computed(()=> props.compact? 5: 8);

const emits = defineEmits(["onCommentClick"]);

const generateRandomNumber = () => {
  return Math.floor(Math.random() * 100);
};

</script>
