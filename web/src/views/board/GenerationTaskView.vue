<template>
  <main style="max-width: 1280px; margin: auto">
    <h1 class="mt-2">回答一覧</h1>
    <section class="mt-4">
      <div v-if="fetching">Loading...</div>
      <div v-else-if="error">Oh no... {{ error }}</div>
      <div v-else>
        <table v-if="data" class="w-full">
          <thead>
            <tr>
              <th class="cursor-pointer w-1 py-2" @click="setKey('category')">
                <u :class="{ 'text-primary': sortKey === 'category' }"> カテゴリー </u>
              </th>
              <th class="w-3">質問</th>
              <th>回答</th>
              <th class="cursor-pointer w-1" @click="setKey('finishReason')">
                <u :class="{ 'text-primary': sortKey === 'finishReason' }"> 終了理由 </u>
              </th>
              <th class="w-1">消費</th>
              <th class="w-1">処理時間</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="answer in sortedAnswers" :key="answer.id">
              <td class="py-2">
                {{ answer.category }}
              </td>
              <td class="py-2">
                {{ answer.messages[0].content }}
              </td>
              <td class="py-2">
                {{ answer.text }}
              </td>
              <td class="py-2">
                {{ answer.finishReason }}
              </td>
              <td class="py-2">
                {{ answer.usage }}
              </td>
              <td class="py-2">
                {{ answer.processingTime }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuery } from '@urql/vue'
import { graphql } from '@/gql'
import GenerationTask from '@/doc/query/GenerationTask'

const props = defineProps<{
  id: string
}>()

const sortKey = ref('category')
const sortAsc = ref(false)

const query = graphql(GenerationTask)

const { fetching, error, data } = useQuery({
  query,
  variables: { id: props.id },
  requestPolicy: 'network-only'
})

const setKey = (key) => {
  if (sortKey.value == key) {
    if (sortAsc.value) {
      sortAsc.value = false
    } else {
      sortAsc.value = true
    }
  } else {
    sortKey.value = key
    sortAsc.value = false
  }
}

const sortedAnswers = computed(() => {
  if (!data.value) return []
  const answers = Array.from(data.value.generationTask.answers)
  const column = sortKey.value
  if (column != '') {
    answers.sort((a, b) => {
      if (a[column] < b[column]) return sortAsc.value ? -1 : 1
      if (a[column] > b[column]) return sortAsc.value ? 1 : -1
      return a.id < b.id ? 1 : -1
    })
  }
  return answers
})
</script>

<style scoped>
table {
  border-collapse: collapse; /* セルの線を重ねる */
}
td,
th {
  border: 1px solid;
}
</style>
