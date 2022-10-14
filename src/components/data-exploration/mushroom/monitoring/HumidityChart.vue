<template>
  <div ref="chartRef" class="chart">

  </div>
</template>

<script setup>
import {ref, onMounted, watchEffect} from 'vue';
import useResponsiveChart from "@/composables/useResponsiveChart";
import echartTheme from '@/components/data-exploration/mushroom/shared/echart-theme.json'

const props = defineProps({
  dataSrc: Array,
  isSmooth: {
    type:Boolean,
    default:false
  }
})
const chartRef = ref(null);
const {instance} = useResponsiveChart(chartRef, echartTheme);

watchEffect(()=>{
  const result = props.dataSrc
  const xAxisValue = result.map(e=>e.point)
  const yAxisValue = result.map(e=>parseFloat(e.humidity) * 100)
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
      name: '%',
      max: 100,
      nameTextStyle: {
        color: 'white',
        align: 'right',
      },
      axisLabel: {
        color: 'white',
        fontSize: '1em',
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
        fontSize: '1em',
        color: 'white',
        overflow: 'breakAll',
        interval: 0, // show all
        width: 14 * 4
      },
      splitArea: {
        interval: 0,
        show: true,
        areaStyle: {
          color: ['rgba(61, 171, 255, 0.08)','transparent']
        }
      }
    },
    series: [
      {
        name: '空气湿度',
        type: 'line',
        data: yAxisValue,
        barWidth: '30%',
        smooth: props?.isSmooth,
        label: {
          show: true,
          position: 'top',
          color: 'white',
        },
        areaStyle: {
          color: "rgba(14, 156, 255, 0.2)",
        },
        color: '#0E9CFF'
      },
    ],
  };
  instance.value?.setOption(option)
})
onMounted(()=>{
})
</script>

<style scoped lang="scss">
.chart {
  margin-block: vh(16);
  height: vh(200);
  font-size: vw(12);
}
</style>
