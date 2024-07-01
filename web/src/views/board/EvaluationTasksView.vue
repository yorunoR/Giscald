<template>
  <main style="max-width: 1400px; margin: auto">
    <h2 class="my-0">評価タスク一覧</h2>
    <section class="mt-2">
      <h3>点数</h3>
      <div
        v-if="
          radarDataSources1.length > 0 ||
          radarDataSources2.length > 0 ||
          radarDataSources3.length > 0
        "
        class="flex w-12"
      >
        <Chart
          v-if="chartData1.labels?.length === 1"
          type="bar"
          :data="chartData1"
          :options="barChartOptions"
          class="w-4"
        />
        <Chart v-else type="radar" :data="chartData1" :options="chartOptions" class="w-4" />
        <Chart
          v-if="chartData2.labels?.length === 1"
          type="bar"
          :data="chartData2"
          :options="barChartOptions"
          class="w-4"
        />
        <Chart v-else type="radar" :data="chartData2" :options="chartOptions" class="w-4" />
        <Chart
          v-if="chartData3.labels?.length === 1"
          type="bar"
          :data="chartData3"
          :options="barChartOptions"
          class="w-4"
        />
        <Chart v-else type="radar" :data="chartData3" :options="chartOptions" class="w-4" />
      </div>
      <div v-if="radarDataSources4.length > 0" class="flex w-12">
        <Chart
          v-if="chartData4.labels?.length === 1"
          type="bar"
          :data="chartData4"
          :options="barChartOptions"
          class="w-4"
        />
        <Chart v-else type="radar" :data="chartData4" :options="chartOptions" class="w-4" />
      </div>
    </section>
    <section
      v-if="
        barDataSources1.length > 0 ||
        barDataSources2.length > 0 ||
        barDataSources3.length > 0 ||
        barDataSources4.length > 0
      "
      class="mt-2"
    >
      <h3>応答時間（秒）</h3>
      <div class="flex">
        <Chart type="bar" :data="barChartData1" :options="barChartOptions" class="w-3 h-30rem" />
        <Chart type="bar" :data="barChartData2" :options="barChartOptions" class="w-3 h-30rem" />
        <Chart type="bar" :data="barChartData3" :options="barChartOptions" class="w-3 h-30rem" />
        <br />
        <Chart type="bar" :data="barChartData4" :options="barChartOptions" class="w-3 h-30rem" />
      </div>
    </section>
    <section class="mt-4">
      <div v-if="fetching">Loading...</div>
      <div v-else-if="error">Oh no... {{ error }}</div>
      <div v-else>
        <div class="text-left">
          <InputText v-model="nameSearch" placeholder="名前検索" />
          <ButtonGroup class="ml-2">
            <Button
              :severity="benchNameSearch == '' ? 'primary' : 'secondary'"
              label="ALL"
              @click="() => (benchNameSearch = '')"
            />
            <Button
              v-for="option in options"
              :key="option.code"
              :severity="benchNameSearch == option.code ? 'primary' : 'secondary'"
              :label="option.code"
              @click="() => (benchNameSearch = option.code)"
            />
          </ButtonGroup>
        </div>
        <table v-if="data" class="mt-2 w-full">
          <thead>
            <tr>
              <th class="cursor-pointer p-2" @click="setKey('id')">
                <u :class="{ 'text-primary': sortKey === 'id' }"> ID </u>
              </th>
              <th class="w-1 py-2">選択</th>
              <th class="cursor-pointer w-3" @click="setKey('name')">
                <u :class="{ 'text-primary': sortKey === 'name' }"> 名前 / 図上の表示名</u>
              </th>
              <th class="cursor-pointer w-2 py-2" @click="setKey('benchName')">
                <u :class="{ 'text-primary': sortKey === 'benchName' }"> 評価ベンチ </u>
              </th>
              <th class="cursor-pointer w-1" @click="setKey('createdAt')">
                <u :class="{ 'text-primary': sortKey === 'createdAt' }"> 作成日時 </u>
              </th>
              <th class="cursor-pointer w-1" @click="setKey('status')">
                <u :class="{ 'text-primary': sortKey === 'status' }"> ステータス </u>
              </th>
              <th class="cursor-pointer w-1.8" @click="setKey('points')">
                <u :class="{ 'text-primary': sortKey === 'points' }"> 点数 </u>
              </th>
              <th class="cursor-pointer w-1.8" @click="setKey('processingTimes')">
                <u :class="{ 'text-primary': sortKey === 'processingTimes' }"> 処理時間 </u>
              </th>
              <th class="w-1">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="evaluationTask in sortedEvaluationTasks" :key="evaluationTask.id">
              <td class="py-2">
                <span>{{ evaluationTask.id }}</span>
              </td>
              <th class="py-2">
                <div v-if="evaluationTask.points !== {}">
                  <Checkbox
                    v-model="radarDataSources1"
                    :value="{
                      plotName: getPlotName(evaluationTask),
                      values: evaluationTask.points
                    }"
                    @change="() => (chartData1 = setChartData(radarDataSources1))"
                  />
                  <Checkbox
                    v-model="radarDataSources2"
                    class="ml-1"
                    :value="{
                      plotName: getPlotName(evaluationTask),
                      values: evaluationTask.points
                    }"
                    @change="() => (chartData2 = setChartData(radarDataSources2))"
                  />
                  <Checkbox
                    v-model="radarDataSources3"
                    class="ml-1"
                    :value="{
                      plotName: getPlotName(evaluationTask),
                      values: evaluationTask.points
                    }"
                    @change="() => (chartData3 = setChartData(radarDataSources3))"
                  />
                  <Checkbox
                    v-model="radarDataSources4"
                    class="ml-1"
                    :value="{
                      plotName: getPlotName(evaluationTask),
                      values: evaluationTask.points
                    }"
                    @change="() => (chartData4 = setChartData(radarDataSources4))"
                  />
                </div>
                <hr class="mx-2" />
                <div v-if="evaluationTask.processingTimes !== {}" class="mt-1">
                  <Checkbox
                    v-model="barDataSources1"
                    :value="{
                      plotName: getPlotName(evaluationTask),
                      values: evaluationTask.processingTimes
                    }"
                    @change="() => (barChartData1 = setChartData(barDataSources1))"
                  />
                  <Checkbox
                    v-model="barDataSources2"
                    class="ml-1"
                    :value="{
                      plotName: getPlotName(evaluationTask),
                      values: evaluationTask.processingTimes
                    }"
                    @change="() => (barChartData2 = setChartData(barDataSources2))"
                  />
                  <Checkbox
                    v-model="barDataSources3"
                    class="ml-1"
                    :value="{
                      plotName: getPlotName(evaluationTask),
                      values: evaluationTask.processingTimes
                    }"
                    @change="() => (barChartData3 = setChartData(barDataSources3))"
                  />
                  <Checkbox
                    v-model="barDataSources4"
                    class="ml-1"
                    :value="{
                      plotName: getPlotName(evaluationTask),
                      values: evaluationTask.processingTimes
                    }"
                    @change="() => (barChartData4 = setChartData(barDataSources4))"
                  />
                </div>
              </th>
              <td class="p-2 text-left">
                <span>- {{ evaluationTask.name }}</span>
                <router-link
                  class="ml-2"
                  :to="{ name: 'evaluationTask', params: { id: evaluationTask.id } }"
                >
                  >
                </router-link>
                <div class="mt-3">
                  <span>- {{ getPlotName(evaluationTask) }}</span>
                  <u
                    v-if="evaluationTask.status === 'Completed'"
                    class="ml-2 cursor-pointer"
                    @click="() => openUpdateEvaluationTaskPlotName(evaluationTask)"
                    >編集</u
                  >
                </div>
              </td>
              <td class="py-2">
                <span>{{ evaluationTask.generationTask.bench.name }}</span>
                <router-link
                  class="pl-2"
                  :to="{ name: 'bench', params: { id: evaluationTask.generationTask.bench.id } }"
                  >></router-link
                >
              </td>
              <td class="py-2">
                {{ timeFormat(evaluationTask.createdAt) }}
              </td>
              <td class="py-2">
                {{ evaluationTask.status }}
              </td>
              <td class="text-left">
                <div class="px-3 mt-3 pb-2 container">
                  <div
                    v-for="point in objToList(evaluationTask.points)"
                    :key="point.key"
                    class="flex justify-content-between"
                  >
                    <div>{{ point.key }}:</div>
                    <div>{{ pointFormat(point.value) }}</div>
                  </div>
                </div>
                <hr class="mx-3" />
                <div class="px-3 pt-2 pb-3">AVG: {{ avg(evaluationTask.points) }}</div>
              </td>
              <td class="text-left">
                <div class="px-3 mt-3 pb-2 container">
                  <div
                    v-for="processingTime in objToList(evaluationTask.processingTimes)"
                    :key="processingTime.key"
                    class="flex justify-content-between"
                  >
                    <div>{{ processingTime.key }}:</div>
                    <div>{{ pointFormat(processingTime.value) }}</div>
                  </div>
                </div>
                <hr class="mx-3" />
                <div class="px-3 pt-2 pb-3">AVG: {{ avg(evaluationTask.processingTimes) }}</div>
              </td>
              <td>
                <div v-if="evaluationTask.status === 'Completed'" class="p-1">
                  <u
                    v-if="!loading"
                    class="cursor-pointer"
                    @click="() => clickUpdateEvaluationTask(evaluationTask.id)"
                  >
                    集計する
                  </u>
                </div>
                <div class="p-1">
                  <u
                    class="cursor-pointer"
                    @click="() => clickDeleteEvaluationTask(evaluationTask.id)"
                  >
                    削除
                  </u>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
  <section>
    <Dialog v-model:visible="visible" modal header="編集" class="w-5">
      <div class="flex align-items-center gap-3 mb-5">
        <label for="plotName" class="font-semibold w-8rem">表示名</label>
        <InputText
          id="plotName"
          v-model="plotName"
          class="flex-auto"
          autocomplete="off"
          placeholder="表示名"
        />
      </div>
      <div class="flex justify-content-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
        <Button
          type="button"
          label="Save"
          :disabled="!plotName"
          @click="() => clickUpdateEvaluationTaskPlotName()"
        ></Button>
      </div>
    </Dialog>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount, onMounted } from 'vue'
