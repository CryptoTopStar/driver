<template>
  <Label label="设备报警统计"/>
  <div class="container">
    <div ref="chart" class="chart" />
  </div>
</template>

<script setup>
import Label from '@/components/Label.vue'
import {ref, onMounted, onBeforeUnmount, shallowRef, watchEffect} from "vue";
import request from '@/util/http.js';
import * as echarts from 'echarts';
import useSlidingWindow from "@/composables/useSlidingWindow";

// chart
const chart = ref(null);
const chartColors = ['#EF9E4E','#3ED2FF']
const chartInstance = shallowRef(null);

// data
const isLoading = ref(false);
const optionData = ref([]);
const {data: windowedData} = useSlidingWindow(optionData, 4, 4000)
request.get('/api/fireSupe/getCountDeviceAlarm').then((result)=>{
  const data = [] // 报警, 隐患
  result.data.forEach(el=>{
    data.push({
      name: el.device_name,
      calls: el.alarm,
      hazards: el.hidden_danger,
    });
  })
  optionData.value = data;
}).finally(()=>{
  isLoading.value = false;
});

watchEffect(()=>{
  const fieldMap = [{name:'报警', field: 'calls'}, {name: '隐患', field: 'hazards'}]
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      top: 30,
      left: 14 * 8,
    },
    legend: {
      data: ['报警', '隐患'],
      right: 0,
      textStyle: {
        fontSize: 14,
        color: '#A1CEEF'
      }
    },
    yAxis: {
      type: 'category',
      axisTick: { show: false },
      data: windowedData.value.map(e=>e.name),
      // offset: -14 * 8,
      axisLabel: {
        fontSize: 14,
        color: '#90B6D2',
        overflow: 'breakAll',
        interval: 0, // show all
        width: 14 * 8
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
        name: '报警',
        type: 'bar',
        data: windowedData.value.map(e=>e.calls),
        label: {
          show: true,
          position: 'right',
          color: '#fff'
        },
        color: new echarts.graphic.LinearGradient(0, 0, 0.5, 0, [{
          offset: 0,
          color: 'rgba(239, 158, 78, 0.2)'
        }, {
          offset: 1,
          color: chartColors[0]
        }])
      },
      {
        name: '隐患',
        type: 'bar',
        data: windowedData.value.map(e=>e.hazards),
        label: {
          show: true,
          position: 'right',
          color: '#fff'
        },
        color: new echarts.graphic.LinearGradient(0, 0, 0.5, 0, [{
          offset: 0,
          color: 'rgba(62, 210, 255, 0.2)'
        }, {
          offset: 1,
          color: chartColors[1]
        }])
      },
    ],
    color: chartColors,
  };
  chartInstance.value?.setOption(option)
})

const resizeHandler = ()=>{
  chartInstance.value?.resize();
};
onMounted(()=>{
  chartInstance.value = echarts.init(chart.value);
  window.addEventListener('resize', resizeHandler)
})
onBeforeUnmount(()=>{
  chartInstance.value?.dispose();
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
