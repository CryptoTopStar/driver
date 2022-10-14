<template>
  <Label label="隐患修复统计"/>
  <div class="container">
    <div class="chart">
      <el-progress
          v-for="(item, idx) in data"
          type="circle"
          :key="item.name"
          class="progress"
          :show-text="false"
          :percentage="item.value"
          :color="chartColors[idx]"
          :style="{
              transform: `scale(${1 - 0.2 * idx})`
          }"
      />
      <img
          v-show="data.length > 0"
          ref="chartDecor"
          class="chart-decor"
          :src="require('@/assets/images/smart-communities/fire-stats/circle.png')"
      />
    </div>

    <div class="chart-legend">
      <div v-for="(item, idx) in data" :key="item.name" class="tag" :style="{color: chartColors[idx]}">
        <span>{{item.name}}</span>
        <span>{{item.count}}个</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import Label from '@/components/Label.vue'
import {ref, onMounted, onBeforeUnmount} from "vue";
import request from '@/util/http.js';
import * as echarts from 'echarts';

// chart
const chart = ref(null);
const chartDecor = ref(null);
const chartColors = ['#24D2F0','#9389FC', '#FFAE5D']
let chartInstance;

// data
const data = ref([])
const isLoading = ref(false);
request.get('/api/fireSupe/getHiddenDangerDetail').then((result)=>{
  const values = {}
  result.data.forEach(el=>{
    if (el.status_name) {
      if (el.status_name in values) {
        values[el.status_name]++;
      } else {
        values[el.status_name] = 1;
      }
    }
  })
  const totalCount = Object.values(values).reduce((a,b)=>a+b,0)
  const gaugeData = Object.entries(values).map(([k,v])=>{
    return {
      name: k,
      count: v,
      value: v / totalCount * 100
    }
  })
  data.value = gaugeData;
  //
  // const option = {
  //   tooltip: {
  //     trigger: 'axis'
  //   },
  //   grid: {
  //     top: 30,
  //     left: 14 * 8,
  //   },
  //   series: [
  //     {
  //       type: 'gauge',
  //       data: gaugeData,
  //       startAngle: 90,
  //       endAngle: -270,
  //       pointer: {
  //         show: false
  //       },
  //       progress: {
  //         show: true,
  //         overlap: false,
  //         roundCap: true,
  //         clip: false,
  //         width: 20,
  //         itemStyle: {
  //           borderWidth: 10,
  //
  //         }
  //       },
  //       emphasis: {
  //         show: false,
  //       },
  //       axisLine: {
  //         lineStyle: {
  //           width: 40,
  //           color: [[1, 'rgba(38, 180, 252, 0.1)']]
  //         }
  //       },
  //       splitLine: {
  //         show: false,
  //         distance: 0,
  //         length: 10
  //       },
  //       axisTick: {
  //         show: false
  //       },
  //       axisLabel: {
  //         show: false,
  //         distance: 50
  //       },
  //       title: {
  //         show: false,
  //         fontSize: 14
  //       },
  //       detail: {
  //         show: false,
  //       }
  //     },
  //   ],
  //   color: chartColors,
  // };
  // chartInstance.setOption(option)
}).finally(()=>{
  isLoading.value = false;
});
const resizeHandler = ()=>{
  chartInstance?.resize();
};
onMounted(()=>{
  // chartInstance = echarts.init(chart.value);
  chartDecor.value.animate([
    { transform: 'rotate(0) scale(0.5)'},
    { transform: 'rotate(360deg) scale(0.5)'}
  ], {
    duration: 5000,
    iterations: Infinity
  });
  window.addEventListener('resize', resizeHandler)
})
onBeforeUnmount(()=>{
  // chartInstance.dispose();
  window.removeEventListener('resize', resizeHandler)
})
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  margin-block: vh(30);
  position: relative;
  display: grid;
  grid-template: 'chart chart-legend' / vw(200) 1fr;
}
.progress {
  position: absolute;
  width: vw(200);
  height: vw(200);
  display: grid;
  place-items: center;
}
.chart {
  position: relative;
  height: vw(200);
  width: vw(200);
  grid-area: chart;
  z-index: 2;
  background: url("~@/assets/images/smart-communities/fire-stats/circle-bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  ::v-deep(.el-progress-circle) {
    width: 100% !important;
    height: 100% !important;
    .el-progress-circle__track {
      stroke: rgba(36, 210, 240, 0.1);
      stroke-width: 1;
    }
    .el-progress-circle__path {
      stroke-width: 3;
    }
  }
}
.chart-decor {
  position: absolute;
  width: vw(200);
  z-index: 3;
}
.chart-legend {
  height: vw(200);
  grid-area: chart-legend;
  display: flex;
  flex-flow: column;
  justify-content: center;
  row-gap: vh(20);
  margin-inline-start: vw(40);
  .tag {
    width: fit-content;
    font-size: vw(16);
    font-weight: 400;
    position: relative;
    padding: vh(8) vw(20);
    background: linear-gradient(to right, rgba(255, 255, 255, 0.2), rgba(2, 30, 95, 0.050980392156862744));
    span:first-of-type {
      color: white;
      margin-inline-end: vw(24);
    }
    &::before {
      position: absolute;
      display: inline-block;
      content: ' ';
      width: vw(4);
      height: 100%;
      left: 0;
      top: 0;
      background-color: currentColor;
    }
  }
}
</style>
