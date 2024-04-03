<template>
  <main style="max-width: 1280px; margin: auto">
    <h1 class="mt-2">質問一覧</h1>
    <section class="mt-4">
      <div v-if="fetching">Loading...</div>
      <div v-else-if="error">Oh no... {{ error }}</div>
      <div v-else>
        <h2>{{ data.bench.name }}</h2>
        <table v-if="data" class="w-full">
          <thead>
            <tr>
              <th class="cursor-pointer py-2 w-1" @click="setKey('questionNumber')">
                <u :class="{ 'text-primary': sortKey === 'questionNumber' }"> No. </u>
              </th>
              <th class="cursor-pointer py-2 w-1" @click="setKey('category')">
                <u :class="{ 'text-primary': sortKey === 'category' }"> カテゴリー </u>
              </th>
              <th class="">質問</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="question in sortedQuestions" :key="question.id">
              <td class="p-2">
                {{ question.questionNumber }}
                <router-link
                  class="pl-1"
                  :to="{ name: 'rates', params: { questionId: question.id } }"
                >
                  >
                </router-link>
              </td>
              <td class="p-2">
                {{ question.category }}
              </td>
              <td class="p-2 text-left">
                <div v-for="turn in question.turns" :key="turn">- {{ turn }}</div>
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
import Bench from '@/doc/query/Bench'

const props = defineProps<{
  id: string
}>()

const sortKey = ref('category')
const sortAsc = ref(false)

const query = graphql(Bench)

const { fetching, error, data } = useQuery({
  query,
  variables: { id: props.id }
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

const sortedQuestions = computed(() => {
  if (!data.value) return []
  const questions = Array.from(data.value.bench.questions)
  const column = sortKey.value
  if (column != '') {
    questions.sort((a, b) => {
      let a_column, b_column
      if (column === 'questionNumber') {
        a_column = parseInt(a[column])
        b_column = parseInt(b[column])
      } else {
        a_column = a[column]
        b_column = b[column]
      }
      if (a_column < b_column) return sortAsc.value ? -1 : 1
      if (a_column > b_column) return sortAsc.value ? 1 : -1
      return parseInt(a.id) < parseInt(b.id) ? 1 : -1
    })
  }
  return questions
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
