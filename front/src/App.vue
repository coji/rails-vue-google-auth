<script setup lang="ts">
import { Button } from '@/components/ui/button'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useAuth } from '@/hooks/useAuth'

const { me } = useAuth()
const { data: meData } = me
console.log({ isLoading: me.isLoading.value })
console.log({ 'me.data': me.data.value })
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
      <div v-if="meData">{{ meData }}</div>
      <Button v-else @click="$router.push('/login')">Login</Button>
    </header>

    <main class="p-2">
      <router-view />
      <Toaster />
    </main>

    <footer class="p-2 text-center">Copyright &copy; coji.</footer>
  </div>
</template>
