<template>
  <ScrollingBoard
    :data="data"
    :columns="columns"
    id-field="_tid"
    class="data-table"
    :visible-count="5"
  />
</template>

<script setup>
import ScrollingBoard from '@/components/shared/scrolling-table/index.vue'
import {ref, onMounted, onBeforeUnmount} from "vue";
import request from '@/util/http.js';
import {compareDateString, sanitizeInvalidDate} from "@/util/util";

// data
const isLoading = ref(false);
const data = ref([])
request
  .get('/api/fungus/environment-alert-list')
  .then((result)=>{
    data.value = result.data.sort((a,b)=>compareDateString(a.date, b.date)).map((e, idx)=>({
      ...e,
      _tid: `${Date.now()}-${idx}`,
      _idx: idx+1,
      date: sanitizeInvalidDate(e.date),
    }))
  })
  .finally(()=>{
    isLoading.value = false
  })

const columns = [
  {field: 'point', name: '采样点', width: '20%'},
  {field: 'type', name: '异常类型', width: '35%'},
  {field: 'abnormal', name: '异常数值', width: '15%'},
  {field: 'date', name: '预警时间', width: '30%'},
]

</script>

<style scoped lang="scss">
.data-table {
  margin-block: vh(20);
}
</style>
