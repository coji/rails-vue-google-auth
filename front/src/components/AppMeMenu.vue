<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu/index.js'
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/components/ui/avatar/index.js'
import { useAuth } from '@/hooks/useAuth'
const { me, logout } = useAuth()
</script>

<template>
  <DropdownMenu v-if="me.data.value">
    <DropdownMenuTrigger>
      <Avatar>
        <AvatarImage :src="me.data.value.photoUrl ?? ''"></AvatarImage>
        <AvatarFallback>{{ me.data.value.displayName }}</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>
        <div>{{ me.data.value.displayName }}</div>
        <div class="font-normal">{{ me.data.value.email }}</div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="logout()">Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
