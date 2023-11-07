<script setup lang="ts">
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
  <div v-if="!me.data.value">You are not logged in.</div>
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
