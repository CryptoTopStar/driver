<template>
  <article>
    <slot name="header" />
    <div ref="chartRef" class="dl-category-chart" />
  </article>
</template>

<script setup>
import {computed, ref, onMounted, watchEffect} from "vue";
import * as echarts from "echarts"
import useResponsiveChart from "@/composables/useResponsiveChart";
import echartTheme from "@/components/data-exploration/mushroom/shared/echart-theme.json";

const props = defineProps({
  data: {
    type: [Object, undefined],
    required: true,
    default() { return {} }
  }
})
const chartRef = ref(null)
const {instance} = useResponsiveChart(chartRef, echartTheme);
watchEffect(()=>{
  const data = props.data['数据主体分布'] ?? []
  const yAxisValue = data.map(e => e.zbnr)
  const xAxisValue = data.map((e, idx)=> {
    const isEven = idx % 2 === 0;
    return {
      value: e.sl,
      itemStyle: {
        color: isEven ? '#6783FF' : '#2CC6BA',
      },
      label: {
        color: isEven ? '#6783FF' : '#2CC6BA',
      },
    }
  })
  instance.value?.clear();
  instance.value?.setOption({
    tooltip: {
      trigger: 'axis',
      valueFormatter: (value) => `${value}个`
    },
    grid: {
      top: 30,
      bottom: 30,
      right: 30,
      left: 14*6,
    },
    legend: {
      show: false,
      right: 0,
      textStyle: {
        color: 'white'
      }
    },
    xAxis: {
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
    yAxis: {
      type: 'category',
      axisTick: { show: false },
      data: yAxisValue,
      axisLabel: {
        fontSize: 16,
        color: '#90B6D2',
        overflow: 'breakAll',
        // interval: 0, // show all
        width: 16 * 4
      },
    },
    series: [
      {
        name: '个数',
        type: 'bar',
        data: xAxisValue,
        barWidth: 8,
        color: ['#2CC6BA', '#6783FF'],
        label: {
          show: true,
          position: 'right',
          fontSize: '16px',
          fontFamily: 'PangMenZhengDao',
        },
      },
    ]
  }, true)
})

</script>

<style scoped lang="scss">
.dl-category-chart {
  height: 300px;
}
</style>
