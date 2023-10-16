<template>
  <div class="flex flex-col">
    <label
      v-if="props.label"
      class="block pl-3 ml-px text-sm font-medium text-gray-700 dark:text-white"
      >{{ props.label }}</label
    >
    <div class="mt-1">
      <input
        :type="props.type"
        :value="props.modelValue"
        :placeholder="props.placeholder"
        class="block w-full px-4 border-gray-300 rounded-full shadow-sm bg-white focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:text-gray-100 dark:bg-dim-400 dark:border-dim-400 dark:focus:bg-dim-900"
        @input="(event) => emits('update:modelValue', event.target.value)"
        :class="defaultTransition"
      />
    </div>
  </div>
</template>

<script setup>
const { defaultTransition } = useTailwindConfig();

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: String,
    require: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    require: true,
  },
  label: {
    type: String,
    default: null,
  },
});
</script>

<style>
input:-webkit-autofill,
input:-webkit-autofill:focus {
  transition: background-color 0s 600000s, color 0s 600000s;
}
</style>
