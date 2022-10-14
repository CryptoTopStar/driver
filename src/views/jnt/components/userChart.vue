<template>
  <div class="user-chart">
    <div class="chart-box">
      <div class="chart" ref="myRef"></div>
      <img class="chart_bg" :src="require('./../images/chart_cycle.png')" alt="" />
    </div>
    <!-- <div class="legend">
      <div class="total">
        总数<span>{{ totalNumber }}</span>人
      </div>
      <div class="item" v-for="(item, index) in list">
        <span :style="{ background: colors[colors.length % (index + 1)] }"></span>
        <p :class="active === 3 ? 'width160' : 'width60'">{{ item.name }}</p>
        <p :style="{ color: colors[colors.length % (index + 1)] }">{{ item.value }}</p>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, watch, nextTick, defineProps } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  list: {
    type: Array,
    default: () => {
      return []
    }
  },
  active: {
    type: Number,
    default: 0
  }
})

const myRef = ref(null)
let myEcharts = null
const colors = [
  '#FF6759',
  '#FFC539',
  '#35F292',
  '#3AA0FF',
  '#00D9D6'
]
const totalNumber = ref(0)

const initEcharts = (data) => {
  myEcharts = echarts.init(myRef.value)
  let total = 0
  data.map(item => {
    total += item.value
  })
  totalNumber.value = total
  myEcharts.setOption({
    tooltip: {
      show: false,
      trigger: 'item',
    },
    legend: {
      show: false
    },
    color: colors,
    // title: {
    //   show: true,
    //   text: `{a|${'总数'}}{b|${total}}{a|人}`,
    //   left: '50%',
    //   top: '80%',
    //   textAlign: 'center',
    //   textStyle: {
    //     color: '#A1CEEF',
    //     rich: {
    //       a: {
    //         align: 'center',
    //         lineHeight: 24
    //       },
    //       b: {
    //         align: 'center',
    //         fontSize: 24,
    //         color: '#34E4FF',
    //         padding: [0, 6, 0, 6],
    //         fontFamily: 'PangMenZhengDao'
    //       },
    //     },
    //   }
    // },
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
        center: ['50%', '45%'],
        radius: ['60%', '70%'],
        emphasis: {
          label: {
            show: true,
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
              // '{bule|' + (+params.data.value).toFixed(1) + '}{default|亩}',
              '{bule|' + (+params.data.value / total * 100).toFixed(1) + '}{default|%}'
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
        center: ['50%', '45%'],
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

watch(() => props.list, val => {
  nextTick(() => {
    initEcharts(props.list)
  })
}, { immediate: true, deep: true })
</script>

<style scoped lang="scss">
.user-chart {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 210px;
  padding: 0 55px;
  .chart-box {
    position: relative;
    width: 210px;
    height: 210px;
  }
  .chart {
    width: 210px;
    height: 210px;
  }
  .chart_bg {
    position: absolute;
    top: 16%;
    left: 21%;
    width: 120px;
    height: 120px;
    animation: recycle 3s linear infinite;
  }
  .legend {
    width: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .item {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 26px;
      line-height: 26px;
      span {
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }
      p {
        font-size: 14px;
        &:nth-of-type(1) {
          color: #A1CEEF;
          margin-left: 10px;
        }
        &:nth-of-type(2) {
          width: 0;
          flex: 1;
        }
      }
      .width60 {
        width: 80px;
      }
      .width160 {
        width: 160px;
      }
    }
  }
  .total {
    justify-content: flex-start;
    font-size: 16px;
    font-family: PangMenZhengDao;
    margin-bottom: 20px;
    span {
      color: #34E4FF;
      font-size: 22px;
      padding: 0 6px;
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
