<template>
  <ScrollingBoard
    :data="data"
    :columns="columns"
    id-field="_tid"
    class="data-table"
    :visible-count="9"
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
  .get('/api/fungus/yield-list')
  .then((result)=>{
    data.value = result.data.map((e, idx)=>({
      ...e,
      weight: `${e.weight}吨`,
      area: `${e.weight}平方米`,
      moisture: `${e.moisture}%`,
      fungus_temperature: `${e.fungus_temperature}度`,
      humidity: `${e.humidity}%`,
      concentration: `${e.concentration}%`,
      yield: `${e.yield}吨`,
      _tid: `${Date.now()}-${idx}`,
      _idx: idx+1,
    }))
  })
  .finally(()=>{
    isLoading.value = false
  })

const columns = [
  {field: 'weight', name: '投料重量', width: '10%'},
  {field: 'area', name: '栽培面积', width: '11%'},
  {field: 'moisture', name: '培养基含水量', width: '16%'},
  {field: 'ph', name: '培养基PH值', width: '10%'},
  {field: 'humidity', name: '湿度', width: '10%'},
  {field: 'concentration', name: 'CO₂浓度', width: '10%'},
  {field: 'fungus_temperature', name: '菌丝生长温度', width: '13%'},
  {field: 'light', name: '光线情况', width: '10%'},
  {field: 'yield', name: '产量', width: '10%'},
]

</script>

<style scoped lang="scss">
.data-table {
  margin: vh(20) vw(30) 0 vw(30);

}
</style>
