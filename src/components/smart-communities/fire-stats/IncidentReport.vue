<template>
  <Label label="报警处理统计"/>
  <div class="container">
    <div class="stat-item">
      <ItemIcon :scale="54 / 40" preset="animated" :icon="require('@/assets/images/smart-communities/fire-stats/icon_2-1.svg')"/>
      <div class="stat">
        <div class="label">已处理<span class="value">{{data.resolved.count}}</span>起</div>
        <div class="pct-bar">
          <div :style="{transform: `scaleX(${data.resolved.percent}%)`, background: 'linear-gradient(to right, transparent, #00F0FF)'}" />
        </div>
      </div>
    </div>

    <div class="stat-item">
      <ItemIcon :scale="54 / 40" preset="animated" :icon="require('@/assets/images/smart-communities/fire-stats/icon_2-2.svg')"/>
      <div class="stat">
        <div class="label">未处理<span class="value" :style="{color: '#FFB856'}">{{data.unresolved.count}}</span>起</div>
        <div class="pct-bar">
          <div :style="{transform: `scaleX(${data.unresolved.percent}%)`, background: 'linear-gradient(to right, transparent, #FFB856)'}" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Label from '@/components/Label.vue'
import {ref, onMounted, onBeforeUnmount} from "vue";
import ItemIcon from '@/components/smart-communities/home/sub-components/ItemIcon.vue'
import request from '@/util/http.js';
import * as echarts from 'echarts';

// chart
const chartColors = ['#EF9E4E','#3ED2FF']

// data
const data = ref({
  resolved: {count: '-', percent: 0},
  unresolved: {count: '-', percent: 0}
})
const isLoading = ref(false);
request.get('/api/fireSupe/getCountAlarmProcess').then((result)=>{
  data.value.resolved.count = Number(result.data[0].index_value);
  data.value.unresolved.count = Number(result.data[1].index_value);
  const total = data.value.resolved.count + data.value.unresolved.count
  data.value.resolved.percent = total === 0 ? 0 : 100 * data.value.resolved.count / total;
  data.value.unresolved.percent = total === 0 ? 0 : 100 * data.value.unresolved.count / total;
}).finally(()=>{
  isLoading.value = false;
});

onMounted(()=>{
})
onBeforeUnmount(()=>{
})
</script>

<style scoped lang="scss">
.container {
  position: relative;
  margin-block-start: vh(20);
  display: flex;
  flex-flow: column;
  row-gap: vh(30);
}
.stat-item {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: vw(20);
}
.stat-icon {
}
.stat {
  width: vw(300);
}
.label {
  display: flex;
  font-size: vw(16);
  font-weight: normal;
  color: #CCEAFF;
  line-height: vw(24);
  align-items: baseline;
  .value {
    margin-inline-start: auto;
    margin-inline-end: vw(4);
    font-size: vw(24);
    font-family: PangMenZhengDao-Regular, PangMenZhengDao;
    font-weight: 400;
    color: #24D5EE;
    text-shadow: vw(0) vw(0) vw(8) rgba(36, 213, 238, 0.4);
  }
}
.pct-bar {
  width: 100%;
  overflow: hidden;
  margin-block-start: vw(10);
  height: vw(16);
  border: vw(1) solid #124493;
  background: #124493;
  & > div {
    height: 100%;
    width: 100%;
    transition: all 0.5s ease-out;
    transform-origin: left;
  }
}
</style>
