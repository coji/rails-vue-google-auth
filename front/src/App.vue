<script setup lang="ts">
import AppMeMenu from '@/components/AppMeMenu.vue'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { GithubIcon, TwitterIcon } from 'lucide-vue-next'
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
      <AppMeMenu />
    </header>

    <main class="px-2">
      <router-view />
      <Toaster />
    </main>

    <footer class="p-2 text-center">
      <div>
        Copyright &copy;
        <a
          class="underline"
          href="https://twitter.com/techtalkjp"
          target="_blank"
          rel="noreferrer"
        >
          <TwitterIcon class="inline h-4 w-4" />
          <span>coji</span>
        </a>
      </div>
      <div>
        <a
          class="underline"
          href=" https://github.com/coji/rails-vue-google-auth"
          target="_blank"
          rel="noreferrer"
        >
          <GithubIcon class="inline h-4 w-4" />
          <span>GitHub</span>
        </a>
      </div>
    </footer>
  </div>
  <VueQueryDevtools />
</template>
