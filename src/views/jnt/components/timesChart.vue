<template>
  <div class="times-chart" ref="myRef">
  </div>
</template>

<script setup>
import { ref, defineProps, watch, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  list: {
    type: Array,
    default: () => {
      return []
    }
  }
})

const myRef = ref(null)
let myEcharts = null

const initEcharts = (category, data) => {
  myEcharts = echarts.init(myRef.value)
  myEcharts.setOption({
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    title: {
      text: '关键词搜索次数统计',
      left: 'center',
      textStyle: {
        fontSize: 14,
        color: '#A1CEEF'
      }
    },
    legend: {
      show: false
    },
    xAxis: {
      type: 'category',
      data: category,
      axisTick: {
        show: false // 轴刻度线
      },
      axisLine: { // 轴线
        show: true,
        lineStyle: {
          color: '#A1CEEF',
          type: 'dashed',
        }
      },
      axisLabel: {
        fontSize: 14,
        color: '#A1CEEF',
        rotate: 20,
        formatter: (params) => {
          if (params.length <= 3) {
            return params
          } else {
            return params.substr(0, 3) + '...'
          }
        }
      },
    },
    yAxis: {
      type: 'value',
      name: '次',
      splitLine: {
        show: true, // 轴刻度线
        lineStyle: {
          type: 'dashed',
          color: 'rgba(255, 255, 255, .08)',
        }
      },
      axisLabel: {
        fontSize: 14,
        color: '#A1CEEF'
      },
      nameTextStyle: {
        fontSize: 14,
        color: '#A1CEEF',
        align: 'right',
      }
    },
    grid: {
      left: '4%',
      right: '4%',
      bottom: '8%',
      top: '30%',
      containLabel: true
    },
    series: [
      {
        type: 'bar',
        barWidth: 18,
        color: ['#FFC400'],
        itemStyle: {
          color: (params) => {
            return (
              new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                offset: 0,
                color: params.dataIndex % 2 === 0 ? '#349AFF' : '#6F74F0' // 0% 处的颜色
              },
                {
                  offset: 1,
                  color: params.dataIndex % 2 === 0 ? '#10EDFF' : '#84C2FF' // 100% 处的颜色
                }], false)
            )
          }
        },
        data: data
      }
    ]
  })
}


watch(() => props.list, val => {
  const category = []
  const data = []
  val.map(item => {
    category.push(item.name)
    data.push(item.search_count || 0)
  })
  nextTick(() => {
    initEcharts(category, data)
  })
}, { immediate: true, deep: true })
</script>

<style scoped lang="scss">
.times-chart {
  width: 100%;
  height: 210px;
}
</style>
