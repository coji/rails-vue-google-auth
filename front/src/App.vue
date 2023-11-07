<script setup lang="ts">
import AppLoginButton from '@/components/AppMeMenu.vue'
import Toaster from '@/components/ui/toast/Toaster.vue'
</script>

<template>
  <div class="h-screen grid grid-rows-[auto_1fr_auto]">
    <header class="p-2 flex">
      <h1 class="text-2xl font-bold">
        <router-link class="hover:text-purple-500" to="/">
          Rails + Vue Google Auth Example
        </router-link>
      </h1>

      <div class="flex-grow"></div>
      <AppLoginButton />
    </header>

    <main class="p-2">
      <router-view />
      <Toaster />
    </main>

    <footer class="p-2 text-center">Copyright &copy; coji.</footer>
  </div>
</template>
