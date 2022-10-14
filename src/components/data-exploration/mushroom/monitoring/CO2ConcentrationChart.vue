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
  const xAxisValue = []
  const yAxisValue = []
  result.forEach((el, index)=>{
    xAxisValue.push(el.point);
    const isEven = index % 2 == 0;
    yAxisValue.push({
      value: parseFloat(el.concentration),
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
      min: 0,
      name: '%',
      nameTextStyle: {
        color: 'white',
        align: 'right',
      },
      axisLabel: {
        color: 'white',
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
        fontSize: '1em',
        color: 'white',
        overflow: 'breakAll',
        interval: 0, // show all
        formatter: ['{textStyle|{value}}'],
      },
    },
    series: [
      {
        name: '浓度',
        type: 'bar',
        data: yAxisValue,
        barWidth: '30%',
        label: {
          show: true,
          position: 'top',
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
