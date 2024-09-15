<script setup lang="ts">
import { useDocEditor } from '~/composables/editor'
import type { Body } from '~~/server/api/docs/[id]/index.patch'

import { DocEditor, DocPreview, UiTabs } from '#components'

type TabsItems = InstanceType<typeof UiTabs>['$props']['items']

const tabsItems = [
  { value: 'editor', label: 'Editor' },
  { value: 'preview', label: 'Preview' },
] as const satisfies TabsItems

type TabsValue = typeof tabsItems[number]['value']

const show = ref<TabsValue>('editor')
const route = useRoute()

const { data: doc } = await useFetch(`/api/docs/${route.params.id}`)

const { editor } = useDocEditor({
  content: doc?.value?.data?.schema,
})

const { loading, request: saveDocument } = useRequest((data: Body) => {
  return $fetch(`/api/docs/${route.params.id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
})

function handleSave() {
  saveDocument({ schema: editor.value?.getJSON() })
}
</script>

<template>
  <div v-if="doc?.data && editor">
    <header class="fixed top-0 bg-white w-screen shadow-sm py-1 z-[99999]">
      <div class="flex justify-center">
        <UiTabs
          v-model="show"
          :items="tabsItems"
        />
      </div>
      <div>
        <h1 class="px-4">
          {{ doc.data.title }}
        </h1>
        <ui-button :loading @click="handleSave">
          Save
        </ui-button>
      </div>
    </header>
    <div class="min-h-screen flex justify-center items-center bg-neutral-100 pt-[160px] pb-[200px]">
      <keep-alive>
        <component :is="show === 'editor' ? DocEditor : DocPreview" :editor="editor" />
      </keep-alive>
    </div>
  </div>
</template>
