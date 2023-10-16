<template>
  <div @click.stop.prevent="emits('onClick')" class="flex items-center text-gray-400 cursor-pointer group">
    <div class="p-2 rounded-full dark:group-hover:bg-opacity-20" :class="`group-hover:bg-${props.color}-100 group-hover:text-${props.color}-400 ${defaultTransition}`">
      <slot name="icon" :classes="`w-${props.size} h-${props.size}`" ></slot>
    </div>

    <span :class="`mt-1 group-hover:text-${props.color}-400`">
      <slot></slot>
    </span>
  </div>
</template>

<script setup>
const { defaultTransition } = useTailwindConfig();

const emits = defineEmits(["onClick"]);

const props = defineProps({
  color: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 5,
  },
});
</script>
