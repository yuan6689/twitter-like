<template>
  <div class="flex flex-col">
    <!-- search-bar -->
    <div class="relative m-2">
      <div class="absolute flex items-center h-full justify-center pl-4 text-gray-600 cursor-pointer" @click="handleSearchClick">
        <div class="w-6 h-6">
          <MagnifyingGlassIcon />
        </div>
      </div>
      <input @keyup.enter="handleSearchClick" v-model="search" type="text" placeholder="Search Tweet" class="bg-gray-200 w-full pl-12 text-sm font-normal text-black border border-gray-200 rounded-full shadow dark:text-gray-100 dark:bg-dim-400 dark:border-dim-400 dark:focus:bg-dim-900 focus:outline-none focus:border focus:border-blue-200 h-9" />
    </div>

    <!-- preview-card: What's happing -->
    <SidebarRightPreviewCard title="What's new">
      <SidebarRightPreviewCardItem
        v-for="whatsHappening in whatsHappeningItems"
      >
        <h2 class="font-bold text-gray-800 text-md dark:text-white">
          {{ whatsHappening.title }}
        </h2>

        <p class="text=xs text-gray-400">
          {{ whatsHappening.count }}
        </p>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>

    <!-- preview-card: Who to follow -->
    <SidebarRightPreviewCard title="What's new">
      <SidebarRightPreviewCardItem v-for="whoToFollow in whoToFollowItems">
        <div class="flex flex-row justify-between p-2">
          <div class="flex flex-row">
            <img
              class="w-10 h-10 rounded-full"
              :src="whoToFollow.image"
              :alt="whoToFollow.name"
            />

            <div class="flex flex-col ml-2">
              <h1 class="text-sm font-bold text-gray-900 dark:text-white">
                {{ whoToFollow.name }}
              </h1>
              <p class="text-xs text-gray-400">{{ whoToFollow.handle }}</p>
            </div>
          </div>
          <div class="flex h-full">
            <button
              class="px-4 py-2 text-xs font-bold text-white bg-black rounded-full dark:text-black dark:bg-white"
            >
              Follow
            </button>
          </div>
        </div>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>

    <!-- footer -->
    <footer>
      <ul class="mx-2 text-xs text-gray-500">
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline" @click.prevent="handleToggleDarkMode">Color mode switch</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">Privacy Policy</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">Cookie Policy</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">Accessability</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">Ads info</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">More</a>
        </li>
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline">© 2022 Twitter, Inc</a>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script setup>
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/vue/24/outline";
const search = ref("");
const emitter = useEmit();
const whatsHappeningItems = ref([
  {
    title: "SpaceX",
    count: "18.8k Tweets",
  },
  {
    title: "#CodingIsFun",
    count: "8.8k Tweets",
  },
  {
    title: "#artforall",
    count: "1.8k Tweets",
  },
]);

const whoToFollowItems = ref([
  {
    name: "Joe Biden",
    handle: "@JoeBiden",
    image: "https://picsum.photos/200/200",
  },
  {
    name: "Joe Biden",
    handle: "@JoeBiden",
    image: "https://picsum.photos/200/200",
  },
  {
    name: "Joe Biden",
    handle: "@JoeBiden",
    image: "https://picsum.photos/200/200",
  },
]);

function handleSearchClick () {
  if(search.value === ""){
    return;
  }
    useRouter().push({
      path: '/search',
      query: {
        q: search.value
      }
    })
}

function handleToggleDarkMode () {
  emitter.$emit("toggle_dark_mode");
}
</script>
