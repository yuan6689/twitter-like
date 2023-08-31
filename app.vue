<template>
  <div :class="{ dark: darkMode }">
    <div class="min-h-full">
      <div class="bg-white dark:bg-dim-900">
        <div
          class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5"
        >
          <!-- Left sidebar -->
          <div class="md:block xs:col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft />
            </div>
          </div>

          <!-- Main sidebar -->
          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <router-view />
          </main>

          <!-- Right sidebar -->
          <div class="hidden col-span-12 md:block xl:col-span-4 md:col-span-3 bg-blue-300">
            <div class="sticky top-0">
              <SidebarRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const darkMode = ref(false);
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
</script>
