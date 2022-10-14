<template>
  <!-- 柱状图图表组件 -->
  <ChartComponent
    :chartId="chartId"
    :option="chartOption"
    v-on:getInstance="getInstance"
  />
</template>

<script>
import {
  defineComponent,
  shallowRef,
  getCurrentInstance,
  watch,
  reactive,
  ref,
  toRefs,
  onMounted,
} from 'vue'
import ChartComponent from '@/components/AcChart/index.vue'
import * as echarts from 'echarts'
import _ from 'lodash'
// 数据间隔
const dataInterval = [0, 50, 500, 3000, 10000, 20000, 30000, 40000, 50000]
export default defineComponent({
  name: 'BarChart',
  props: {
    option: {
      type: Object,
      default: {},
    }, // 传入的自定义图表配置信息
    chartId: String,
    needResize: {
      type:Boolean,
      default:false
    },
    uneven: {
      type: Boolean,
      default: false,
    }, // 是否y轴不等分
    labelTail: { type: String, default: '' },
    zoom: {
      type: Boolean,
      default: false,
    }, // 是否数据过多开启轮播滚动
    reverse: {
      type: Boolean,
      default: false,
    }, // 开启轮播滚动倒序滚动
  },
  components: { ChartComponent },
  setup(props, context) {
    const {
      proxy: {
        $tools: { fitChartSize },
      },
    } = getCurrentInstance()
    let myChartInstance = null

    // 柱状图默认配置
    const defaultOption = {
      grid: {
        left: fitChartSize(10),
        right: fitChartSize(10),
        top: fitChartSize(10),
        bottom: fitChartSize(10),
        containLabel: true,
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        textStyle:{
          color:'rgba(255, 255, 255, .8)',
        },
        borderWidth:'0',
        borderColor:'rgba(7,38,108, 1)',
        backgroundColor:'rgba(7,38,108,1)',//通过设置rgba调节背景颜色与透明度
        padding: [
          fitChartSize(5),
          fitChartSize(10),
          fitChartSize(5),
          fitChartSize(10),
        ],
        formatter: '{b}<br />{a}: {c}',
      },
      xAxis: {
        type: 'category',
        data: [],
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(204, 204, 204, .5)',
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          interval: 0,
          rotate: -45, //倾斜度 -90 至 90 默认为0
          margin: 6,
          fontSize: fitChartSize(12),
          color: '#ffffff',
        },
      },
      yAxis: {
        type: 'value',
        min: 0,
        nameGap: fitChartSize(-10),
        nameTextStyle: {
          color: '#fff',
          fontSize: fitChartSize(14),
          align: 'right',
          padding: [0, fitChartSize(16), fitChartSize(0), fitChartSize(0)],
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: true,
          fontSize: fitChartSize(12),
          showMaxLabel: false,
          color: '#ffffff',
          formatter: (v, i) => {
            return props.uneven ? dataInterval[i] : v
          },
        },
        splitLine: {
          show: true,
          showMaxLine: false,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(255,255,255,.14)',
          },
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['transparent', 'transparent'],
          },
        },
        axisTick: {
          show: false,
        },
        // boundaryGap: ["20%", "20%"],
      },
      series: [
        // {
        //   itemStyle: {
        //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //       {
        //         offset: 0,
        //         color: '#49A9FC',
        //       },
        //       {
        //         offset: 1,
        //         color: '#05529E',
        //       },
        //     ]),
        //   },
        //   data: [],
        // },
      ],
    }

    const state = reactive({
      chartOption: shallowRef(defaultOption),
      zoomTimer: ref(null), // 轮播滚动计时器
      startValue: ref(0), // 轮播滚动起始位置
      endValue: ref(0), // 轮播滚动结束位置
      isInit: ref(false), // 是否初始化
    })

    const getInstance = (obj) => {
      myChartInstance = obj

      if (myChartInstance) {
        state.isInit = true
        myChartInstance.on('highlight', (e) => {
          if (props.zoom) {
            // 高亮时停止滚动
            window.clearInterval(state.zoomTimer)
          }
        })
        myChartInstance.on('downplay', (e) => {
          if (props.zoom) {
            // 取消高亮时开始滚动
            initZoomTimer()
          }
        })
      }
    }

    // 清空图表
    const clearChart = () => {
      if (myChartInstance) {
        myChartInstance.clear()
        initStartEndValue()
        window.clearInterval(state.zoomTimer)
      }
    }

    watch(
      () => props.option,
      (newVal, old) => {
        // console.log('更新数据', _.merge(state.chartOption, newVal))
        if (state.isInit) {
          myChartInstance.setOption(newVal)
        } else {
          myChartInstance.setOption(_.merge(state.chartOption, newVal))
        }
        if (props.zoom) {
          // 开启滚动
          initZoomTimer(true)
        }

        if(props.needResize){
          setInterval(()=>{
            console.log('需要重绘')
            clearChart()
            myChartInstance.setOption(_.merge(state.chartOption, newVal))
          },4000)
        }
      },
      { deep: true }
    )

    // 初始化开始结束位置
    const initStartEndValue = () => {
      const maxLength = props.option.series[0].data.length
      if (props.reverse) {
        // 倒序滚动
        state.startValue = maxLength - 1
        state.endValue = maxLength - 9
      } else {
        state.startValue = 0
        state.endValue = 8
      }
    }

    // 开启data滚动计时器 init:是否第一次初始化
    const initZoomTimer = (init) => {
      state.zoomTimer && window.clearInterval(state.zoomTimer)
      const maxLength = props.option.series[0].data.length
      if (init) {
        initStartEndValue()
      }

      state.zoomTimer = setInterval(() => {
        if (myChartInstance) {
          if (props.reverse) {
            if (state.endValue <= 0) {
              state.startValue = maxLength - 1
              state.endValue = maxLength - 9
            } else {
              state.startValue = state.startValue - 1
              state.endValue = state.endValue - 1
            }
          } else {
            if (state.endValue >= maxLength - 1) {
              state.startValue = 0
              state.endValue = 8
            } else {
              state.startValue = state.startValue + 1
              state.endValue = state.endValue + 1
            }
          }

          myChartInstance.setOption({
            dataZoom: {
              startValue: state.startValue,
              endValue: state.endValue,
            },
          })
        } else {
          state.zoomTimer && window.clearInterval(state.zoomTimer)
        }
      }, 2000)
    }

    // 暴露给父组件实例
    const popInstance = () => {
      return myChartInstance
    }

    onMounted(() => {

    })

    return {
      ...toRefs(state),
      getInstance,
      clearChart,
      popInstance,
    }
  },
})
</script>
<style scoped lang="scss"></style>
