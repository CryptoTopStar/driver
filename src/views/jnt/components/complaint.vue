<template>
  <div class="complaint" ref="myRef">

  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, defineProps } from 'vue'
import { getYearSolveList } from '@/api/jnt'
import * as echarts from 'echarts'

const myRef = ref(null)
let myChart = ''

const initEcharts = (category, data) => {
  myChart = echarts.init(myRef.value)
  myChart.setOption({
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    title: {
      text: '近一年处理率统计',
      left: 'center',
      top: 10,
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
        color: '#A1CEEF'
      },
    },
    yAxis: {
      type: 'value',
      name: '%',
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
        type: 'line',
        barWidth: 18,
        symbol: 'none',
        smooth: true,
        color: ['#0093FF'],
        areaStyle: {
          color:{
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 1, color: 'rgba(40, 133, 255, 0)'
            }, {
              offset: 0, color: 'rgba(48, 136, 255, .34)'
            }],
            global: false // 缺省为 false
          }
        },
        data: data
      }
    ]
  })
}


const getData = async () => {
  const result = await getYearSolveList()
  let categoty = []
  let data = []
  result?.list?.map(item => {
    categoty.push(item.month.substr(5, 2))
    data.push(item.total_num ? (item.is_check_num / item.total_num * 100).toFixed(1) : 0)
  })
  initEcharts(categoty, data)
}


onMounted(() => {
  getData()
  // nextTick(() => {
  //   initEcharts(
  //     ['甘雨', '胡桃', '钟离', '夜兰', '七七', '神子'],
  //     [1, 10, 3, 4, 5, 6]
  //   )
  // })
})

</script>

<style scoped lang="scss">
.complaint {
  height: 140px;
  width: 100%;
}
</style>
