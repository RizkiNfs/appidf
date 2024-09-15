<script setup lang="ts">
import { useForwardPropsEmits } from 'radix-vue'
import type { TabsRootEmits, TabsRootProps } from 'radix-vue'

interface Props extends TabsRootProps {
  items: {
    value: string
    label: string
  }[]
}

type Slot = Record<`content-${string}`, () => any>

const { items, ...props } = defineProps<Props>()
const emits = defineEmits<TabsRootEmits>()

defineSlots<Slot>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <tabs-root
    class="flex flex-col"
    v-bind="forwarded"
  >
    <tabs-list
      class="relative shrink-0 flex border rounded-md"
    >
      <tabs-indicator class="absolute left-0 bottom-0 h-full w-[--radix-tabs-indicator-size] translate-x-[--radix-tabs-indicator-position] transition-[width,transform] duration-300">
        <div class="bg-neutral-300 w-full h-full rounded-md" />
      </tabs-indicator>
      <tabs-trigger
        v-for="item in items"
        :key="item.value"
        class="z-10 px-2 py-1 flex-1 flex items-center justify-center leading-none text-mauve11 select-none  rounded-tl-md  outline-none cursor-default focus-visible:relative focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-black"
        :value="item.value"
      >
        {{ item.label }}
      </tabs-trigger>
    </tabs-list>
  </tabs-root>
</template>
