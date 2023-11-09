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

  <div className="mt-4 relative">
    <div className="absolute inset-0 flex items-center" aria-hidden="true">
      <div className="w-full border-t border-gray-200" />
    </div>
    <div className="relative flex justify-center text-sm font-medium leading-6">
      <span className="bg-white px-6 text-gray-900">または</span>
    </div>
  </div>

  <div class="mt-4 text-center">
    <GoogleLogin :callback="callback" prompt />
  </div>
</template>
