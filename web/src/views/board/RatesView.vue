<template>
  <main style="max-width: 1280px; margin: auto">
    <h1 class="mt-2">回答一覧</h1>
    <section class="mt-4">
      <div v-if="fetching">Loading...</div>
      <div v-else-if="error">Oh no... {{ error }}</div>
      <div v-else>
        <div class="text-left">
          <router-link :to="{ name: 'bench', params: { id: data.question.bench.id } }">
            <span class="py-2 text-2xl">戻る</span>
          </router-link>
        </div>
        <p class="text-left my-4">
          {{ data.question.questionNumber }}:
          {{ data.question.turns[0] }}
        </p>
        <table v-if="data" class="w-full">
          <thead>
            <tr>
              <th class="cursor-pointer py-2" @click="setKey('id')">
                <u :class="{ 'text-primary': sortKey === 'id' }"> ID </u>
              </th>
              <th class="cursor-pointer py-2 w-1" @click="setKey('name')">
                <u :class="{ 'text-primary': sortKey === 'name' }"> 生成タスク名 </u>
              </th>
              <th class="cursor-pointer py-2 w-1" @click="setKey('modelName')">
                <u :class="{ 'text-primary': sortKey === 'modelName' }"> モデル </u>
              </th>
              <th class="cursor-pointer py-2 w-1" @click="setKey('model')">
                <u :class="{ 'text-primary': sortKey === 'model' }"> 評価モデル </u>
              </th>
              <th class="cursor-pointer py-2" @click="setKey('point')">
                <u :class="{ 'text-primary': sortKey === 'point' }"> 点数 </u>
              </th>
              <th class="">回答</th>
              <th class="">評価</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rate in sortedRates" :key="rate.id">
              <td class="p-2">
                {{ rate.id }}
              </td>
              <td class="p-2">
                {{ rate.evaluationTask.generationTask.name }}
              </td>
              <td class="p-2">
                {{ rate.evaluationTask.generationTask.modelName }}
              </td>
              <td class="p-2">
                {{ rate.model }}
              </td>
              <td class="p-2">
                {{ rate.point }}
              </td>
              <td class="p-2 text-left">
                {{ rate.answer.text }}
              </td>
              <td class="p-2 text-left">
                {{ rate.text }}
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
import Rates from '@/doc/query/Rates'

const props = defineProps<{
  questionId: string
}>()

const sortKey = ref('id')
const sortAsc = ref(false)

const query = graphql(Rates)

const { fetching, error, data } = useQuery({
  query,
  variables: { questionId: props.questionId }
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
  const rates = Array.from(data.value.rates)
  const column = sortKey.value
  if (column != '') {
    rates.sort((a, b) => {
      let a_column, b_column
      if (column === 'name') {
        a_column = a.evaluationTask.generationTask.name
        b_column = b.evaluationTask.generationTask.name
      } else if (column === 'modelName') {
        a_column = a.evaluationTask.generationTask.modelName
        b_column = b.evaluationTask.generationTask.modelName
      } else {
        a_column = a[column]
        b_column = b[column]
      }
      if (a_column < b_column) return sortAsc.value ? -1 : 1
      if (a_column > b_column) return sortAsc.value ? 1 : -1
      return parseInt(a.id) < parseInt(b.id) ? 1 : -1
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
