<template>
  <main style="max-width: 1280px; margin: auto">
    <h1 class="mt-2">評価一覧</h1>
    <section class="mt-4">
      <div v-if="fetching">Loading...</div>
      <div v-else-if="error">Oh no... {{ error }}</div>
      <div v-else>
        <table v-if="data" class="w-full">
          <thead>
            <tr>
              <th class="cursor-pointer py-2" @click="setKey('id')">
                <u :class="{ 'text-primary': sortKey === 'id' }"> ID </u>
              </th>
              <th class="cursor-pointer py-2" @click="setKey('category')">
                <u :class="{ 'text-primary': sortKey === 'category' }"> カテゴリー </u>
              </th>
              <th class="">回答</th>
              <th class="cursor-pointer py-2" @click="setKey('point')">
                <u :class="{ 'text-primary': sortKey === 'point' }"> 点数 </u>
              </th>
              <th class="cursor-pointer py-2" @click="setKey('model')">
                <u :class="{ 'text-primary': sortKey === 'model' }"> モデル </u>
              </th>
              <th class="cursor-pointer" @click="setKey('finishReason')">
                <u :class="{ 'text-primary': sortKey === 'finishReason' }"> 終了理由 </u>
              </th>
              <th class="cursor-pointer" @click="setKey('usage')">
                <u :class="{ 'text-primary': sortKey === 'usage' }"> 消費 </u>
              </th>
              <th class="cursor-pointer" @click="setKey('processingTime')">
                <u :class="{ 'text-primary': sortKey === 'processingTime' }"> 処理時間 </u>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rate in sortedRates" :key="rate.id">
              <td class="p-2">
                {{ rate.id }}
              </td>
              <td class="p-2">
                {{ rate.answer.category }}
              </td>
              <td class="p-2">
                {{ rate.text }}
              </td>
              <td class="p-2">
                {{ rate.point }}
              </td>
              <td class="p-2">
                {{ rate.model }}
              </td>
              <td class="p-2">
                {{ rate.finishReason }}
              </td>
              <td class="p-2">
                {{ rate.usage }}
              </td>
              <td class="p-2">
                {{ rate.processingTime }}
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
import EvaluationTask from '@/doc/query/EvaluationTask'

const props = defineProps<{
  id: string
}>()

const sortKey = ref('category')
const sortAsc = ref(false)

const query = graphql(EvaluationTask)

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

const sortedRates = computed(() => {
  if (!data.value) return []
  const rates = Array.from(data.value.evaluationTask.rates)
  const column = sortKey.value
  if (column != '') {
    rates.sort((a, b) => {
      let a_column, b_column
      if (column === 'usage') {
        a_column = a[column].total_tokens
        b_column = b[column].total_tokens
      } else if (column === 'category') {
        a_column = a.answer.category
        b_column = b.answer.category
      } else if (column === 'processingTime') {
        a_column = parseFloat(a[column])
        b_column = parseFloat(b[column])
      } else if (column === 'id') {
        a_column = parseInt(a[column])
        b_column = parseInt(b[column])
      } else {
        a_column = a[column]
        b_column = b[column]
      }
      if (a_column < b_column) return sortAsc.value ? -1 : 1
      if (a_column > b_column) return sortAsc.value ? 1 : -1
      return a.id < b.id ? 1 : -1
    })
  }
  return rates
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
