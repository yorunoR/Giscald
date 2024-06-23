<template>
  <main style="max-width: 1280px; margin: auto">
    <section class="mt-4">
      <div v-if="fetching">Loading...</div>
      <div v-else-if="error">Oh no... {{ error }}</div>
      <div v-else>
        <h2 class="mt-2">{{ data.generationTask.name }}</h2>
        <div class="text-left">
          <Dropdown
            v-model="selectedCategory"
            :options="categories"
            show-clear
            placeholder="Select a Category"
          />
          <Dropdown
            v-model="selectedTurn"
            :options="[1, 2]"
            show-clear
            placeholder="Select a Turn"
            class="ml-2"
          />
        </div>
        <table v-if="data" class="w-full mt-2">
          <thead>
            <tr>
              <th class="cursor-pointer py-2" @click="setKey('questionNumber')">
                <u :class="{ 'text-primary': sortKey === 'questionNumber' }"> No. </u>
              </th>
              <th class="cursor-pointer py-2" @click="setKey('category')">
                <u :class="{ 'text-primary': sortKey === 'category' }"> カテゴリー </u>
              </th>
              <th>ターン</th>
              <th class="">質問</th>
              <th class="">回答</th>
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
            <tr v-for="answer in sortedAnswers" :key="answer.id">
              <td class="p-2">
                <router-link :to="{ name: 'rates', params: { questionId: answer.question.id } }">
                  {{ answer.question.questionNumber }}
                </router-link>
              </td>
              <td class="p-2">
                {{ answer.question.category }}
              </td>
              <td class="px-4">
                {{ answer.turnNumber }}
              </td>
              <td class="p-2">
                <div class="text-left" style="max-width: 720px; white-space: pre-wrap">
                  <div v-for="message in answer.messages" :key="message.content">
                    {{ '<' + message.role + '> ' + message.content }}
                  </div>
                </div>
              </td>
              <td class="p-2">
                <div class="text-left" style="max-width: 720px">
                  {{ answer.text }}
                </div>
              </td>
              <td class="p-2">
                {{ answer.finishReason }}
              </td>
              <td class="p-2">
                {{ answer.usage }}
              </td>
              <td class="p-2">
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
const selectedCategory = ref(null)
const selectedTurn = ref(null)

const query = graphql(GenerationTask)

const { fetching, error, data } = useQuery({
  query,
  variables: { id: props.id },
  requestPolicy: 'network-only'
})

const categories = computed(() => {
  if (!data.value) return []
  const categories = data.value.generationTask.answers.map((answer) => {
    return answer.question.category
  })
  return Array.from(new Set(categories))
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
  const selectedAnswers = answers.filter((answer) => {
    if (selectedTurn.value && selectedCategory.value) {
      return (
        answer.turnNumber === selectedTurn.value &&
        answer.question.category === selectedCategory.value
      )
    } else if (selectedTurn.value) {
      return answer.turnNumber === selectedTurn.value
    } else if (selectedCategory.value) {
      return answer.question.category === selectedCategory.value
    } else {
      return true
    }
  })
  const column = sortKey.value
  if (column != '') {
    selectedAnswers.sort((a, b) => {
      let a_column, b_column
      if (column === 'usage') {
        a_column = a[column].total_tokens
        b_column = b[column].total_tokens
      } else if (column === 'category') {
        a_column = a.question.category
        b_column = b.question.category
      } else if (column === 'processingTime') {
        a_column = parseFloat(a[column])
        b_column = parseFloat(b[column])
      } else if (column === 'questionNumber') {
        a_column = parseInt(a.question.questionNumber)
        b_column = parseInt(b.question.questionNumber)
      } else {
        a_column = a[column]
        b_column = b[column]
      }
      if (a_column < b_column) return sortAsc.value ? -1 : 1
      if (a_column > b_column) return sortAsc.value ? 1 : -1
      return parseInt(a.id) < parseInt(b.id) ? 1 : -1
    })
  }
  return selectedAnswers
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
