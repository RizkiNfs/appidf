<script setup lang="ts">
definePageMeta({
  middleware: ['auth-guard'],
})

const { loading, request: createDocument } = useRequest(() => {
  return $fetch('/api/docs', {
    method: 'POST',
  })
})

async function handleCreateDocument() {
  createDocument()
    .then((res) => {
      navigateTo(`/docs/${res.id}`)
    })
}

const { data: docs } = useFetch('/api/docs')
</script>

<template>
  <div class="p-6">
    <div>
      <ui-button :loading @click="handleCreateDocument">
        Create Document
      </ui-button>
    </div>
    <ul class="flex gap-6 mt-6">
      <li v-for="doc in docs?.data" :key="doc.id">
        <nuxt-link class="block p-6 rounded-md border hover:bg-neutral-100" :to="`/docs/${doc.id}`">
          {{ doc.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>
