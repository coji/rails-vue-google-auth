<script setup lang="ts">
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableCell,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import AppLoginForm from '@/components/AppLoginForm.vue'
import dayjs from '@/lib/dayjs'
import { useUsers } from '@/features/users/hooks/useUsers'
import { useAuth } from '@/hooks/useAuth'

const { me } = useAuth()
const { data: users } = useUsers()
</script>

<template>
  <div class="flex justify-center items-center h-full" v-if="!me.data.value">
    <div class="text-center">
      <AppLoginForm />
    </div>
  </div>

  <div v-else class="w-full">
    <div class="text-2xl font-bold">Users</div>

    <div class="rounded border">
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
              <div class="flex flex-row items-center gap-2">
                <Avatar class="w-6 h-6">
                  <AvatarImage :src="user.image ?? ''"></AvatarImage>
                </Avatar>
                <div>
                  {{ user.name }}
                </div>
              </div>
            </TableCell>
            <TableCell>
              {{ user.email }}
            </TableCell>
            <TableCell>
              {{
                dayjs(user.created_at)
                  .tz('Asia/Tokyo')
                  .format('YYYY-MM-DD HH:mm:ss')
              }}
            </TableCell>
            <TableCell>
              {{
                dayjs(user.updated_at)
                  .tz('Asia/Tokyo')
                  .format('YYYY-MM-DD HH:mm:ss')
              }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
