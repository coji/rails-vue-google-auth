<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { usePosts } from '@/features/posts/hooks/usePosts'
import { useAuth } from '@/hooks/useAuth'

const { me } = useAuth()
const { data: posts } = usePosts()
</script>

<template>
  <div class="flex justify-center items-center h-full" v-if="!me.data.value">
    <div class="text-center">
      <div>You are not logged in.</div>
      <div class="mt-2">
        <Button size="sm" @click="$router.push('/login')">Login</Button>
      </div>
    </div>
  </div>

  <div v-else class="grid grid-cols-2 gap-2">
    <Card v-for="post of posts" :key="post.id">
      <CardHeader>
        <CardTitle>{{ post.title }}</CardTitle>
        <CardDescription>
          {{ post.created_at }} {{ post.updated_at }}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>{{ post.body }}</div>
      </CardContent>
    </Card>
  </div>
</template>
