<script setup lang="ts">
definePageMeta({
  middleware: () => {
    const token = useCookie('__t')

    if (token.value) {
      return navigateTo('/docs')
    }
  },
})
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <form-login class="w-[320px]" />
  </div>
</template>
