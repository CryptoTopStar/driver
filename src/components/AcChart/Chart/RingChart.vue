<template>
  <!-- 圆环图图表组件 -->
  <ChartComponent
    v-if="chartId"
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
  watchEffect,
  watch,
  reactive,
  ref,
  toRef,
  toRefs,
  onMounted,
  onBeforeUnmount,
} from "vue";
import ChartComponent from "@/components/AcChart/index";
import _ from "lodash";
export default defineComponent({
  name: "RingChart",
  props: {
    option: {
      type: Object,
      default: {},
    }, // 传入的自定义图表配置信息
    chartId: String,
    chartData: Array,
  },
  components: { ChartComponent },
  setup(props, context) {
    const {
      proxy: {
        $tools: { fitChartSize, keepTwoDecimal },
      },
    } = getCurrentInstance();

    let myChartInstance = null;

    const defaultOption = shallowRef({
      color: [
        "#29EDFE",
        "#EEFE6E",
        "#1DB0FC",
        "#F5BE55",
        "#DF6FF4",
        "#A151F2",
        "#29EDFE",
        "#EEFE6E",
        "#1DB0FC",
        "#F5BE55",
        "#DF6FF4",
        "#A151F2",
      ],
      grid: {
        top: fitChartSize(10),
        bottom: fitChartSize(10),
        left: fitChartSize(0),
        right: fitChartSize(0),
        containLabel: true,
      },
      tooltip: {
        trigger: "none",
      },
      legend: {
        show: true,
        type: "scroll",
        orient: "vertical",
        height: fitChartSize(120),
        right: fitChartSize(0),
        top: "middle",
        textStyle: {
          color: "#fft",
          fontSize: fitChartSize(16),
          // width: fitChartSize(130),
          overflow: "truncate",
          rich: {
            name: {
              width: fitChartSize(90),
              fontSize: fitChartSize(16),
            },
          },
        },
        itemHeight: fitChartSize(10),
        itemWidth: fitChartSize(10),
        icon: "rect",
        pageIconColor: "#fff",
        pageIconSize: fitChartSize(16),
        pageTextStyle: {
          color: "#fff",
        },
        formatter: (name, index) => {
          if (props.chartData.length) {
            // 总量
            let total = 0;
            props.chartData.forEach((v) => {
              total += parseFloat(v.value);
            });
            const item = props.chartData.filter(
              (item) => item.name === name
            )[0];
            // if (name.length > props.nameSlice) {
            //   name = name.slice(0, props.nameSlice) + "...";
            // }
            if (!item) return;
            return `{name|${name}}${keepTwoDecimal(
              (item.value / total) * 100
            )}%`;
          }
        },
        selectedMode: false,
      },
      series: [
        {
          type: "pie",
          center: [fitChartSize(150), "50%"],
          radius: [fitChartSize(60), fitChartSize(70)],
          label: {
            show: false,
            color: "inherit",
            position: "center",
            formatter: "{name|{b}}\n{value|{c}万人}\n{percent|({d}%)}",
            rich: {
              name: {
                align: "center",
                verticalAlign: "middle",
                borderWidth: 0,
                fontSize: fitChartSize(16),
                color: "#fff",
              },
              value: {
                fontFamily: "YouSheBiaoTiHei",
                align: "center",
                verticalAlign: "middle",
                borderWidth: 0,
                fontSize: fitChartSize(22),
                // color: "#fff",
                padding: [
                  fitChartSize(8),
                  fitChartSize(0),
                  fitChartSize(3),
                  fitChartSize(0),
                ],
              },
              percent: {
                align: "center",
                verticalAlign: "middle",
                borderWidth: 0,
                fontSize: fitChartSize(12),
                color: "#fff",
              },
            },
          },
          emphasis: {
            scale: true,
            scaleSize: fitChartSize(12),
            label: {
              show: true,
            },
          },
          labelLine: {
            show: false,
          },
          data: [],
        },
      ],
    });

    const state = reactive({
      chartOption: shallowRef(defaultOption),
      // myChartInstance: ref(null),
      timer: ref(null), // 图表轮播timer
      showIndex: ref(-1), // 当前显示的图表项索引
      isFinished: ref(false), // 图表第一次加载完成
      isInit: ref(false), // 是否初始化
    });

    const getInstance = (obj) => {
      myChartInstance = obj;

      if (myChartInstance) {
        state.isInit = true;
        myChartInstance.on("finished", (e) => {
          if (!state.isFinished) {
            initChartTimer();
          }
        });

        // 鼠标悬停
        myChartInstance.on("mouseover", handleMouseOver);

        myChartInstance.on("mouseout", handleMouseOut);
      }
    };

    // 鼠标移入
    const handleMouseOver = function (e) {
      cancelTimer();
      if (e.dataIndex != state.showIndex) {
        myChartInstance.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: state.showIndex,
        });
      }
    };

    // 鼠标移出
    const handleMouseOut = (e) => {
      state.showIndex = e.dataIndex;
      myChartInstance.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: state.showIndex,
      });
      _.throttle(initChartTimer(), 1000);
    };

    // 初始化图表轮播
    const initChartTimer = function () {
      const options = myChartInstance.getOption();
      if (options && options.series[0] && options.series[0].data.length) {
        const chartData = options.series[0].data;
        !state.isFinished && slideChart(chartData);
        state.isFinished = true;
        cancelTimer();
        state.timer = setInterval(slideChart, 3000, chartData);
      }
      return initChartTimer;
    };

    // 切换图形高亮
    const slideChart = (chartData) => {
      // 取消之前高亮的图形
      myChartInstance.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: state.showIndex,
      });
      state.showIndex = (state.showIndex + 1) % chartData.length;
      // 高亮当前图形
      myChartInstance.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: state.showIndex,
      });
    };

    // 取消计时器
    const cancelTimer = () => {
      if (state.timer) {
        window.clearInterval(state.timer);
        state.timer = null;
      }
    };

    onBeforeUnmount(() => {
      window.clearInterval(state.timer);
      state.timer = null;
    });

    // watch(
    //   () => props.chartData,
    //   (newVal, old) => {
    //     console.log("更新数据", newVal);
    //   },
    //   { deep: true }
    // );

    watch(
      () => props.option,
      (newVal, old) => {
        // console.log("更新配置", newVal);
        if (JSON.stringify(newVal) == "{}") return;
        setTimeout(() => {
          if (state.isInit) {
            myChartInstance && myChartInstance.setOption(newVal);
          } else {
            myChartInstance &&
              myChartInstance.setOption(_.merge(state.chartOption, newVal));
          }
        }, 200);
      },
      { deep: true, immediate: true }
    );

    // watch(
    //   () => props.labelTail,
    //   (newVal, old) => {
    //     myChartInstance.setOption({
    //       series: [
    //         {
    //           label: {
    //             formatter:
    //               "{name|{b}}\n{value|{c}" + newVal + "}\n{percent|({d}%)}",
    //           },
    //         },
    //       ],
    //     });
    //   }
    // );

    onMounted(() => {});

    return {
      ...toRefs(state),
      getInstance,
    };
  },
});
</script>
<style scoped lang="scss">
.legend-list {
  height: 100%;
}
</style>
