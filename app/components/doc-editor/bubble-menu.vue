<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { BubbleMenu } from '@tiptap/vue-3'
import MenuButton from './menu-button.vue'

type BubbleMenuProps = InstanceType<typeof BubbleMenu>['$props']

const { editor } = defineProps<{
  editor: Editor
}>()

const showInputLink = ref(false)
const inputLink = ref('')

const handleShowBubbleMenu: BubbleMenuProps['shouldShow'] = ({ editor, from, to }) => {
  return (
    editor.isActive('paragraph')
    && from !== to
  )
}

function handleShowInputLink() {
  showInputLink.value = true
  inputLink.value = editor.getAttributes('link').href
}

function handleSetLink() {
  // cancelled
  if (inputLink.value === null) {
    showInputLink.value = false
    return
  }

  // empty
  if (inputLink.value === '') {
    handleUnsetLink()
    return
  }

  // update link
  editor
    .chain()
    .focus()
    .extendMarkRange('link')
    .setLink({ href: inputLink.value })
    .run()

  showInputLink.value = false
}

function handleUnsetLink() {
  editor
    .chain()
    .focus()
    .extendMarkRange('link')
    .unsetLink()
    .run()

  showInputLink.value = false
}

function handleHide() {
  showInputLink.value = false
}
</script>

<template>
  <BubbleMenu
    v-if="editor"
    class="bg-white rounded-md p-1 border shadow-sm"
    :editor="editor"
    :tippy-options="{
      duration: 100,
      placement: 'bottom',
      onHidden: handleHide,
    }"
    :should-show="handleShowBubbleMenu"
  >
    <div v-if="showInputLink">
      <input
        v-model="inputLink"
        class="px-2 py-1 rounded-md mr-1 placeholder:text-base"
        placeholder="https://jurni.id"
      >
      <MenuButton @click="handleSetLink">
        <i-floppy />
      </MenuButton>
      <MenuButton @click="handleUnsetLink">
        <i-trash />
      </MenuButton>
    </div>
    <div v-else class="text-lg">
      <MenuButton
        :active="editor.isActive('bold')"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <i-bold />
      </MenuButton>
      <MenuButton
        :active="editor.isActive('strike')"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        <i-strikethrough />
      </MenuButton>
      <MenuButton
        :active="editor.isActive('link')"
        @click="handleShowInputLink"
      >
        <i-link />
      </MenuButton>
    </div>
  </BubbleMenu>
</template>
