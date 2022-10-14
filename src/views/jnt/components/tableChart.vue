<template>
  <div class="table-chart" :style="{ height: height + 'px' }">
    <div class="chart-wrap">
      <div class="chart" ref="myRef"></div>
      <img class="chart-bg" :src="require('./../images/chart_cycle.png')" alt="" />
    </div>
    <div class="legend">
      <div class="item title">
        <p v-for="item in title" :key="item">{{ item }}</p>
      </div>
      <div class="item" v-for="(item, index) in list">
        <p><span :style="{ background: colors[index] }"></span>{{ item.name }}</p>
        <p :style="{ color: colors[index] }">{{ item.value }}项</p>
        <p :style="{ color: colors[index] }">{{ item.value ? (item.pass / item.value * 100).toFixed(1) : '0.0' }}%</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, nextTick, watch, ref } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  height: {
    type: Number,
    default: 0
  },
  title: {
    type: Array,
    default: () => {
      return []
    }
  },
  list: {
    type: Array,
    default: () => {
      return []
    }
  }
})

const myRef = ref(null)
let myChart = null
const colors = [
  '#FF6759',
  '#FFC539',
  '#35F292',
  '#3AA0FF',
  '#00D9D6'
]

const initEcharts = (data) => {
  myChart = echarts.init(myRef.value)
  let total = 0
  data.map(item => {
    total += item.value
  })
  myChart.setOption({
    tooltip: {
      show: false,
      trigger: 'item',
    },
    legend: {
      show: false
    },
    color: colors,
    title: {
      show: true,
      text: `{a|${'总数'}}\n{b|${total}}{a|项}`,
      left: '50%',
      top: 'center',
      textAlign: 'center',
      textStyle: {
        color: '#A1CEEF',
        rich: {
          a: {
            align: 'center',
            lineHeight: 24
          },
          b: {
            align: 'center',
            lineHeight: 24,
            fontSize: 24,
            padding: [0, 4, 0, 0],
            color: '#34E4FF',
            fontFamily: 'PangMenZhengDao'
          },
        },
      }
    },
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      top: '0%',
      containLabel: true,
    },
    series: [
      {
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['60%', '70%'],
        emphasis: {
          label: {
            show: false,
            fontSize: 20,
          },
        },
        label: {
          show: false,
          position: 'center',
          lineHeight: 28,
          formatter: (params) => {
            return [
              '{title|' + params.data.name + '}',
              '{bule|' + (+params.data.value) + '}{default|项}'
            ].join('\n')
          },
          rich: {
            title: {
              color: '#A1CEEF',
              fontSize: 14
            },
            bule: {
              color: '#26E3FF',
              fontSize: 20,
              fontFamily: 'PangMenZhengDao',
              padding: [0, 4, 0, 0],
              textShadowBlur: 8,
              textShadowOffsetX: 0,
              textShadowOffsetY: 0,
              textShadowColor: 'rgba(43, 228, 255, 0.3)'
            },
            default: {
              fontSize: 14,
              color: '#A1CEEF',
            }
          }
        },
        data: data,
      },
      {
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['53%', '60%'],
        itemStyle: {
          opacity: .2,
          borderWidth: 2,
          borderColor: 'transparent'
        },
        label: {
          show: false
        },
        data: data,
      },
    ],
  })
}

watch(() => props.list, () => {
  nextTick(() => {
    initEcharts(props.list)
  })
}, { immediate: true, deep: true })
</script>

<style scoped lang="scss">
.table-chart {
  display: flex;
  .chart-wrap {
    position: relative;
    align-self: center;
    height: 170px;
    width: 170px;
    .chart {
      height: 100%;
      width: 100%;
    }
    .chart-bg {
      position: absolute;
      animation: recycle 3s linear infinite;
      top: 22%;
      left: 22%;
      width: 95px;
      height: 95px;
    }
  }
  .legend {
    flex: 1;
    box-sizing: border-box;
    padding-top: 20px;
    margin-right: 20px;
    .item {
      display: flex;
      padding: 0 5px;
      p {
        flex: 1;
        height: 26px;
        line-height: 26px;
        font-size: 14px;
        display: flex;
        align-items: center;
        &:nth-of-type(1) {
          flex: none;
          width: 50%;
        }
        span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          margin-right: 6px;
        }
      }
    }
    .title {
      background: rgba(23, 151, 255, .4);
      margin-bottom: 4px;
      color: #fff;
    }
  }
  @keyframes recycle {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
