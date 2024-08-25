<script setup lang="ts">
interface Props {
  accept?: string
}

const {
  accept = 'image/*',
} = defineProps<Props>()

const emit = defineEmits<{
  (e: 'change', value: string): void
  (e: 'error', value: Error): void
}>()

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
  })
}

async function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file)
    return

  try {
    const base64 = await toBase64(file)

    emit('change', base64 as string)
  }
  catch (e) {
    emit('error', e as Error)
  }
}
</script>

<template>
  <label>
    <input class="hidden" hidden type="file" :accept="accept" @change="handleFileChange">
    <slot />
  </label>
</template>
