<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import router from '@/router'

const { googleLogin, login } = useAuth()

const handleSubmitForm = async (e: Event) => {
  e.preventDefault()
  const formData = new FormData(e.target as HTMLFormElement)
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const success = await login.mutateAsync({ email, password })
  if (success) {
    router.push('/')
  }
}

const callback = async (response: any) => {
  const credential = response.credential

  const success = await googleLogin.mutateAsync({ idToken: credential })
  if (success) {
    router.push('/')
  }
}
</script>

<template>
  <h1>ログイン</h1>

  <form class="grid grid-cols-1 gap-4" @submit="handleSubmitForm">
    <fieldset>
      <Label>メールアドレス</Label>
      <Input name="email" type="text" placeholder="メールアドレス" />
    </fieldset>

    <fieldset>
      <Label>パスワード</Label>
      <Input name="password" type="password" placeholder="パスワード" />
    </fieldset>

    <Button>ログイン</Button>
  </form>

  <GoogleLogin :callback="callback" />
</template>
