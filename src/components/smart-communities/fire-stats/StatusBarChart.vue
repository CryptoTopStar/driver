<template>
  <Label label="设备状态"/>
  <div class="container">
    <div ref="chart" class="chart" />
  </div>
</template>

<script setup>
import Label from '@/components/Label.vue'
import {ref, shallowRef, onMounted, onBeforeUnmount, watchEffect} from "vue";
import request from '@/util/http.js';
import * as echarts from 'echarts';
import useSlidingWindow from "@/composables/useSlidingWindow";

// chart
const chart = ref(null);
const chartColors = ['#26B4FC','#EF9E4E', '#EF6D4E', '#9389FC']
const chartInstance = shallowRef(null);
const maxValue = ref(0)

// data
const isLoading = ref(false);
const optionData = ref([]);
const {data: windowedData} = useSlidingWindow(optionData, 4, 4000)
request.get('/api/fireSupe/getDeviceStatus').then((result)=>{
  const transformed = [] // 正常数量, 异常数量, 屏蔽数量, 未注册数量
  result.data.forEach(el=>{
    maxValue.value = Math.max(maxValue.value, Number(el.normal), Number(el.abnormal), Number(el.shield), Number(el.unregistered));
    transformed.push({
      name: el.device_name,
      active: el.normal,
      ood: el.abnormal,
      blocked: el.shield,
      unregistered: el.unregistered
    });
  });
  optionData.value = transformed;
}).finally(()=>{
  isLoading.value = false;
});
watchEffect(()=>{
  const fieldMap = [{name:'正常', field: 'active'}, {name: '异常', field: 'ood'},
    {name:'屏蔽', field: 'blocked'}, {name:'未注册', field: 'unregistered'}]
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      top: 30,
      bottom: 40,
      right: 0,
    },
    legend: {
      data: ['正常', '异常', '屏蔽', '未注册'],
      right: 0,
      textStyle: {
        fontSize: 14,
        color: '#A1CEEF'
      }
    },
    xAxis: {
      type: 'category',
      axisTick: { show: false },
      data: windowedData.value.map(e=>e.name),
      axisLabel: {
        fontSize: 14,
        color: '#90B6D2',
        overflow: 'breakAll',
        interval: 0, // show all
        width: 14 * 4
      },
    },
    yAxis: {
      type: 'value',
      name: '个',
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
    max: maxValue.value,
    series: fieldMap.map(({name, field})=>({
      name,
      type: 'bar',
      data: windowedData.value.map(e=>e[field]),
    })),
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
  height: vh(200);
}
</style>
