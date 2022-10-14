<template>
  <transition name="container">
    <div class="container">
      <Label label="隐患详情" class="section-header"/>
      <ScrollingBoard
          :data="data"
          :columns="columns"
          :composite-key="getRowId"
          class="detail-table"
          :visible-count="5"
      />
    </div>
  </transition>
</template>

<script setup>
import ScrollingBoard from '@/components/shared/scrolling-table/index.vue'
import Label from '@/components/Label.vue'
import {ref, onMounted, onBeforeUnmount} from "vue";
import request from '@/util/http.js';
import * as echarts from 'echarts';

// data
const isLoading = ref(false);
const data = ref([])
request
    .get('/api/fireSupe/getHiddenDangerDetail')
    .then((result)=>{
      data.value = result.data
    })
    .finally(()=>{
      isLoading.value = false
    })

const columns = [
  {field: 'name', name: '隐患名称', width: '12%'},
  {field: 'region', name: '所在地区', width: '15%'},
  {field: 'report_time', name: '上报时间', width: '20%'},
  {field: 'fault_type', name: '故障类型', width: '10%'},
  {field: 'system', name: '所属系统', width: '15%'},
  {field: 'status_name', name: '修复状态', width: '8%'},
  {field: 'repair_time', name: '修复时间', width: '20%'}
]
const getRowId = (row) => {
  return [row.name, row.region, row.report_time].join('::')
}

</script>

<style scoped lang="scss">
.section-header {
  max-width: vw(450);
}
.container {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  padding: vh(12) vw(24);
  min-height: vh(265);
  height: vh(270);
  margin-inline: vw(50);
  background: url("~@/assets/images/smart-communities/fire-stats/center-bottom-bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .detail-table {
    margin-block-start: vh(12);
  }
}

.container-move,
.container-enter-active,
.container-leave-active {
  transition: all 0.5s ease;
  min-height: 0;
  overflow: hidden;
}
.container-enter-from {
  opacity: 0;
  height: 0;
}
.container-leave-to {
  opacity: 0;
  height: 0;
  min-height: 0;
}
</style>
