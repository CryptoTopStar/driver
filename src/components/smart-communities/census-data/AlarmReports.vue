<template>
  <Label label="智能设备报警"/>
  <ScrollingBoard
      :data="data"
      :columns="columns"
      id-field="_tid"
      class="data-table"
      :visible-count="6"
  />
</template>

<script setup>
import ScrollingBoard from '@/components/shared/scrolling-table/index.vue'
import Label from '@/components/Label.vue'
import {ref, onMounted, onBeforeUnmount} from "vue";
import request from '@/util/http.js';
import {compareDateString} from "@/util/util";

// data
const isLoading = ref(false);
const data = ref([])
request
    .get('/api/Person/getIntelligentDeviceAlarm')
    .then((result)=>{
      data.value = result.data.sort((a,b)=>compareDateString(a.time, b.time)).map((e, idx)=>({...e, _tid: `${Date.now()}-${idx}`}))
    })
    .finally(()=>{
      isLoading.value = false
    })

const columns = [
  {field: 'personnel', name: '重点人员', width: '22.5%'},
  {field: 'time', name: '预警时间', width: '40%'},
  {field: 'management', name: '网格员', width: '22.5%'},
  {field: 'status', name: '处理状态', width: '15%'},
]

</script>

<style scoped lang="scss">
.data-table {
  margin-block: vh(20);
}
</style>
