<template>
  <div ref="chartRef" class="chart">

  </div>
</template>

<script setup>
import {ref, onMounted, watchEffect} from 'vue';
import useResponsiveChart from "@/composables/useResponsiveChart";
import echartTheme from "@/components/data-exploration/mushroom/shared/echart-theme.json";

const props = defineProps({
  dataSrc: Array,
})
const chartRef = ref(null);
const {instance} = useResponsiveChart(chartRef, echartTheme);

watchEffect(()=>{
  const result = props.dataSrc
  const xAxisValue = result.map(e=>e.point)
  const yAxisValue = result.map(e=>parseFloat(e.temperature))
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
      name: '度',
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
    },
    series: [
      {
        name: '温度',
        type: 'bar',
        data: yAxisValue,
        barWidth: '30%',
        label: {
          show: true,
          position: 'top',
          color: 'white',
        },
        color:  {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(42, 235, 234, 1)'
            },
            {
              offset: 1,
              color: 'rgba(0, 114, 123, 1)'
            },
          ],
          global: false, // 缺省为 false
        },
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
