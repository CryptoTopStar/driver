<template>
  <article>
    <Title text="接口调用量TOP10">
      <template #inline-after>
        <RadioBox v-model="range" :style="{marginInlineStart: 'auto'}" :options="rangeOptions" />
      </template>
    </Title>
    <ScrollingBoard
      :data="data"
      :columns="columns"
      id-field="_tid"
      class="dl-api-usage-table"
      :visible-count="4"
      :get-row-bg="getRowBg"
    />
  </article>
</template>

<script setup>
import Title from '../../modules/Title.vue'
import RadioBox from '@/components/shared/RadioBox.vue'
import ScrollingBoard from '@/components/shared/scrolling-table/index.vue'
import {ref, watchEffect, computed} from "vue";
import {fetchDtapi} from '@/views/ruralBrain/data-lake/api-tokens'
import rowBg from "@/assets/rural-brain/dl/table-row-bg.svg";

const rangeOptions = [
  {label: '24小时', value: 'jsc_sjzc_top10_24xs'},
  {label: '7天', value: 'jsc_sjzc_top10_7t'},
  {label: '30天', value: 'jsc_sjzc_top10_30t'},
  {label: '全部', value: 'jsc_sjzc_top10_h'}
  ]
const range = ref('jsc_sjzc_top10_24xs')
// data
const isLoading = ref(false);
const dataCache = ref(new Map());
const data = computed(()=>{
  return dataCache.value.get(range.value) ?? []
});

watchEffect(()=>{
  const api = range.value;
  if (!dataCache.value.has(api)) {
    dataCache.value.set(api, []);
    isLoading.value = true;
    fetchDtapi(api, {
      "pageNo":1,
      "pageSize": 10,
    })
      .then((result)=>{
        dataCache.value.set(api, result.data.map((e, idx)=>({
          ...e,
          rank: idx + 1,
          total: `${e.total}次`,
          _tid: `${Date.now()}-${idx}`,
        })))
      })
      .catch(console.error)
      .finally(()=>{
        isLoading.value = false
      })
  }
})

const columns = [
  {field: 'rank', name: '排名', width: '20%'},
  {field: 'cn_name', name: '服务名称', width: '60%'},
  {field: 'total', name: '调用次数', width: '20%'},
]
const getRowBg = (row) => {
  const srcIdx = data.value.findIndex(
    (e) => {
      return e._tid === row._tid
    }
  );
  if (srcIdx % 2 === 1) {
    return `no-repeat left / auto 100% url(${rowBg})`;
  }
}
</script>

<style scoped lang="scss">
.dl-api-usage-table {
  margin-block-start: 16px;


  ::v-deep(.table-body) {
      .row {
        padding-block-end: 4px;
      }
      .row:not(:last-of-type) {
        margin-block-end: 20px;
      }
      .default-text-cell {
      }

      .cell:first-of-type {
        .default-text-cell {
          width: 44px;
          height: 32px;
          box-sizing: border-box;
          background: #082C74;
        }
      }
  }
}
</style>
