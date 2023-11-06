<script setup lang="ts">
import { ref } from 'vue'

const user = ref<any>(null)

const callback = async (response: any) => {
  const credential = response.credential

  // 検証
  const ret: any = await fetch(`/api/auth?id_token=${credential}`)
  if (ret.ok) {
    // ユーザ情報を取得
    user.value = await ret.json()
  } else {
    // エラー処理
    console.log(ret.error)
    user.value = null
  }
  console.log({ user: user.value })
}

const logout = () => {
  user.value = null
}
</script>
<template>
  <h1>Google Auth Test</h1>

  <div v-if="user">
    <p>ログインしました</p>
    <code>
      <pre>{{ JSON.stringify(user, null, 2) }}</pre>
    </code>

    <button @click="logout">Logout</button>
  </div>

  <div v-else>
    <GoogleLogin :callback="callback" />
  </div>
</template>
