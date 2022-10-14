<template>
  <Label label="重点人员分布"/>
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
  const options = [[]]
  const xAxisValue = [];
  result.data.forEach((el, index)=>{
    xAxisValue.push(el.village_name);
    const isEven = index % 2 == 0;
    options[0].push({
      value: Number(el.number),
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color:
                  isEven
                      ? "rgba(16, 237, 255, 1)"
                      : "rgba(132, 194, 255, 1)", // 0% 处的颜色
            },
            {
              offset: 1,
              color:
                  isEven
                      ? "rgba(52, 154, 255, 1)"
                      : "rgba(111, 116, 240, 1)", // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
      label: {
        color: isEven ? '#28E8FE' : '#83C1FD'
      }
    });
  })
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      top: 30,
      bottom: 30,
      right: 0
    },
    legend: {
      show: false
    },
    yAxis: {
      type: 'value',
      name: '人',
      nameTextStyle: {
        color: '#90B6D2',
        align: 'right',
      },
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
    xAxis: {
      type: 'category',
      axisTick: { show: false },
      data: xAxisValue,
      // offset: -14 * 8,
      axisLabel: {
        fontSize: 14,
        color: '#90B6D2',
        overflow: 'breakAll',
        interval: 0, // show all
        width: 14 * 4
      },
    },
    series: [
      {
        name: '人口',
        type: 'bar',
        data: options[0],
        barWidth: 22,
        label: {
          show: true,
          position: 'top',
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
  height: vh(235);
}
</style>
