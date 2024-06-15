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

        <InputText v-model="name" class="mt-4 w-6" placeholder="名前: 一意な識別子" />
        <div class="mt-2 p-error">{{ nameErrors.join(' ') }}</div>

        <InputText
          v-model="host"
          class="mt-4 w-6"
          placeholder="ホスト名: http://host.docker.internal:4000/v1"
        />
        <div class="mt-2 p-error">{{ hostErrors.join(' ') }}</div>

        <InputNumber v-model="workerCount" class="mt-4 w-6" placeholder="同時リクエスト数: 5" />
        <div class="mt-2 p-error">{{ workerCountErrors.join(' ') }}</div>

        <Textarea v-model="description" class="mt-4 w-6" placeholder="GPU 情報等" />
        <div class="mt-2 p-error">{{ descriptionErrors.join(' ') }}</div>

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
import { ref, computed, onBeforeUnmount, watchEffect } from 'vue'
import { useQuery, useMutation } from '@urql/vue'
import router from '@/router'
import { graphql } from '@/gql'
import Benches from '@/doc/query/Benches'
import CreateGenerationTask from '@/doc/mutation/CreateGenerationTask'
import { useField, useForm } from 'vee-validate'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const loading = ref(false)
const parameters = ref({
  default: {
    strategy: 'none',
    params: {
      max_tokens: 1000,
      temperature: 0.1,
      frequency_penalty: 0,
      presence_penalty: -1.0,
      top_p: 0.99
    }
  },
  extraction: {
    strategy: 'none',
    params: {
      max_tokens: 1000,
      temperature: 0.1,
      frequency_penalty: 0,
      presence_penalty: -1.0,
      top_p: 0.99
    }
  },
  math: {
    strategy: 'none',
    params: {
      max_tokens: 1000,
      temperature: 0.1,
      frequency_penalty: 0,
      presence_penalty: -1.0,
      top_p: 0.99
    }
  },
  reasoning: {
    strategy: 'none',
    params: {
      max_tokens: 500,
      temperature: 0.1,
      frequency_penalty: 0,
      presence_penalty: -1.0,
      top_p: 0.99
    }
  },
  humanities: {
    strategy: 'none',
    params: {
      max_tokens: 1500,
      temperature: 0.1,
      frequency_penalty: 0,
      presence_penalty: -1.0,
      top_p: 0.99
    }
  }
})
const count = ref(0)

const query = graphql(Benches)
const { data } = useQuery({ query })

const { executeMutation: createGenerationTask } = useMutation(graphql(CreateGenerationTask))

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const clickCreateGenerationTask = async () => {
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
    benchCode: 'multi',
    name: 'mt-bench-01',
    modelName: 'openai/cyberagent/calm2-7b-chat',
    host: 'http://host.docker.internal:4000/v1',
    workerCount: 10
  }
})
const isRequired = (value) => (value ? true : 'This field is required')
const { value: benchCode, errors: benchCodeErrors } = useField('benchCode', isRequired)
const { value: name, errors: nameErrors } = useField('name', isRequired)
const { value: modelName, errors: modelNameErrors } = useField('modelName', isRequired)
const { value: host, errors: hostErrors } = useField('host', isRequired)
const { value: workerCount, errors: workerCountErrors } = useField('workerCount', isRequired)
const { value: description, errors: descriptionErrors } = useField('description')

const options = computed(() => {
  if (!data.value) return []
  return data.value.benches.slice().sort((a, b) => a.id - b.id)
})

watchEffect(() => {
  const parts = modelName.value.split('/')
  const lastName = parts[parts.length - 1]
  name.value = lastName + '_' + benchCode.value
})

let timeoutId
const countDisplay = async () => {
  timeoutId = setInterval(() => {
    ++count.value
  }, 1000)
}

onBeforeUnmount(() => {
  clearInterval(timeoutId)
})
</script>
