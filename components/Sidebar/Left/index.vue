<template>
  <div class="h-screen flex flex-col xl:items-start md:items-center">
    <div
      class="p-2 my-2 hover:bg-blue-50 rounded-full w-min dark:hover:bg-white/20"
      :class="defaultTransition"
    >
      <NuxtLink to="/">
        <div class="w-8 h-8">
          <LogoTwitter />
        </div>
      </NuxtLink>
    </div>

    <SidebarLeftTab active>
      <template v-slot:icon>
        <HomeIcon />
      </template>
      <template v-slot:name>Home</template>
    </SidebarLeftTab>

    <SidebarLeftTab>
      <template v-slot:icon>
        <HashtagIcon />
      </template>
      <template v-slot:name> Explore </template>
    </SidebarLeftTab>

    <SidebarLeftTab>
      <template v-slot:icon>
        <BellIcon />
      </template>
      <template v-slot:name> Notifications </template>
    </SidebarLeftTab>

    <SidebarLeftTab>
      <template v-slot:icon>
        <InboxIcon />
      </template>
      <template v-slot:name> Messages </template>
    </SidebarLeftTab>

    <SidebarLeftTab>
      <template v-slot:icon>
        <BookmarkIcon />
      </template>
      <template v-slot:name> Bookmarks </template>
    </SidebarLeftTab>

    <SidebarLeftTab>
      <template v-slot:icon>
        <DocumentTextIcon />
      </template>
      <template v-slot:name> Lists </template>
    </SidebarLeftTab>

    <SidebarLeftTab>
      <template v-slot:icon>
        <UserIcon />
      </template>
      <template v-slot:name> Profile </template>
    </SidebarLeftTab>

    <SidebarLeftTab>
      <template v-slot:icon>
        <EllipsisHorizontalCircleIcon />
      </template>
      <template v-slot:name> More </template>
    </SidebarLeftTab>
    <div class="font-bold hidden xl:block w-full" @click="emits('onTweet')">
      <UIButton size="lg" liquid>Tweet</UIButton>
    </div>
    <div class="block xl:hidden mt-3">
      <UIButton @click="emits('onTweet')">
        <div class="w-5 h-5 font-bold">
          <PencilIcon />
        </div>
      </UIButton>
    </div>

    <div
      class="flex flex-row justify-center items-center mx-auto mt-auto px-2 py -4 mb-5 rounded-full cursor-pointer w-20 xl:w-full hover:bg-gray-100 dark:hover:bg-dim-800"
      @click="emits('onLogout')"
    >
      <div class="flex flex-row">

        <img :src="props.user.profileImage" alt="user image" class="w-10 h-10 rounded-full"/>

        <div class="flex-col hidden ml-2 xl:block">
          <h1 class="text-sm text-gray-800 dark:text-white">{{ user.name }}</h1>
          <p class="text-xs text-gray-400">{{ user.handle }}</p>
        </div>

      </div>
      <div class="hidden xl:block ml-auto">
        <div class="w-6 h-6 dark:text-white">
          <ChevronRightIcon></ChevronRightIcon>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { HomeIcon } from "@heroicons/vue/20/solid";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  DocumentTextIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
  PencilIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from "@heroicons/vue/24/outline";

//KNOW: hover: 表示 :hover 选择器
//KNOW: width: min-content 表示 宽度跟随元素宽度
const { defaultTransition } = useTailwindConfig();

const emits = defineEmits(["onTweet", "onLogout"]);

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>
