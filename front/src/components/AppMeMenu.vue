<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from './ui/dropdown-menu/index.js'
import { Avatar, AvatarFallback } from './ui/avatar/index.js'
import { useAuth } from '@/hooks/useAuth'
const { me, logout } = useAuth()
</script>

<template>
  <DropdownMenu v-if="me.data.value">
    <DropdownMenuTrigger>
      <Avatar>
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
  <Button v-else size="sm" @click="$router.push('/login')">Login</Button>
</template>
