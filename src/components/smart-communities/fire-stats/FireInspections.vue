<template>
  <Label label="巡查情况"/>
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
    .get('/api/fireSupe/getFirePatrol')
    .then((result)=>{
      data.value = result.data.sort((a,b)=>compareDateString(a.patrol_date, b.patrol_date)).map((e, idx)=>({...e, _tid: `${Date.now()}-${idx}`}))
    })
    .finally(()=>{
      isLoading.value = false
    })

const columns = [
  {field: 'patrol_date', name: '日期', width: '20%'},
  {field: 'place', name: '地点', width: '25%'},
  {field: 'inspection', name: '巡查情况', width: '40%'},
  {field: 'rectification', name: '整改情况', width: '15%'},
]

</script>

<style scoped lang="scss">
.data-table {
  margin-block: vh(20);
}
</style>
