<template>
  <main class="h-full">
    <h1 style="mt-2">Generate Answers</h1>
    <div v-if="loading">
      <h2 class="p-2">running...</h2>
      <h1 class="p-2">{{ Math.floor(count / 60) }}:{{ ('00' + (count % 60)).slice(-2) }}</h1>
    </div>
    <div v-else>
      <section>
        <Dropdown
          v-model="framework"
          class="mt-4 w-6 text-left"
          :options="['TGI', 'vllm', 'other']"
        />
      </section>
      <section>
        <Dropdown
          v-model="benchCode"
          class="mt-4 w-6 text-left"
          :options="options"
          option-label="name"
          option-value="code"
        />
        <div class="mt-2 p-error">{{ benchCodeErrors.join(' ') }}</div>

        <InputText
          v-model="modelName"
          class="mt-4 w-6"
          placeholder="モデル名: openai/cyberagent/calm2-7b-chat"
        />
        <div class="mt-2 p-error">{{ modelNameErrors.join(' ') }}</div>

        <InputText v-model="name" class="mt-4 w-6" placeholder="名前: 一意な識別子" disabled />
        <div class="mt-2 p-error">{{ nameErrors.join(' ') }}</div>

        <InputText
          v-model="host"
          class="mt-4 w-6"
          placeholder="ホスト名: http://host.docker.internal:4000/v1"
        />
        <div class="mt-2 p-error">{{ hostErrors.join(' ') }}</div>

        <InputNumber v-model="workerCount" class="mt-4 w-6" placeholder="同時リクエスト数: 5" />
        <div class="mt-2 p-error">{{ workerCountErrors.join(' ') }}</div>

        <Textarea v-model="description" class="mt-4 w-6" placeholder="詳細等" />
        <div class="mt-2 p-error">{{ descriptionErrors.join(' ') }}</div>

        <div class="flex justify-content-center mt-4">
          <div class="w-6 text-left">
            <b>タグ選択</b>
          </div>
        </div>
        <span v-if="tagsData" class="w-6 limited-width text-left">
          <Button
            v-for="tag in tagsData.tags"
            :key="tag.name"
            :label="tag.name"
            class="mt-2 ml-2 py-1 px-2"
            :severity="tagIds.includes(tag.id) ? 'info' : 'secondary'"
            size="small"
            outlined
            @click="clickTag(tag)"
          />
        </span>

        <div class="flex justify-content-center mt-4">
          <div class="w-6">
            <div class="w-full text-left p-1 my-2">
              <div><b> parameters </b></div>
              <!--span>
                category 名に合わせて、各種パラメータを設定してください.
                存在しないときは、default キーで設定したものが使われます
              </span-->
            </div>
            <VueJsonPretty
              v-model:data="parameters"
              show-icon
              show-length
              collapsed-on-click-brackets
              :show-line="false"
              :show-double-quotes="false"
              editable
              editable-trigger="dblclick"
            />
          </div>
        </div>
      </section>
      <Button class="mt-4" :disabled="!meta.valid" @click="clickCreateGenerationTask">
        Generate
      </Button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount, watch } from 'vue'
import { useQuery, useMutation } from '@urql/vue'
import router from '@/router'
import { graphql } from '@/gql'
import Benches from '@/doc/query/Benches'
import Tags from '@/doc/query/Tags'
import CreateGenerationTask from '@/doc/mutation/CreateGenerationTask'
import { useField, useForm } from 'vee-validate'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
import { useToast } from 'primevue/usetoast'
import { tgiMultiSet, vllmMultiSet, otherMultiSet } from '@/data/presets/jmt'
import { tgiSet, vllmSet, otherSet } from '@/data/presets'

const toast = useToast()

const loading = ref(false)
const parameters = ref(tgiMultiSet)
const count = ref(0)
const framework = ref('TGI')

const query = graphql(Benches)
const { data } = useQuery({ query })
const tagsQuery = graphql(Tags)
const { data: tagsData } = useQuery({ query: tagsQuery })

const { executeMutation: createGenerationTask } = useMutation(graphql(CreateGenerationTask))

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const clickCreateGenerationTask = async () => {
  if (tagsData.value.tags.length > 0 && tagIds.value.length === 0) {
    toast.add({
      severity: 'error',
      summary: 'Generate answers',
      detail: 'タグが存在する時は、タグを一つ以上選んでください'
    })
    return
  }

  loading.value = true
  count.value = 0

  await countDisplay()
  const paramStr = JSON.stringify(parameters.value)
  try {
    const result = await createGenerationTask({ ...values, paramStr })
    if (result.error) {
      console.log('failed')
      loading.value = false
      toast.add({
        severity: 'error',
        summary: 'Generate answers',
        detail: result.error.message
      })
    } else {
      console.log('completed')
      router.push({ name: 'generationTasks' })
    }
  } finally {
    loading.value = false
    clearInterval(timeoutId)
  }
}

const { meta, values } = useForm({
  initialValues: {
    benchCode: 'jmt',
    name: 'calm2-7b-chat@TGI.jmt.xxx',
    modelName: 'openai/cyberagent/calm2-7b-chat',
    host: 'http://host.docker.internal:4000/v1',
    workerCount: 10,
    tagIds: []
  }
})
const isRequired = (value) => (value ? true : 'This field is required')
const { value: benchCode, errors: benchCodeErrors } = useField('benchCode', isRequired)
const { value: name, errors: nameErrors } = useField('name', isRequired)
const { value: modelName, errors: modelNameErrors } = useField('modelName', isRequired)
const { value: host, errors: hostErrors } = useField('host', isRequired)
const { value: workerCount, errors: workerCountErrors } = useField('workerCount', isRequired)
const { value: description, errors: descriptionErrors } = useField('description')
const { value: tagIds, errors: _tagIdsErrors } = useField('tagIds')

const options = computed(() => {
  if (!data.value) return []
  return data.value.benches.slice().sort((a, b) => a.id - b.id)
})

watch([benchCode, framework, modelName], () => {
  const parts = modelName.value.split('/')
  const lastName = parts[parts.length - 1]
  const randomString = generateRandomString()
  name.value = lastName + '@' + framework.value + '.' + benchCode.value + '.' + randomString
  if (benchCode.value.startsWith('jmt')) {
    if (framework.value == 'TGI') parameters.value = tgiMultiSet
    if (framework.value == 'vllm') parameters.value = vllmMultiSet
    if (framework.value == 'other') parameters.value = otherMultiSet
  } else {
    if (framework.value == 'TGI') parameters.value = tgiSet
    if (framework.value == 'vllm') parameters.value = vllmSet
    if (framework.value == 'other') parameters.value = otherSet
  }
})

const clickTag = (tag) => {
  const ids = tagIds.value.slice()
  if (ids.includes(tag.id)) {
    tagIds.value = ids.filter((tagId) => tagId !== tag.id)
  } else {
    ids.push(tag.id)
    tagIds.value = ids
  }
}

let timeoutId
const countDisplay = async () => {
  timeoutId = setInterval(() => {
    ++count.value
  }, 1000)
}

onBeforeUnmount(() => {
  clearInterval(timeoutId)
})

const generateRandomString = () => {
  let result = ''
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
</script>

<style lang="scss" scoped>
.limited-width {
  display: inline-block;
  word-wrap: break-word;
}
</style>
