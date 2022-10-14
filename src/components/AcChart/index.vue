<template>
  <div class="chart-box" :ref="chartId"></div>
</template>

<script>
import {
  shallowRef,
  defineComponent,
  reactive,
  ref,
  onMounted,
  watch,
  toRefs,
} from "vue";
import * as echarts from "echarts";
import { useStore } from "vuex";
export default defineComponent({
  name: "ChartComponent",
  props: {
    chartId: { type: String, required: true }, //图表id
    option: { type: Object, default: () => {} }, //图表属性
    loading: { type: Boolean, default: false }, // 可不写loading状态
  },
  setup(props, context) {
    const state = reactive({
      myChart: shallowRef(null),
    });
    const isFinished = ref(false);
    const store = useStore();
    const drawChart = () => {
      state.myChart?.setOption(props.option, true);
    };

    // 监听store中窗口大小变化
    watch(
      () => store.state.window.innerWH,
      (val, old) => {
        state.myChart?.resize();
      }
    );

    watch(props, (newProps, oldProps) => {
      let chartInstance = echarts.getInstanceByDom(
        document.getElementById(props.chartId)
      );
      chartInstance && chartInstance.setOption(newProps.option);
    });

    onMounted(() => {
      let promise = new Promise((resolve) => {
        resolve();
      });
      promise.then(() => {
        state.myChart = echarts.init(document.getElementById(props.chartId));
        // state.myChart.on("finished", () => {
        //   if (!isFinished) {
        //     isFinished = true;
        //     state.myChart.resize();
        //   }
        // });

        context.emit("getInstance", state.myChart);

        drawChart();
      });
    });
    return {
      ...toRefs(state),
      isFinished,
    };
  },
});
</script>

<style lang="scss" scoped>
.chart-wrapper {
  position: relative;
  .legend-list {
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
  }
}

.chart-box {
  width: 100% !important;
  height: 100% !important;
}
</style>
