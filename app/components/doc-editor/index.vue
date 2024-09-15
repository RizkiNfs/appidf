<script setup lang="ts">
import { type Editor, EditorContent } from '@tiptap/vue-3'

import BubbleMenu from './bubble-menu.vue'
import FloatingMenu from './floating-menu.vue'

interface Props {
  editor: Editor
}
const {
  editor,
} = defineProps<Props>()

const page = ref<HTMLElement>()

function handleFocus(e: Event) {
  if (e.target === page.value) {
    editor.commands.focus('end')
  }
}
</script>

<template>
  <div
    v-if="editor"
    ref="page"
    :style="{ width: '595px', minHeight: '842px' }"
    class="shadow-xl border bg-white" @click="handleFocus"
  >
    <div class="editor-content">
      <BubbleMenu :editor="editor" />
      <FloatingMenu :editor="editor" />
      <EditorContent :editor="editor" />
    </div>
  </div>
</template>

<style>
.tiptap.ProseMirror-focused:focus-visible {
  outline: none;
}
</style>
