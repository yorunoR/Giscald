<template>
  <main style="max-width: 1280px; margin: auto">
    <section class="mt-4">
      <div v-if="fetching">Loading...</div>
      <div v-else-if="error">Oh no... {{ error }}</div>
      <div v-else>
        <h2>{{ data.bench.name }}</h2>
        <div v-if="!data.bench.locked" class="text-right">
          <Button label="New Queston" @click="clickCreateQuestion()" />
        </div>
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
              <th v-if="!data.bench.locked" class="">操作</th>
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
                <div v-for="turnItem in question.turns" :key="turnItem" style="max-width: 800px">
                  >> <span style="white-space: pre-wrap">{{ turnItem }}</span>
                </div>
              </td>
              <td class="p-2 text-left">
                <div
                  v-for="answer in question.correctAnswers"
                  :key="answer"
                  style="max-width: 400px"
                >
                  >> <span style="white-space: pre-wrap">{{ answer }}</span>
                </div>
              </td>
              <td class="p-2 text-left">
                <div
                  v-for="evalAspectItem in question.evalAspects"
                  :key="evalAspectItem"
                  style="max-width: 200px"
                >
                  <span style="white-space: pre-wrap">{{ evalAspectItem }}</span>
                </div>
              </td>
              <td v-if="!data.bench.locked" class="p-2">
                <div>
                  <u class="cursor-pointer" @click="clickUpdateQuestion(question)">編集</u>
                </div>
                <div class="mt-1">
                  <u class="cursor-pointer" @click="clickDeleteQuestion(question.id)">削除</u>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
  <section>
    <Dialog v-model:visible="visible" modal header="質問追加" class="w-8">
      <div>
        <div class="flex align-items-center gap-3 mb-5">
          <label for="questionNumber" class="font-semibold w-8rem">番号</label>
          <div>
            <InputNumber
              id="questionNumber"
              v-model="questionNumber"
              placeholder="番号"
              show-buttons
              :min="0"
            />
            <div class="mt-2 p-error">{{ questionNumberErrors.join(' ') }}</div>
          </div>
        </div>
        <div class="flex align-items-center gap-3 mb-5">
          <label for="category" class="font-semibold w-8rem">カテゴリー</label>
          <div>
            <InputText
              id="category"
              v-model="category"
              autocomplete="off"
              placeholder="カテゴリー"
            />
            <div class="mt-2 p-error">{{ categoryErrors.join(' ') }}</div>
          </div>
        </div>
        <div class="flex align-items-center gap-3 mb-5">
          <label for="turn" class="font-semibold w-8rem">質問文</label>
          <div class="flex-auto">
            <Textarea
              id="turn"
              v-model="turn"
              class="w-full"
              autocomplete="off"
              placeholder="質問文"
              rows="4"
            />
            <div class="mt-2 p-error">{{ turnErrors.join(' ') }}</div>
          </div>
        </div>
        <div class="flex align-items-center gap-3 mb-5">
          <label for="correctAnswer" class="font-semibold w-8rem">正解</label>
          <Textarea
            id="correctAnswer"
            v-model="correctAnswer"
            class="flex-auto"
            autocomplete="off"
            placeholder="正解"
            rows="3"
          />
        </div>
        <div class="flex align-items-center gap-3 mb-5">
          <label for="evalAspect" class="font-semibold w-8rem">評価基準</label>
          <Textarea
            id="evalAspect"
            v-model="evalAspect"
            class="flex-auto"
            autocomplete="off"
            placeholder="評価基準"
          />
        </div>
        <div class="flex justify-content-end gap-2">
          <Button
            type="button"
            label="Cancel"
            severity="secondary"
            @click="visible = false"
          ></Button>
          <Button type="button" label="Save" :disabled="!meta.valid" @click="() => save()"></Button>
        </div>
      </div>
    </Dialog>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuery, useMutation } from '@urql/vue'
import { graphql } from '@/gql'
import Bench from '@/doc/query/Bench'
import { useField, useForm } from 'vee-validate'
import CreateQuestion from '@/doc/mutation/CreateQuestion'
import UpdateQuestion from '@/doc/mutation/UpdateQuestion'
import DeleteQuestion from '@/doc/mutation/DeleteQuestion'

const props = defineProps<{
  id: string
}>()

const sortKey = ref('category')
const sortAsc = ref(false)
const selectedCategory = ref(null)
const visible = ref(false)
const selectedQuestion = ref(null)

const query = graphql(Bench)

const { fetching, error, data } = useQuery({
  query,
  variables: { id: props.id }
})

const { executeMutation: createQuestion } = useMutation(graphql(CreateQuestion))
const { executeMutation: updateQuestion } = useMutation(graphql(UpdateQuestion))
const { executeMutation: deleteQuestion } = useMutation(graphql(DeleteQuestion))

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

const { meta, values } = useForm()
const isRequired = (value) => (value ? true : 'This field is required')
const { value: questionNumber, errors: questionNumberErrors } = useField(
  'questionNumber',
  isRequired
)
const { value: category, errors: categoryErrors } = useField('category', isRequired)
const { value: turn, errors: turnErrors } = useField('turn', isRequired)
const { value: correctAnswer, errors: _correctAnswerErrors } = useField('correctAnswer')
const { value: evalAspect, errors: _evalAspectErrors } = useField('evalAspect')

let newOrEdit
const clickCreateQuestion = () => {
  newOrEdit = 'new'
  visible.value = true
}
const clickUpdateQuestion = (question) => {
  newOrEdit = 'edit'
  selectedQuestion.value = question
  questionNumber.value = question.questionNumber
  category.value = question.category
  turn.value = question.turns[0]
  correctAnswer.value = question.correctAnswers[0]
  evalAspect.value = question.evalAspects[0]
  visible.value = true
}
const save = async () => {
  if (newOrEdit === 'new') {
    await createQuestion({
      ...values,
      benchId: props.id
    })
  } else {
    await updateQuestion({
      ...values,
      id: selectedQuestion.value.id
    })
  }
  visible.value = false
}

const clickDeleteQuestion = async (id) => {
  const value = await swal({
    title: '質問削除',
    text: '戻せません',
    icon: 'warning',
    buttons: {
      cancelbutton: { text: 'キャンセル', value: 'cancel' },
      yesbutton: { text: 'OK', value: 'ok' }
    }
  })

  if (value === 'ok') {
    await deleteQuestion({ id })
  }
}
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
