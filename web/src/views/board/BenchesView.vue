<template>
  <main style="max-width: 1200px; margin: auto">
    <h1 class="mt-2">評価ベンチ一覧</h1>
    <section class="mt-4">
      <div v-if="fetching">Loading...</div>
      <div v-else-if="error">Oh no... {{ error }}</div>
      <div v-else>
        <table v-if="data" class="w-full">
          <thead>
            <tr>
              <th class="cursor-pointer w-4 py-2" @click="setKey('name')">
                <u :class="{ 'text-primary': sortKey === 'name' }"> 名前 </u>
              </th>
              <th class="cursor-pointer w-1" @click="setKey('createdAt')">
                <u :class="{ 'text-primary': sortKey === 'createdAt' }"> 作成日時 </u>
              </th>
              <th class="cursor-pointer w-1" @click="setKey('updatedAt')">
                <u :class="{ 'text-primary': sortKey === 'updatedAt' }"> 更新日時 </u>
              </th>
              <th class="w-1">コード</th>
              <th>メモ</th>
              <th class="w-1">ロック</th>
              <th class="w-2">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="bench in sortedBenches" :key="bench.id">
              <td class="py-2">
                <span>{{ bench.name }}</span>
                <router-link class="pl-2" :to="{ name: 'bench', params: { id: bench.id } }">
                  >
                </router-link>
              </td>
              <td class="py-2">
                {{ timeFormat(bench.createdAt) }}
              </td>
              <td class="py-2">
                {{ timeFormat(bench.updatedAt) }}
              </td>
              <td class="py-2">
                {{ bench.code }}
              </td>
              <td class="py-2">
                {{ bench.description }}
              </td>
              <td class="py-2">
                {{ bench.locked }}
              </td>
              <td>
                <div class="px-2">
                  <u class="cursor-pointer" @click="() => clickShowTemplate(bench)">
                    テンプレート
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
    <Dialog v-model:visible="visibleTemplate" modal header="テンプレート" class="w-8">
      <div>
        <h3>評価時のユーザープロンプト</h3>
        <p style="white-space: pre-wrap">{{ selected.template || 'なし' }}</p>
      </div>
      <div class="mt-6">
        <h3>回答生成時のシステムプロンプト</h3>
        <p style="white-space: pre-wrap">{{ selected.systemTemplate || 'なし' }}</p>
      </div>
    </Dialog>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuery } from '@urql/vue'
import { graphql } from '@/gql'
import Benches from '@/doc/query/Benches'
// import DeleteBench from '@/doc/mutation/DeleteBench'
import dayjs from 'dayjs'
// import swal from 'sweetalert'

const sortKey = ref('createdAt')
const sortAsc = ref(false)
const selected = ref(null)
const visibleTemplate = ref(false)

const query = graphql(Benches)
const { fetching, error, data } = useQuery({ query, requestPolicy: 'network-only' })
// const { executeMutation: deleteBench } = useMutation(graphql(DeleteBench))

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

const sortedBenches = computed(() => {
  if (!data.value) return []
  const benches = Array.from(data.value.benches)
  const column = sortKey.value
  if (column != '') {
    benches.sort((a, b) => {
      if (a[column] < b[column]) return sortAsc.value ? -1 : 1
      if (a[column] > b[column]) return sortAsc.value ? 1 : -1
      return parseInt(a.id) < parseInt(b.id) ? 1 : -1
    })
  }
  return benches
})

const timeFormat = (time) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}

const clickShowTemplate = (bench) => {
  selected.value = bench
  visibleTemplate.value = true
}

// const clickDeleteBench = async (id) => {
//   const value = await swal({
//     title: '評価タスク削除',
//     text: '戻せません',
//     icon: 'warning',
//     buttons: {
//       cancelbutton: { text: 'キャンセル', value: 'cancel' },
//       yesbutton: { text: 'OK', value: 'ok' }
//     }
//   })
//
//   if (value === 'ok') {
//     await deleteBench({ id })
//   }
// }
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
