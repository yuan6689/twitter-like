<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-white dark:bg-dim-900">
      <!-- App -->
      <LoadingPage class="" v-if="isAuthLoading"></LoadingPage>

      <div v-else-if="user" class="min-h-full">
        <div
          class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5"
        >
          <!-- Left sidebar -->
          <div class="hidden md:block xs:col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft :user="user" @on-tweet="handleModalOpen()" @on-logout="logout()" />
            </div>
          </div>

          <!-- Main sidebar -->
          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <RouterView />
          </main>

          <!-- Right sidebar -->
          <div class="hidden col-span-12 md:block xl:col-span-4 md:col-span-3">
            <div class="sticky top-0">
              <SidebarRight />
            </div>
          </div>
        </div>
      </div>

      <AuthPage v-else />
      <UIModal @on-close="handleModalClose()" :is-open="postTweetModal">
        <TweetForm :reply-to="replyTweet" :user="user" @on-success="handleTweetSuccess" showReply></TweetForm>
      </UIModal>
    </div>
  </div>
</template>

<script setup>
// handle color mode switch
const darkMode = ref(true);
const emitter = useEmit();

emitter.$on("toggle_dark_mode", () => {
  darkMode.value = !darkMode.value;
})
// 通过改变 darkMode 可以切换暗色模式和普通模式
//KNOW: class 中 dark: 表示 在 暗色模式下 元素的样式
/**
 * KNOW:
Breakpoint prefix	Minimum width	CSS
sm	640px	@media (min-width: 640px) { ... }
md	768px	@media (min-width: 768px) { ... }
lg	1024px	@media (min-width: 1024px) { ... }
xl	1280px	@media (min-width: 1280px) { ... }
2xl	1536px	@media (min-width: 1536px) { ... }
 */

const { useAuthUser, initAuth, useAuthLoading, logout } = useAuth();
const isAuthLoading = useAuthLoading();

const user = useAuthUser();

onBeforeMount(() => {
  initAuth();
});

// handle onTweet logic

const { usePostTweetModal, openPostTweetModal, closePostTweetModal, useReplyTweet } =
  useTweets();
const postTweetModal = usePostTweetModal();

function handleModalClose() {
  closePostTweetModal();
}

function handleModalOpen() {
  openPostTweetModal(null);
}

function handleTweetSuccess(data) {
  closePostTweetModal();

  navigateTo({
    path: `/status/${data.id}`,
  });
}

// handle comment icon click
emitter.$on('replyTweet', (tweet) => {
  openPostTweetModal(tweet);
})

const replyTweet = useReplyTweet();

</script>
