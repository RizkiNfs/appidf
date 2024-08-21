<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue'

const model = defineModel<InputHTMLAttributes['value']>()
</script>

<template>
  <input
    v-model="model"
    class="flex h-10 w-full rounded-md border bg-wite px-3 py-2 text-sm ring-offset-wite file:border-0 file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 placeholder:text-neutral-600 disabled:cursor-not-allowed disabled:opacity-50"
  >
</template>