import { useQuery, useMutation } from '@urql/vue'
import { graphql } from '@/gql'
import Benches from '@/doc/query/Benches'
import EvaluationTasks from '@/doc/query/EvaluationTasks'
import UpdateEvaluationTask from '@/doc/mutation/UpdateEvaluationTask'
import DeleteEvaluationTask from '@/doc/mutation/DeleteEvaluationTask'
import dayjs from 'dayjs'
import swal from 'sweetalert'

const sortKey = ref('createdAt')
const sortAsc = ref(false)
const loading = ref(false)
const nameSearch = ref('')
const benchNameSearch = ref('')
const radarDataSources1 = ref([])
const radarDataSources2 = ref([])
const radarDataSources3 = ref([])
const radarDataSources4 = ref([])
const barDataSources1 = ref([])
const barDataSources2 = ref([])
const barDataSources3 = ref([])
const barDataSources4 = ref([])
const visible = ref(false)
const plotName = ref('')

const query = graphql(EvaluationTasks)
const { fetching, error, data, executeQuery } = useQuery({ query, requestPolicy: 'network-only' })
const benchesQuery = graphql(Benches)
const { data: benchesData } = useQuery({ query: benchesQuery })
const { executeMutation: updateEvaluationTask } = useMutation(graphql(UpdateEvaluationTask))
const { executeMutation: deleteEvaluationTask } = useMutation(graphql(DeleteEvaluationTask))

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

