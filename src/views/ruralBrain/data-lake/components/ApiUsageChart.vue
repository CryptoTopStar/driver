<template>
  <article>
    <Title text="接口使用活跃度">
      <template #inline-after>
        <RadioBox v-model="range" :style="{marginInlineStart: 'auto'}" :options="rangeOptions" />
      </template>
    </Title>
    <div ref="chartRef" class="dl-api-usage-chart" role="figure"></div>
  </article>
</template>

<script setup>
import Title from '../../modules/Title.vue'
import RadioBox from '@/components/shared/RadioBox.vue'
import {computed, ref, onMounted, watchEffect} from "vue";
import {fetchDtapi} from '@/views/ruralBrain/data-lake/api-tokens';
import * as echarts from "echarts"
import useResponsiveChart from "@/composables/useResponsiveChart";
import echartTheme from "@/components/data-exploration/mushroom/shared/echart-theme.json";

const chartRef = ref(null)
const rangeOptions = [
  {label: '24小时', value: 'jsc_sjzc_hyd_24h'},
  {label: '7天', value: 'jsc_sjzc_hyd_7t'},
  {label: '30天', value: 'jsc_sjzc_hyd_30t'},
]
const range = ref('jsc_sjzc_hyd_24h')
// data
const isLoading = ref(false);
const dataCache = ref(new Map());
const data = computed(()=>{
  return dataCache.value.get(range.value) ?? []
});

watchEffect(()=>{
  const api = range.value;
  if (!dataCache.value.has(api)) {
    dataCache.value.set(api, []);
    isLoading.value = true;
    fetchDtapi(api)
      .then((result)=>{
        dataCache.value.set(api, result.data.map((e, idx)=>({
          ...e,
          rank: idx + 1,
          _tid: `${Date.now()}-${idx}`,
        })))
      })
      .catch(console.error)
      .finally(()=>{
        isLoading.value = false
      })
  }
});

const {instance} = useResponsiveChart(chartRef, echartTheme);
watchEffect(()=>{
  const xAxisValue = data.value.map(e=>range.value === 'jsc_sjzc_hyd_24h' ? e.za_hour : e.date)
  const yAxisValue = data.value.map(e=>e.total)
  instance.value?.clear();
  instance.value?.setOption({
      tooltip: {
        trigger: 'axis',
        valueFormatter: (value) => [undefined, null].includes(value) ? '无数据' : `${value}次`,
      },
      grid: {
        top: 40,
        bottom: 40,
        right: 0
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
          // interval: 0, // show all
          width: 14 * 4
        },
      },
      series: [
        {
          name: '次数',
          type: 'line',
          data: yAxisValue,
          color: '#0093FF',
          label: {
            show: false,
            position: 'top',
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#3088FF'
              }, {
                offset: 1, color: 'transparent'
              }],
              global: false
            }
          },
          // symbol: 'none',
        },
    ]
  }, true)
})

</script>

<style scoped lang="scss">
.dl-api-usage-chart {
  height: 240px;
}
</style>
