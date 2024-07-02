<template>
  <main style="max-width: 1280px; margin: auto">
    <section class="mt-4">
      <div v-if="fetching">Loading...</div>
      <div v-else-if="error">Oh no... {{ error }}</div>
      <div v-else>
        <h2 class="mt-2">{{ data.evaluationTask.name }}</h2>
        <div class="text-left">
          <Dropdown
            v-model="selectedCategory"
            :options="categories"
            show-clear
            placeholder="Select a Category"
          />
        </div>
        <table v-if="data" class="mt-2 w-full">
          <thead>
            <tr>
              <th class="cursor-pointer py-2" @click="setKey('questionNumber')">
                <u :class="{ 'text-primary': sortKey === 'questionNumber' }"> No. </u>
              </th>
              <th class="cursor-pointer py-2" @click="setKey('category')">
                <u :class="{ 'text-primary': sortKey === 'category' }"> カテゴリー </u>
              </th>
              <th class="">回答</th>
              <th class="">評価</th>
              <th class="cursor-pointer py-2" @click="setKey('point')">
                <u :class="{ 'text-primary': sortKey === 'point' }"> 点数 </u>
              </th>
              <th class="cursor-pointer py-2 w-1" @click="setKey('model')">
                <u :class="{ 'text-primary': sortKey === 'model' }"> モデル </u>
              </th>
              <th class="cursor-pointer" @click="setKey('finishReason')">
                <u :class="{ 'text-primary': sortKey === 'finishReason' }"> 終了理由 </u>
              </th>
              <th class="cursor-pointer" @click="setKey('processingTime')">
                <u :class="{ 'text-primary': sortKey === 'processingTime' }"> 処理時間 </u>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rate in sortedRates" :key="rate.id">
              <td class="p-2">
                <span
                  v-tooltip.left="rate.answers[0].question.turns.join(',')"
                  class="cursor-pointer"
                >
                  {{ rate.answers[0].question.questionNumber }}
                </span>
                <router-link
                  class="ml-1"
                  :to="{ name: 'rates', params: { questionId: rate.answers[0].question.id } }"
                >
                  >
                </router-link>
              </td>
              <td class="p-2">
                {{ rate.answers[0].question.category }}
              </td>
              <td class="p-2" style="max-width: 1200px">
                <div v-for="answer in rate.answers" :key="answer.id">- {{ answer.text }}</div>
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
const selectedCategory = ref(null)

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

const categories = computed(() => {
  if (!data.value) return []
  const categories = data.value.evaluationTask.rates.map((rate) => {
    return rate.answers[0].question.category
  })
  return Array.from(new Set(categories))
})

const sortedRates = computed(() => {
  if (!data.value) return []
  const rates = Array.from(data.value.evaluationTask.rates)
  const selectedRates = rates.filter((rate) => {
    if (selectedCategory.value) {
      return rate.answers[0].question.category === selectedCategory.value
    } else {
      return true
    }
  })
  const column = sortKey.value
  if (column != '') {
    selectedRates.sort((a, b) => {
      let a_column, b_column
      if (column === 'usage') {
        a_column = a[column].total_tokens
        b_column = b[column].total_tokens
      } else if (column === 'category') {
        a_column = a.answers[0].question.category
        b_column = b.answers[0].question.category
      } else if (column === 'processingTime') {
        a_column = parseFloat(a[column])
        b_column = parseFloat(b[column])
      } else if (column === 'questionNumber') {
        a_column = parseInt(a.answers[0].question.questionNumber)
        b_column = parseInt(b.answers[0].question.questionNumber)
      } else {
        a_column = a[column]
        b_column = b[column]
      }
      if (a_column < b_column) return sortAsc.value ? -1 : 1
      if (a_column > b_column) return sortAsc.value ? 1 : -1
      return parseInt(a.id) < parseInt(b.id) ? 1 : -1
    })
  }
  return selectedRates
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
