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
  watch,
  reactive,
  ref,
  toRefs,
  onMounted,
  onBeforeUnmount,
} from "vue";
import ChartComponent from "@/components/AcChart/index";
import _ from "lodash";
export default defineComponent({
  name: "RadarChart",
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
      grid:{
        top:fitChartSize(50)
      },
      title: {
        text: '',
        textStyle:{
          fontSize:fitChartSize(18),
          fontWeight:'normal',
          color: 'rgba(255, 255, 255, 1)'
        }
      },
      radar: {
        indicator: [

        ]
      },
      series: [

      ]
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
