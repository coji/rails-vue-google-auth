<script setup lang="ts">
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableCell,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useUsers } from '@/features/users/hooks/useUsers'
import { useAuth } from '@/hooks/useAuth'

const { me } = useAuth()
const { data: users } = useUsers()
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

  <div v-else class="text-center">
    <div class="text-2xl font-bold">Users</div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Provider</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="user of users" :key="user.id">
          <TableCell>ID</TableCell>
          <TableCell>
            {{ user.provider }}
          </TableCell>
          <TableCell>
            {{ user.name }}
          </TableCell>
          <TableCell>
            {{ user.email }}
          </TableCell>
          <TableCell>
            {{ user.created_at }}
          </TableCell>
          <TableCell>
            {{ user.updated_at }}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
