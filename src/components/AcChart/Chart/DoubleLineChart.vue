<template>
  <!-- 折线图组件 -->
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
  computed,
  toRefs,
  ref,
  watchEffect,
  reactive,
  watch,
  onMounted,
} from "vue";
import ChartComponent from "@/components/AcChart/index";
import _ from "lodash";
export default defineComponent({
  name: "DoubleLineChart",
  props: {
    option: {
      type: Object,
      default: {},
    }, // 传入的图表配置信息
    chartId: String,
    needResize:{ // 是否需要重绘
      type:  Boolean,
      default: false
    }
  },
  components: { ChartComponent },
  setup(props, context) {
    const {
      proxy: {
        $tools: { fitChartSize },
      },
    } = getCurrentInstance();
    let myChartInstance = null;

    const defaultOption = {
      legend: {
        show: true,
        top: fitChartSize(-5),
        itemGap: fitChartSize(60),
        iitemWidth: fitChartSize(8), // 宽
        itemHeight: fitChartSize(10), // 高
        icon: "rect",
        textStyle: {
          color: "#fff",
          fontSize: fitChartSize(16),
        },
      },
      grid: {
        left: fitChartSize(0),
        right: fitChartSize(0),
        top: fitChartSize(0),
        bottom: fitChartSize(0),
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: ["10%", "10%"],
        data: props.xData,
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(204, 204, 204, .5)",
          },
        },
        axisTick: {
          show: false,
        },

        axisLabel: {

          fontSize: fitChartSize(12),
          color: "#ffffff",
        },
      },
      yAxis: {
        type: "value",
        nameGap: fitChartSize(-10),
        nameTextStyle: {
          color: "#fff",
          fontSize: fitChartSize(14),
          align: "right",
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: true,
          fontSize: fitChartSize(12),
          showMaxLabel: false,
          color: "#ffffff",
        },
        splitLine: {
          show: true,
          showMaxLine: false,
          lineStyle: {
            type: "dashed",
            color: "rgba(255, 255, 255, .14)",
          },
        },
      },
      series: [
        {
          data: [],
          coordinateSystem: "cartesian2d",
          type: "line",
          label: {
            show: true,
            color: "#fff",
            fontFamily: "YouSheBiaoTiHei",
            fontSize: fitChartSize(14),
          },
          lineStyle: {
            color: "#0E9CFF",
          },
          itemStyle: {
            color: "#0E9CFF",
            borderWidth: fitChartSize(10),
            borderType: "solid",
          },
          areaStyle: {
            color: "rgba(14, 156, 255, .3)",
          },
        },
      ],
    };

    const state = reactive({
      chartOption: shallowRef(defaultOption),
      timer: ref(null), // 图表轮播timer
      showIndex: ref(-1), // 当前显示的图表项索引
      isFinished: ref(false), // 图表第一次加载完成
    });

    // serise基础配置
    const defaultSeries = {
      data: [],
      coordinateSystem: "cartesian2d",
      type: "line",
      label: {
        show: false,
        color: "#fff",
        fontFamily: "YouSheBiaoTiHei",
        fontSize: fitChartSize(14),
      },
      lineStyle: {
        color: "#0E9CFF",
      },
      itemStyle: {
        color: "#0E9CFF",
        borderWidth: fitChartSize(10),
        borderType: "solid",
      },
      emphasis: {
        label: {
          show: false,
        },
      },
      areaStyle: {
        color: "rgba(14, 156, 255, .3)",
      },
    };
    // 切换图形高亮
    const slideChart = (chartData) => {
      // 取消之前高亮的图形
      myChartInstance.dispatchAction({
        type: 'hideTip', // 隐藏提示框
        seriesIndex: 0,
        dataIndex: state.showIndex,
      })
      state.showIndex = (state.showIndex + 1) % chartData.length
      // 高亮当前图形
      myChartInstance.dispatchAction({
        type: 'showTip', // 展示提示框
        seriesIndex: 0,
        dataIndex: state.showIndex,
      })
    }
    // 初始化图表轮播
    const initChartTimer = function () {
      const options = myChartInstance.getOption()
      if (options && options.series[0] && options.series[0].data.length) {
        const chartData = options.series[0].data
        !state.isFinished && slideChart(chartData)
        state.isFinished = true
        cancelTimer()
        state.timer = setInterval(slideChart, 1500, chartData)
      }
      return initChartTimer
    }
    // 取消计时器
    const cancelTimer = () => {
      if (state.timer) {
        window.clearInterval(state.timer)
        state.timer = null
      }
    }

    // 鼠标移入
    const handleMouseOver = function (e) {
      cancelTimer()
      if (e.dataIndex != state.showIndex) {
        myChartInstance.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: state.showIndex,
        })
      }
    }

    // 鼠标移出
    const handleMouseOut = (e) => {
      state.showIndex = e.dataIndex
      myChartInstance.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: state.showIndex,
      })
      _.throttle(initChartTimer(), 1000)
    }
    const getInstance = (obj) => {
      myChartInstance = obj;

      if (myChartInstance) {
        myChartInstance.on('finished', (e) => {
          if (!state.isFinished) {
            initChartTimer()
          }
        })

        // 鼠标悬停
        myChartInstance.on('mouseover', handleMouseOver)

        myChartInstance.on('mouseout', handleMouseOut)
      }
    };

    watch(
      () => props.option,
      (newVal, old) => {
        if (newVal.series) {
          newVal.series = newVal.series.map((serie) => {
            let newSeries = _.assign({}, defaultSeries, serie);
            return newSeries;
          });
          state.chartOption.series = newVal.series;
        }
        myChartInstance.setOption(newVal);
      }
    );

    onMounted(() => {});

    return {
      ...toRefs(state),
      getInstance,
    };
  },
});
</script>
<style scoped lang="scss"></style>
