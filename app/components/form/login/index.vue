<script setup lang="ts">
interface Body {
  username: string
  password: string
}

const { loading, request: login, error } = useRequest((body: Body) => {
  return $fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify(body),
  })
})

async function handleLogin(e: Event) {
  const formData = new FormData(e.target as HTMLFormElement)
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  login({ username, password })
    .then(() => {
      location.reload()
    })
}
</script>

<template>
  <div class="p-4">
    <form class="flex flex-col gap-y-4" @submit.prevent="handleLogin">
      <div>
        <label for="username">Username</label>
        <ui-input id="username" name="username" />
      </div>
      <div>
        <label for="password">Password</label>
        <ui-input id="password" type="password" name="password" />
      </div>
      <p v-if="error" class="text-danger-600">
        {{ error?.statusMessage }}
      </p>
      <ui-button class="w-full mt-4" :loading>
        Login
      </ui-button>
    </form>
  </div>
</template>
