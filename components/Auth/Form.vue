<template>
  <div class="w-full">
    <div class="flex justify-center">
      <div class="w-10 h-10">
        <LogoTwitter />
      </div>
    </div>
    <div class="pt-6 space-y-6">
      <UIInput
        v-model="data.username"
        placeholder="@username"
        type="text"
        label="Username"
      />
      <UIInput
        v-model="data.password"
        placeholder="********"
        type="password"
        label="Password"
      />

      <UIButton liquid size="lg" @click="handleLogin" :disabled="isDisabled"
        >Login</UIButton
      >
    </div>
  </div>
</template>

<script setup>
const data = reactive({
  username: "",
  password: "",
  isLoading: false,
});

const handleLogin = async () => {
  const { login } = useAuth();
  data.isLoading = true;
  try {
    await login({
      username: data.username,
      password: data.password,
    });
  } catch (error) {
    console.log(error);
  } finally {
    data.isLoading = false;
  }
};

const isDisabled = computed(
  () => !data.username || !data.password || data.isLoading
);
</script>
