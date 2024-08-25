<script setup lang="ts">
const { active = false } = defineProps<{
  active?: boolean
}>()
</script>

<template>
  <button
    class="p-2 rounded-md hover:bg-neutral-200" :class="[
      { 'bg-neutral-200': active },
    ]"
  >
    <slot />
  </button>
</template>
