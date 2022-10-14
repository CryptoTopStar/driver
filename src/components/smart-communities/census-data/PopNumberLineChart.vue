<template>
  <Label label="重点人员数变化"/>
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
const chartColors = ['#7981FF']
let chartInstance;

// data
const isLoading = ref(false);
request.get('/api/Person/getPersonQuantityChange').then((result)=>{
  const nums = []
  const xAxisValue = [];
  const dataLines = [];
  result.data.forEach((el, index)=>{
    xAxisValue.push(el.year);
    nums.push(el.number);
    dataLines.push([el.year, el.number]);
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
        name: '人数',
        type: 'line',
        data: nums,
        smooth: true,
        label: {
          show: false,
          position: 'top',
        },
        symbol: 'none',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#7981FF' // color at 0%
            }, {
              offset: 1, color: 'transparent' // color at 100%
            }],
            global: false // default is false
          }
        }
      },
      {
        name: "滑行的光点",
        type: "lines",
        coordinateSystem: "cartesian2d",
        polyline: true,
        smooth: true,
        effect: {
          show: true,
          trailLength: 0.3,
          symbolSize: 3,
          symbol: "circle",
          color: "#fff",
        },
        zlevel: 100,
        lineStyle: {
          color: "rgba(14, 156, 255, 0)",
          width: 0,
          opacity: 0,
        },
        label: {
          show: false,
        },
        data: [{ coords: dataLines }],
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
