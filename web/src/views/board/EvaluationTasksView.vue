<template>
  <main style="max-width: 1200px; margin: auto">
    <h1 class="mt-2">評価タスク一覧</h1>
    <section v-if="dataSources1.length > 0 || dataSources2.length > 0" class="mt-6">
      <div class="flex">
        <Chart type="radar" :data="chartData1" :options="chartOptions" class="w-6" />
        <Chart type="radar" :data="chartData2" :options="chartOptions" class="w-6" />
      </div>
    </section>
    <section class="mt-4">
      <div v-if="fetching">Loading...</div>
      <div v-else-if="error">Oh no... {{ error }}</div>
      <div v-else>
        <table v-if="data" class="w-full">
          <thead>
            <tr>
              <th class="w-1 py-2">選択</th>
              <th class="cursor-pointer w-3 py-2" @click="setKey('name')">
                <u :class="{ 'text-primary': sortKey === 'name' }"> 名前 </u>
              </th>
              <th class="cursor-pointer w-1" @click="setKey('createdAt')">
                <u :class="{ 'text-primary': sortKey === 'createdAt' }"> 作成日時 </u>
              </th>
              <th class="cursor-pointer w-1" @click="setKey('status')">
                <u :class="{ 'text-primary': sortKey === 'status' }"> ステータス </u>
              </th>
              <th>点数</th>
              <th class="w-1">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="evaluationTask in sortedEvaluationTasks" :key="evaluationTask.id">
              <th class="py-2">
                <div v-if="evaluationTask.points !== {}">
                  <Checkbox
                    v-model="dataSources1"
                    :value="{ name: evaluationTask.name, points: evaluationTask.points }"
                    @change="() => (chartData1 = setChartData(dataSources1))"
                  />
                  <Checkbox
                    v-model="dataSources2"
                    class="ml-2"
                    :value="{ name: evaluationTask.name, points: evaluationTask.points }"
                    @change="() => (chartData2 = setChartData(dataSources2))"
                  />
                </div>
              </th>
              <td class="py-2">
                {{ evaluationTask.name }}
              </td>
              <td class="py-2">
                {{ timeFormat(evaluationTask.createdAt) }}
              </td>
              <td class="py-2">
                {{ evaluationTask.status }}
              </td>
              <td class="py-2">
                {{ evaluationTask.points }}
              </td>
              <td>
                <div
                  v-if="evaluationTask.status === 'Completed' && evaluationTask.points === {}"
                  class="p-1"
                >
                  <u
                    v-if="!loading"
                    class="cursor-pointer"
                    @click="() => clickUpdateEvaluationTask(evaluationTask.id)"
                  >
                    集計する
                  </u>
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
import { ref, computed, onBeforeUnmount, onMounted } from 'vue'
import { useQuery, useMutation } from '@urql/vue'
import { graphql } from '@/gql'
import EvaluationTasks from '@/doc/query/EvaluationTasks'
import UpdateEvaluationTask from '@/doc/mutation/UpdateEvaluationTask'
import dayjs from 'dayjs'

const sortKey = ref('createdAt')
const sortAsc = ref(false)
const loading = ref(false)
const dataSources1 = ref([])
const dataSources2 = ref([])

const query = graphql(EvaluationTasks)
const { fetching, error, data, executeQuery } = useQuery({ query, requestPolicy: 'network-only' })
const { executeMutation: updateEvaluationTask } = useMutation(graphql(UpdateEvaluationTask))

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

const sortedEvaluationTasks = computed(() => {
  if (!data.value) return []
  const evaluationTasks = Array.from(data.value.currentUser.evaluationTasks)
  const column = sortKey.value
  if (column != '') {
    evaluationTasks.sort((a, b) => {
      if (a[column] < b[column]) return sortAsc.value ? -1 : 1
      if (a[column] > b[column]) return sortAsc.value ? 1 : -1
      return a.id < b.id ? 1 : -1
    })
  }
  return evaluationTasks
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
    data.value.currentUser.evaluationTasks.some(
      (evaluationTask) => evaluationTask.status == 'Started'
    )
  ) {
    timeoutId = setTimeout(executeAndDoubleInterval, interval)
  }
}

timeoutId = setTimeout(executeAndDoubleInterval, interval)

onBeforeUnmount(() => {
  clearInterval(timeoutId)
})

const clickUpdateEvaluationTask = async (id) => {
  loading.value = true
  try {
    await updateEvaluationTask({ id })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  chartOptions.value = setChartOptions()
})

const chartData1 = ref()
const chartData2 = ref()
const chartOptions = ref()

const setChartData = (dataSources) => {
  if (dataSources.length > 0) {
    const datasets = dataSources.map((dataSource) => {
      return {
        label: dataSource.name,
        data: Object.values(dataSource.points)
      }
    })
    return {
      datasets,
      labels: Object.keys(dataSources[0].points)
    }
  } else {
    return { labels: [], datasets: [] }
  }
}
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--text-color')
  const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')

  return {
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      }
    },
    scales: {
      r: {
        grid: {
          color: textColorSecondary
        },
        suggestedMin: 0,
        suggestedMax: 10
      }
    },
    elements: {
      line: {
        fill: false // これにより塗りつぶしが無効になります
      }
    }
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
