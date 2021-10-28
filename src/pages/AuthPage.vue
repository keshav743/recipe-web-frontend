<template>
  <div class="flex flex-row">
    <div class="w-1/2 mx-8 my-40 px-5">
      <h1 class="text-4xl font-semibold mb-4 text-indigo-900">Recipe Centre</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco
      </p>
    </div>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
