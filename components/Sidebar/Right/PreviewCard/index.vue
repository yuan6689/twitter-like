<template>
  <div class="mt-3 m-2 border bg-gray-50 divide-y dark:divide-gray-700 overflow-hidden rounded-2xl dark:bg-dim-700" :class="twitterBorderColor">
    <h1 class="p-3 text-xl font-extrabold text-gray-900 dark:text-white">
      {{ props.title }}
    </h1>
    <slot></slot>
    <div class="flex text-blue-400 cursor-pointer hover:bg-gray-100 p-3 dark:hover:bg-dim-300" :class="defaultTransition">Show more</div>
  </div>
</template>

<script setup>
const props = defineProps({
  title:{
    type: String,
    required: true
  }
})

const { defaultTransition, twitterBorderColor } = useTailwindConfig();
</script>
