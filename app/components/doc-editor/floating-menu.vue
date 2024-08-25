<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { FloatingMenu } from '@tiptap/vue-3'
import MenuButton from './menu-button.vue'
import imagePicker from './image-picker.vue'

const { editor } = defineProps<{
  editor: Editor
}>()

function handleImageChange(fileStr: string) {
  editor
    .chain()
    .focus()
    .setImage({ src: fileStr })
    .createParagraphNear()
    .run()
}
</script>

<template>
  <FloatingMenu
    v-if="editor"
    class="bg-white rounded-md p-1 border shadow-sm"
    :editor="editor"
    :tippy-options="{ duration: 100, placement: 'bottom-start' }"
  >
    <div class="text-2xl">
      <MenuButton
        :active="editor.isActive('image')"
      >
        <image-picker @change="handleImageChange">
          <i-image />
        </image-picker>
      </MenuButton>
    </div>
  </FloatingMenu>
</template>
