<template>
  <div>
    <MainSection title="Tweet" :loading="loading">
      <Head>
        <Title>Tweet / Twitter</Title>
      </Head>
      <!-- <div class="">router:{{ router.currentRoute }}</div>
      <div class="">route: {{ route.fullPath }}</div> -->
      <TweetDetails :user="user" :tweet="tweet" />
    </MainSection>
  </div>
</template>

<script setup>
const loading = ref(false);
const tweet = ref(null);
const { getTweetById } = useTweets();
const { useAuthUser } = useAuth();
const user = useAuthUser();
const router = useRouter();
const route = useRoute();

watch(
  () => useRoute().fullPath,
  (n, o) => {
    console.log("n,o: ", n, o);
    getTweet();
  }
);

const getTweetIdByRoute = () => {
  // 尝试了许久 终于弄好了,我也不知道为什么非得这样写才能获取到
  console.log("route", route);
  console.log('router', router.currentRoute.value.fullPath);
  return router.currentRoute;
};

const getTweet = async () => {
  loading.value = true;
  try {
    const route = getTweetIdByRoute();
    const { tweets } = await getTweetById(route.value.params.id);
    tweet.value = tweets;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

onBeforeMount(() => {
  getTweet();
  // getTweetIdByRoute()
});
</script>
