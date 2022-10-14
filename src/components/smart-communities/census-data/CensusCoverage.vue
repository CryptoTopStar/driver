<template>
  <Label label="走访次数"/>
  <div class="container">
    <div ref="chart" class="chart" />
  </div>
</template>

<script setup>
import Label from '@/components/Label.vue'
import {ref, onMounted, onBeforeUnmount} from "vue";
import request from '@/util/http.js';
import * as echarts from 'echarts';
import {sliceCircularArray} from "@/util/util";

// chart
const chart = ref(null);
const chartColors = ['#EF9E4E','#3ED2FF']
let chartInstance;

// data
const isLoading = ref(false);
request.get('/api/Person/getVisitNumber').then((result)=>{
  const seriesData = []
  const xAxisValue = [];
  const cutoff = 0;
  sliceCircularArray(result.data, new Date().getMonth(), -5).forEach((el, index)=>{
    xAxisValue.push(`${el.month}月`);
    seriesData.push({
      value: el.visit_rate,
      label: {
        color: parseInt(el.visit_rate, 10) < cutoff ? '#FC2E2E' : 'white',
        formatter: '{c}次'
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
      right: 16 * 2
    },
    legend: {
      show: false
    },
    yAxis: {
      type: 'value',
      name: '次',
      nameTextStyle: {
        color: '#90B6D2',
        align: 'right',
      },
      // max: 100,
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
        name: '覆蓋百分比',
        type: 'bar',
        data: seriesData,
        barWidth: 20,
        label: {
          show: true,
          position: 'top',
        },
        // markLine: {
        //   symbol: 'none',
        //   data: [{
        //     name: '最低标准',
        //     symbolSize: 0,
        //     yAxis: 75,
        //     lineStyle: {
        //       color: '#FC2E2E',
        //     },
        //     label: {
        //       formatter: '{b}',
        //       position: 'end',
        //       color: '#FC2E2E',
        //       width: 14*2,
        //       overflow:'breakAll'
        //     }
        //   }]
        // },
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#01989D' // color at 0%
          }, {
            offset: 1, color: '#02535F' // color at 100%
          }],
          global: false // default is false
        }
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