const _containsAny = (targetString, substrings) => {
  for (let i = 0; i < substrings.length; i++) {
    if (targetString.includes(substrings[i])) {
      return true
    }
  }
  return false
}

const containsAll = (targetString, substrings) => {
  for (let i = 0; i < substrings.length; i++) {
    if (!targetString.includes(substrings[i])) {
      return false
    }
  }
  return true
}

const sortedEvaluationTasks = computed(() => {
  if (!data.value) return []
  const evaluationTasks = Array.from(data.value.currentUser.evaluationTasks)
  const selectedEvaluationTasks = evaluationTasks.filter((evaluationTask) => {
    if (benchNameSearch.value) {
      if (benchNameSearch.value !== evaluationTask.generationTask.bench.code) return false
    }
    if (nameSearch.value) {
      const substrings = nameSearch.value.toLowerCase().split(/\s+/)
      return containsAll(evaluationTask.name.toLowerCase(), substrings)
    } else {
      return true
    }
  })
  const column = sortKey.value
  if (column != '') {
    selectedEvaluationTasks.sort((a, b) => {
      let a_column, b_column
      if (column === 'points' || column === 'processingTimes') {
        a_column = Object.values(a[column]).reduce((sum, num) => sum + num, 0)
        b_column = Object.values(b[column]).reduce((sum, num) => sum + num, 0)
      } else if (column === 'benchName') {
        a_column = a.generationTask.bench.name
        b_column = b.generationTask.bench.name
      } else if (column === 'id') {
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
  return selectedEvaluationTasks
})

const options = computed(() => {
  if (!benchesData.value) return []
  return benchesData.value.benches.slice().sort((a, b) => a.id - b.id)
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
  barChartOptions.value = setBarChartOptions()
})

const chartData1 = ref({})
const chartData2 = ref({})
const chartData3 = ref({})
const chartData4 = ref({})
const barChartData1 = ref()
const barChartData2 = ref()
const barChartData3 = ref()
const barChartData4 = ref()
const chartOptions = ref()
const barChartOptions = ref()

const setChartData = (dataSources) => {
  if (dataSources.length > 0) {
    const labels = Object.keys(dataSources[0].values).sort()
    const datasets = dataSources.map((dataSource) => {
      const data = labels.map((label) => dataSource.values[label])
      return {
        label: dataSource.plotName,
        data
      }
    })
    return { labels, datasets }
  } else {
    return { labels: [], datasets: [] }
  }
}

const documentStyle = getComputedStyle(document.documentElement)
const textColor = documentStyle.getPropertyValue('--text-color')
const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary')
const surfaceBorder = documentStyle.getPropertyValue('--surface-border')

const setChartOptions = () => {
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

const setBarChartOptions = () => {
  return {
    indexAxis: 'y',
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
          font: {
            weight: 500
          }
        },
        grid: {
          display: false,
          drawBorder: false
        }
      },
      y: {
        ticks: {
          color: textColorSecondary
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false
        }
      }
    }
  }
}

const _isEmpty = (obj) => {
  return Object.keys(obj).length === 0
}
const avg = (obj) => {
  const len = Object.keys(obj).length
  if (len < 1) return 0
  const avg_val = Object.values(obj).reduce((sum, element) => sum + element, 0) / len
  return pointFormat(avg_val)
}

const clickDeleteEvaluationTask = async (id) => {
  const value = await swal({
    title: '評価タスク削除',
    text: '戻せません',
    icon: 'warning',
    buttons: {
      cancelbutton: { text: 'キャンセル', value: 'cancel' },
      yesbutton: { text: 'OK', value: 'ok' }
    }
  })

  if (value === 'ok') {
    await deleteEvaluationTask({ id })
  }
}

const objToList = (obj) => {
  const list = Object.entries(obj).map(([key, value]) => ({ key, value }))
  return list.sort((a, b) => {
    return a.key > b.key ? 1 : -1
  })
}

const pointFormat = (point) => {
  let num = point * 10
  num = Math.round(num)
  return num / 10
}

const getPlotName = (evaluationTask) => {
  return evaluationTask.plotName || evaluationTask.name.split('@')[0]
}

let selectedEvaluationTaskId
const openUpdateEvaluationTaskPlotName = (evaluationTask) => {
  plotName.value = evaluationTask.plotName
  selectedEvaluationTaskId = evaluationTask.id
  visible.value = true
}
const clickUpdateEvaluationTaskPlotName = async () => {
  try {
    await updateEvaluationTask({
      id: selectedEvaluationTaskId,
      plotName: plotName.value
    })
  } finally {
    radarDataSources1.value = []
    radarDataSources2.value = []
    radarDataSources3.value = []
    radarDataSources4.value = []
    barDataSources1.value = []
    barDataSources2.value = []
    barDataSources3.value = []
    barDataSources4.value = []
    chartData1.value = {}
    chartData2.value = {}
    chartData3.value = {}
    chartData4.value = {}
    barChartData1.value = {}
    barChartData2.value = {}
    barChartData3.value = {}
    barChartData4.value = {}
    visible.value = false
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
.container {
  /*
  max-height: 200px;
  overflow-y: scroll;
  */
}
.container::-webkit-scrollbar {
  width: 1px;
}
.container::-webkit-scrollbar-thumb {
  background-color: #888888;
  border-radius: 8px;
}
</style>
