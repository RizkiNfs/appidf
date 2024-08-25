<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import type { Body } from '../../../server/api/docs/[id]/index.patch'

const editor = ref<{ editor: Editor } | null>(null)
const page = ref<HTMLElement>()
const route = useRoute()

const { data: doc } = await useFetch(`/api/docs/${route.params.id}`)

const { loading, request: saveDocument } = useRequest((data: Body) => {
  return $fetch(`/api/docs/${route.params.id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
})

function handleFocus(e: Event) {
  if (e.target === page.value) {
    editor.value?.editor.commands.focus('end')
  }
}

function handleSave() {
  saveDocument({ schema: editor.value?.editor.getJSON() })
}
</script>

<template>
  <div v-if="doc?.data">
    <header class="fixed top-0 bg-white w-screen h-[120px] shadow-sm py-2 z-[99999]">
      <h1 class="px-4">
        {{ doc.data.title }}
      </h1>
      <ui-button :loading @click="handleSave">
        Save
      </ui-button>
    </header>
    <div class="min-h-screen flex justify-center items-center bg-neutral-100 pt-[160px] pb-[200px]">
      <div ref="page" :style="{ width: '595px', minHeight: '842px' }" class="shadow-xl border bg-white" @click="handleFocus">
        <doc-editor ref="editor" :content="doc.data.schema" />
      </div>
    </div>
  </div>
</template>
