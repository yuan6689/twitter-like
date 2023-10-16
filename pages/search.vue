<template>
  <div>
    <MainSection title="Search" :loading="loading">

      <Head>
        <Title>Search / Twitter</Title>
      </Head>

      <TweetListFeed :tweets="searchTweets"/>
    </MainSection>
  </div>
</template>

<script setup>
const { getTweets } = useTweets();

const loading = ref(false);
const searchTweets = ref([])
const searchQuery = useRouter().currentRoute.value.query.q;7

onBeforeMount(async () => {
  loading.value = true;
  try {
    const { tweets } = await getTweets({
      query: searchQuery
    });

    searchTweets.value = tweets;
  }catch(error){
    console.log(error);
  }finally{
    loading.value = false;
  }
})
</script>
