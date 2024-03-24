<template>
  <main style="max-width: 1200px; margin: auto">
    <h1 class="mt-2">回答生成タスク一覧</h1>
    <section class="mt-4">
      <div v-if="fetching">Loading...</div>
      <div v-else-if="error">Oh no... {{ error }}</div>
      <div v-else>
        <table v-if="data" class="w-full">
          <thead>
            <tr>
              <th class="cursor-pointer w-3 py-2" @click="setKey('name')">
                <u :class="{ 'text-primary': sortKey === 'name' }"> 名前 </u>
              </th>
              <th
                class="cursor-pointer w-3"
                :class="{ 'text-primary': sortKey === 'modelName' }"
                @click="setKey('modelName')"
              >
                <u> モデル名 </u>
              </th>
              <th
                class="cursor-pointer w-1"
                :class="{ 'text-primary': sortKey === 'createdAt' }"
                @click="setKey('createdAt')"
              >
                <u> 作成日時 </u>
              </th>
              <th
                class="cursor-pointer w-1"
                :class="{ 'text-primary': sortKey === 'status' }"
                @click="setKey('status')"
              >
                <u> ステータス </u>
              </th>
              <th>メモ</th>
              <th class="w-1">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="generationTask in sortedGenerationTasks" :key="generationTask.id">
              <td class="py-2">
                {{ generationTask.name }}
              </td>
              <td class="py-2">
                {{ generationTask.modelName }}
              </td>
              <td class="py-2">
                {{ timeFormat(generationTask.createdAt) }}
              </td>
              <td class="py-2">
                {{ generationTask.status }}
              </td>
              <td class="py-2">
                {{ generationTask.description }}
              </td>
              <td>
                <div v-if="generationTask.status === 'Completed'" class="p-1">
                  <u class="cursor-pointer"> 評価する </u>
                </div>
                <!--div class="p-1">
                  <u class="cursor-pointer"> 編集 </u>
                </div-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'
import { useQuery } from '@urql/vue'
import { graphql } from '@/gql'
import GenerationTasks from '@/doc/query/GenerationTasks'
import dayjs from 'dayjs'

const sortKey = ref('createdAt')
const sortAsc = ref(false)

const query = graphql(GenerationTasks)

const { fetching, error, data, executeQuery } = useQuery({ query, requestPolicy: 'network-only' })

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

const sortedGenerationTasks = computed(() => {
  if (!data.value) return []
  const generationTasks = Array.from(data.value.currentUser.generationTasks)
  const column = sortKey.value
  if (column != '') {
    generationTasks.sort((a, b) => {
      if (a[column] < b[column]) return sortAsc.value ? -1 : 1
      if (a[column] > b[column]) return sortAsc.value ? 1 : -1
      return a.id < b.id ? 1 : -1
    })
  }
  return generationTasks
})

const timeFormat = (time) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}

const interval = 60_000 // 60秒
let timeoutId

const executeAndDoubleInterval = () => {
  executeQuery({ requestPolicy: 'network-only' })

  if (
    !data.value ||
    data.value.currentUser.generationTasks.some(
      (generationTask) => generationTask.status == 'Started'
    )
  ) {
    timeoutId = setTimeout(executeAndDoubleInterval, interval)
  }
}

timeoutId = setTimeout(executeAndDoubleInterval, interval)

onBeforeUnmount(() => {
  clearInterval(timeoutId)
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
