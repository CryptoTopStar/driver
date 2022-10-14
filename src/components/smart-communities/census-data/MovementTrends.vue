<template>
  <Label label="重点人员动向"/>
  <div class="container">
    <div ref="chart" class="chart" />
  </div>
</template>

<script setup>
import Label from '@/components/Label.vue'
import {ref, onMounted, onBeforeUnmount} from "vue";
import request from '@/util/http.js';
import * as echarts from 'echarts';

// chart
const chart = ref(null);
const chartColors = ['#EF9E4E','#3ED2FF']
let chartInstance;

// data
const isLoading = ref(false);
request.get('/api/Person/getPersonDistribute').then((result)=>{
  const options = [[],[]] // 大陈乡辖区内, 大陈乡辖区外
  const xAxisValue = [];
  result.data.forEach(el=>{
    xAxisValue.push(el.village_name);
    options[0].push(el.dcxxqn);
    options[1].push(el.dcxxqw);
  })
  const option = {
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      top: 30,
      left: 14 * 5,
    },
    legend: {
      data: ['大陈乡辖区内', '大陈乡辖区外'],
      right: 0,
      textStyle: {
        fontSize: 14,
        color: '#A1CEEF'
      }
    },
    yAxis: {
      type: 'category',
      axisTick: { show: false },
      data: xAxisValue,
      // offset: -14 * 8,
      axisLabel: {
        fontSize: 14,
        color: '#90B6D2',
        overflow: 'breakAll',
        interval: 0, // show all
        width: 14 * 5
      },
    },
    xAxis: {
      type: 'value',
      nameTextStyle: {
        color: '#90B6D2',
        align: 'right',
      },
      minInterval: 1,
      axisLabel: {
        color: '#90B6D2'
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.14)',
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: '大陈乡辖区内',
        type: 'bar',
        stack: 'total',
        data: options[0],
        label: {
          show: true,
          position: 'insideRight',
          color: '#fff'
        },
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "rgba(0, 159, 208, 0)", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#009FD0", // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
      {
        name: '大陈乡辖区外',
        type: 'bar',
        stack: 'total',
        data: options[1],
        label: {
          show: true,
          position: 'insideRight',
          color: '#fff'
        },
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "rgba(203, 130, 60, 0)", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#CB823C", // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
    ],
    color: chartColors,
  };
  chartInstance.setOption(option)
}).finally(()=>{
  isLoading.value = false;
});
const resizeHandler = ()=>{
  chartInstance?.resize();
};
onMounted(()=>{
  chartInstance = echarts.init(chart.value);
  window.addEventListener('resize', resizeHandler)
})
onBeforeUnmount(()=>{
  chartInstance.dispose();
  window.removeEventListener('resize', resizeHandler)
})
</script>

<style scoped lang="scss">
.container {
  position: relative;
}
.chart {
  height: vh(250);
}
</style>
