<template>
  <div class="w-full">
    <div v-if="loading" class="flex items-center justify-center py-6">
      <UISpinner></UISpinner>
    </div>

    <div v-else>
      <TweetItem :tweet="props.replyTo" v-if="props.replyTo && props.showReply" hideActions compact/>
      <TweetFormInput
        :user="props.user"
        :placeholder="props.placeholder"
        @onSubmit="handleFormSubmit"
      />
    </div>
  </div>
</template>

<script setup>
const { postTweet } = useTweets();

const emits = defineEmits(["onSuccess"]);
const loading = ref(false);

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  placeholder: {
    type: String,
    default: "What's happing ?",
  },
  replyTo: {
    type: Object,
    default: null,
  },
  showReply: {
    type: Boolean,
    default: false
  }
});

const handleFormSubmit = async (data) => {
  loading.value = true;
  try {
    const response = await postTweet({ ...data, replyTo: props.replyTo?.id });
    emits("onSuccess", response.tweet);
    alert(JSON.stringify(response));
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
</script>
