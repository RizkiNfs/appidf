<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'

import { VuePDF, usePDF } from '@tato30/vue-pdf'
import { renderDocToString } from '~~/shared/renderer'

interface Props {
  editor: Editor
}

const { editor } = defineProps<Props>()

const res = computedAsync(async () => {
  return usePDF(await renderDocToString(editor.getJSON()))
})
</script>

<template>
  <div v-if="res" :style="{ width: '595px', minHeight: '842px' }">
    <template v-for="page of res.pages.value" :key="page">
      <VuePDF class=" [&:not(:first-child)]:mt-8 shadow-xl border bg-white" :pdf="res.pdf.value" :page="page" />
    </template>
  </div>
</template>
