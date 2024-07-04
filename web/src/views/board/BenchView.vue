<template>
  <main style="max-width: 1280px; margin: auto">
    <section class="mt-4">
      <div v-if="fetching">Loading...</div>
      <div v-else-if="error">Oh no... {{ error }}</div>
      <div v-else>
        <h2>{{ data.bench.name }}</h2>
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
              <th class="cursor-pointer py-2 w-1" @click="setKey('questionNumber')">
                <u :class="{ 'text-primary': sortKey === 'questionNumber' }"> No. </u>
              </th>
              <th class="cursor-pointer py-2 w-1" @click="setKey('category')">
                <u :class="{ 'text-primary': sortKey === 'category' }"> カテゴリー </u>
              </th>
              <th class="">質問</th>
              <th class="">正解</th>
              <th class="">評価基準</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="question in sortedQuestions" :key="question.id">
              <td class="p-2">
                <router-link
                  class="pl-1"
                  :to="{ name: 'rates', params: { questionId: question.id } }"
                >
                  {{ question.questionNumber }}
                </router-link>
              </td>
              <td class="p-2">
                {{ question.category }}
              </td>
              <td class="p-2 text-left">
                <div v-for="turn in question.turns" :key="turn" style="max-width: 800px">
                  - {{ turn }}
                </div>
              </td>
              <td class="p-2 text-left">
                <div
                  v-for="answer in question.correctAnswers"
                  :key="answer"
                  style="max-width: 400px"
                >
                  - {{ answer }}
                </div>
              </td>
              <td class="p-2 text-left">
                <div
                  v-for="evalAspect in question.evalAspects"
                  :key="evalAspect"
                  style="max-width: 200px"
                >
                  {{ evalAspect }}
                </div>
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
const selectedCategory = ref(null)

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

const categories = computed(() => {
  if (!data.value) return []
  const categories = data.value.bench.questions.map((question) => {
    return question.category
  })
  return Array.from(new Set(categories))
})

const sortedQuestions = computed(() => {
  if (!data.value) return []
  const questions = Array.from(data.value.bench.questions)
  const selectedQuestions = questions.filter((question) => {
    if (selectedCategory.value) {
      return question.category === selectedCategory.value
    } else {
      return true
    }
  })
  const column = sortKey.value
  if (column != '') {
    selectedQuestions.sort((a, b) => {
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
  return selectedQuestions
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
